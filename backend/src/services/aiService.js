require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');

// Kullanıcının API anahtarında aktif olan ve başarıyla yanıt veren öncelikli modeller
const GEMINI_MODELS = [
  'gemini-flash-lite-latest',
  'gemini-3.5-flash-lite',
  'gemini-flash-latest',
  'gemini-3.1-flash-lite-preview',
  'gemini-3-flash-preview',
  'gemini-3.8-flash',
  'gemini-3.6-flash'
];

/**
 * Gemini Vision API ile bitki fotoğrafı ve el yazısı/kitap notlarını analiz eden servis.
 * Asla sahte/mock veri üretmez.
 */

const BOTANICAL_ANALYSIS_PROMPT = `
Sen uzman bir botanikçi, dendrolog ve el yazısı/metin tanıma (OCR) asistanısın.
Sana bir veya birden fazla bitki fotoğrafı, kitap sayfası veya el yazısı botanik saha notu gönderiliyor.

GÖREVİN:
1. GÖRSELLERDEKİ TÜM METİNLERİ (el yazıları, başlıklar, paragraflar, maddeler, kitap sayfaları) DİKKATLE OKU.
2. Fotoğraftaki bitkinin görünümünü incele ve tanımla.
3. KURAL: Fotoğraftaki el yazısı veya kitap notlarında yer alan bilgiler ile genel botanik bilgileri arasında çelişki varsa, KESİNLİKLE FOTOĞRAFTAKİ NOTLARA ÖNCELİK VER.
4. Fotoğrafta veya genel botanik literatüründe kesin olarak bilinemeyen veya bahsedilmeyen alanları uydurma. Bilinmeyen veya şüpheli alanlara null veya "Belirlenemedi" yaz.
5. Türkçe karakterleri doğru kullan.

ÇIKTI FORMATI:
SADECE ve SADECE aşağıdaki JSON şemasında saf JSON döndür (başka hiçbir açıklama, markdown tag'i vb. ekleme):
{
  "temel": {
    "turkish_name": "Bitkinin Türkçe Adı",
    "scientific_name": "Bitkinin Bilimsel / Latince Adı (Tür ve varsa varyete/kültivar)",
    "english_name": "İngilizce Adı (varsa)",
    "alternative_names": "Diğer bilinen adları / eş anlamlıları (varsa)",
    "family": "Familyası (Örn: Pinaceae, Rosaceae)",
    "genus": "Cinsi (Örn: Abies, Malus)",
    "description": "Bitkinin genel tanıtımı, özellikleri ve sahadan derlenen özet metin"
  },
  "fiziksel": {
    "physical_avg_height": "Ortalama boy (Örn: 20 - 35 metre, 0.5 - 2 metre)",
    "physical_avg_width": "Ortalama taç genişliği (varsa)",
    "physical_growth_form": "Büyüme formu (Örn: Piramidal tepeli ulu ağaç, Dikenli çalı)",
    "leaf_description": "Yaprak özellikleri (diziliş, şekil, renk, stoma bantları vb.)",
    "flower_description": "Çiçek özellikleri (erkek/dişi kurullar, taç yapraklar vb.)",
    "flower_color": "Çiçek rengi",
    "fruit_seed_info": "Meyve, kozalak veya tohum özellikleri (ebat, reçine, pul yapısı vb.)",
    "flowering_period": "Çiçeklenme veya kozalak olgunlaşma dönemi"
  },
  "habitat": {
    "origin": "Vatanı / Anavatanı (Örn: Türkiye ve Kafkaslar, Doğu Çin)",
    "natural_habitat": "Doğal yetişme ortamı",
    "regions": "Yayılış alanları",
    "climate_preference": "İklim tercihi ve dayanıklılığı",
    "placement": "İç mekân / Dış mekân / Bahçe / Park",
    "landscape_use": "Peyzaj ve çevre düzenleme kullanımı"
  },
  "bakim": {
    "light_need": "Işık ihtiyacı (Örn: Güneşli, Yarı gölge, Gölge)",
    "direct_sun_tolerance": "Direkt güneş toleransı",
    "semi_shade_tolerance": "Yarı gölge toleransı",
    "shade_tolerance": "Tam gölge toleransı",
    "watering_need": "Sulama ihtiyacı (Örn: Düzenli, Az, Orta)",
    "watering_summer": "Yaz sulaması",
    "watering_winter": "Kış sulaması",
    "watering_description": "Sulama detayları ve nem gereksinimi",
    "overwatering_risk": "Aşırı sulama riski",
    "excess_water_tolerance": "Fazla su toleransı",
    "drought_tolerance": "Kuraklık dayanıklılığı",
    "humidity_need": "Nem ihtiyacı",
    "humidity_ideal": "İdeal nem",
    "temperature_need": "Sıcaklık ihtiyacı",
    "temperature_min": null,
    "temperature_ideal": "İdeal sıcaklık",
    "temperature_max": null,
    "cold_tolerance": "Soğuğa / dona dayanıklılık derecesi (Örn: -30°C'ye dayanıklı)",
    "soil_type": "Toprak yapısı ve gereksinimi (Örn: Nemli, verimli, iyi drene derin topraklar)",
    "soil_ph": "Toprak pH tercihi",
    "drainage_need": "Drenaj ihtiyacı",
    "recommended_soil_mix": "Önerilen toprak karışımı",
    "fertilizing_info": "Gübreleme bilgisi",
    "fertilizing_frequency": "Gübreleme sıklığı",
    "pruning_need": "Budama ihtiyacı ve şekillendirme",
    "care_difficulty": 3
  },
  "kullanim": {
    "medical_use": "Tıbbi / fitoterapik kullanım",
    "traditional_use": "Geleneksel kullanım / halk hekimliği",
    "beekeeping_value": "Arıcılık ve bal üretimi önemi",
    "ornamental_use": "Süs ve dekoratif değeri",
    "landscape_use": "Peyzaj ve bahçe sanatında kullanım",
    "other_notes": "Kereste/odun değeri, ekolojik faydası, kuşlar için besin olma durumu vb."
  },
  "sorunlar": []
}
`;

