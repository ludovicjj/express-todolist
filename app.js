const express = require('express');
const session = require('cookie-session'); // session middleware
const bodyParser = require('body-parser'); // parameters middleware

const urlencodedParser = bodyParser.urlencoded({ extended: false }) // create application/x-www-form-urlencoded parser
const jsonParser = bodyParser.json() // create application/json parser

const app = express();
app
    .use(session({ secret: 'todolistsercret' }))
    .get('/todo', (req, res) => {

    })
    .post('/todo', urlencodedParser, (req, res) => {
    })
    .put('/todo', jsonParser, (req, res) => {

    })
    .get('/todo/:id', (req, res) => {

    })
    .listen(8080);