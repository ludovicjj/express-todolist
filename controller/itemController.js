const fs = require('node:fs');
const {successResponse, errorResponse, getUniqueId, filterBody} = require('../helper');
const pathItemData = "./items_data.json";
let items = JSON.parse(fs.readFileSync(pathItemData, "utf8"));


exports.item_detail = (req, res) => {
    const id = parseInt(req.params.id);
    const item = items.find(item => item.id === id);
    res.json(successResponse('OK', item))
}

exports.item_list = (req, res) => {
    res.json(successResponse('OK', items))
}
exports.item_add = (req, res) => {
    let filteredBody = filterBody(req, res, ['name'])
    let itemCreated = createItem(filteredBody)

    res.status(201);
    return res.json(successResponse('Created', itemCreated, 201))
}

exports.item_update = (req, res) => {
    const id = parseInt(req.params.id);
    let filteredBody = filterBody(req, res, ['name'])

    let item = items.find(item => item.id === id);
    if (!item) {
        const itemCreated = createItem(filteredBody)
        res.status(201);
        return res.json(successResponse('Created', itemCreated, 201))
    } else {
        const itemUpdated = updateItem(item, filteredBody)
        return res.json(successResponse('OK', itemUpdated))
    }
}

function createItem(data) {
    const id = getUniqueId(items);
    const itemCreated = {id, ...data, created: new Date()};
    items.push(itemCreated);
    fs.writeFileSync(pathItemData, JSON.stringify(items, null, 4))
    return itemCreated;
}

function updateItem(item, data) {
    const updatedItem = {...item, ...data}

    items = items.map(item => {
        return (item.id === updatedItem.id) ? updatedItem : item
    })
    fs.writeFileSync(pathItemData, JSON.stringify(items, null, 4));

    return updatedItem;
}
