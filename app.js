const express = require('express');
const item_routes = require('./route/itemRoute');
const session = require('cookie-session');
const morgan = require('morgan');
const favicon = require('serve-favicon');
const app = express();
const port = 8080

app
    .use(session({secret: 'appsecret'}))
    .use(favicon(__dirname + "/public/favicon.ico"))
    .use(morgan('dev'))
    .use(express.static(__dirname + "/public"))
    // middleware router
    .use("/api", item_routes)
    .listen(port, () => console.log(`Server run on : http://localhost:${port}`));