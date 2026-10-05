const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const { analyzeNote, saveAnalyzedPlant } = require('../controllers/noteAnalysisController');

// POST /api/analyze-note — Tekli veya çoklu fotoğraf analizi
router.post('/', upload.array('images', 5), analyzeNote);

// POST /api/analyze-note/save — Analiz sonucunu veritabanına kaydet
router.post('/save', saveAnalyzedPlant);

module.exports = router;
