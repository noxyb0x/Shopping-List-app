const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//init app
const app = express();

//connect to db
mongoose.connect('mongodb://localhost/shoppingCartListDB');

//serve static files
app.use(express.static('public'));
app.use('/scripts', express.static(__dirname + '/node_modules/'));
app.use('/controllers', express.static(__dirname + '/controllers'));

//middleware setup below

//body-parser 
app.use(bodyParser.json());
//init routes 
app.use('/api', require('./routes/api'));
//error handling
app.use(function(err, req, res, next){
    console.log(err);
    res.status(422).send({error: err.message});
});
//listen for request
app.listen(process.env.port || 3000, function()
{
    console.log((new Date()).toTimeString()+ " :: listening for requests..");
});