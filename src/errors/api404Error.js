const BaseError = require('./baseError')

class Api404Error extends BaseError {
    constructor (
        message
    ) {
        super(message)
    }

}

module.exports = Api404Error