/**
 * Görselleri Gemini Vision ile analiz eder.
 * @param {Array<{ buffer: Buffer, mimeType: string } | string>} images - Görsel buffer'ları veya dosya yolları
 * @returns {Promise<Object>} Analiz sonucu
 */
exports.analyzePlantImages = async (images) => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey.trim() === '' || apiKey === 'your_api_key_here' || apiKey === 'YOUR_KEY_HERE') {
    const error = new Error('Yapay zekâ bağlantısı yapılandırılmamış. Lütfen backend/.env dosyasında GEMINI_API_KEY anahtarınızı tanımlayın.');
    error.statusCode = 400;
    throw error;
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  // Desteklenen model listesi (sırayla denenir)
  const modelsToTry = GEMINI_MODELS;

  // Görsel partlarını hazırla
  const imageParts = [];
  const imageList = Array.isArray(images) ? images : [images];

  for (const item of imageList) {
    if (typeof item === 'string') {
      // Dosya yolu ise
      const fileBuffer = fs.readFileSync(item);
      const ext = item.split('.').pop().toLowerCase();
      let mimeType = 'image/jpeg';
      if (ext === 'png') mimeType = 'image/png';
      else if (ext === 'webp') mimeType = 'image/webp';
      else if (ext === 'gif') mimeType = 'image/gif';

      imageParts.push({
        inlineData: {
          data: fileBuffer.toString('base64'),
          mimeType,
        }
      });
    } else if (item && item.buffer) {
      imageParts.push({
        inlineData: {
          data: item.buffer.toString('base64'),
          mimeType: item.mimeType || 'image/jpeg',
        }
      });
    }
  }

  if (imageParts.length === 0) {
    const error = new Error('Analiz için en az bir geçerli görsel gereklidir.');
    error.statusCode = 400;
    throw error;
  }

  let lastError = null;

  for (const modelName of modelsToTry) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent`;
      const payload = {
        contents: [
          {
            parts: [
              { text: BOTANICAL_ANALYSIS_PROMPT },
              ...imageParts
            ]
          }
        ]
      };

      const apiRes = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey
        },
        body: JSON.stringify(payload)
      });

      const json = await apiRes.json();
      if (!apiRes.ok) {
        throw new Error(json.error?.message || `HTTP ${apiRes.status}`);
      }

      const text = json.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) {
        throw new Error('Yapay zekâ yanıtı boş döndü.');
      }

      // JSON bloğunu ayıkla
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Yapay zekâ yanıtında geçerli veri yapısı oluşturulamadı.');
      }

      const parsedData = JSON.parse(jsonMatch[0]);

      return {
        success: true,
        model: modelName,
        data: parsedData,
        raw: text
      };
    } catch (err) {
      console.warn(`Model ${modelName} denemesi başarısız oldu:`, err.message);
      lastError = err;
    }
  }

  throw new Error(`Bitki analizi sırasında hata oluştu: ${lastError?.message || 'Yapay zekâ servisine erişilemedi.'}`);
};

// Geriye dönük uyumluluk için alias
exports.identifyPlantFromImage = exports.analyzePlantImages;

/**
 * Herhangi bir bitki adını Gemini AI ile botanik ansiklopedisinden arar ve yeterli detaylı bilgi üretir.
 */
exports.searchPlantEncyclopedia = async (query) => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey.trim() === '' || apiKey === 'your_api_key_here') {
    const error = new Error('Yapay zekâ bağlantısı yapılandırılmamış. Lütfen backend/.env dosyasında GEMINI_API_KEY anahtarınızı tanımlayın.');
    error.statusCode = 400;
    throw error;
  }

  const prompt = `
Sen kıdemli bir botanikçi, peyzaj mimarı ve dendroloji uzmanısın.
Kullanıcı "${query}" isimli bitkiyi arıyor ve bu bitki hakkında tam, doğru ve yeterli bakım/yetiştirme bilgisi istiyor.

GÖREVİN:
"${query}" bitkisinin botanik kimliğini doğrula ve iklim, toprak, güneş/ışık, sulama, budama, kullanım ve püf noktalarını içeren kapsamlı ve doyurucu bir botanik rehberi hazırla.

ÇIKTI FORMATI:
SADECE aşağıdaki JSON şemasında saf JSON döndür (başka hiçbir metin veya markdown etiketi olmadan):
{
  "turkish_name": "Bitkinin yaygın Türkçe adı",
  "scientific_name": "Bilimsel / Latince adı (Tür ve varsa varyete)",
  "family": "Familyası (Örn: Pinaceae, Rosaceae)",
  "genus": "Cinsi",
  "alternative_names": "Diğer bilinen adları / eş anlamlıları",
  "description": "Bitkinin genel tanıtımı, özellikleri, yaprak ve büyüme formu hakkında 2-3 paragraflık detaylı ve doyurucu bilgi.",
  "physical_summary": "Ortalama boy, genişlik ve büyüme formu (Örn: 3-5 metre boy, çalımsı form)",
  "climate_preference": "Hangi iklimi sever, kuraklığa ve rüzgara dayanımı",
  "temperature_min": -15,
  "cold_tolerance_desc": "Soğuk ve don dayanımı açıklaması (Örn: -15°C'ye kadar kış donlarına dayanıklıdır)",
  "soil_type": "Hangi toprak yapısında yetişir (Kireçli, kumlu, killi, drenaj ihtiyacı, ideal toprak karışımı)",
  "soil_ph": "İdeal toprak pH değeri",
  "light_need": "Güneş ve ışık ihtiyacı (Tam güneş, yarı gölge veya gölge gereksinimi)",
  "direct_sun_hours": "Önerilen doğrudan güneş alma süresi (Örn: Günde en az 6 saat doğrudan güneş)",
  "watering_need": "Sulama ihtiyacı ve sıklığı (Yazın ve kışın nasıl sulanmalı, kuraklık toleransı)",
  "humidity_need": "Havadaki nem ihtiyacı",
  "placement": "Mekân uygunluğu (Bahçe, park, geniş balkon, teras, salon/iç mekân saksısı)",
  "pruning_info": "Budama zamanı, sıklığı ve nasıl yapılması gerektiği",
  "fertilizing_info": "Gübreleme ve besin takviyesi zamanı",
  "usage_and_benefits": "Peyzajda kullanım alanı, şifalı/fitoterapik veya süs değeri, arıcılık/meyve önemi",
  "care_difficulty": 3,
  "care_tips": [
    "Işık ve Konumlandırma İpucu",
    "Toprak ve Drenaj İpucu",
    "Sulama ve Kış Bakımı İpucu"
  ]
}
`;

  const modelsToTry = GEMINI_MODELS;
  let lastError = null;

  for (const modelName of modelsToTry) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent`;
      const payload = {
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      };

      const apiRes = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey
        },
        body: JSON.stringify(payload)
      });

      const json = await apiRes.json();
      if (!apiRes.ok) {
        throw new Error(json.error?.message || `HTTP ${apiRes.status}`);
      }

      const text = json.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) {
        throw new Error('Yapay zekâ yanıtı boş döndü.');
      }

      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Yapay zekâ yanıtında geçerli veri yapısı oluşturulamadı.');
      }

      const parsedData = JSON.parse(jsonMatch[0]);

      return {
        success: true,
        model: modelName,
        data: parsedData
      };
    } catch (err) {
      console.warn(`Model ${modelName} denemesi başarısız oldu:`, err.message);
      lastError = err;
    }
  }

  throw new Error(`Botanik ansiklopedi servisi çalışırken hata oluştu: ${lastError?.message || 'Yapay zekâ servisine erişilemedi.'}`);
};

