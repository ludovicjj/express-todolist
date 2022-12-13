const { User } = require("../database/sequelize");
const bcrypt = require("bcrypt")

exports.user_login = (req, res) => {
    User.findOne({
        where: { username: req.body.username}
    }).then(user => {
        bcrypt.compare(req.body.password, user.password).then(isPasswordValid => {
            if (isPasswordValid) {
                return res.json({message: "OK", status: 200, data: user})
            } else {
                return res.json({message: "Not Found", status: 404, errors: "Invalid username or password"})
            }
        })
    })
}