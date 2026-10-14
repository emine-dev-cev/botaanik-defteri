const prisma = require('../models/prisma');
const aiService = require('../services/aiService');

// Bütün bitkileri listele
exports.getAllPlants = async (req, res) => {
  try {
    const { q } = req.query;
    
    let where = {};
    if (q && q.trim()) {
      const searchTerm = q.trim();
      where = {
        OR: [
          { turkish_name: { contains: searchTerm } },
          { scientific_name: { contains: searchTerm } },
          { english_name: { contains: searchTerm } },
          { alternative_names: { contains: searchTerm } },
          { family: { contains: searchTerm } },
          { genus: { contains: searchTerm } }
        ]
      };
    }

    const plants = await prisma.plant.findMany({
      where,
      orderBy: { created_at: 'desc' },
      include: {
        safety: true,
        care: true,
        habitat: true,
        usage: true,
        problems: true,
        images: true
      }
    });

    res.json(plants);
  } catch (error) {
    console.error('Bitkiler listelenirken hata:', error);
    res.status(500).json({ error: 'Bitkiler getirilirken bir hata oluştu.' });
  }
};

// Belirli bir bitkinin detaylarını getir
exports.getPlantById = async (req, res) => {
  try {
    const { id } = req.params;
    const plant = await prisma.plant.findUnique({
      where: { id },
      include: {
        care: true,
        habitat: true,
        usage: true,
        safety: true,
        problems: true,
        images: true
      }
    });

    if (!plant) {
      return res.status(404).json({ error: 'Bitki bulunamadı.' });
    }

    res.json(plant);
  } catch (error) {
    console.error('Bitki detay hatası:', error);
    res.status(500).json({ error: 'Bitki detayları getirilirken bir hata oluştu.' });
  }
};

// Yeni bitki oluştur
exports.createPlant = async (req, res) => {
  try {
    const {
      scientific_name, turkish_name, english_name, alternative_names,
      family, genus, description,
      physical_avg_height, physical_avg_width, physical_growth_form,
      leaf_description, flower_description, flower_color,
      fruit_seed_info, flowering_period,
      care, habitat, usage, safety, problems, images
    } = req.body;

    if (!scientific_name || !scientific_name.trim()) {
      return res.status(400).json({ error: 'Bitkinin bilimsel adı zorunludur.' });
    }

    // Temizle ve oluştur
    const plant = await prisma.plant.create({
      data: {
        scientific_name: scientific_name.trim(),
        turkish_name: turkish_name ? turkish_name.trim() : null,
        english_name: english_name ? english_name.trim() : null,
        alternative_names: alternative_names ? alternative_names.trim() : null,
        family: family ? family.trim() : null,
        genus: genus ? genus.trim() : null,
        description: description ? description.trim() : null,
        physical_avg_height: physical_avg_height || null,
        physical_avg_width: physical_avg_width || null,
        physical_growth_form: physical_growth_form || null,
        leaf_description: leaf_description || null,
        flower_description: flower_description || null,
        flower_color: flower_color || null,
        fruit_seed_info: fruit_seed_info || null,
        flowering_period: flowering_period || null,
        ...(care && { care: { create: cleanObject(care) } }),
        ...(habitat && { habitat: { create: cleanObject(habitat) } }),
        ...(usage && { usage: { create: cleanObject(usage) } }),
        ...(safety && { safety: { create: cleanObject(safety) } }),
        ...(problems && Array.isArray(problems) && problems.length > 0 && {
          problems: {
            create: problems.filter(p => p && (p.problem_name || p.problem_type)).map(p => cleanObject(p))
          }
        }),
        ...(images && Array.isArray(images) && images.length > 0 && {
          images: {
            create: images.map(img => typeof img === 'string' ? { image_url: img } : { image_url: img.image_url, image_type: img.image_type || 'gallery' })
          }
        })
      },
      include: { care: true, habitat: true, usage: true, safety: true, problems: true, images: true }
    });

    res.status(201).json(plant);
  } catch (error) {
    console.error('Bitki oluşturma hatası:', error);
    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'Bu bilimsel ada sahip bir bitki zaten mevcut.' });
    }
    res.status(500).json({ error: 'Bitki oluşturulurken hata oluştu: ' + error.message });
  }
};