/**
 * İklim, toprak, güneş ve mekân verilerine göre yapay zekâ destekli botanik tavsiyesi üretir.
 */
exports.getPlantRecommendations = async ({ climate, soil, light, placement, watering, question, existingPlants }) => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey.trim() === '' || apiKey === 'your_api_key_here') {
    const error = new Error('Yapay zekâ bağlantısı yapılandırılmamış.');
    error.statusCode = 400;
    throw error;
  }

  const catalogSummary = (existingPlants || []).slice(0, 36).map(p => ({
    id: p.id,
    name: p.turkish_name || p.scientific_name,
    scientific: p.scientific_name,
    family: p.family,
    climate: p.habitat?.climate_preference,
    placement: p.habitat?.placement,
    light: p.care?.light_need,
    soil: p.care?.soil_type,
    watering: p.care?.watering_need,
    temp_min: p.care?.temperature_min
  }));

  const prompt = `
Sen peyzaj mimarlığı, tarım ve dendroloji alanında uzman kıdemli bir botanik danışmanısın.
Kullanıcı alanının çevre koşullarını belirterek (iklim, toprak, güneş/ışık, mekân) en uygun bitki önerilerini ve bakım ipuçlarını talep ediyor.

KULLANICI TALEBİ VE ÇEVRESEL KOŞULLAR:
- İklim Koşulu: ${climate || 'Belirtilmedi / Genel'}
- Toprak Türü: ${soil || 'Belirtilmedi / Genel'}
- Güneş / Işık Durumu: ${light || 'Belirtilmedi / Genel'}
- Mekân / Alan Türü: ${placement || 'Belirtilmedi'}
- Sulama İmkanı: ${watering || 'Belirtilmedi'}
${question ? `- Kullanıcının Özel Notu / Sorusu: "${question}"` : ''}

MEVCUT VERİTABANIMIZDAKİ BİTKİLER (Referans ve eşleştirme için):
${JSON.stringify(catalogSummary, null, 2)}

GÖREVİN:
1. Bu çevre koşullarına en uygun bitkileri belirle. Öncelikle mevcut veritabanımızdaki en uyumlu bitkileri seç (ID ve isimleriyle) ve neden uyduklarını gerekçelendir. Varsa bu koşullara çok yakışacak 1-2 ek botanik önerisi de ekleyebilirsin.
2. Bu toprak türünün iyileştirilmesi, drenajı, havalandırılması ve besin yönetimi için pratik öneriler sun.
3. Güneşlenme ve sulama planı hazırla.
4. Dikim zamanı ve mevsimsel koruma adımlarını özetle.

ÇIKTI FORMATI:
SADECE aşağıdaki JSON formatında geçerli bir JSON döndür:
{
  "summary": "Koşulların genel analizi ve bitki seçimi stratejisi hakkında 2-3 cümlelik uzman özeti.",
  "top_matches": [
    {
      "plant_id": "varsa veritabanındaki id yoksa null",
      "turkish_name": "Bitki Türkçe Adı",
      "scientific_name": "Bilimsel Latince Adı",
      "match_score": 95,
      "why_suitable": "Bu iklim, toprak ve güneşe neden tam uyum sağladığının net botanik açıklaması.",
      "planting_tip": "Dikim ve konumlandırma için püf nokta."
    }
  ],
  "soil_recommendations": "Toprak yapısını iyileştirme (kompost, drenaj, organik madde vb.) önerileri.",
  "sun_and_watering_advice": "Işık durumu ve sulama sıklığı için profesyonel tavsiye.",
  "seasonal_guidelines": "Hangi ayda dikilmeli, kış/yaz koruması nasıl yapılmalı."
}
`;

  const modelsToTry = GEMINI_MODELS;
  let lastError = null;

  for (const modelName of modelsToTry) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent`;
      const payload = {
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      };

      const apiRes = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey
        },
        body: JSON.stringify(payload)
      });

      const json = await apiRes.json();
      if (!apiRes.ok) {
        throw new Error(json.error?.message || `HTTP ${apiRes.status}`);
      }

      const text = json.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) {
        throw new Error('Yapay zekâ yanıtı boş döndü.');
      }

      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Yapay zekâ yanıtında geçerli veri yapısı oluşturulamadı.');
      }

      const parsedData = JSON.parse(jsonMatch[0]);

      return {
        success: true,
        model: modelName,
        data: parsedData
      };
    } catch (err) {
      console.warn(`Model ${modelName} denemesi başarısız oldu:`, err.message);
      lastError = err;
    }
  }

  throw new Error(`Botanik tavsiye servisi çalışırken hata oluştu: ${lastError?.message || 'Yapay zekâ servisine erişilemedi.'}`);
};

