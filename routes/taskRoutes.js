const { Router } = require("express")
const { createTask, getAllTaskUser, deleteTask } = require("../controllers/taskController");
const router = require("express").Router();

router.post("/v1/task", createTask);
router.get("/v1/task/search/:id_user", getAllTaskUser);
router.delete("/v1/task/remove/:id_user/:id_task", deleteTask);


module.exports = router;