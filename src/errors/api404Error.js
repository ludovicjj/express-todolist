const BaseError = require('./baseError')

class Api404Error extends BaseError {
    /**
     * @param {{path: String, message: String}[]} errorsObj
     */
    constructor (
        errorsObj
    ) {
        super(errorsObj)
    }

}

module.exports = Api404Error