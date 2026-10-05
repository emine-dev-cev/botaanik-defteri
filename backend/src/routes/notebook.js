const express = require("express");
const router = express.Router();
const notebookController = require("../controllers/notebookController");
const upload = require("../middlewares/upload");

router.get("/", notebookController.getAllEntries);
router.post("/", upload.single('photo'), notebookController.createEntry);
router.delete("/:id", notebookController.deleteEntry);

module.exports = router;
