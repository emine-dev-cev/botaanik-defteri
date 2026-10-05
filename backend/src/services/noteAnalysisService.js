const aiService = require('./aiService');

/**
 * El yazısı / kitap notu analiz servisi.
 * Gerçek Gemini Vision AI servisine yönlendirir.
 * Mock/sahte veri tamamen kaldırılmıştır.
 */
exports.analyzeNotePicture = async (images) => {
  return await aiService.analyzePlantImages(images);
};
