const noteAnalysisController = require('./noteAnalysisController');

/**
 * /api/identify de artık doğrudan gerçek Gemini Vision AI analizine yönlendirilir.
 * Mock/sahte veri tamamen kaldırılmıştır.
 */
exports.identifyPlant = noteAnalysisController.analyzeNote;
