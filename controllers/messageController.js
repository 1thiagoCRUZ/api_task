const { sendMessage, getMessages } = require("../services/messageServices");

module.exports = {
    sendMessage: (req, res) => {
        const body = req.body;
        sendMessage(body, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Failed to send message",
                });
            }
            return res.status(201).json({
                success: 1,
                message: "Message sent successfully",
            });
        });
    },
    getMessages: (req, res) => {
        const { user_id, other_user_id } = req.params;
        getMessages({ user_id, other_user_id }, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Internal Server Error",
                    error: err.message,
                });
            }

            return res.status(200).json(results);
        });
    },
}