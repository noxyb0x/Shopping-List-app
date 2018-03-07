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
    //if same found, adjust quantity and/or price (could be upgraded with regex/pattern matching)
    Product.findOne({ 'name': req.body.name })
        .then(function (product, err) {
            if (err)
                return console.error(err); //improve to handle this error

            if (product != null) {
                product.quantity += req.body.quantity;
                product.cost = req.body.cost;
                product.save();
                console.log(req.body.name + " updated!");
            }
            else {
                Product.create(req.body).then(function (product) {
                    console.log("creating new product .." + product.name);
                }).catch(next);
            }
        }).catch(next)

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
            console.log(product);
            updated = true;
        }).catch(next);

    res.send("put handled");
});
//delete
router.delete('/products/:id', function(req, res, next){
    Product.findById(req.params.id)
    .then(function(product, err){
        if(err)
            console.error(err);
        product.remove();
        res.send(product);
    }).catch(next);
});
//export
module.exports = router;