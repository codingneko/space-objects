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
        strict: false
    };
    var result = [];
    
    terms = terms.toLowerCase();
    var termsSplit = terms.split(' ');

    for (const object of array) {
        var name = object.name.toLowerCase();
               
        if(options.strict){
            if(name.indexOf(terms) != -1){
                result.push(object);
            }
        }else{
            var found = 0;
            for (const term of termsSplit) {
                if(name.indexOf(term) != -1){
                    found++;
                }
            }
            if(found > termsSplit.length-1)result.push(object);
        }
    }
    
    return result;
}