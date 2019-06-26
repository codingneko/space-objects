const search = require('../controllers/search');
const UserController = require('../controllers/UserController');

module.exports = function(router, data){
    router.get('/', (req, res) => {
        let result = [];
        let page = Number(req.query.p || 1) -1;
        let amount = req.query.c || 10;
        let query = req.query.q || '';

        let searchOptions = {
            byId: req.query.byId == 'on' ? true : false,
            strict: req.query.strict == 'on' ? true : false,
            type: req.query.objectType != 'payload' || req.query.objectType != 'rocket+body' || req.query.objectType != 'debris' ? false : req.query.objectType
        };

        result = search(query || '', data, searchOptions);

        if (result.length == 0){
            result = 'no results found';
        }else{
            result = result.slice(page * amount, (page + 1) * amount);
        }

        res.render('pages/index', {
            'data' : result,
            'searchOptions': searchOptions,
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

        let comments = UserController.readComments({
            oid: req.params.iod
        });
        
        res.render('pages/object', {
            "data": result,
            "referer": req.header('Referer') || '/',
            'user':  UserController.getCurrentUser(req.cookies.user).name,
            'sub': UserController.checkSub({ userId: user, objectId: req.params.iod }) ? "unsubscribe" : "subscribe",
            'comments': comments
        });
    });

    router.post('/object/:oid/comment', (req, res) => {
        let data = {
            content: req.body.content,
            oid: req.params.oid,
            uid: req.cookies.user
        }

        UserController.comment(data);

        res.redirect('/object/' + data.oid);
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
            "userId": user.id,
            "email": user.email
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
        if(req.body.password != req.body.passwordConfirm){
            res.redirect('/user/settings');
        }

        UserController.update({
            userName: req.body.username,
            password: req.body.password,
            email: req.body.email,
            userId: req.cookies.user
        });

        res.redirect('/');
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
