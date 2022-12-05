const express = require('express');
const item_routes = require('./route/itemRoute');
const morgan = require('morgan');
const favicon = require('serve-favicon');
const { Sequelize } = require('sequelize');

const app = express();
const port = 8080;
const sequelize = new Sequelize('mariadb://root:root@localhost:3306/todo_db', {
    logging: false,
    dialectOptions: {
        timezone: '+01:00'
    }
});

sequelize.authenticate()
    .then(_ => {
        console.log('Connection has been established successfully.');
    }).catch(error => {
        console.error('Unable to connect to the database:', error);
    })


app
    .use(favicon(__dirname + "/public/favicon.ico"))
    .use(morgan('dev'))
    .use(express.static(__dirname + "/public"))
    .use(express.json())
    // middleware router
    .use("/api", item_routes)
    .listen(port, () => console.log(`Server run on : http://localhost:${port}`));