const { Item } = require("../database/sequelize");
const { Op } = require("sequelize");
const Pagination = require('../pagination/pagination');
const Api404Error = require('../errors/api404Error')

class SearchItem {
    constructor() {
        this.page= null;
        this.limit = null
        this.query = {
            where: {}
        }
        this.allowedField = ["title","content", "published"]
    }

    /**
     * @param {Object} request
     */
    search(request) {
        this.initializeQueryParams(request.query)
        return this.buildQuery(request.query).then(_ => {
            return this.loadFromDatabase(this.query, request)
        })
    }

    initializeQueryParams({page, limit}) {
        this.page = parseInt(page) || 1
        this.limit = parseInt(limit) || 3
    }

    buildQuery({ page, limit, ...searchQueryParams }) {
        let searchParams = Object.entries(searchQueryParams);
        let searchParamFilter = searchParams.filter(([key, _]) => this.allowedField.includes(key))

        for (const [key, value] of searchParamFilter) {
            if (key === 'title' && value.length <= 2) {
                return Promise.reject(new Api404Error("Search field title required at least 3 letters"));
            }

            if (key === 'published') {
                this.query.where[key] = value.toLocaleString() === 'true'
            } else {
                this.query.where[key] = {[Op.like]:`%${value}%`}
            }

        }

        this.query.limit = this.limit
        this.query.offset = (this.page - 1) * this.limit
        return Promise.resolve()
    }

    /**
     *
     * @param {Object} query    The object used for the query from model
     * @param {Object} request  The Request object
     */
    loadFromDatabase(query, request) {
        return Item.findAndCountAll(query).then(({rows, count}) => {
            const pagination = new Pagination(this.page, this.limit, count, request)
            const links = pagination.getPaginatedLinks();

            return {total: count, pages: links, data: rows}
        })
    }

}

module.exports = SearchItem