// Load the express module and store it in the variable express (Where do you think this comes from?)
var express = require("express");

// invoke express and store the result in the variable app
var app = express();

// require body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

// this is the line that tells our server to use the "/static" folder for static content
app.use(express.static(__dirname + "/static"));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Root Route ----------------------------------------------------------
app.post('/greeting', function(req, res) {  
    // res.render("index");
    res.send('Hi Welcome to Slack Command API Services!');
})

// app.post('/input', function(req, res) {
app.get('/input', function(req, res) {
    res.send("ZhiYuan Luo, NiHao~!")
    // console.log("POST DATA \n", req.body)
    // req.session.task = req.body['TASK']
    // res.redirect('/output')   
});

const port = process.env.PORT || 8000
app.listen(port, function() {
    console.log("listening on port: " + 8000);
})

