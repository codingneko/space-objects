const search = require('../controllers/search');

module.exports = function(router, data){
    router.get('/api', (req, res) => {
        var response = {
            error: 1,
            message: "please specify the parameters of your query i.e /limit/20 to return 20 objects"
        }
    
        res.json(response);
    });
    
    router.get('/api/limit/:amount', (req, res) => {
        res.json(data.slice(0, req.params.amount));
    });
    
    router.get('/api/limit/:amount/page/:page', (req, res) => {
        let amount = req.params.amount;
        let page = req.params.page - 1;
    
        res.json(data.slice(page * amount, (page + 1) * amount));
    });
    
    router.get('/api/object/:iod', (req, res) => {
        var result = [];
        for (var object of data) {
            if (object.INTLDES == req.params.iod){
                objectBuilder(object);
    
                result.push(object);
            }
        }
        
        res.json(result);
    });

    router.get('/api/search/:name', (req, res) => {
        var result = [];

        if(req.params.name.slice(0, 1) == '!'){
            req.params.name = req.params.name.slice(1, req.params.name.length);
            result = search(req.params.name || '', data, {strict: true});
        }else{
            result = search(req.params.name || '', data);
        }

        res.json(result);
    });
};