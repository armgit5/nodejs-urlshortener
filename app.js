const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const urlController = require('./controllers/url');

app.set('view engine', 'ejs');
app.set('views', 'views');

// For parsing request body
app.use(bodyParser.urlencoded({extended: false}));

// Render index page
app.get('/', urlController.getIndex);
app.post('/', urlController.postUrl);

// Handling page not found
app.use((req, res, next) => { 
    res.status(404).send('<h1>Page not found</h1>');
});

app.listen(3000);