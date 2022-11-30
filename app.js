const express = require('express');
const item_routes = require('./route/itemRoute');
const session = require('cookie-session'); // session middleware
const app = express();
const port = 8080

app
    // define secret to cookies session
    .use(session({secret: 'appsecret'}))
    // define static dir (img/js/css)
    .use(express.static(__dirname + "/public"))
    // set default value to session.items
    .use((req, res, next)=> {
        if (req.session.items === undefined) {
            req.session.items = [];
        }
        next();
    })
    .use(item_routes)
    .listen(port, () => console.log(`Server run on : http://localhost:${port}`));