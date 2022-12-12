class PaginationHelper {
    constructor(pages) {
        this.pages = pages
    }

    orderByPriority() {
        return this.pages.sort((a, b) => {
            return a.priority - b.priority
        })
    }
}

module.exports = PaginationHelper