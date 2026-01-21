const { Client, GatewayIntentBits, Collection, ActivityType } = require('discord.js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions
    ]
});

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
if (fs.existsSync(commandsPath)) {
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        }
    }
}

const eventsPath = path.join(__dirname, 'events');
if (fs.existsSync(eventsPath)) {
    const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

    for (const file of eventFiles) {
        const filePath = path.join(eventsPath, file);
        const event = require(filePath);
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args, client));
        } else {
            client.on(event.name, (...args) => event.execute(...args, client));
        }
    }
}

const activities = [
    { name: '💡 Önerileri topluyorum', type: ActivityType.Custom },
    { name: '📥 Yeni önerilere açığım', type: ActivityType.Custom },
    { name: '📊 Oylarınızı bekliyorum', type: ActivityType.Custom },
    { name: '🛠 Geliştiriliyor', type: ActivityType.Custom }
];

let currentActivityIndex = 0;

function updatePresence() {
    if (client.user) {
        const activity = activities[currentActivityIndex];
        client.user.setPresence({
            activities: [{ name: activity.name, type: activity.type }],
            status: 'online'
        });
        currentActivityIndex = (currentActivityIndex + 1) % activities.length;
    }
}

client.once('ready', () => {
    console.log(`✅ Bot hazır! ${client.user.tag} olarak giriş yapıldı.`);
    updatePresence();
    setInterval(updatePresence, 10000);
});

client.login(process.env.DISCORD_TOKEN);

module.exports = client;
