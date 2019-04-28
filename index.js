const express = require('express');
const path = require('path');
const cors = require('cors');
const ejsLayouts = require('express-ejs-layouts');
const routes = require('./routes');
const api = require('./api');
const app = express();
const port = process.env.PORT || 8080;
const data = require('./object-builder');

//middleware
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(ejsLayouts);

//define render engine (ejs)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layouts/app');

//server startup
app.listen(port, () => console.log(`Server started, listening on port ${port}!`));

//api setup
api(app, data);

//front end setup
routes(app, data);