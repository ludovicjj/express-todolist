class BaseError extends Error {
    constructor (message) {
        super(message)
        this.message = message

    }
}

module.exports = BaseError