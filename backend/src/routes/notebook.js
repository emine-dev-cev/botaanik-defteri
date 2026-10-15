const express = require('express');
const router = express.Router();
const notebookController = require('../controllers/notebookController');
const upload = require('../middlewares/upload');

// Folder routes
router.get('/folders', notebookController.getAllFolders);
router.post('/folders', notebookController.createFolder);
router.put('/folders/:id', notebookController.updateFolder);
router.delete('/folders/:id', notebookController.deleteFolder);

// Entry routes  
router.get('/', notebookController.getAllEntries);
router.post('/', upload.single('photo'), notebookController.createEntry);
router.put('/:id', notebookController.updateEntry);
router.delete('/:id', notebookController.deleteEntry);
router.post('/:id/restore', notebookController.restoreEntry);
router.delete('/:id/permanent', notebookController.permanentDeleteEntry);
router.patch('/:id/move', notebookController.moveEntry);

// File routes
router.get('/files', notebookController.getFiles);
router.post('/files', upload.document.array('files', 10), notebookController.uploadFiles);
router.delete('/files/:id', notebookController.deleteFile);
router.patch('/files/:id/move', notebookController.moveFile);

module.exports = router;
