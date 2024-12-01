const router = require("express").Router();
const { createUser, getAllUsers } = require("../controllers/userController");


router.get("/v1/users",  getAllUsers);
router.post("/v1/user", createUser)

module.exports = router;
