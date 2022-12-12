const Helper = require('./PaginationHelper')
let HelperInstance = new WeakMap();
class Pagination {
    /**
     * @param {number} page
     * @param {number} limit
     * @param {number} total
     * @param {any} req
     */
    constructor(page, limit, total, req) {
        this.page = page
        this.limit = limit
        this.totalResult = total
        this.maxPage = Math.ceil(this.totalResult / this.limit)
        this.fullurl = `${req.protocol}://${req.get('host')}${req.originalUrl}`

        this.pages = [];
        HelperInstance.set(this, new Helper(this.pages));
        this.currentPage()

        this.firstPage();
        this.prevPage()

        this.lastPage()
        this.nextPage()
    }

    currentPage() {
        if (this.page > this.maxPage) {
            return
        }
        const url = new URL(this.fullurl)
        url.searchParams.set('page', this.page.toString())

        this._addUrl({ name: "current", url: url.href, priority: 3 })
    }

    firstPage() {

        if ( (this.page <= 1) || (this.page > this.maxPage) ) {
            return;
        }
        const url = new URL(this.fullurl)
        url.searchParams.set('page', '1')

        this._addUrl({ name: "first", url: url.href, priority: 1 })
    }

    prevPage() {
        if ( (this.page <= 2) || (this.page > this.maxPage) ) {
            return;
        }
        const url = new URL(this.fullurl)
        url.searchParams.set('page', (this.page - 1).toString())
        this._addUrl({ name:"prev", url:url.href, priority:2 })
    }

    lastPage() {
        if (this.page >= this.maxPage) {
            return;
        }

        const url = new URL(this.fullurl)
        url.searchParams.set('page', this.maxPage.toString())
        this._addUrl({ name:"last", url:url.href, priority:5 })
    }

    nextPage() {
        if (this.page >= (this.maxPage - 1)) {
            return
        }
        const url = new URL(this.fullurl)
        url.searchParams.set('page', (this.page + 1).toString())
        this._addUrl({ name: "next", url: url.href, priority: 4 })
    }

    _addUrl(url) {
        this.pages.push(url)
    }

    _orderAndReducePages() {
        return HelperInstance.get(this)
            .orderByPriority()
            .reduce((acc, page) => ({...acc, ...{[page.name]: page.url}}), {})
    }

    getPaginatedLinks() {
        return this._orderAndReducePages()
    }

}

module.exports = Pagination;