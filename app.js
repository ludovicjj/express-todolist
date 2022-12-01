const express = require('express');
const item_routes = require('./route/itemRoute');
const morgan = require('morgan');
const favicon = require('serve-favicon');
const app = express();
const port = 8080

app
    .use(favicon(__dirname + "/public/favicon.ico"))
    .use(morgan('dev'))
    .use(express.static(__dirname + "/public"))
    .use(express.json())
    // middleware router
    .use("/api", item_routes)
    .listen(port, () => console.log(`Server run on : http://localhost:${port}`));