const { create, getAllNoteUser, deleteNote } = require("../services/notesServices")

module.exports = {
    createNote: (req, res) => {
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
                message: "Insert note success"
            });
        });
    },


    getAllNoteUser: (req, res) => {
        const id_user = req.params.id_user;
        getAllNoteUser(id_user, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Record not found"
                });
            }

            return res.json({
                success: 1,
                data: results
            });
        });
    },


    deleteNote: (req, res) => {
        const { id_user, id_note } = req.params;
        deleteNote({ id_user, id_note }, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Internal Server Error",
                    error: err.message
                });
            }

            return res.status(200).json({
                success: 1,
                message: results.message
            });
        });
    },
};