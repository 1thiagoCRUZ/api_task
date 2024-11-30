const { Router } = require("express")
const { createTask, getAllTaskUser, deleteTask, getTasksByStatus, updateTaskStatus } = require("../controllers/taskController");
const router = require("express").Router();

router.post("/v1/task", createTask);
router.get("/v1/task/search/:id_user", getAllTaskUser);
router.get('/v1/task/search/:id_user/status/:status', getTasksByStatus);
router.put('/v1/task/update', updateTaskStatus);
router.delete("/v1/task/remove/:id_task", deleteTask);


module.exports = router;