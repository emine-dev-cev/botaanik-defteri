const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// ==================== FOLDER ENDPOINTS ====================

// Tüm klasörleri ve silinmemiş not sayılarını getir
exports.getAllFolders = async (req, res, next) => {
  try {
    let folders = await prisma.notebookFolder.findMany({
      include: {
        _count: {
          select: {
            entries: {
              where: { is_deleted: false }
            },
            files: true
          }
        }
      },
      orderBy: [
        { sort_order: "asc" },
        { created_at: "asc" }
      ]
    });

    // Eğer henüz hiç klasör yoksa iOS Notlar tarzı başlangıç klasörlerini oluşturalım
    if (folders.length === 0) {
      const defaultFolders = [
        { name: "Notlar", icon: "folder", color: "#e5a93c", sort_order: 1 },
        { name: "Mesleki Uygulama Ödevi", icon: "folder", color: "#e5a93c", sort_order: 2 },
        { name: "Ödev", icon: "folder", color: "#e5a93c", sort_order: 3 }
      ];

      for (const df of defaultFolders) {
        await prisma.notebookFolder.create({ data: df });
      }

      // Klasörsüz var olan notlar varsa "Notlar" klasörüne bağla
      const notesFolder = await prisma.notebookFolder.findFirst({ where: { name: "Notlar" } });
      if (notesFolder) {
        await prisma.notebookEntry.updateMany({
          where: { folder_id: null },
          data: { folder_id: notesFolder.id }
        });
      }

      folders = await prisma.notebookFolder.findMany({
        include: {
          _count: {
            select: {
              entries: {
                where: { is_deleted: false }
              }
            }
          }
        },
        orderBy: [
          { sort_order: "asc" },
          { created_at: "asc" }
        ]
      });
    }

    const formattedFolders = folders.map((folder) => ({
      ...folder,
      entry_count: folder._count ? folder._count.entries : 0,
      file_count: folder._count ? folder._count.files : 0
    }));

    res.json(formattedFolders);
  } catch (err) {
    next(err);
  }
};

// Yeni klasör oluştur (name zorunlu)
exports.createFolder = async (req, res, next) => {
  try {
    const { name, icon, color, sort_order } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ error: "Klasör adı zorunludur." });
    }

    const folder = await prisma.notebookFolder.create({
      data: {
        name: name.trim(),
        icon: icon || "folder",
        color: color || "#c9a84c",
        sort_order: typeof sort_order === "number" ? sort_order : 0,
        is_system: false
      }
    });

    res.status(201).json({
      success: true,
      message: "Klasör başarıyla oluşturuldu.",
      folder
    });
  } catch (err) {
    next(err);
  }
};

// Klasör güncelle (name, color, icon) - is_system değiştirilmesine izin verilmez
exports.updateFolder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, icon, color, sort_order } = req.body;

    const existingFolder = await prisma.notebookFolder.findUnique({
      where: { id }
    });

    if (!existingFolder) {
      return res.status(404).json({ error: "Klasör bulunamadı." });
    }

    const updateData = {};
    if (name !== undefined) updateData.name = name.trim();
    if (icon !== undefined) updateData.icon = icon;
    if (color !== undefined) updateData.color = color;
    if (sort_order !== undefined) updateData.sort_order = Number(sort_order);

    const updatedFolder = await prisma.notebookFolder.update({
      where: { id },
      data: updateData
    });

    res.json({
      success: true,
      message: "Klasör güncellendi.",
      folder: updatedFolder
    });
  } catch (err) {
    next(err);
  }
};

// Klasör sil (sistem klasörleri silinemez). İçindeki notların folder_id'si null yapılır.
exports.deleteFolder = async (req, res, next) => {
  try {
    const { id } = req.params;

    const folder = await prisma.notebookFolder.findUnique({
      where: { id }
    });

    if (!folder) {
      return res.status(404).json({ error: "Klasör bulunamadı." });
    }

    if (folder.is_system) {
      return res.status(400).json({ error: "Sistem klasörleri silinemez." });
    }

    // Klasördeki notların folder_id değerini sıfırla
    await prisma.notebookEntry.updateMany({
      where: { folder_id: id },
      data: { folder_id: null }
    });

    await prisma.notebookFolder.delete({
      where: { id }
    });

    res.json({
      success: true,
      message: "Klasör silindi, içerisindeki notlar serbest bırakıldı."
    });
  } catch (err) {
    next(err);
  }
};

// ==================== ENTRY ENDPOINTS ====================

