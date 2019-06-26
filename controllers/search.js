module.exports = search;

/**
 * finds a string in an object array (object name must be in OBJECT_NAME field)
 * 
 * @param {String} terms 
 * @param {Array} array 
 * @param {Object} options 
 * 
 * @returns {Array} results
 */

function search (terms, array, options){
    options = options || {
        byId: false,
        strict: false,
        type: false
    };
    var result = [];
    
    if(options.byId){
        for(object of array){
            if(object.id == terms){
                result.push(object);
            }
        }
    }else{
        terms = terms.toLowerCase();
        var termsSplit = terms.split(' ');

        for (const object of array) {
            var name = object.name.toLowerCase();
            var type = object.type.toLowerCase();
                
            if(options.strict){
                if(options.type != false && type == options.type && name == terms){
                    result.push(object);
                }else if(name == terms && !options.type){
                    result.push(object)
                }
            }else{
                var found = 0;
                if(options.type != false && type == options.type){
                    for (const term of termsSplit) {
                        if(name.indexOf(term) != -1){
                            found++;
                        }
                    }
                }else if(!options.type){
                    for (const term of termsSplit) {
                        if(name.indexOf(term) != -1){
                            found++;
                        }
                    }
                }
                
                if(found > termsSplit.length-1)result.push(object);
            }
        }
    }
    
    
    return result;
}
