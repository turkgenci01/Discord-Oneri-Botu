const { SlashCommandBuilder, ChannelType, PermissionFlagsBits } = require('discord.js');
const { getGuildConfig, updateGuildConfig } = require('../utils/configManager');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kitap-öneri-kanal')
        .setDescription('Kitap öneri kanalını ayarla')
        .addChannelOption(option =>
            option.setName('kanal')
                .setDescription('Kitap öneri kanalı olarak ayarlanacak kanal')
                .setRequired(true)
                .addChannelTypes(ChannelType.GuildText))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        const channel = interaction.options.getChannel('kanal');

        updateGuildConfig(interaction.guild.id, { bookChannel: channel.id });

        await interaction.reply({
            content: `✅ ${channel} kanalı **Kitap Öneri Kanalı** olarak ayarlandı!`,
            ephemeral: true
        });
    }
};
