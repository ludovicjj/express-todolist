const { getItems, createItem, updateItem, deleteItem } = require('../helper/itemHelper');
const { success, error} = require('../helper/responseHelper');
const { filterBody } = require('../helper/requestHelper');

exports.item_detail = (req, res) => {
    const id = parseInt(req.params.id);
    const items = getItems();
    const item = items.find(item => item.id === id);

    if (!item) {
        return res.status(404).json(error('Not Found', null, 404))
    }

    return res.json(success('OK', item))
}

exports.item_list = (req, res) => {
    const items = getItems();

    return res.json(success('OK', items))
}
exports.item_add = (req, res) => {
    let data = filterBody(req, res, ['name'])
    let itemCreated = createItem(data);

    return res.status(201).json(success('Created', itemCreated, 201));
}

exports.item_update = (req, res) => {
    const id = parseInt(req.params.id);
    const items = getItems();
    let data = filterBody(req, res, ['name'])

    let item = items.find(item => item.id === id);
    if (!item) {
        const itemCreated = createItem(data)

        return res.status(201).json(success('Created', itemCreated, 201))
    } else {
        const itemUpdated = updateItem(item, data)
        return res.json(success('OK', itemUpdated))
    }
}

exports.item_delete = (req, res) => {
    const id = parseInt(req.params.id);
    let items = getItems();
    const deletedItem = items.find(item => item.id === id);

    if (!deletedItem) {
        return res.status(404).json(error('Not Found', null, 404))
    }

    deleteItem(deletedItem);
    res.status(200).json(success('OK', deletedItem));
}
