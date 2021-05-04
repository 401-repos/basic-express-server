'use strict';

const express = require('express');
const app = express();
const errorHandler = require('./error/500.js');
const notFound = require('./error/404.js');
const looger = require('./middlewares/logger.js');
const validator = require('./middlewares/validator.js');
const clothesRoute = require('./routes/router-clothes.js');
const foodRoute = require('./routes/router-food.js');

app.use(express.json());
app.use(looger);
app.use('/',clothesRoute);
app.use('/',foodRoute);

app.get('/', (req, res) => {
    res.status(200).send('Welcome home');
});

app.get('/person',validator, (req, res) => {
    res.json({
        name: req.query.name
    });
});


app.use('*', notFound);
app.use(errorHandler);

const run = (port) => {
    app.listen(port, () => {
       console.log(`Listening on ${port}`); 
    });
}

module.exports = {
    app,
    run
}