const express = require('express');
const router = express.Router();

// Require controller modules.
const item_controller = require("../controller/itemController");

router
    .get('/items/:id', item_controller.item_detail)
    .get('/items', item_controller.item_list)
    .post('/items', item_controller.item_add)
    .put('/items/:id', item_controller.item_update)
    .delete('/items/:id', item_controller.item_delete)

module.exports = router;