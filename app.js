const express = require('express');
const item_routes = require('./src/route/itemRoute');
const morgan = require('morgan');
const favicon = require('serve-favicon');
const sequelize = require('./src/database/sequelize')

const app = express();
const port = 8080;

sequelize.initDatabase();

app
    .use(favicon(__dirname + "/public/favicon.ico"))
    .use(morgan('dev'))
    .use(express.static(__dirname + "/public"))
    .use(express.json())
    .use("/api", item_routes)
    .listen(port, () => console.log(`Server run on : http://localhost:${port}`));