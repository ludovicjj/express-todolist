const { Item } = require('../database/sequelize')

exports.item_list = (req, res) => {
    Item.findAll().then(items => {
        res.status(200).json({message: "OK", status: 200, data: items})
    })
}

exports.item_detail = (req, res) => {
    console.log("handle detail item")
}

exports.item_add = (req, res) => {
    console.log("handle add item")
}

exports.item_update = (req, res) => {
    console.log("handle update item")
}

exports.item_delete = (req, res) => {
    console.log("handle delete item")
}