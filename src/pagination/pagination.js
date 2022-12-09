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
        this.offset = (this.page - 1) * limit
        this.maxPage = Math.round(this.totalResult / this.limit)
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
        let currentUrl = this._getUrl("current")

        if (!currentUrl) {
            return
        }
        const url = new URL(this.fullurl)
        url.searchParams.set('page', '1')

        if (url.href === this._getUrl("current")) {
            return;
        }

        this._addUrl({ name: "first", url: url.href, priority: 1 })
    }

    prevPage() {
        let currentUrl = this._getUrl("current")
        if (!currentUrl) {
            return
        }

        if (this.offset > 0) {
            const url = new URL(this.fullurl)
            url.searchParams.set('page', (this.page - 1).toString())

            if (url.href !== this._getUrl("first")) {
                this._addUrl({ name:"prev", url:url.href, priority:2 })
            }
        }
    }

    lastPage() {
        let currentUrl = this._getUrl("current")

        if (!currentUrl) {
            return
        }

        const url = new URL(this.fullurl)
        url.searchParams.set('page', this.maxPage.toString())

        if (url.href !== this._getUrl("current")) {
            this._addUrl({ name:"last", url:url.href, priority:5 })
        }
    }

    nextPage() {
        if ((this.offset + this.limit) < this.totalResult) {
            const url = new URL(this.fullurl)
            url.searchParams.set('page', (this.page + 1).toString())

            if (url.href !== this._getUrl("last")) {
                this._addUrl({ name: "next", url: url.href, priority: 4 })
            }
        }
    }

    _addUrl(url) {
        this.pages.push(url)
    }

    _orderAndReducePages() {
        HelperInstance.get(this).orderByPriority();

        return this.pages.reduce((acc, page) => {
            let link = {[page.name]: page.url};
            return {...acc, ...link}
        }, {})
    }

    _getUrl(name) {
        let result = HelperInstance.get(this).getPageUrlByName(name)

        if (result) {
            return result.url
        }

        return null
    }

    getPaginatedLinks() {
        return this._orderAndReducePages()
    }

}

module.exports = Pagination;