const express = require('express');
const router = new express.Router();
const items = require('./fakeDb');
const ExpressError = require('./expressError');

router.get('/', function(req, res) { 
    return res.send(items);
});

router.get('/:name', function(req, res, next) {
    try {
        let paramName = req.params.name;
        let matchedObject = items.find(item => item.name === paramName);
        if (matchedObject) {
            return res.send(matchedObject);
        }
        else {
            throw new ExpressError("not found", 404);
        }
    }
    catch (e){
        return next(e)
    }


});

router.post('/', function(req, res) {
    items.push(req.body);
    return res.send(req.body);
});

router.patch('/:name', function(req,res) {

});

router.delete('/:name', function(req, res, next) {
    try {
        const item = items.find(i => i.name === req.params.name);
        const itemID = items.indexOf(item);
        if (itemID != -1) {
            items.splice(itemID, 1)
            return res.json({ message: "Deleted"});
        }
        else {
            throw new ExpressError("not found", 404);
        }

    }
    catch (e) {
        return next(e)
    }
});

module.exports = router;

