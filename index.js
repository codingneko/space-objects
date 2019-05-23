const express = require('express');
const path = require('path');
const cors = require('cors');
const ejsLayouts = require('express-ejs-layouts');
const routes = require('./routers/routes');
const api = require('./routers/api');
const app = express();
const port = process.env.PORT || 8080;
const shell = require('shelljs');
const BodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config({
    silent:true
});

const username = process.env.ST_USERNAME;
const password = process.env.ST_PASSWORD;

//initual data update
console.log('Attempting to connect with the following credentials');
console.log('username: ' + username);
console.log('password: ' + password);
//shell.exec('./updateScript.sh ' + username + ' ' + password).stdout;

const data = require('./controllers/object-builder');

//middleware
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(ejsLayouts);
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//define render engine (ejs)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layouts/app');

//api setup
api(app, data);

//front end setup
routes(app, data);

//server startup
app.listen(port, () => console.log(`Server started, listening on port ${port}!`));

//update data every day
setInterval(() => {
    shell.exec('./updateScript.sh ' + username + ' ' + password, {async: true}).stdout;
}, 1000*60*60*24);