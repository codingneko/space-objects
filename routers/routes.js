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
            'user':  UserController.getCurrentUser(req.cookies.user).name
        });
    });
    
    router.get('/object/:iod', (req, res) => {
        var result = [];
        let user = req.cookies.user;
        for (var object of data) {
            if (object.id == req.params.iod){
    
                result.push(object);
            }
        }

        res.render('pages/object', {
            "data": result,
            "referer": req.header('Referer') || '/',
            'user':  UserController.getCurrentUser(req.cookies.user).name,
            'sub': UserController.checkSub({ userId: user, objectId: req.params.iod }) ? "unsubscribe" : "subscribe"
        });
    });

    router.get('/login', (req, res) => {
        res.render('pages/login', {
            'user':  UserController.getCurrentUser(req.cookies.user).name
        });
    });

    router.get('/register', (req, res) => {
        res.render('pages/register', {
            'user':  UserController.getCurrentUser(req.cookies.user).name
        });
    });

    router.get('/logout', (req, res) => {
        res.clearCookie('user');
        res.redirect('/');
    });

    router.get('/user/settings', (req, res) => {
        let user = UserController.getCurrentUser(req.cookies.user);
        res.render('pages/settings', {
            "user":  user.name,
            "userId": user.id
        });
    });

    router.post('/auth', (req, res) => {

        if(req.body.request == 'register'){
            let result = {
                status: 1,
                user: 0
            }
    
            result.user = UserController.save(req.body);
            
            if(result.user != undefined){
                console.log(result.user.name + 'has been added to the database');
                result.status = 0;
            }else{
                result.status = 1;
            }
            
    
            res.json(result);
        }else if(req.body.request == 'login'){
            let result = {
                status: 1,
                user: 0
            }

            result.user = UserController.login(req.body);
            if(!result.user)result.status = 403; else result.status = 0;
            console.log(result.user.name + 'logged in');
            res.json(result);
        }
    });

    router.post('/user/settings/handle', (req, res) => {
        let password = req.body.password;
        let username = req.body.username;
        let email = req.body.email;
    });

    router.get('/user/home', (req, res) =>  {
        let user = UserController.getCurrentUser(req.cookies.user).id;
        let objects = UserController.getObjects({
            userId: user,
            objects: data
        });

        let userName = UserController.getCurrentUser(req.cookies.user).name;

        res.render('pages/home', {
            'user': userName,
            'data': objects
        });
    });

    router.get('/user/:sub/:oid', (req, res) => {
        UserController.subscribe({
            userId: req.cookies.user,
            objectId: req.params.oid,
            sub: req.params.sub
        });

        res.redirect('/object/' + req.params.oid);
    });
};