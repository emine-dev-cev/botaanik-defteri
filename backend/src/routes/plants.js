const express = require('express');
const router = express.Router();
const plantController = require('../controllers/plantController');

router.get('/', plantController.getAllPlants);
router.post('/recommend', plantController.recommendPlants);
router.get('/recommend', plantController.recommendPlants);
router.post('/ai-advisor', plantController.getAiPlantAdvice);
router.get('/search-any', plantController.searchAnyPlant);
router.post('/search-any', plantController.searchAnyPlant);
router.post('/ai-lookup', plantController.aiPlantLookup);
router.post('/save-ai', plantController.saveAiPlantToCatalog);
router.get('/:id', plantController.getPlantById);
router.post('/', plantController.createPlant);
router.put('/:id', plantController.updatePlant);
router.delete('/:id', plantController.deletePlant);

module.exports = router;
