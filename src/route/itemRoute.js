const express = require('express');
const router = express.Router();
const auth = require("../security/auth")

// Require controller modules.
const item_controller = require("../controller/itemController");

router
    .get('/items', auth, item_controller.item_list)
    .get('/items/:id', auth, item_controller.item_detail)
    .post('/items', auth, item_controller.item_add)
    .put('/items/:id', auth, item_controller.item_update)
    .delete('/items/:id', auth, item_controller.item_delete)

module.exports = router;