require('dotenv').config();
const app = require('./src/app');
const https = require('https');
const http = require('http');

const PORT = process.env.PORT || 3001;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Sunucu http://0.0.0.0:${PORT} adresinde çalışıyor...`);

  // ⚡ Render ücretsiz sunucusunu uykuya dalmaktan korumak için 10 dakikada bir self-ping
  const SELF_URL = process.env.RENDER_EXTERNAL_URL || `http://localhost:${PORT}`;
  setInterval(() => {
    try {
      const url = new URL(`${SELF_URL}/api/health`);
      const client = url.protocol === 'https:' ? https : http;
      client.get(url.href, (res) => {
        console.log(`[Keep-Alive] Ping: ${res.statusCode}`);
      }).on('error', () => {});
    } catch (e) {}
  }, 10 * 60 * 1000); // Her 10 dakikada bir
});
