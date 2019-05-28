var title = document.getElementById('object-name').innerText;

if(title.lastIndexOf('R/B') != -1){
    document.getElementById('object-description').innerHTML += '<a href="/?q=' + title.split('R/B')[0] + '" data-toggle="tooltip" title="search in catalog">' + title.split('R/B')[0] + '</a> Rocket body';
}else if(title.lastIndexOf('DEB') != -1){
    document.getElementById('object-description').innerHTML += '<a target="_blank" data-toggle="tooltip" title="google search" href="https://www.google.com/search?q=' + title.split('DEB')[0] + '" >' + title.split('DEB')[0] + '</a> debris';
}else{
    title = title.split('(')[0].toLowerCase();
    title = title.split('/')[0].toLowerCase();
    title = title.charAt(0).toUpperCase() + title.slice(1);
    
    fetch('https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles='+title, {
        method: 'GET',
        mode: 'cors',
        credentials: 'same-origin'
    }).then((fetchData)=>{
            return fetchData.json();
        }).then(json => {
            articleId = Object.keys(json.query.pages)[0];
            if(typeof json.query.pages[articleId].extract != 'undefined'){
                if(json.query.pages[articleId].extract.length > 1000) document.getElementById('object-description').innerHTML += '(TL;DR. <a href="#TLE-data">Go to Orbital data</a>) ';
                document.getElementById('object-description').innerHTML += json.query.pages[articleId].extract + '<span style="font-size: 12px;"> ' + '<a href="https://en.wikipedia.org/wiki/' + title + '">' + ' [show full wikipedia article] </a></span>';
            } else {
                document.getElementById('object-description').innerHTML += 'Wikipedia does not appear to have an article about this object (or we couldn\'t guess the name of it), please google it instead <a target="_blank" href="https://www.google.com/search?q=' + title.split('R/B')[0] + '">' + title.split('R/B')[0] + '</a>';
            }
        });
}