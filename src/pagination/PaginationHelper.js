class PaginationHelper {
    constructor(pages) {
        this.pages = pages
    }

    orderByPriority() {
        this.pages.sort((a, b) => {
            return a.priority - b.priority
        })
    }

    getPageUrlByName(name) {
        let flag = null
        this.pages.forEach(page => {
            if (page.name === name) {
                flag = {...page}
            }
        })
        return flag
    }
}

module.exports = PaginationHelper