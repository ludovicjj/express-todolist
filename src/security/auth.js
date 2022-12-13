const fs = require("fs")
const publicKey = fs.readFileSync("./config/jwt/public.pem");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const authorization = req.headers.authorization

    if (!authorization) {
        return res.status(401).json({message: "Unauthorized", status: 401, errors: "Missing JWT token in request header"})
    }

    const token = authorization.split(' ')[1];

    jwt.verify(token, publicKey, { algorithms: ['RS256'] },(error, decodedToken) => {
        if (error) {
            return res.status(401).json({message: "Unauthorized", status: 401, errors: error})
        }
        const userId = decodedToken.userId

        if (req.body.userId && req.body.userId !== userId) {
            return res.status(401).json({message: "Unauthorized", status: 401, errors: "invalid signature"})
        } else {
            next();
        }
    })
}