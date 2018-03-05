const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//init app
const app = express();

//connect to db
mongoose.connect('mongodb://localhost/shoppingCartListDB');

//serve static files
app.use(express.static('public'));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/'));

//middleware setup below

//body-parser 

//init routes 

//error handling

//listen for requests
app.listen(process.env.port || 3000, function()
{
    console.log("listening for requests..");
});