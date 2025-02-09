const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const qrcode = require('qrcode-terminal');
const pino = require('pino');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function createSession() {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info');
    
    // Create WA Socket with pairing code support
    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true,
        logger: pino({ level: 'silent' }),
        browser: ['SirTheProgrammer Bot', 'Chrome', '1.0.0'],
        mobile: false,
    });

    // Handle connection events
    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect, qr } = update;

        if(qr) {
            console.log('Scan this QR code or use the pairing code option:');
            qrcode.generate(qr, { small: true });
            
            // Ask if user wants to use pairing code
            rl.question('Would you like to pair using a code instead? (yes/no): ', async (answer) => {
                if (answer.toLowerCase() === 'yes') {
                    try {
                        console.log('\nTo pair by phone number:');
                        rl.question('Please enter your phone number (with country code): ', async (number) => {
                            const phoneNumber = number.replace(/[^0-9]/g, '');
                            
                            // Request pairing code
                            const code = await sock.requestPairingCode(phoneNumber);
                            console.log(`Your pairing code: ${code}`);
                            console.log('Please enter this code on your WhatsApp app.');
                        });
                    } catch (error) {
                        console.error('Failed to request pairing code:', error);
                    }
                }
            });
        }
        
        if(connection === 'close') {
            const shouldReconnect = (lastDisconnect?.error)?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log('Connection closed due to:', lastDisconnect?.error);
            if(shouldReconnect) {
                createSession();
            }
        } else if(connection === 'open') {
            console.log('Bot successfully connected!');
            rl.close();
        }
    });

    // Save credentials whenever they are updated
    sock.ev.on('creds.update', saveCreds);
    
    return sock;
}

module.exports = { createSession }; 