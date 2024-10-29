// services

const { create } = require("../services/taskServices");

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
};