const { create, getAllTaskUser, deleteTask, getTasksByStatus, updateTaskStatus } = require("../services/taskServices");

module.exports = {
    createTask: (req, res) => {
        const body = req.body;
        create(body, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(201).json({
                success: 1,
                message: "Insert task success"
            });
        });
    },

    getAllTaskUser: (req, res) => {
        const id_user = req.params.id_user;
        getAllTaskUser(id_user, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Record not found" // Registro não encontrado
                });
            }

            return res.json({
                success: 1,
                data: results
            });
        });
    },

    getTasksByStatus: (req, res) => {
        const { id_user, status } = req.params;

        getTasksByStatus(id_user, status, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Internal Server Error",
                    error: err.message
                });
            }

            if (!results || results.success === 0) {
                return res.status(404).json({
                    success: 0,
                    message: results.message || "Record not found"
                });
            }

            return res.json({
                success: 1,
                data: results.data
            });
        });
    },


    deleteTask: (req, res) => {
        const { id_user } = req.body;
        const { id_task } = req.params;

        if (!id_user || !id_task) {
            return res.status(400).json({
                success: 0,
                message: "User ID and Task ID are required"
            });
        }

        deleteTask({ id_user, id_task }, (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    success: 0,
                    message: "Internal Server Error",
                    error: err.message
                });
            }

            if (!results || results.success === 0) {
                return res.status(404).json({
                    success: 0,
                    message: "Task not found or could not be deleted"
                });
            }

            return res.json({
                success: 1,
                message: results.message,
                data: results.data
            });
        });
    },


    updateTaskStatus: (req, res) => {
        const { id_user, id_task, new_status } = req.body;

        if (!id_user || !id_task || !new_status) {
            return res.status(400).json({
                success: 0,
                message: "ID do usuário, ID da tarefa e novo status são obrigatórios"
            });
        }

        updateTaskStatus({ id_user, id_task, new_status }, (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    success: 0,
                    message: "Internal Server Error",
                    error: err.message
                });
            }

            if (!results || results.success === 0) {
                return res.status(404).json({
                    success: 0,
                    message: results.message || "Task not found or status not updated"
                });
            }

            return res.json({
                success: 1,
                message: results.message,
                data: results.data
            });
        });
    },

};