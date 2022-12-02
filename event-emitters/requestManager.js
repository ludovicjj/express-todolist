const EventEmitter = require("events");

class RequestManager extends EventEmitter {

    handleErrors(errors) {
        this.emit("handleErrors", errors);
    }
}

module.exports = RequestManager