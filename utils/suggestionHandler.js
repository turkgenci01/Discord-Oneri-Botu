const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

async function handleGeneralSuggestion(message, client) {
    const content = message.content;
    const author = message.author;

    try {
        await message.delete();
    } catch (error) {
        console.error('Mesaj silme hatası:', error);
    }

    const embed = new EmbedBuilder()
        .setTitle('💡 Yeni Öneri')
        .setDescription(content)
        .setColor('#FFFFFF')
        .setFooter({ text: `Gönderen: ${author.tag}`, iconURL: author.displayAvatarURL() })
        .setTimestamp();

    const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('approve_suggestion')
                .setLabel('✅ Onayla')
                .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
                .setCustomId('reject_suggestion')
                .setLabel('❌ Reddet')
                .setStyle(ButtonStyle.Danger)
        );

    try {
        const sentMessage = await message.channel.send({ embeds: [embed], components: [row] });

        const thread = await sentMessage.startThread({
            name: '💬 Tartışma',
            autoArchiveDuration: 60
        });

        await thread.send(`Bu öneri hakkında görüşlerinizi paylaşabilirsiniz!`);
    } catch (error) {
        console.error('Öneri gönderme hatası:', error);
    }
}

async function handleCategorySuggestion(message, client, category) {
    const content = message.content;
    const author = message.author;

    try {
        await message.delete();
    } catch (error) {
        console.error('Mesaj silme hatası:', error);
    }

    const categoryTitles = {
        music: '🎵 Müzik Önerisi',
        movie: '🎬 Film Önerisi',
        series: '📺 Dizi Önerisi',
        book: '📚 Kitap Önerisi'
    };

    const embed = new EmbedBuilder()
        .setTitle(categoryTitles[category])
        .setDescription(content)
        .setColor('#FFFFFF')
        .setFooter({ text: `Gönderen: ${author.tag}`, iconURL: author.displayAvatarURL() })
        .setTimestamp();

    try {
        const sentMessage = await message.channel.send({ embeds: [embed] });

        await sentMessage.react('👍');
        await sentMessage.react('👎');
        await sentMessage.react('🔥');
    } catch (error) {
        console.error('Kategori önerisi gönderme hatası:', error);
    }
}

module.exports = {
    handleGeneralSuggestion,
    handleCategorySuggestion
};
