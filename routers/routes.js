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
            'location': req.header('Location') || '/',
            'user':  UserController.getCurrentUser(req.cookies.user)
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
            "referer": req.header('Referer') || '/',
            'user':  UserController.getCurrentUser(req.cookies.user)
        });
    });

    router.get('/login', (req, res) => {
        res.render('pages/login', {
            'user':  UserController.getCurrentUser(req.cookies.user)
        });
    });

    router.get('/register', (req, res) => {
        res.render('pages/register', {
            'user':  UserController.getCurrentUser(req.cookies.user)
        });
    });

    router.post('/auth', (req, res) => {

        if(req.body.request == 'register'){
            let result = {
                status: 1,
                userId: 0
            }
    
            result.userId = UserController.save(req.body);
            
            if(result.userId != undefined){
                console.log(result.userId + 'has been added to the database');
                result.status = 0;
            }else{
                result.status = 1;
            }
            
    
            res.json(result);
        }else if(req.body.request == 'register'){
            console.log('trying to log in');
        }
    });
};