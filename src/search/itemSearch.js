const { Item } = require("../database/sequelize");
const { Op } = require("sequelize");
const Pagination = require('../pagination/pagination');
const Api404Error = require('../errors/api404Error');

const allowedSearchField = ["title","content", "published"]


/**
 * @param {Object} request The Request object
 */
module.exports = function search (request) {
    return buildQuery(request.query).then((query) => loadFromDatabase(query, request))
}

function buildQuery({ page, limit, ...searchQueryParams }) {
    return new Promise((resolve, reject) => {
        // Init query and errors
        let query = {};
        let errors = []

        // Fetch query params page and limit
        let queryPage = Math.abs(parseInt(page)) || 1;
        let queryLimit = Math.abs(parseInt(limit)) || 3;

        // Filter queryParams input
        let searchParamFilter = Object.entries(searchQueryParams)
            .filter(([key]) => allowedSearchField.includes(key))
            .reduce((acc, [key, value]) => ({...acc, [key]: value}), {})

        // Build operation AND
        query.where = { [Op.and]: [] }
        for (const key in searchParamFilter) {
            let value = searchParamFilter[key];

            if (key === 'title' && value.length < 3) {
                errors.push({path: "title", message: "Search field title required at least 3 letters"})
            }

            if (key === 'published') {
                query.where[Op.and].push({ [key]: value === 'true' })
            } else {
                query.where[Op.and].push({ [key]: {[Op.like]: `%${value}%`} })
            }
        }

        // Add limit, offset, page to query
        query.limit = queryLimit;
        query.offset = (queryPage - 1) * queryLimit;
        query.page = queryPage

        if (errors.length > 0) {
            reject(new Api404Error(errors));
        }

        resolve(query);
    })
}

function loadFromDatabase(query, request) {
    return Item.findAndCountAll(query).then(({rows, count}) => {
        const pagination = new Pagination(query.page, query.limit, count, request)
        let links = pagination.getPaginatedLinks();
        return {total: count, pages: links, data: rows}
    })
}