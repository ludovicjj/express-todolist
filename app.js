const express = require('express');
const item_routes = require('./src/route/itemRoute');
const security_routes = require('./src/route/securityRoute');
const favicon = require('serve-favicon');
const sequelize = require('./src/database/sequelize')

const app = express();
const port = process.env.PORT || 3000;

sequelize.initDatabase();

app
    .use(favicon(__dirname + "/public/favicon.ico"))
    .use(express.static(__dirname + "/public"))
    .use(express.json())
    .use("/api", item_routes)
    .use("/api", security_routes)
    .use(({ res }) => {
        const message = "Ressource Not found";
        res.status(404).json({message})
    })
    .listen(port, () => console.log(`Server run on : http://localhost:${port}`));