// Notları getir: opsiyonel ?folder_id=xxx ve ?deleted=true
// deleted=true ise sadece is_deleted=true, aksi halde is_deleted=false döner
// folder_id verilmişse filtreler. Her zaman orderBy is_pinned desc, created_at desc.
exports.getAllEntries = async (req, res, next) => {
  try {
    const { folder_id, deleted } = req.query;

    const where = {
      is_deleted: deleted === "true"
    };

    if (folder_id !== undefined && folder_id !== "") {
      if (folder_id === "null" || folder_id === "none") {
        where.folder_id = null;
      } else {
        where.folder_id = folder_id;
      }
    }

    const entries = await prisma.notebookEntry.findMany({
      where,
      include: {
        folder: true
      },
      orderBy: [
        { is_pinned: "desc" },
        { created_at: "desc" }
      ]
    });

    res.json(entries);
  } catch (err) {
    next(err);
  }
};

// Yeni not & çizim oluştur (folder_id opsiyonel)
exports.createEntry = async (req, res, next) => {
  try {
    const {
      title,
      plant_name,
      location,
      content,
      photo_url,
      drawing_data,
      tags,
      folder_id,
      is_pinned
    } = req.body;

    let finalPhotoUrl = photo_url || null;
    if (req.file) {
      finalPhotoUrl = `/uploads/${req.file.filename}`;
    }

    if (!title || (!content && !drawing_data && !finalPhotoUrl)) {
      return res.status(400).json({
        error: "Not başlığı ve en az bir içerik (not, çizim veya fotoğraf) zorunludur."
      });
    }

    const newEntry = await prisma.notebookEntry.create({
      data: {
        title: title.trim(),
        plant_name: plant_name ? plant_name.trim() : null,
        location: location ? location.trim() : null,
        content: content ? content.trim() : null,
        photo_url: finalPhotoUrl,
        drawing_data: drawing_data || null,
        tags: tags || null,
        folder_id: folder_id || null,
        is_pinned: is_pinned === true || is_pinned === "true"
      },
      include: {
        folder: true
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

// Not güncelle (title, content, tags, folder_id, is_pinned, location, plant_name)
exports.updateEntry = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      title,
      content,
      tags,
      folder_id,
      is_pinned,
      location,
      plant_name,
      photo_url,
      drawing_data
    } = req.body;

    const existingEntry = await prisma.notebookEntry.findUnique({
      where: { id }
    });

    if (!existingEntry) {
      return res.status(404).json({ error: "Not bulunamadı." });
    }

    let finalPhotoUrl = undefined;
    if (req.file) {
      finalPhotoUrl = `/uploads/${req.file.filename}`;
    } else if (photo_url !== undefined) {
      finalPhotoUrl = photo_url || null;
    }

    const updateData = {};
    if (title !== undefined) updateData.title = title.trim();
    if (content !== undefined) updateData.content = content ? content.trim() : null;
    if (tags !== undefined) updateData.tags = tags || null;
    if (folder_id !== undefined) updateData.folder_id = folder_id || null;
    if (is_pinned !== undefined) updateData.is_pinned = is_pinned === true || is_pinned === "true";
    if (location !== undefined) updateData.location = location ? location.trim() : null;
    if (plant_name !== undefined) updateData.plant_name = plant_name ? plant_name.trim() : null;
    if (finalPhotoUrl !== undefined) updateData.photo_url = finalPhotoUrl;
    if (drawing_data !== undefined) updateData.drawing_data = drawing_data || null;

    const updatedEntry = await prisma.notebookEntry.update({
      where: { id },
      data: updateData,
      include: {
        folder: true
      }
    });

    res.json({
      success: true,
      message: "Not güncellendi.",
      entry: updatedEntry
    });
  } catch (err) {
    next(err);
  }
};

// Soft delete (is_deleted=true, deleted_at=now())
exports.deleteEntry = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existing = await prisma.notebookEntry.findUnique({
      where: { id }
    });

    if (!existing) {
      return res.status(404).json({ error: "Not bulunamadı." });
    }

    const deletedEntry = await prisma.notebookEntry.update({
      where: { id },
      data: {
        is_deleted: true,
        deleted_at: new Date()
      }
    });

    res.json({
      success: true,
      message: "Not çöp kutusuna taşındı.",
      entry: deletedEntry
    });
  } catch (err) {
    next(err);
  }
};

// Notu geri yükle (is_deleted=false, deleted_at=null)
exports.restoreEntry = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existing = await prisma.notebookEntry.findUnique({
      where: { id }
    });

    if (!existing) {
      return res.status(404).json({ error: "Not bulunamadı." });
    }

    const restoredEntry = await prisma.notebookEntry.update({
      where: { id },
      data: {
        is_deleted: false,
        deleted_at: null
      },
      include: {
        folder: true
      }
    });

    res.json({
      success: true,
      message: "Not geri yüklendi.",
      entry: restoredEntry
    });
  } catch (err) {
    next(err);
  }
};

