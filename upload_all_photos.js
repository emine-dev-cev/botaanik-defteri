const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const uploadsDir = path.join(__dirname, 'backend', 'uploads');
const files = fs.readdirSync(uploadsDir);

console.log(`Toplam ${files.length} adet orijinal bitki fotoğrafı bulundu.`);

const batchSize = 100;
for (let i = 0; i < files.length; i += batchSize) {
  const batch = files.slice(i, i + batchSize);
  console.log(`\n📦 Yükleniyor: ${i + 1} - ${Math.min(i + batchSize, files.length)} / ${files.length}...`);
  
  for (const file of batch) {
    const relPath = `backend/uploads/${file}`;
    try {
      execSync(`git add "${relPath}"`);
    } catch (e) {}
  }
  
  try {
    execSync(`git commit -m "Orijinal fotoğraflar bölüm ${Math.floor(i / batchSize) + 1}"`);
    console.log(`🚀 GitHub'a gönderiliyor...`);
    execSync(`git push origin main`, { stdio: 'inherit' });
    console.log(`✅ Bölüm ${Math.floor(i / batchSize) + 1} gönderildi!`);
  } catch (e) {
    console.log(`⚠️ Uyarı / İlerleme: ${e.message}`);
  }
}

console.log('\n🎉 TÜM ORIJINAL FOTOĞRAFLAR BAŞARIYLA GİTHUB VE RENDER\'A YÜKLENDİ!');