// Bitki güncelle
exports.updatePlant = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      scientific_name, turkish_name, english_name, alternative_names,
      family, genus, description,
      physical_avg_height, physical_avg_width, physical_growth_form,
      leaf_description, flower_description, flower_color,
      fruit_seed_info, flowering_period,
      care, habitat, usage, safety, problems, images
    } = req.body;

    const plant = await prisma.plant.update({
      where: { id },
      data: {
        ...(scientific_name && { scientific_name: scientific_name.trim() }),
        turkish_name: turkish_name !== undefined ? (turkish_name ? turkish_name.trim() : null) : undefined,
        english_name: english_name !== undefined ? (english_name ? english_name.trim() : null) : undefined,
        alternative_names: alternative_names !== undefined ? (alternative_names ? alternative_names.trim() : null) : undefined,
        family: family !== undefined ? (family ? family.trim() : null) : undefined,
        genus: genus !== undefined ? (genus ? genus.trim() : null) : undefined,
        description: description !== undefined ? (description ? description.trim() : null) : undefined,
        physical_avg_height: physical_avg_height !== undefined ? physical_avg_height : undefined,
        physical_avg_width: physical_avg_width !== undefined ? physical_avg_width : undefined,
        physical_growth_form: physical_growth_form !== undefined ? physical_growth_form : undefined,
        leaf_description: leaf_description !== undefined ? leaf_description : undefined,
        flower_description: flower_description !== undefined ? flower_description : undefined,
        flower_color: flower_color !== undefined ? flower_color : undefined,
        fruit_seed_info: fruit_seed_info !== undefined ? fruit_seed_info : undefined,
        flowering_period: flowering_period !== undefined ? flowering_period : undefined,
        ...(care && {
          care: {
            upsert: {
              create: cleanObject(care),
              update: cleanObject(care)
            }
          }
        }),
        ...(habitat && {
          habitat: {
            upsert: {
              create: cleanObject(habitat),
              update: cleanObject(habitat)
            }
          }
        }),
        ...(usage && {
          usage: {
            upsert: {
              create: cleanObject(usage),
              update: cleanObject(usage)
            }
          }
        }),
        ...(safety && {
          safety: {
            upsert: {
              create: cleanObject(safety),
              update: cleanObject(safety)
            }
          }
        })
      },
      include: { care: true, habitat: true, usage: true, safety: true, problems: true, images: true }
    });

    // Eğer yeni resimler yollandıysa güncelle
    if (images && Array.isArray(images) && images.length > 0) {
      await prisma.plantImage.deleteMany({ where: { plant_id: id } });
      for (const img of images) {
        const url = typeof img === 'string' ? img : img.image_url;
        const type = typeof img === 'object' ? img.image_type || 'gallery' : 'gallery';
        if (url) {
          await prisma.plantImage.create({
            data: { plant_id: id, image_url: url, image_type: type }
          });
        }
      }
    }

    const updated = await prisma.plant.findUnique({
      where: { id },
      include: { care: true, habitat: true, usage: true, safety: true, problems: true, images: true }
    });

    res.json(updated);
  } catch (error) {
    console.error('Bitki güncelleme hatası:', error);
    res.status(500).json({ error: 'Bitki güncellenirken hata oluştu.' });
  }
};

// Bitki sil
exports.deletePlant = async (req, res) => {
  try {
    const { id } = req.params;

    // Bağımlı kayıtları temizle
    await prisma.$transaction([
      prisma.plantCare.deleteMany({ where: { plant_id: id } }),
      prisma.plantHabitat.deleteMany({ where: { plant_id: id } }),
      prisma.plantUsage.deleteMany({ where: { plant_id: id } }),
      prisma.plantSafety.deleteMany({ where: { plant_id: id } }),
      prisma.plantProblem.deleteMany({ where: { plant_id: id } }),
      prisma.plantImage.deleteMany({ where: { plant_id: id } }),
      prisma.plant.delete({ where: { id } })
    ]);

    res.json({ success: true, message: 'Bitki ve tüm notları başarıyla silindi.' });
  } catch (error) {
    console.error('Bitki silme hatası:', error);
    res.status(500).json({ error: 'Bitki silinirken hata oluştu.' });
  }
};

