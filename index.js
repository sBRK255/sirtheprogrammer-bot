const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const path = require('path');
const fs = require('fs');
const pino = require('pino');
const { createSession } = require('./sessionHandler');

// Bot configuration
const config = {
    botName: "SirTheProgrammer Bot",
    ownerName: "Baraka Kibiki",
    ownerNumber: "255617200014", // format: countrycode+number
    prefix: ".",
    autoRead: true,
    autoDownloadStatus: true,
};

async function connectToWhatsApp() {
    const sock = await createSession();

    // Handle messages
    sock.ev.on('messages.upsert', async ({ messages }) => {
        const m = messages[0];
        
        if(!m.message) return;
        if(m.key && m.key.remoteJid === 'status@broadcast') return;
        
        const messageType = Object.keys(m.message)[0];
        const messageContent = m.message[messageType];
        
        // Handle commands
        if(messageContent?.startsWith(config.prefix)) {
            const command = messageContent.slice(1).split(' ')[0].toLowerCase();
            const args = messageContent.slice(command.length + 2).trim();
            
            handleCommand(sock, m, command, args);
        }
    });
}

async function handleCommand(sock, msg, cmd, args) {
    const sender = msg.key.remoteJid;
    
    switch(cmd) {
        case 'ping':
            await sock.sendMessage(sender, { text: 'Pong! 🏓' });
            break;
            
        case 'help':
            const helpText = `
*${config.botName} - Commands List*
${config.prefix}ping - Check bot response
${config.prefix}help - Show this help message
`;
            await sock.sendMessage(sender, { text: helpText });
            break;
            
        default:
            await sock.sendMessage(sender, { text: `Unknown command: ${cmd}` });
    }
}

// Start the bot
connectToWhatsApp(); 