
const urls = []; // For storing urls temporarily

// Get method
exports.getIndex = (req, res, next) => {
    res.render('index', {oldUrl: '', newUrl: '', posted: false, error: ''});
}

// Post method
exports.postUrl = (req, res, next) => {

    const url = req.body.url;
    res.render('index', {oldUrl: '', newUrl: '', posted: true, error: ''});
}