// Yardımcı: Objedeki boş string veya tanımsız değerleri temizle
function cleanObject(obj) {
  if (!obj || typeof obj !== 'object') return {};
  const cleaned = {};
  for (const [key, value] of Object.entries(obj)) {
    if (key === 'id' || key === 'plant_id') continue;
    if (value !== undefined && value !== null) {
      if (typeof value === 'string' && value.trim() === '') {
        cleaned[key] = null;
      } else {
        cleaned[key] = value;
      }
    }
  }
  return cleaned;
}

/**
 * İklim, toprak, güneş, mekân ve sulama kriterlerine göre bitkileri puanlar ve sıralar.
 */
exports.recommendPlants = async (req, res) => {
  try {
    const { climate, soil, light, placement, watering, minScore } = req.body || req.query || {};

    const plants = await prisma.plant.findMany({
      include: {
        safety: true,
        care: true,
        habitat: true,
        usage: true,
        problems: true,
        images: true
      }
    });

    const evaluated = plants.map(plant => {
      const result = evaluatePlantCompatibility(plant, { climate, soil, light, placement, watering });
      return {
        ...plant,
        matchScore: result.score,
        matchReasons: result.reasons
      };
    });

    const threshold = minScore ? parseInt(minScore, 10) : 40;
    const filtered = evaluated
      .filter(p => p.matchScore >= threshold)
      .sort((a, b) => b.matchScore - a.matchScore);

    res.json({
      filters: { climate, soil, light, placement, watering },
      totalFound: filtered.length,
      plants: filtered
    });
  } catch (error) {
    console.error('Bitki eşleştirme hatası:', error);
    res.status(500).json({ error: 'Bitki eşleştirmesi yapılırken bir hata oluştu.' });
  }
};

/**
 * Gemini AI ile çevre koşullarına özel derinlemesine botanik danışmanlığı üretir.
 */
exports.getAiPlantAdvice = async (req, res) => {
  try {
    const { climate, soil, light, placement, watering, question } = req.body;

    // Veritabanındaki bitkileri referans olarak çek
    const existingPlants = await prisma.plant.findMany({
      include: {
        habitat: true,
        care: true
      }
    });

    const advice = await aiService.getPlantRecommendations({
      climate,
      soil,
      light,
      placement,
      watering,
      question,
      existingPlants
    });

    res.json(advice);
  } catch (error) {
    console.error('Yapay zeka bitki tavsiye hatası:', error);
    res.status(500).json({ error: error.message || 'Yapay zekâ botanik danışmanı yanıt veremedi.' });
  }
};

/**
 * Herhangi bir bitkiyi hem veritabanında hem de yapay zekâ ansiklopedisinde arar.
 */
exports.searchAnyPlant = async (req, res) => {
  try {
    const query = (req.query.q || req.body?.query || '').trim();
    if (!query) {
      return res.status(400).json({ error: 'Arama terimi girilmedi.' });
    }

    // 1. Veritabanındaki eşleşmeleri bul
    const localPlants = await prisma.plant.findMany({
      where: {
        OR: [
          { turkish_name: { contains: query } },
          { scientific_name: { contains: query } },
          { english_name: { contains: query } },
          { alternative_names: { contains: query } },
          { family: { contains: query } },
          { genus: { contains: query } }
        ]
      },
      include: {
        care: true,
        habitat: true,
        usage: true,
        safety: true,
        images: true
      }
    });

    const forceAi = req.query.ai === 'true' || req.body?.forceAi === true;

    // Eğer veritabanında eşleşen varsa ve yapay zekâ zorlanmadıysa
    if (localPlants.length > 0 && !forceAi) {
      return res.json({
        query,
        source: 'database',
        count: localPlants.length,
        plants: localPlants
      });
    }

    // 2. Veritabanında yoksa veya özellikle yapay zekâ arandıysa
    const aiResult = await aiService.searchPlantEncyclopedia(query);
    return res.json({
      query,
      source: 'ai_encyclopedia',
      plant: aiResult.data,
      localMatches: localPlants
    });
  } catch (error) {
    console.error('Ansiklopedik bitki arama hatası:', error);
    res.status(500).json({ error: error.message || 'Bitki aranırken bir hata oluştu.' });
  }
};

