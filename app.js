const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.post('/product', (req, res, next) => { 
    console.log(req.body);
});

app.use((req, res, next) => { 
    res.status(404).send('<h1>Page not found</h1>');
});

app.listen(3000);