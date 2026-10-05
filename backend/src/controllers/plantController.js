const prisma = require('../models/prisma');

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
