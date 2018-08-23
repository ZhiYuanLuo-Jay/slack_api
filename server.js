// Load the express module and store it in the variable express (Where do you think this comes from?)
var express = require("express");

// invoke express and store the result in the variable app
var app = express();

// The simplified HTTP request client 'request' with Promise support.
// var request = require('request');
var rp = require('request-promise');

// require body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

// this is the line that tells our server to use the "/static" folder for static content
app.use(express.static(__dirname + "/static"));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// 1
app.post('/greeting', function(req, res) {  
    res.send('Hi Welcome to Slack Command API Services!');
})

// 2
app.post('/cnhello', function(req, res) {
    res.send("罗智元， 您好， 你真棒!")  
})

// 3
app.post('/pokemon', function(req, res){
    console.log("req===========:", req.body)
    id = req.body.text

    // Promise to get API data
    link = "https://pokeapi.co/api/v2/pokemon/"
    var options = {
        method: 'get',
        uri: link + id,
        body: {
            some: 'data~~~'
        },
        json: true // Automatically stringifies the body to JSON
    };

    rp(options)
    .then(function (options) {
        console.log("Pokemon's name: " + options.name, ", Ability: " + options.abilities[0].ability.name)
        res.send("Pokemon's name: " + options.name)
    })
    .catch(function (err) {
        console.log("Error~~~")
    });
})

// 4
app.post('/houses', function(req, res){
    console.log("req===========:", req.body)
    id = req.body.text

    // Promise to get API data
    link = "https://www.anapioficeandfire.com/api/houses"
    var options = {
        method: 'get',
        uri: link + id,
        body: {
            some: 'data~~~'
        },
        json: true // Automatically stringifies the body to JSON
    };

    rp(options)
    .then(function (options) {
        console.log("At House: " + options.name)
        res.send("At House: " + options.name)
    })
    .catch(function (err) {
        console.log("Error~~~")
    });
})


const port = process.env.PORT || 8000
app.listen(port, function() {
    console.log("listening on port: " + 8000);
})

