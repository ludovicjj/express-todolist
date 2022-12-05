const express = require('express');
const router = express.Router();

// Require controller modules.
const item_controller = require("../controller/itemController");

router
    .get('/items', item_controller.item_list)
    .get('/items/:id', item_controller.item_detail)
    .post('/items', item_controller.item_add)
    .put('/items/:id', item_controller.item_update)
    .delete('/items/:id', item_controller.item_delete)

module.exports = router;