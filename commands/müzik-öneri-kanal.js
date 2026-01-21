const { SlashCommandBuilder, ChannelType, PermissionFlagsBits } = require('discord.js');
const { getGuildConfig, updateGuildConfig } = require('../utils/configManager');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('müzik-öneri-kanal')
        .setDescription('Müzik öneri kanalını ayarla')
        .addChannelOption(option =>
            option.setName('kanal')
                .setDescription('Müzik öneri kanalı olarak ayarlanacak kanal')
                .setRequired(true)
                .addChannelTypes(ChannelType.GuildText))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        const channel = interaction.options.getChannel('kanal');

        updateGuildConfig(interaction.guild.id, { musicChannel: channel.id });

        await interaction.reply({
            content: `✅ ${channel} kanalı **Müzik Öneri Kanalı** olarak ayarlandı!`,
            ephemeral: true
        });
    }
};
