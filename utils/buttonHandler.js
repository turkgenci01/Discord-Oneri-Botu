const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');

async function handleButtonInteraction(interaction) {
    if (!interaction.member.permissions.has(PermissionFlagsBits.ManageMessages)) {
        return interaction.reply({ content: '❌ Bu butonu kullanmak için "Mesajları Yönet" yetkisine sahip olmalısınız!', ephemeral: true });
    }

    const message = interaction.message;
    const embed = message.embeds[0];

    if (!embed) {
        return interaction.reply({ content: '❌ Embed bulunamadı!', ephemeral: true });
    }

    try {
        if (interaction.customId === 'approve_suggestion') {
            const approvedEmbed = EmbedBuilder.from(embed)
                .setColor('#00FF00')
                .setTitle('✅ Öneri Onaylandı');

            await message.edit({ embeds: [approvedEmbed], components: [] });

            const threads = message.channel.threads.cache.filter(thread => thread.id === message.id || thread.ownerId === message.author?.id);

            let targetThread = null;
            if (threads.size > 0) {
                targetThread = threads.first();
            } else {
                const activeThreads = await message.channel.threads.fetchActive();
                const archivedThreads = await message.channel.threads.fetchArchived();

                const allThreads = [...activeThreads.threads.values(), ...archivedThreads.threads.values()];
                targetThread = allThreads.find(thread => {
                    return thread.name === '💬 Tartışma' &&
                           Math.abs(thread.createdTimestamp - message.createdTimestamp) < 5000;
                });
            }

            if (targetThread) {
                await targetThread.send('✅ **Bu öneri yetkililer tarafından onaylandı!**');
                await targetThread.setLocked(true);
                await targetThread.setArchived(true);
            }

            await interaction.reply({ content: '✅ Öneri başarıyla onaylandı!', ephemeral: true });

        } else if (interaction.customId === 'reject_suggestion') {
            const rejectedEmbed = EmbedBuilder.from(embed)
                .setColor('#FF0000')
                .setTitle('❌ Öneri Reddedildi');

            await message.edit({ embeds: [rejectedEmbed], components: [] });

            const threads = message.channel.threads.cache.filter(thread => thread.id === message.id || thread.ownerId === message.author?.id);

            let targetThread = null;
            if (threads.size > 0) {
                targetThread = threads.first();
            } else {
                const activeThreads = await message.channel.threads.fetchActive();
                const archivedThreads = await message.channel.threads.fetchArchived();

                const allThreads = [...activeThreads.threads.values(), ...archivedThreads.threads.values()];
                targetThread = allThreads.find(thread => {
                    return thread.name === '💬 Tartışma' &&
                           Math.abs(thread.createdTimestamp - message.createdTimestamp) < 5000;
                });
            }

            if (targetThread) {
                await targetThread.send('❌ **Bu öneri yetkililer tarafından reddedildi.**');
                await targetThread.setLocked(true);
                await targetThread.setArchived(true);
            }

            await interaction.reply({ content: '❌ Öneri başarıyla reddedildi!', ephemeral: true });
        }
    } catch (error) {
        console.error('Buton işleme hatası:', error);
        await interaction.reply({ content: '❌ Bir hata oluştu!', ephemeral: true });
    }
}

module.exports = {
    handleButtonInteraction
};
