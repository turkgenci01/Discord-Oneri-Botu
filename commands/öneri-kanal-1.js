const { SlashCommandBuilder, ChannelType, PermissionFlagsBits } = require('discord.js');
const { getGuildConfig, updateGuildConfig } = require('../utils/configManager');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('öneri-kanal-1')
        .setDescription('Birinci genel öneri kanalını ayarla')
        .addChannelOption(option =>
            option.setName('kanal')
                .setDescription('Öneri kanalı olarak ayarlanacak kanal')
                .setRequired(true)
                .addChannelTypes(ChannelType.GuildText))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        const channel = interaction.options.getChannel('kanal');
        const guildConfig = getGuildConfig(interaction.guild.id);

        if (!guildConfig.suggestionChannels) {
            guildConfig.suggestionChannels = [];
        }

        if (guildConfig.suggestionChannels.length >= 1 && guildConfig.suggestionChannels[0]) {
            guildConfig.suggestionChannels[0] = channel.id;
        } else {
            guildConfig.suggestionChannels[0] = channel.id;
        }

        updateGuildConfig(interaction.guild.id, { suggestionChannels: guildConfig.suggestionChannels });

        await interaction.reply({
            content: `✅ ${channel} kanalı **1. Genel Öneri Kanalı** olarak ayarlandı!`,
            ephemeral: true
        });
    }
};
