const router = require("express").Router();
const { sendMessage, getMessages } = require("../controllers/messageController");

router.post("/v1/chat/send", sendMessage);
router.get("/v1/chat/messages/:user_id/:other_user_id", getMessages);

module.exports = router;