const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const identifyController = require('../controllers/identifyController');

router.post('/', upload.array('images', 5), identifyController.identifyPlant);

module.exports = router;
