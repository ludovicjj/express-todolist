class BaseError extends Error {
    constructor (errors) {
        super()
        this.errors = errors
    }
}

module.exports = BaseError