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

// 1st, slash command - /greeting
app.post('/greeting', function(req, res) {  
    res.send('Hi Welcome to Slack Command API Services!');
})

// 2nd, slash command - /chhello
app.post('/cnhello', function(req, res) {
    res.send("罗智元， 您好， 你真棒!")  
})

// 3th, slash command - /pokemon
// how to use ------------------------------>     /pokemon 1
app.post('/pokemon', function(req, res){
    console.log("req===========:", req.body)
    let id = req.body.text

    // Promise to get API data
    let link = "https://pokeapi.co/api/v2/pokemon/"
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

// 4th, slash command - /houses
// how to use ------------------------------>     /houses 8
app.post('/houses', function(req, res){
    console.log("req===========:", req.body)
    let id = req.body.text

    // Promise to get API data
    let link = "https://www.anapioficeandfire.com/api/houses/"
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


// 5th, slash command - /dict 
// how to use ------------------------------>     /dict apple
app.post('/dict', function(req, res){
    console.log("req===========:", req.body)
    let word_id = req.body.text
    let language = 'en'
    
    let app_id = '940617c7'
    let app_key = '85569da071da515e0c00c774ecea1c4a'

    // Promise to get API data
    let link = 'https://od-api.oxforddictionaries.com:443/api/v1/entries/' 
    var options = {
        method: 'get',
        uri: link + language + '/' + word_id.toLowerCase(),
        body: {
            some: 'data~~~'
        },
        headers : {
            'app_id': app_id, 
            'app_key': app_key
        },
        json: true // Automatically stringifies the body to JSON
    };

    rp(options)
    .then(function (options) {
        str = JSON.stringify(options['results'][0]["lexicalEntries"][0]["entries"][0]["senses"][0]["definitions"][0])
        console.log("Dict definition =====> " + str)
        res.send(word_id.toUpperCase() + " => " + str)
    })
    .catch(function (err) {
        console.log("Error~~~")
        res.send("The word you entered " + word_id + " does not exist.")
    });
})


// 6th, slash command - /bitc
// how to use ------------------------------>     /bitc USD
app.post('/bitc', function(req, res){
    console.log("req===========:", req.body)
    let currency = toUpperCase(req.body.text)
    // let currency = 'USD'
    let value = 1000

    // Promise to get API data
    let link = "https://blockchain.info/tobtc?currency="

    var options = {
        method: 'get',
        uri: link + currency + "&value=" + string(value),
        body: {
            some: 'data~~~'
        },
        json: true // Automatically stringifies the body to JSON
    };

    rp(options)
    .then(function (options) {
        console.log("Bitcoin rate ===> " + options)
        // Math.round(num * 100) / 100, it rounds to at most two decimal places
        // `string text ${expression} string text`
        res.send(`1 Bitcoin equals ${Math.round((value / options)*100 / 100)} ${toUpperCase(currency)}`)
    })
    .catch(function (err) {
        console.log("Error~~~")
    });
})
const port = process.env.PORT || 8000
app.listen(port, function() {
    console.log("listening on port: " + 8000);
})

