const { Item } = require("../database/sequelize");
const { ValidationError, Op } = require("sequelize");
const { buildErrorMessage } = require("../factory/errorValidationFactory")
const Pagination = require('../pagination/pagination');

exports.item_list = (req, res) => {
    const {title} = req.query;
    if (title) {
        const page = parseInt(req.query.page) || 1;
        const limit = 2
        const offset = (page - 1) * limit

        Item.findAndCountAll({
            where: {
                title: {
                    [Op.like] : `%${title}%`
                }
            },
            offset,
            limit
        }).then(({count, rows}) => {
            const pagination = new Pagination(page, limit, count, req)
            const { pages } = pagination.paginated

            return res.json({message: "OK", status: 200, pages, total: count, data: rows})
        })
    } else {
        Item.findAll().then(items => {
            res.json({message: "OK", status: 200, data: items})
        }).catch(error => {
            res.status(500).json({message: "Internal Server Error", status: 500, data: error})
        })
    }
}

exports.item_detail = (req, res) => {
    Item.findByPk(req.params.id).then(item => {
        if (item === null) {
            return res.status(404).json({message: "Not Found", status: 404})
        }
        res.json({message: "OK", status: 200, data: item})
    }).catch(error => {
        res.status(500).json({message: "Internal Server Error", status: 500, data: error})
    })
}

exports.item_add = (req, res) => {
    Item.create(req.body).then(item => {
        res.status(201).json({message: "Created", status: 201, data: item})
    }).catch(error => {
        if (error instanceof ValidationError) {
            const errors = buildErrorMessage(error.errors)
            return res.status(400).json({message: "Bad Request", status: 400, errors})
        }
        res.status(500).json({message: "Internal Server Error", status: 500, data: error})
    })
}

exports.item_update = (req, res) => {
    const id = req.params.id
    Item.update(req.body, {
        where: {id: id}
    }).then(_ => {
        return Item.findByPk(id).then(item => {
            if (item === null) {
                return res.status(404).json({message: "Not Found", status: 404})
            }
            res.json({message: "OK", status: 200, data: item})
        })
    }).catch(error => {
        if (error instanceof ValidationError) {
            const errors = buildErrorMessage(error.errors)
            return res.status(400).json({message: "Bad Request", status: 400, errors})
        }
        res.status(500).json({message: "Internal Server Error", status: 500, data: error})
    })
}

exports.item_delete = (req, res) => {
    const id = req.params.id;
    Item.findByPk(id).then(deletedItem => {
        if (deletedItem === null) {
            return res.status(404).json({message: "Not Found", status: 404})
        }
        return Item.destroy({
            where: {id: deletedItem.id}
        }).then(_ => {
            res.json({message: "OK", status: 200, data: deletedItem})
        })
    }).catch(error => {
        res.status(500).json({message: "Internal Server Error", status: 500, data: error})
    })
}