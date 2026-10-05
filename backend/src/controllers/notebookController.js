const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Tüm öğrenci notlarını getir
exports.getAllEntries = async (req, res, next) => {
  try {
    const entries = await prisma.notebookEntry.findMany({
      orderBy: { created_at: "desc" }
    });
    res.json(entries);
  } catch (err) {
    next(err);
  }
};

// Yeni not & çizim oluştur
exports.createEntry = async (req, res, next) => {
  try {
    const { title, plant_name, location, content, photo_url, drawing_data, tags } = req.body;

    let finalPhotoUrl = photo_url || null;
    if (req.file) {
      finalPhotoUrl = `/uploads/${req.file.filename}`;
    }

    if (!title || (!content && !drawing_data && !finalPhotoUrl)) {
      return res.status(400).json({ error: "Not başlığı ve en az bir içerik (not, çizim veya fotoğraf) zorunludur." });
    }

    const newEntry = await prisma.notebookEntry.create({
      data: {
        title: title.trim(),
        plant_name: plant_name ? plant_name.trim() : null,
        location: location ? location.trim() : null,
        content: content ? content.trim() : null,
        photo_url: finalPhotoUrl,
        drawing_data: drawing_data || null,
        tags: tags || null
      }
    });

    res.status(201).json({
      success: true,
      message: "Saha notu başarıyla defterinize kaydedildi.",
      entry: newEntry
    });
  } catch (err) {
    next(err);
  }
};

// Not sil
exports.deleteEntry = async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.notebookEntry.delete({
      where: { id }
    });
    res.json({ success: true, message: "Not silindi." });
  } catch (err) {
    next(err);
  }
};
