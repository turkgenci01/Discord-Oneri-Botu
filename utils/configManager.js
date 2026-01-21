const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, '..', 'config', 'settings.json');

function loadConfig() {
    try {
        const data = fs.readFileSync(configPath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return {};
    }
}

function saveConfig(config) {
    try {
        fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf8');
        return true;
    } catch (error) {
        console.error('Config kaydetme hatası:', error);
        return false;
    }
}

function getGuildConfig(guildId) {
    const config = loadConfig();
    if (!config[guildId]) {
        config[guildId] = {
            suggestionChannels: [],
            musicChannel: null,
            movieChannel: null,
            seriesChannel: null,
            bookChannel: null
        };
        saveConfig(config);
    }
    return config[guildId];
}

function updateGuildConfig(guildId, updates) {
    const config = loadConfig();
    if (!config[guildId]) {
        config[guildId] = {
            suggestionChannels: [],
            musicChannel: null,
            movieChannel: null,
            seriesChannel: null,
            bookChannel: null
        };
    }
    Object.assign(config[guildId], updates);
    saveConfig(config);
    return config[guildId];
}

module.exports = {
    loadConfig,
    saveConfig,
    getGuildConfig,
    updateGuildConfig
};
