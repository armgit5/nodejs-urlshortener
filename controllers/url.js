
const url2id = {}; // Store long url to short url dictionary
const url2shortUrl = {};
let id = 100; // Starting id of the short url 
                  // assuming there are 100 records already

// Get method
exports.getIndex = (req, res, next) => {
    res.render('index', {oldUrl: '', newUrl: '', posted: false, error: ''});
}

// Get by Id methond
// Id is short url id
// return long url
exports.getIndexById = (req, res, next) => {
    const id = req.params.id;
    res.render('index', {oldUrl: '', newUrl: '', posted: false, error: ''});
}

// Post method
exports.postUrl = (req, res, next) => {
    const url = req.body.url;
    const newUrl = _shortenUrlBase62(url);
    res.render('index', {oldUrl: url, newUrl: newUrl, posted: true, url2shortUrl: url2shortUrl, error: ''});
}


// Helper functions
const _shortenUrlBase62 = (originalUrl) => {

    let shortenUrl = '';

    // If original url is already in the existing url2id dictionary
    if (originalUrl in url2id) {
        const idInDict = url2id[originalUrl];
        shortenUrl = _encode(idInDict);
    } else {
        url2id[originalUrl] = id; // add original url to url2id dictionary
        shortenUrl = _encode(id);
        url2shortUrl[originalUrl] = 'localhost:3000/' + shortenUrl; // add to short url list
        id++;
    }

    return 'localhost:3000/' + shortenUrl;
};

const _encode = (id) => {
    const characters = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const base = characters.length; // Numbers of characters or 62

    const returnList = [];

    // Loop to find the index of id in characters
    // id 0-61 = 0-Z, if id = 61 -> return is Z
    while (id > 0) {
        const val = id % base; // Remainder 
        returnList.unshift(characters[val]); // Push highest remainder front of the list
        id = Math.floor(id / base);
    }

    return returnList.join('');
}