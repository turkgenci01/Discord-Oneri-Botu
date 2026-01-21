# Discord Öneri Botu

Çoklu sunucu destekli, profesyonel Discord öneri botu. Genel öneriler ve kategori bazlı öneriler (müzik, film, dizi, kitap) için tam özellikli bir sistem.

## Özellikler

### Genel Öneri Sistemi
- Sunucu başına 5 genel öneri kanalı
- Otomatik embed formatında mesaj gönderimi
- Yetkili onay/red butonları
- Her öneri için otomatik tartışma thread'i
- Thread kilitleme ve arşivleme

### Kategori Öneri Sistemi
- Müzik önerileri
- Film önerileri
- Dizi önerileri
- Kitap önerileri
- Otomatik emoji reaksiyonları (👍 👎 🔥)

### Diğer Özellikler
- Çoklu sunucu desteği
- JSON tabanlı ayar yönetimi
- Dinamik bot durumu (10 saniyede bir değişir)
- Modüler ve temiz kod yapısı

## Kurulum

### Gereksinimler
- Node.js v16.9.0 veya üzeri
- Discord Bot Token
- Discord Application Client ID

### Adımlar

1. Projeyi klonlayın:
```bash
git clone <repo-url>
cd <proje-dizini>
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. `.env` dosyası oluşturun:
```bash
cp .env.example .env
```

4. `.env` dosyasını düzenleyin ve bilgilerinizi girin:
```env
DISCORD_TOKEN=your_bot_token_here
CLIENT_ID=your_client_id_here
```

5. Slash komutları kaydedin:
```bash
node deploy-commands.js
```

6. Botu başlatın:
```bash
node bot.js
```

## Discord Bot Oluşturma

1. [Discord Developer Portal](https://discord.com/developers/applications) adresine gidin
2. "New Application" butonuna tıklayın
3. Botunuza bir isim verin
4. Sol menüden "Bot" sekmesine gidin
5. "Add Bot" butonuna tıklayın
6. "Reset Token" ile token'ınızı alın
7. **Privileged Gateway Intents** bölümünden şunları aktif edin:
   - MESSAGE CONTENT INTENT
   - SERVER MEMBERS INTENT
   - PRESENCE INTENT

8. Sol menüden "OAuth2" > "URL Generator" sekmesine gidin
9. **Scopes** bölümünden şunları seçin:
   - `bot`
   - `applications.commands`

10. **Bot Permissions** bölümünden şunları seçin:
   - Send Messages
   - Manage Messages
   - Embed Links
   - Read Message History
   - Add Reactions
   - Create Public Threads
   - Send Messages in Threads
   - Manage Threads

11. Oluşan URL'yi kopyalayın ve tarayıcınızda açarak botu sunucunuza ekleyin

## Kullanım

### Genel Öneri Kanalları Ayarlama

```
/öneri-kanal-1 #kanal
/öneri-kanal-2 #kanal
/öneri-kanal-3 #kanal
/öneri-kanal-4 #kanal
/öneri-kanal-5 #kanal
```

### Kategori Öneri Kanalları Ayarlama

```
/müzik-öneri-kanal #kanal
/film-öneri-kanal #kanal
/dizi-öneri-kanal #kanal
/kitap-öneri-kanal #kanal
```

### Öneri Gönderme

Kullanıcılar ayarlanan kanallara normal mesaj yazarak öneri gönderebilir. Bot otomatik olarak:
- Mesajı siler
- Embed formatında yeniden gönderir
- Genel öneriler için butonlar ve thread ekler
- Kategori önerileri için emoji reaksiyonları ekler

### Yetkili İşlemleri

Genel önerilerde yetkililer (Mesajları Yönet yetkisi olan) şu butonları kullanabilir:
- ✅ Onayla: Öneriyi onaylar, embed yeşil olur, thread kilitlenir
- ❌ Reddet: Öneriyi reddeder, embed kırmızı olur, thread kilitlenir

## Proje Yapısı

```
.
├── bot.js                  # Ana bot dosyası
├── deploy-commands.js      # Slash komut kayıt scripti
├── commands/              # Slash komutlar
│   ├── öneri-kanal-1.js
│   ├── öneri-kanal-2.js
│   ├── öneri-kanal-3.js
│   ├── öneri-kanal-4.js
│   ├── öneri-kanal-5.js
│   ├── müzik-öneri-kanal.js
│   ├── film-öneri-kanal.js
│   ├── dizi-öneri-kanal.js
│   └── kitap-öneri-kanal.js
├── events/                # Event handler'lar
│   ├── interactionCreate.js
│   └── messageCreate.js
├── utils/                 # Yardımcı modüller
│   ├── configManager.js
│   ├── suggestionHandler.js
│   └── buttonHandler.js
└── config/               # Ayar dosyaları
    └── settings.json
```

## Teknik Detaylar

- **Dil:** JavaScript (Node.js)
- **Kütüphane:** discord.js v14
- **Komut Sistemi:** Slash Commands
- **Veri Depolama:** JSON
- **Özellikler:** Embed, Butonlar, Thread'ler, Reaksiyonlar

## Lisans

MIT

## Destek

Herhangi bir sorun veya öneri için issue açabilirsiniz.
