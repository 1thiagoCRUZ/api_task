// services

const { create, getAllTaskUser, deleteTask } = require("../services/taskServices");


module.exports = {
    createTask: (req, res) => {
        const body = req.body;
        create(body, (err, result) => {
            if(err) {
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

    deleteTask: (req, res) => {
        const { id_user, id_task } = req.params;
        deleteTask({ id_user, id_task }, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Internal Server Error",
                    error: err.message
                });
            }
            if (results.success === 0) {
                return res.status(404).json({
                    success: 0,
                    message: "No task found or couldn't be deleted"
                });
            }

            return res.status(200).json({
                success: 1,
                message: results.message 
            });
        });
    },
    
};