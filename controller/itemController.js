const fs = require('node:fs');
const {success, error, getUniqueId} = require('../helper');
const pathItemData = "./items_data.json";
const items = JSON.parse(fs.readFileSync(pathItemData, "utf8"));

exports.item_detail = (req, res) => {
    const id = parseInt(req.params.id);
    const item = items.find(item => item.id === id);
    res.json(success('OK', item))
}

exports.item_list = (req, res) => {
    res.json(success('OK', items))
}
exports.item_add = (req, res) => {
    const {name} = req.body
    if (name !== undefined && name !== '') {
        const id = getUniqueId(items);
        let itemCreated = {id, name, created: new Date()}
        items.push(itemCreated);
        fs.writeFileSync(pathItemData, JSON.stringify(items, null, 4))
        res.status(201);
        res.json(success('Created', itemCreated, 201))
    } else {
        res.status(422);
        res.json(error('Unprocessable entity', {message: "Missing field name"}, 422))
    }
}
