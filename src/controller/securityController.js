const { User } = require("../database/sequelize");
const bcrypt = require("bcrypt");
const fs = require("fs")
const jwt = require("jsonwebtoken");
const secret = require("../../config/jwt/secret")
const privateKey = fs.readFileSync("./config/jwt/private.pem");


exports.user_login = (req, res) => {
    User.findOne({ where: { username: req.body.username } }).then(user => {
        if (!user) {
            return res.status(401).json({ message: "Unauthorized", status: 401, errors: "Invalid username or password" })
        }

        bcrypt.compare(req.body.password, user.password).then(isPasswordValid => {
            if (!isPasswordValid) {
                return res.status(401).json({message: "Unauthorized", status: 401, errors: "Invalid username or password"})
            }

            // JWT
            const token = jwt.sign(
                { userId: user.id },
                {key: privateKey, passphrase: secret},
                { expiresIn: "1h", algorithm: "RS256" }
            )

            return res.json({message: "OK", status: 200, token})
        })
    }).catch(error => {
        return res.status(500).json({message: "Internal Server Error", status: 500, data: error})
    })
}