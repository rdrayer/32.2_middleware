const express = require('express');
const itemsRoutes = require('./itemsRoutes');
const ExpressError = require('./expressError');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/items', itemsRoutes);
app.get('/favicon.ico', (req, res) => res.sendStatus(204));

app.use(function(req, res, next) {
    return new ExpressError("not found", 404);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    return res.json({
        error: err.message,
    });
});


module.exports = app;