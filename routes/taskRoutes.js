const { Router } = require("express")
const { createTask } = require("../controllers/taskController");
const router = require("express").Router();

router.post("/v1/task", createTask);


module.exports = router;