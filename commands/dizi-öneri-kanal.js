const { SlashCommandBuilder, ChannelType, PermissionFlagsBits } = require('discord.js');
const { getGuildConfig, updateGuildConfig } = require('../utils/configManager');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dizi-öneri-kanal')
        .setDescription('Dizi öneri kanalını ayarla')
        .addChannelOption(option =>
            option.setName('kanal')
                .setDescription('Dizi öneri kanalı olarak ayarlanacak kanal')
                .setRequired(true)
                .addChannelTypes(ChannelType.GuildText))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        const channel = interaction.options.getChannel('kanal');

        updateGuildConfig(interaction.guild.id, { seriesChannel: channel.id });

        await interaction.reply({
            content: `✅ ${channel} kanalı **Dizi Öneri Kanalı** olarak ayarlandı!`,
            ephemeral: true
        });
    }
};
