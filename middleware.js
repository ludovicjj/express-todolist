exports.logger = (req, res, next) => {
    console.log(`URI : ${req.url}`)
    next()
}