exports.index = (req, res) => {
    console.log(req.session.items)
    res.send('main page');
}

exports.item_add = (req, res) => {
    res.send('controller handle add item');
}

exports.item_delete = (req, res) => {
    res.send('controller handle delete item');
}

exports.item_update = (req, res) => {
    res.send('controller handle update item');
}