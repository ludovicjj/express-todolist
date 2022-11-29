const express = require('express');
const router = express.Router();

// Require controller modules.
const item_controller = require("../controller/itemController");

router
    .get('/todo', item_controller.index)
    .get('/todo/delete', item_controller.item_delete)
    .get('/todo/add', item_controller.item_add)
    .get('/todo/update', item_controller.item_update);

module.exports = router;