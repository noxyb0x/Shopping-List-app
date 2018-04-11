const express = require('express');
const router = express.Router();
const Product = require('../models/product');

//get products from db
router.get('/products', function (req, res, next) {
    Product.find({}).then(function (products, err) {
        if (err)
            console.error(err);
        res.send(products);
    }).catch(next);
});

//add a product to db
router.post('/products', function (req, res, next) {
    Product.create(req.body).then(function (product) {
        console.log((new Date()).toTimeString() + ":: creating new product .." + product.name);
    }).catch(next);
    res.send("Post done");
});

//update
router.put('/products/:id', function (req, res, next) {
    Product.findById(req.params.id)
        .then(function (product, err) {
            if (err)
                console.error(err);
            product.cost = req.body.cost;
            product.quantity = req.body.quantity;
            product.name = req.body.name;
            product.save();
            console.log((new Date()).toTimeString() + ":: updating " + product.name);
            updated = true;
        }).catch(next);

    res.send("put handled");
});
//delete
router.delete('/products/:id', function (req, res, next) {
    Product.remove({ _id: req.params.id }).then(function () {
        console.log((new Date()).toTimeString() + ":: removing " + req.params.id);
    }).catch(next);
    res.send('delete done');
});
//export
module.exports = router;