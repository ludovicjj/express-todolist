class Pagination {
    /**
     * @param {number} page
     * @param {number} limit
     * @param {number} count
     * @param {any} req
     */
    constructor(page, limit, count, req) {
        this.page = page
        this.limit = limit
        this.totalResult = count
        this.offset = (this.page - 1) * limit
        this.maxPage = Math.round(this.totalResult / this.limit)
        this.fullurl = `${req.protocol}://${req.get('host')}${req.originalUrl}`
        this.pages = {}


        this.prevPage()
        this.currentPage()
        this.firstPage()
        this.nextPage()
        this.lastPage()
    }

    firstPage() {
        const url = new URL(this.fullurl)
        url.searchParams.set('page', '1')
        if (url.href !== this.pages.prev && url.href !== this.pages.current) {
            console.log(url.href)
            this.pages.first = url.href
        }
    }

    prevPage() {
        if (this.offset > 0 && this.offset < this.maxPage) {
            const url = new URL(this.fullurl)
            url.searchParams.set('page', (this.page - 1).toString())
            this.pages.prev = url.href
        }
    }

    currentPage() {
        const url = new URL(this.fullurl)
        url.searchParams.set('page', this.page.toString())
        this.pages.current =  url.href
    }

    nextPage() {
        if ((this.offset + this.limit) < this.totalResult) {
            const url = new URL(this.fullurl)
            url.searchParams.set('page', (this.page + 1).toString())
            this.pages.next = url.href
        }
    }

    lastPage() {
        const url = new URL(this.fullurl)
        url.searchParams.set('page', this.maxPage.toString())

        if (url.href !== this.pages.next && url.href !== this.pages.current) {
            this.pages.last = url.href
        }
    }

    get paginated() {
        const {first, ...rest} = this.pages
        return {
            pages: {first, ...rest}
        }
    }

}

module.exports = Pagination;