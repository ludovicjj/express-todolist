exports.initSessionItem = (req, res, next) => {
    if (req.session.item === undefined) {
        req.session.item = [];
    }
    next();
}