const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const ejsLayouts = require('express-ejs-layouts');
const objectBuilder = require('./object-builder');
const app = express();
const port = process.env.PORT || 8080;


//load data
let data = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'object_data.json')));

objectBuilder(data);

//middleware
app.use(cors());
app.use(ejsLayouts);

//define render engine (ejs)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layouts/app');

//api setup
app.get('/api', (req, res) => {
    var response = {
        error: 1,
        message: "please specify the parameters of your query i.e /limit/20 to return 20 objects"
    }

    res.json(response);
});

app.get('/api/limit/:amount', (req, res) => {
    res.json(data.slice(0, req.params.amount));
});

app.get('/api/limit/:amount/page/:page', (req, res) => {
    let amount = req.params.amount;
    let page = req.params.page - 1;

    res.json(data.slice(page * amount, (page + 1) * amount));
});

app.get('/api/object/:iod', (req, res) => {
    var result = [];
    for (var object of data) {
        if (object.INTLDES == req.params.iod){
            objectBuilder(object);

            result.push(object);
        }
    }
    
    res.json(result);
});

//front end setup
app.get('/', (req, res) => {
    res.redirect('/page/1');
});

app.get('/page/:page', (req, res) => {
    let page = req.params.page - 1;
    res.render('pages/index', {
        'data': data.slice(page * 10, (page + 1) * 10),
        'page': req.params.page
    });
});

app.get('/limit/:amount/page/:page', (req, res) => {
    let amount = req.params.amount;
    let page = req.params.page - 1;

    res.render('pages/index', {
        'data': data.slice(page * amount, (page + 1) * amount),
        'page': req.params.page
    });
});

app.get('/object/:iod', (req, res) => {
    var result = [];
    for (var object of data) {
        if (object.INTLDES == req.params.iod){

            result.push(object);
        }
    }
    res.render('pages/object', {
        "data": result,
        "referer": req.header('Referer') || '/'
    });
})

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => console.log(`Server started, listening on port ${port}!`));