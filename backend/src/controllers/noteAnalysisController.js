const aiService = require('../services/aiService');
const prisma = require('../models/prisma');
const path = require('path');

/**
 * POST /api/analyze-note
 * Bitki fotoğrafı veya el yazısı/kitap notlarını analiz eder.
 * Çoklu görsel destekler.
 */
exports.analyzeNote = async (req, res) => {
  try {
    const files = req.files || (req.file ? [req.file] : []);
    
    if (files.length === 0) {
      return res.status(400).json({ error: 'Lütfen analiz edilecek en az bir fotoğraf yükleyin.' });
    }

    const host = req.get('host') || 'localhost:3001';
    const protocol = req.protocol || 'http';
    const baseUrl = `${protocol}://${host}`;

    const imageUrls = files.map(f => `${baseUrl}/uploads/${f.filename}`);
    const filePaths = files.map(f => f.path);

    // AI Analizini çalıştır
    const aiResult = await aiService.analyzePlantImages(filePaths);

    res.json({
      success: true,
      data: aiResult.data,
      images: imageUrls,
      modelUsed: aiResult.model
    });
  } catch (error) {
    console.error('Not analizi hatası:', error);
    const status = error.statusCode || 500;
    res.status(status).json({
      error: error.message || 'Fotoğraf analizi sırasında bir hata oluştu.'
    });
  }
};

/**
 * POST /api/analyze-note/save
 * Analiz sonucunu (ve kullanıcının yaptığı düzenlemeleri) veritabanına kaydeder.
 */
exports.saveAnalyzedPlant = async (req, res) => {
  try {
    const { data, images, userNotes } = req.body;
    
    if (!data) {
      return res.status(400).json({ error: 'Kaydedilecek geçerli bitki verisi bulunamadı.' });
    }

    const temel = data.temel || {};
    const fiziksel = data.fiziksel || {};
    const habitat = data.habitat || {};
    const bakim = data.bakim || {};
    const kullanim = data.kullanim || {};
    const sorunlar = data.sorunlar || [];

    const scientificName = (temel.scientific_name && temel.scientific_name !== 'Belirlenemedi') 
      ? temel.scientific_name.trim() 
      : (temel.turkish_name ? `${temel.turkish_name.trim()} (Bilinmeyen Tür)` : `Bilinmeyen Bitki ${Date.now()}`);

    // Kullanıcı ek notları varsa description veya other_notes'a entegre et
    let description = temel.description || '';
    if (userNotes && userNotes.trim()) {
      description = description ? `${description}\n\n[Kullanıcı Notu]: ${userNotes.trim()}` : userNotes.trim();
    }

    // 1. Bitki ana kaydı
    const plant = await prisma.plant.upsert({
      where: { scientific_name: scientificName },
      update: {
        turkish_name: temel.turkish_name || null,
        english_name: temel.english_name || null,
        alternative_names: temel.alternative_names || null,
        family: temel.family || null,
        genus: temel.genus || null,
        description: description || null,
        physical_avg_height: fiziksel.physical_avg_height || null,
        physical_avg_width: fiziksel.physical_avg_width || null,
        physical_growth_form: fiziksel.physical_growth_form || null,
        leaf_description: fiziksel.leaf_description || null,
        flower_description: fiziksel.flower_description || null,
        flower_color: fiziksel.flower_color || null,
        fruit_seed_info: fiziksel.fruit_seed_info || null,
        flowering_period: fiziksel.flowering_period || null,
      },
      create: {
        scientific_name: scientificName,
        turkish_name: temel.turkish_name || null,
        english_name: temel.english_name || null,
        alternative_names: temel.alternative_names || null,
        family: temel.family || null,
        genus: temel.genus || null,
        description: description || null,
        physical_avg_height: fiziksel.physical_avg_height || null,
        physical_avg_width: fiziksel.physical_avg_width || null,
        physical_growth_form: fiziksel.physical_growth_form || null,
        leaf_description: fiziksel.leaf_description || null,
        flower_description: fiziksel.flower_description || null,
        flower_color: fiziksel.flower_color || null,
        fruit_seed_info: fiziksel.fruit_seed_info || null,
        flowering_period: fiziksel.flowering_period || null,
      },
    });

    // 2. Habitat
    if (habitat && Object.values(habitat).some(v => v && v !== 'BELIRSIZ')) {
      await prisma.plantHabitat.upsert({
        where: { plant_id: plant.id },
        update: { ...cleanObj(habitat) },
        create: { plant_id: plant.id, ...cleanObj(habitat) },
      });
    }

    // 3. Bakım
    if (bakim && Object.values(bakim).some(v => v && v !== 'BELIRSIZ')) {
      const cleanBakim = cleanObj(bakim);
      if (typeof cleanBakim.care_difficulty === 'string') {
        cleanBakim.care_difficulty = parseInt(cleanBakim.care_difficulty) || null;
      }
      if (typeof cleanBakim.temperature_min === 'string') {
        cleanBakim.temperature_min = parseFloat(cleanBakim.temperature_min) || null;
      }
      if (typeof cleanBakim.temperature_max === 'string') {
        cleanBakim.temperature_max = parseFloat(cleanBakim.temperature_max) || null;
      }

      await prisma.plantCare.upsert({
        where: { plant_id: plant.id },
        update: { ...cleanBakim },
        create: { plant_id: plant.id, ...cleanBakim },
      });
    }

    // 4. Kullanım
    if (kullanim && Object.values(kullanim).some(v => v && v !== 'BELIRSIZ')) {
      await prisma.plantUsage.upsert({
        where: { plant_id: plant.id },
        update: { ...cleanObj(kullanim) },
        create: { plant_id: plant.id, ...cleanObj(kullanim) },
      });
    }

    // 5. Sorunlar
    if (sorunlar && Array.isArray(sorunlar) && sorunlar.length > 0) {
      await prisma.plantProblem.deleteMany({ where: { plant_id: plant.id } });
      const validProblems = sorunlar.filter(s => s && (s.problem_name || s.problem_type));
      if (validProblems.length > 0) {
        await prisma.plantProblem.createMany({
          data: validProblems.map(p => ({ plant_id: plant.id, ...cleanObj(p) }))
        });
      }
    }

    // 6. Görseller
    if (images && Array.isArray(images) && images.length > 0) {
      await prisma.plantImage.deleteMany({ where: { plant_id: plant.id } });
      for (const img of images) {
        const url = typeof img === 'string' ? img : img.image_url;
        const type = typeof img === 'object' ? img.image_type || 'gallery' : 'gallery';
        if (url) {
          await prisma.plantImage.create({
            data: {
              plant_id: plant.id,
              image_url: url,
              image_type: type,
              verified: true
            }
          });
        }
      }
    }

    res.json({
      success: true,
      plantId: plant.id,
      message: `"${plant.turkish_name || plant.scientific_name}" başarıyla botanik defterine kaydedildi.`
    });
  } catch (error) {
    console.error('Kaydetme hatası:', error);
    res.status(500).json({ error: 'Bitki kaydedilirken hata oluştu: ' + error.message });
  }
};

function cleanObj(obj) {
  if (!obj || typeof obj !== 'object') return {};
  const res = {};
  for (const [k, v] of Object.entries(obj)) {
    if (k === 'id' || k === 'plant_id') continue;
    if (v === 'BELIRSIZ' || v === 'Belirlenemedi' || v === 'Doğrulanmalı' || v === '') {
      res[k] = null;
    } else {
      res[k] = v;
    }
  }
  return res;
}
