const express = require('express');
const item_routes = require('./route/itemRoute');
const session = require('cookie-session'); // session middleware
const morgan = require('morgan')
const app = express();
const port = 8080

app
    // middleware cookies session
    .use(session({secret: 'appsecret'}))
    // middleware log req info
    .use(morgan('dev'))
    // middleware define static dir (img/js/css)
    .use(express.static(__dirname + "/public"))
    // middleware router
    .use("/api", item_routes)
    .listen(port, () => console.log(`Server run on : http://localhost:${port}`));