const { getGuildConfig } = require('../utils/configManager');
const { handleGeneralSuggestion, handleCategorySuggestion } = require('../utils/suggestionHandler');

module.exports = {
    name: 'messageCreate',
    async execute(message, client) {
        if (message.author.bot) return;
        if (!message.guild) return;

        const guildConfig = getGuildConfig(message.guild.id);
        const channelId = message.channel.id;

        if (guildConfig.suggestionChannels.includes(channelId)) {
            await handleGeneralSuggestion(message, client);
        } else if (channelId === guildConfig.musicChannel) {
            await handleCategorySuggestion(message, client, 'music');
        } else if (channelId === guildConfig.movieChannel) {
            await handleCategorySuggestion(message, client, 'movie');
        } else if (channelId === guildConfig.seriesChannel) {
            await handleCategorySuggestion(message, client, 'series');
        } else if (channelId === guildConfig.bookChannel) {
            await handleCategorySuggestion(message, client, 'book');
        }
    }
};
