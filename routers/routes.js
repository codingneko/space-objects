const search = require('../controllers/search');
const UserController = require('../controllers/UserController');

module.exports = function(router, data){
    router.get('/', (req, res) => {
        let result = [];
        let page = Number(req.query.p || 1) -1;
        let amount = req.query.c || 10;
        let query = req.query.q || '';

        if(query.slice(0, 1) == '!'){
            query = query.slice(1, query.length);
            result = search(query || '', data, {strict: true});
        }else{
            result = search(query || '', data);
        }

        if (result.length == 0){
            result = 'no results found';
        }else{
            result = result.slice(page * amount, (page + 1) * amount);
        }

        res.render('pages/index', {
            'data' : result,
            'page': req.query.p || 1,
            'amount': amount,
            'query': req.query.q || '',
            'location': req.header('Location') || '/'
        });
    });
    
    router.get('/object/:iod', (req, res) => {
        var result = [];
        for (var object of data) {
            if (object.id == req.params.iod){
    
                result.push(object);
            }
        }
        res.render('pages/object', {
            "data": result,
            "referer": req.header('Referer') || '/'
        });
    });

    router.get('/login', (req, res) => {
        res.render('pages/login');
    });

    router.get('/register', (req, res) => {
        res.render('pages/register');
    });

    router.post('/auth', (req, res) => {
        let result = {
            status: 1
        }

        UserController.save(req.body);

        result.status = 0;

        res.json(result);
    });
};