/**
 * Doğrudan Yapay Zekâ Botanik Ansiklopedisi ile arar.
 */
exports.aiPlantLookup = async (req, res) => {
  try {
    const query = (req.body?.query || req.query.q || '').trim();
    if (!query) {
      return res.status(400).json({ error: 'Arama terimi girilmedi.' });
    }

    const aiResult = await aiService.searchPlantEncyclopedia(query);
    res.json(aiResult);
  } catch (error) {
    console.error('Yapay zeka arama hatası:', error);
    res.status(500).json({ error: error.message || 'Yapay zekâ ansiklopedisi yanıt veremedi.' });
  }
};

/**
 * Yapay zekâ tarafından bulunan bitkiyi tek tıkla veritabanı koleksiyonuna kaydeder.
 */
exports.saveAiPlantToCatalog = async (req, res) => {
  try {
    const p = req.body;
    if (!p || !p.scientific_name) {
      return res.status(400).json({ error: 'Geçersiz bitki verisi. Bilimsel ad zorunludur.' });
    }

    // Mevcut mu kontrol et
    const existing = await prisma.plant.findUnique({
      where: { scientific_name: p.scientific_name.trim() },
      include: { care: true, habitat: true, usage: true, images: true }
    });

    if (existing) {
      return res.json({ success: true, plant: existing, alreadyExisted: true });
    }

    const created = await prisma.plant.create({
      data: {
        scientific_name: p.scientific_name.trim(),
        turkish_name: p.turkish_name ? p.turkish_name.trim() : null,
        family: p.family ? p.family.trim() : null,
        genus: p.genus ? p.genus.trim() : null,
        alternative_names: p.alternative_names ? p.alternative_names.trim() : null,
        description: p.description ? p.description.trim() : null,
        physical_growth_form: p.physical_summary || null,
        care: {
          create: {
            light_need: p.light_need || null,
            watering_need: p.watering_need || null,
            soil_type: p.soil_type || null,
            soil_ph: p.soil_ph || null,
            temperature_min: typeof p.temperature_min === 'number' ? p.temperature_min : null,
            cold_tolerance: p.cold_tolerance_desc || null,
            pruning_need: p.pruning_info || null,
            fertilizing_info: p.fertilizing_info || null,
            care_difficulty: typeof p.care_difficulty === 'number' ? p.care_difficulty : 3
          }
        },
        habitat: {
          create: {
            climate_preference: p.climate_preference || null,
            placement: p.placement || null
          }
        },
        usage: {
          create: {
            ornamental_use: p.usage_and_benefits || null,
            other_notes: Array.isArray(p.care_tips) ? p.care_tips.join(' • ') : null
          }
        }
      },
      include: {
        care: true,
        habitat: true,
        usage: true,
        images: true
      }
    });

    res.status(201).json({ success: true, plant: created });
  } catch (error) {
    console.error('AI bitkisi kaydetme hatası:', error);
    res.status(500).json({ error: 'Bitki kaydedilirken hata oluştu: ' + error.message });
  }
};

/**
 * Botanik Eşleştirme ve Uygunluk Puanlama Motoru
 */
