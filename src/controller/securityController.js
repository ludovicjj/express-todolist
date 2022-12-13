const { User } = require("../database/sequelize");
const bcrypt = require("bcrypt")

exports.user_login = (req, res) => {
    User.findOne({ where: { username: req.body.username } }).then(user => {
        if (!user) {
            return res.status(401).json({ message: "Unauthorized", status: 401, errors: "Invalid username or password" })
        }

        bcrypt.compare(req.body.password, user.password).then(isPasswordValid => {
            if (!isPasswordValid) {
                return res.status(401).json({message: "Unauthorized", status: 401, errors: "Invalid username or password"})
            }

            return res.json({message: "OK", status: 200, data: user})
        })
    }).catch(error => {
        return res.status(500).json({message: "Internal Server Error", status: 500, data: error})
    })
}