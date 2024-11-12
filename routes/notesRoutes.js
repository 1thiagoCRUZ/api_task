const { Router } = require("express");
const { createNote, getAllNoteUser, deleteNote } = require("../controllers/noteController")
const router = require("express").Router();

router.post("/v1/note", createNote);
router.get("/v1/note/search/:id_user", getAllNoteUser);
router.delete("/v1/note/remove/:id_user/:id_note", deleteNote);


module.exports = router;