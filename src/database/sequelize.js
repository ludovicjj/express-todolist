const { Sequelize, DataTypes } = require('sequelize');
const itemModel = require('../models/item');
const userModel = require('../models/user');
const itemFixture = require('../fixtures/fixture_items');
const bcrypt = require('bcrypt');

// connection
const sequelize = new Sequelize('mariadb://root:root@localhost:3306/todo_db', {
    logging: false,
    dialectOptions: {
        typeCast: function (field, next) { // for reading from database
            if (field.type === 'DATETIME') {
                return field.string();
            }
            return next()
        },
    },
    timezone: 'Europe/Paris' // writing to database
});

// init model
const Item = itemModel(sequelize, DataTypes)
const User = userModel(sequelize, DataTypes)

// init database
const initDatabase = () => {
    // Synchronizing all models at once
    sequelize.sync({force: true}).then(_ => {
        // insert items from fixture
        itemFixture.map(item => {
            Item.create({
                title: item.title,
                content: item.content,
                categories: item.categories,
                published: item.published
            })
        })

        // Insert user
        bcrypt.hash("admin", 10)
            .then(hash => User.create({ username: "admin", password: hash}))
        console.log('Synchronized database and insert data with success')
    })
}

module.exports = {
    initDatabase,
    Item,
    User
}
