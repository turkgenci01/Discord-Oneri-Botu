module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (interaction.isChatInputCommand()) {
            const command = client.commands.get(interaction.commandName);

            if (!command) return;

            try {
                await command.execute(interaction);
            } catch (error) {
                console.error('Komut çalıştırma hatası:', error);
                const errorMessage = { content: '❌ Bu komutu çalıştırırken bir hata oluştu!', ephemeral: true };

                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp(errorMessage);
                } else {
                    await interaction.reply(errorMessage);
                }
            }
        } else if (interaction.isButton()) {
            const { handleButtonInteraction } = require('../utils/buttonHandler');
            await handleButtonInteraction(interaction);
        }
    }
};
