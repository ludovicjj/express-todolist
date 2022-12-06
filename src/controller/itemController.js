const { Item } = require('../database/sequelize')

exports.item_list = (req, res) => {
    Item.findAll().then(items => {
        res.status(200).json({message: "OK", status: 200, data: items})
    })
}

exports.item_detail = (req, res) => {
    Item.findByPk(req.params.id).then(item => {
        res.status(200).json({message: "OK", status: 200, data: item})
    })
}

exports.item_add = (req, res) => {
    Item.create(req.body).then(item => {
        res.status(201).json({message: "Created", status: 201, data: item})
    })
}

exports.item_update = (req, res) => {
    const id = req.params.id
    Item.update(req.body, {
        where: {id: id}
    }).then(_ => {
        Item.findByPk(id).then(item => {
            res.status(200).json({message: "OK", status: 200, data: item})
        })
    })
}

exports.item_delete = (req, res) => {
    const id = req.params.id;
    Item.findByPk(id).then(deletedItem => {
        Item.destroy({
            where: {id: deletedItem.id}
        }).then(_ => {
            res.status(200).json({message: "OK", status: 200, data: deletedItem})
        })
    })
}