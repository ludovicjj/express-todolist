const express = require('express');
const security_controller = require("../controller/securityController");
const router = express.Router();

router
    .post('/login', security_controller.user_login)

module.exports = router;