function evaluatePlantCompatibility(plant, filters) {
  const { climate, soil, light, placement, watering } = filters;
  let totalWeight = 0;
  let totalScore = 0;
  const reasons = [];

  const climateText = `${plant.habitat?.climate_preference || ''} ${plant.habitat?.regions || ''} ${plant.description || ''}`.toLowerCase();
  const soilText = `${plant.care?.soil_type || ''} ${plant.care?.recommended_soil_mix || ''} ${plant.care?.drainage_need || ''}`.toLowerCase();
  const lightText = `${plant.care?.light_need || ''} ${plant.care?.direct_sun_tolerance || ''} ${plant.care?.semi_shade_tolerance || ''} ${plant.care?.shade_tolerance || ''}`.toLowerCase();
  const wateringText = `${plant.care?.watering_need || ''} ${plant.care?.drought_tolerance || ''} ${plant.care?.watering_description || ''}`.toLowerCase();
  const placementText = `${plant.habitat?.placement || ''} ${plant.habitat?.landscape_use || ''}`.toLowerCase();
  const tempMin = plant.care?.temperature_min;

  // 1. İKLİM UYUMU (Ağırlık: 30)
  if (climate && climate !== 'all') {
    totalWeight += 30;
    let cScore = 50;
    let cReason = '';

    if (climate === 'akdeniz') {
      if (climateText.includes('akdeniz') || climateText.includes('sahil') || climateText.includes('ege') || climateText.includes('sıcak')) {
        cScore = 100;
        cReason = 'Akdeniz ve sahil iklimine tam uyumlu; yaz kuraklığına ve sıcaklığa dayanıklı.';
      } else if (tempMin !== null && tempMin !== undefined && tempMin >= -15) {
        cScore = 80;
        cReason = 'Ilıman kışlara ve Akdeniz kuşağına iyi uyum sağlar.';
      } else {
        cScore = 50;
        cReason = 'Geniş iklim toleransına sahip; Akdeniz koşullarında da yetişebilir.';
      }
    } else if (climate === 'karasal') {
      if (climateText.includes('karasal') || climateText.includes('don') || climateText.includes('soğuk') || (tempMin !== null && tempMin <= -20)) {
        cScore = 100;
        cReason = `Sert karasal iklime mükemmel uyumlu (${tempMin !== null ? tempMin + "°C'ye kadar don dayanımı" : 'yüksek don toleransı'}).`;
      } else if (tempMin !== null && tempMin <= -15) {
        cScore = 80;
        cReason = 'Karasal iklimin soğuk kışlarına dayanıklıdır.';
      } else if (tempMin !== null && tempMin > -10) {
        cScore = 20;
        cReason = 'Dona duyarlıdır; karasal kış koşullarında dondan korunmalıdır.';
      } else {
        cScore = 50;
      }
    } else if (climate === 'karadeniz') {
      if (climateText.includes('karadeniz') || climateText.includes('nemli') || climateText.includes('yağış') || climateText.includes('serin dağ') || soilText.includes('asidik')) {
        cScore = 100;
        cReason = 'Bol yağışlı ve yüksek nemli Karadeniz / ılıman dağ iklimini çok sever.';
      } else if (!climateText.includes('kurak')) {
        cScore = 75;
        cReason = 'Ilıman ve nemli bölgelerde sağlıklı gelişim gösterir.';
      } else {
        cScore = 50;
      }
    } else if (climate === 'marmara') {
      if (tempMin === null || tempMin <= -10) {
        cScore = 95;
        cReason = 'Marmara geçiş ikliminin ılıman ve dört mevsim döngüsüne mükemmel adapte olur.';
      } else {
        cScore = 70;
      }
    } else if (climate === 'kurak') {
      if (climateText.includes('kurak') || wateringText.includes('kurak') || wateringText.includes('az') || climateText.includes('yangın') || climateText.includes('çöl')) {
        cScore = 100;
        cReason = 'Kurak ve yarı kurak koşullara, az suya ve yüksek buharlaşmaya tam dirençli.';
      } else if (wateringText.includes('orta')) {
        cScore = 65;
      } else {
        cScore = 30;
      }
    } else if (climate === 'subtropikal') {
      if (climateText.includes('subtropikal') || climateText.includes('sıcak ılıman') || placementText.includes('iç mekân') || placementText.includes('kış bahçesi')) {
        cScore = 100;
        cReason = 'Subtropikal, kış bahçesi veya ılıman sahil koşullarına mükemmel uyumlu.';
      } else {
        cScore = 60;
      }
    }
    totalScore += (cScore * 30) / 100;
    if (cReason) reasons.push({ type: 'climate', text: cReason });
  }

  // 2. TOPRAK UYUMU (Ağırlık: 30)
  if (soil && soil !== 'all') {
    totalWeight += 30;
    let sScore = 60;
    let sReason = '';

    if (soil === 'kirecli') {
      if (soilText.includes('kireç') || soilText.includes('kalker') || soilText.includes('bazik') || soilText.includes('her türlü')) {
        sScore = 100;
        sReason = 'Kireçli ve kalkerli topraklarda kök gelişimi mükemmeldir.';
      } else if (soilText.includes('asidik')) {
        sScore = 30;
        sReason = 'Asidik toprak tercih eder; kireçli toprakta kloroza yatkın olabilir.';
      } else {
        sScore = 70;
        sReason = 'Drenaj sağlandığında kireçli bahçe topraklarına adapte edilebilir.';
      }
    } else if (soil === 'kumlu') {
      if (soilText.includes('kum') || soilText.includes('kumul') || soilText.includes('süzek') || soilText.includes('hafif')) {
        sScore = 100;
        sReason = 'Kumlu ve süzek topraklara bayılır; aşırı suyu çabuk tahliye eder.';
      } else if (soilText.includes('her türlü')) {
        sScore = 90;
        sReason = 'Kumlu toprak dahil birçok toprak türüne kolayca adapte olur.';
      } else {
        sScore = 60;
      }
    } else if (soil === 'killi') {
      if (soilText.includes('kil') || soilText.includes('balçık') || soilText.includes('ağır') || soilText.includes('her türlü')) {
        sScore = 100;
        sReason = 'Killi ve sıkı topraklarda güçlü köklenme sağlayabilir.';
      } else if (soilText.includes('kum') && !soilText.includes('kil')) {
        sScore = 40;
        sReason = 'Ağır killi topraklarda drenajın kum/kompost ile iyileştirilmesi gerekir.';
      } else {
        sScore = 70;
      }
    } else if (soil === 'asidik') {
      if (soilText.includes('asidik') || soilText.includes('turba') || soilText.includes('torf') || soilText.includes('funda') || soilText.includes('çam')) {
        sScore = 100;
        sReason = 'Asidik ve düşük pH toprak koşullarında en yüksek performansı gösterir.';
      } else if (soilText.includes('her türlü') || !soilText.includes('kireç')) {
        sScore = 75;
        sReason = 'Hafif asidik topraklarda sağlıklı büyür.';
      } else {
        sScore = 45;
      }
    } else if (soil === 'humuslu') {
      if (soilText.includes('humus') || soilText.includes('verimli') || soilText.includes('organik') || soilText.includes('derin') || soilText.includes('bahçe')) {
        sScore = 100;
        sReason = 'Organik maddece zengin humuslu topraklarda coşkulu gelişim gösterir.';
      } else {
        sScore = 80;
      }
    } else if (soil === 'fakir') {
      if (soilText.includes('fakir') || soilText.includes('taş') || soilText.includes('kaya') || soilText.includes('şev') || soilText.includes('erozyon')) {
        sScore = 100;
        sReason = 'Fakir, taşlı ve yamaç topraklarında dahi besinsizliğe meydan okur.';
      } else if (soilText.includes('her türlü')) {
        sScore = 85;
      } else {
        sScore = 40;
      }
    }
    totalScore += (sScore * 30) / 100;
    if (sReason) reasons.push({ type: 'soil', text: sReason });
  }

  // 3. GÜNEŞ & IŞIK UYUMU (Ağırlık: 25)
  if (light && light !== 'all') {
    totalWeight += 25;
    let lScore = 65;
    let lReason = '';

    if (light === 'tam_gunes') {
      if (lightText.includes('tam güneş') || lightText.includes('güneş') || lightText.includes('ışık ağacı') || lightText.includes('yoğun')) {
        lScore = 100;
        lReason = 'Günde 6+ saat doğrudan güneş ışığı ile optimum form ve renk kazanır.';
      } else if (lightText.includes('yarı gölge')) {
        lScore = 75;
        lReason = 'Tam güneşe toleranslıdır ancak öğle sıcağında hafif filtrelenmeyi de tolere eder.';
      } else if (lightText.includes('derin gölge') || lightText.includes('tam gölge')) {
        lScore = 35;
        lReason = 'Gölge bitkisidir; yakıcı tam güneş yapraklarını yıpratabilir.';
      } else {
        lScore = 70;
      }
    } else if (light === 'yari_golge') {
      if (lightText.includes('yarı gölge') || lightText.includes('aydınlık') || lightText.includes('filtrelenmiş') || lightText.includes('sabah güneşi')) {
        lScore = 100;
        lReason = 'Aydınlık yarı gölge ve filtrelenmiş gün ışığı için idealdir.';
      } else if (lightText.includes('tam güneş veya') || lightText.includes('gölge veya')) {
        lScore = 90;
        lReason = 'Geniş ışık toleransı sayesinde yarı gölgede rahatlıkla yetişir.';
      } else {
        lScore = 65;
      }
    } else if (light === 'golge') {
      if (lightText.includes('gölge') || lightText.includes('tam gölge') || lightText.includes('derin gölge')) {
        lScore = 100;
        lReason = 'Gölgeye en toleranslı türlerdendir; ağaç altlarında ve kuzey cephede yeşil kalır.';
      } else if (lightText.includes('yarı gölge')) {
        lScore = 70;
        lReason = 'Kısmi gölgeyi tolere edebilir.';
      } else {
        lScore = 25;
        lReason = 'Tam ışık ağacıdır; gölgeli yerlerde formu bozulabilir.';
      }
    }
    totalScore += (lScore * 25) / 100;
    if (lReason) reasons.push({ type: 'sun', text: lReason });
  }

  // 4. MEKÂN TÜRÜ (Ağırlık: 15)
  if (placement && placement !== 'all') {
    totalWeight += 15;
    let pScore = 60;
    let pReason = '';

    if (placement === 'dis') {
      if (placementText.includes('dış mekân') || placementText.includes('park') || placementText.includes('bahçe') || placementText.includes('şev') || placementText.includes('kordon')) {
        pScore = 100;
        pReason = 'Açık hava bahçe ve peyzaj düzenlemeleri için mükemmeldir.';
      } else {
        pScore = 60;
      }
    } else if (placement === 'balkon') {
      if (placementText.includes('saksı') || placementText.includes('teras') || placementText.includes('balkon') || placementText.includes('çalı') || (plant.physical_avg_height && (plant.physical_avg_height.includes('0.') || plant.physical_avg_height.includes('1-2')))) {
        pScore = 95;
        pReason = 'Büyük saksı, teras ve balkon yetiştiriciliğine uygundur.';
      } else {
        pScore = 50;
      }
    } else if (placement === 'ic') {
      if (placementText.includes('iç mekân') || placementText.includes('ev') || placementText.includes('salon') || placementText.includes('kış bahçesi')) {
        pScore = 100;
        pReason = 'İç mekân ve aydınlık salon ortamlarında yetiştirmeye uygundur.';
      } else {
        pScore = 20;
      }
    }
    totalScore += (pScore * 15) / 100;
    if (pReason) reasons.push({ type: 'placement', text: pReason });
  }

  // 5. SULAMA İHTİYACI (Ağırlık: 10)
  if (watering && watering !== 'all') {
    totalWeight += 10;
    let wScore = 65;
    let wReason = '';

    if (watering === 'az') {
      if (wateringText.includes('az') || wateringText.includes('kurak') || wateringText.includes('istemez')) {
        wScore = 100;
        wReason = 'Az su ile yetinir; kuraklığa yüksek dirençlidir.';
      } else if (wateringText.includes('orta')) {
        wScore = 60;
      } else {
        wScore = 30;
      }
    } else if (watering === 'orta') {
      if (wateringText.includes('orta') || wateringText.includes('düzenli')) {
        wScore = 100;
        wReason = 'Standart haftalık sulama periyodu ile dengeli gelişim sağlar.';
      } else {
        wScore = 75;
      }
    } else if (watering === 'bol') {
      if (wateringText.includes('bol') || wateringText.includes('nemli') || wateringText.includes('ıslak') || wateringText.includes('sürekli')) {
        wScore = 100;
        wReason = 'Bol su ve sürekli nemli toprak koşullarını tercih eder.';
      } else {
        wScore = 40;
      }
    }
    totalScore += (wScore * 10) / 100;
    if (wReason) reasons.push({ type: 'watering', text: wReason });
  }

  const finalPercentage = totalWeight > 0 ? Math.round((totalScore / totalWeight) * 100) : 100;
  return {
    score: finalPercentage,
    reasons
  };
}

