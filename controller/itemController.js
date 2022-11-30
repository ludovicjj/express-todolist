const {success} = require('../helper');
const items = require('../mock-item');

exports.item_detail = (req, res) => {
    const id = parseInt(req.params.id);
    const item = items.find(item => item.id === id);
    res.json(success('OK', item))
}

exports.item_list = (req, res) => {
    res.json(success('OK', items))
}