// Kalıcı sil (veritabanından silme)
exports.permanentDeleteEntry = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existing = await prisma.notebookEntry.findUnique({
      where: { id }
    });

    if (!existing) {
      return res.status(404).json({ error: "Not bulunamadı." });
    }

    await prisma.notebookEntry.delete({
      where: { id }
    });

    res.json({
      success: true,
      message: "Not kalıcı olarak silindi."
    });
  } catch (err) {
    next(err);
  }
};

// Notu başka bir klasöre taşı (update folder_id)
exports.moveEntry = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { folder_id } = req.body;

    const existing = await prisma.notebookEntry.findUnique({
      where: { id }
    });

    if (!existing) {
      return res.status(404).json({ error: "Not bulunamadı." });
    }

    if (folder_id) {
      const folder = await prisma.notebookFolder.findUnique({
        where: { id: folder_id }
      });
      if (!folder) {
        return res.status(404).json({ error: "Hedef klasör bulunamadı." });
      }
    }

    const updatedEntry = await prisma.notebookEntry.update({
      where: { id },
      data: {
        folder_id: folder_id || null
      },
      include: {
        folder: true
      }
    });

    res.json({
      success: true,
      message: "Not klasöre taşındı.",
      entry: updatedEntry
    });
  } catch (err) {
    next(err);
  }
};

// ==================== FILE ENDPOINTS ====================

// Dosyaları getir (opsiyonel ?folder_id=xxx)
exports.getFiles = async (req, res, next) => {
  try {
    const { folder_id } = req.query;
    const where = {};

    if (folder_id !== undefined && folder_id !== "") {
      if (folder_id === "null" || folder_id === "none") {
        where.folder_id = null;
      } else {
        where.folder_id = folder_id;
      }
    }

    const files = await prisma.notebookFile.findMany({
      where,
      include: {
        folder: true
      },
      orderBy: {
        created_at: "desc"
      }
    });

    res.json(files);
  } catch (err) {
    next(err);
  }
};

// Yeni dosya(lar) yükle
exports.uploadFiles = async (req, res, next) => {
  try {
    const { folder_id } = req.body;
    const uploadedFiles = req.files || (req.file ? [req.file] : []);

    if (uploadedFiles.length === 0) {
      return res.status(400).json({ error: "Lütfen en az bir dosya seçin." });
    }

    const createdRecords = [];

    for (const f of uploadedFiles) {
      const ext = require('path').extname(f.originalname).toLowerCase();
      let fileType = 'other';
      if (['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg'].includes(ext)) fileType = 'image';
      else if (['.pdf'].includes(ext)) fileType = 'pdf';
      else if (['.doc', '.docx'].includes(ext)) fileType = 'word';
      else if (['.xls', '.xlsx', '.csv'].includes(ext)) fileType = 'excel';
      else if (['.ppt', '.pptx'].includes(ext)) fileType = 'presentation';
      else if (['.zip', '.rar', '.7z', '.tar', '.gz'].includes(ext)) fileType = 'archive';
      else if (['.txt', '.md', '.json'].includes(ext)) fileType = 'text';

      const fileRecord = await prisma.notebookFile.create({
        data: {
          name: f.originalname,
          file_url: `/uploads/${f.filename}`,
          file_type: fileType,
          file_size: f.size,
          folder_id: folder_id || null
        },
        include: {
          folder: true
        }
      });
      createdRecords.push(fileRecord);
    }

    res.status(201).json({
      success: true,
      message: `${createdRecords.length} dosya başarıyla yüklendi.`,
      files: createdRecords
    });
  } catch (err) {
    next(err);
  }
};

// Dosya sil
exports.deleteFile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const file = await prisma.notebookFile.findUnique({ where: { id } });

    if (!file) {
      return res.status(404).json({ error: "Dosya bulunamadı." });
    }

    // Diskten de fiziksel olarak silebiliriz (opsiyonel hata yakalamalı)
    try {
      const filePath = require('path').join(__dirname, '../../uploads', require('path').basename(file.file_url));
      if (require('fs').existsSync(filePath)) {
        require('fs').unlinkSync(filePath);
      }
    } catch (e) {
      console.warn("Fiziksel dosya silinirken uyarı:", e.message);
    }

    await prisma.notebookFile.delete({ where: { id } });

    res.json({
      success: true,
      message: "Dosya başarıyla silindi."
    });
  } catch (err) {
    next(err);
  }
};

// Dosyayı başka klasöre taşı
exports.moveFile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { folder_id } = req.body;

    const file = await prisma.notebookFile.findUnique({ where: { id } });
    if (!file) {
      return res.status(404).json({ error: "Dosya bulunamadı." });
    }

    const updated = await prisma.notebookFile.update({
      where: { id },
      data: { folder_id: folder_id || null },
      include: { folder: true }
    });

    res.json({
      success: true,
      message: "Dosya taşındı.",
      file: updated
    });
  } catch (err) {
    next(err);
  }
};
