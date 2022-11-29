const express = require('express');
const session = require('cookie-session'); // session middleware
const bodyParser = require('body-parser'); // parameters middleware

const urlencodedParser = bodyParser.urlencoded({ extended: false }) // create application/x-www-form-urlencoded parser
const jsonParser = bodyParser.json() // create application/json parser

const app = express();
app
    .use(session({ secret: 'todolistsercret' }))
    .use(express.static(__dirname + '/public'))
    .use((req, res, next) => {
        if (req.session.todolist === undefined) {
            req.session.todolist = [];
        }
        next();
    })
    .get('/todo', (req, res) => {
        /**
         * TODO :
         * render template with session.todolist as argument
         **/
    })
    .post('/todo', urlencodedParser, (req, res) => {
        /**
         * TODO :
         *  get parameters from form.
         *  Update session.todolist
         *  Redirect to url '/todo'
         **/
    })
    .put('/todo', jsonParser, (req, res) => {
        /**
         * TODO :
         *  Get json from request.body (AJAX)
         *  Update session.todolist
         */
    })
    .get('/todo/:id', (req, res) => {
        /**
         * TODO :
         *  get parameters id from request.
         *  Update session.todolist
         *  Redirect to url '/todo'
         */
    })
    .listen(8080);