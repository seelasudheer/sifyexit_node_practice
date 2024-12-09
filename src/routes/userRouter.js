const express = require("express");
const router = express.Router();
const { logInUser, signUpUser } = require("../controllers/userController");

router.post("/logInUser", logInUser);
router.post("/signUpUser", signUpUser);

module.exports = router;
