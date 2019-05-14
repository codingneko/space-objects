const express = require('express');
const path = require('path');
const cors = require('cors');
const ejsLayouts = require('express-ejs-layouts');
const routes = require('./routers/routes');
const api = require('./routers/api');
const app = express();
const port = process.env.PORT || 8080;
const data = require('./controllers/object-builder');
const shell = require('shelljs');

//initual data update
shell.exec('./updateScript.sh').stdout;

//middleware
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(ejsLayouts);

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
    shell.exec('./updateScript.sh', {async: true}).stdout;

}, 1000*60*60*24);