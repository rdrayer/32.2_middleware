const express = require('express');
const items = require('./fakeDb');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/items', function(req, res) { 
    return res.send(items);
});

app.get('/items/:name', function(req, res) {
    console.log(req.params);
    return res.send('name')
})

app.post('/items', function(req, res) {
    items.push(req.body);
    return res.send(req.body);
});

app.patch('/items', function(req,res) {

});

app.delete('/items', function(req, res) {

});

app.listen(3000, function() {
    console.log('app on port 3000');
})