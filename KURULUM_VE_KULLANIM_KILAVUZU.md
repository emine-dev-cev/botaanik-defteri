# 🌸 Sunsiree Bitki Dünyası - Kurulum ve Kullanım Kılavuzu

Bu proje, yapay zekâ destekli bitki bakım ve tanıma asistanı web uygulamasıdır. Proje **Next.js (Frontend)** ve **Express.js + Prisma SQLite (Backend)** mimarisiyle çalışır.

---

## 🚀 Hızlı Başlangıç (En Kolay Yöntem)

Projeyi çalıştırmak için teknik bilgiye gerek yoktur:

1. Bilgisayarınızda **[Node.js](https://nodejs.org/)** kurulu olduğundan emin olun (Önerilen: v18 veya üstü LTS sürümü).
2. Proje ana klasöründeki **`BASLAT.bat`** dosyasına çift tıklayın.
3. Script otomatik olarak:
   - Gerekli kütüphaneleri kontrol eder (eksikse otomatik kurar).
   - Backend sunucusunu (`http://localhost:3001`) başlatır.
   - Frontend arayüzünü (`http://localhost:3000`) başlatır.
   - Tarayıcınızı açarak uygulamayı karşınıza getirir.

---

## ⚙️ Manuel Kurulum ve Çalıştırma (Geliştiriciler İçin)

Eğer projeyi komut satırından adım adım çalıştırmak isterseniz:

### 1. Backend Hazırlığı
```bash
cd backend
npm install
npx prisma generate
npm run dev
```
> Backend varsayılan olarak **`http://localhost:3001`** portunda çalışır.

### 2. Frontend Hazırlığı (Ayrı bir terminalde)
```bash
cd frontend
npm install
npm run dev
```
> Frontend varsayılan olarak **`http://localhost:3000`** portunda çalışır.

---

## 📁 Proje Mimarisi

- **`frontend/`**: Next.js, React, Tailwind CSS ve Lucide ikonlarıyla oluşturulmuş kullanıcı arayüzü.
- **`backend/`**: Node.js, Express, SQLite (Prisma ORM) ve Google Gemini AI entegrasyonuna sahip API servisi.
  - `backend/prisma/dev.db`: SQLite veritabanı (mevcut bitki ve bakım verilerini barındırır).
  - `backend/.env`: Port ve API anahtarı ayarları.
  - `backend/uploads/`: Yüklenen bitki fotoğraflarının saklandığı klasör.
- **`BASLAT.bat`**: Windows için taşınabilir tek tıkla başlatıcı scripti.

---

## 🔑 Çevre Değişkenleri (.env)

`backend/.env` dosyası aşağıdaki temel değişkenleri barındırır:
```env
DATABASE_URL="file:./dev.db"
PORT=3001
GEMINI_API_KEY=AI_ANAHTARINIZ
```
*Not: Bitki tanıma ve yapay zeka analizlerinin çalışması için geçerli bir Google Gemini API anahtarı tanımlanmış olmalıdır.*

---

## ❓ Sık Karşılaşılan Sorunlar ve Çözümleri

1. **"Node.js kurulu bulunamadı" hatası:**
   - https://nodejs.org/ adresinden Node.js indirip kurun ve bilgisayarınızı yeniden başlatın.

2. **Port Çakışması (3000 veya 3001 dolu):**
   - Açık olan eski terminal pencerelerini veya arka planda kalan Node işlemlerini Görev Yöneticisi'nden kapatıp `BASLAT.bat`'ı tekrar çalıştırın.
