const BaseError = require('./baseError')

class Api404Error extends BaseError {
    /**
     * @param {Array} errors
     */
    constructor (
        errors
    ) {
        super(errors)
    }

}

module.exports = Api404Error