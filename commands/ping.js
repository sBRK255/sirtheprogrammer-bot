module.exports = {
    name: 'ping',
    description: 'Check bot response',
    async execute(sock, msg) {
        const sender = msg.key.remoteJid;
        await sock.sendMessage(sender, { text: 'Pong! 🏓' });
    }
}; 