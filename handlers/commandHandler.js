const fs = require('fs');
const path = require('path');

const commands = new Map();

// Load commands
const commandFiles = fs.readdirSync(path.join(__dirname, '../commands'))
    .filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`../commands/${file}`);
    commands.set(command.name, command);
}

async function handleCommand(sock, msg, cmd, args) {
    const command = commands.get(cmd);
    
    if (!command) {
        const sender = msg.key.remoteJid;
        await sock.sendMessage(sender, { text: `Unknown command: ${cmd}` });
        return;
    }
    
    try {
        await command.execute(sock, msg, args);
    } catch (error) {
        console.error(error);
        const sender = msg.key.remoteJid;
        await sock.sendMessage(sender, { text: 'There was an error executing that command.' });
    }
}

module.exports = { handleCommand }; 
 