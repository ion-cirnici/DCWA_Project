var express = require('express')//module express
var mongoDB = require('./mongoDB')//call mongoDB
var bodyParser = require('body-parser')//call body-parser

var mySQL = require('./mySQL')//require mySQL that is in the current folder
//var router = express.Router();

var app = express()

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: false}))

/* GET home page. */
app.get('/', function(req, res) {
    res.render('home');
    
});

app.get('/delete', function(req, res) {
    res.render('delete');//link to page delete.ejs
    
});
//link to page editCountry.ejs
app.get('/edit', function(req, res) {
    res.render('edit');
    
});

app.get('/allCitiesDetails', function(req, res) {
    res.render('allCitiesDetails');//link to page allCitiesDetails.ejs
    
});

app.get('/addHeadOfState', function(req, res) {
    res.render('addHeadOfState');//link to page addHeadOfState.ejs
    
});

//Button link to page addCountry.ejs request and response
app.get('/addCountry', function(req, res) {
    res.render('addCountry');
    
});

//list countries request and response which get the result from mySQL by getCountries
app.get('/listCountries', (req, res) => {
    mySQL.getCountries().then((result) =>{
        res.render('listCountries', {countries: result})//render listCountries with result
    })
    .catch((error) =>[
        res.send(error)
    ])
})

//list countries request and response which get the result from mySQL by getCities
app.get('/allCitiesDetails', (req, res) => {
    mySQL.getCities().then((result) =>{
        res.render('allCitiesDetails', {cities: result})//render allCitiesDetails with result
    })
    .catch((error) =>[
        res.send(error)
    ])
})

//list cities request and response which get the result from mySQL by getCities
app.get('/listCities', (req, res) => {
    mySQL.getCities()
    .then((result) =>{
        res.render('listCities', {cities: result})//render listCities with result
    })
    .catch((error) => {
        res.send(error)
})
})

//page link listHeadsOfState 
app.get('/listHeadsOfState', (req, res) => {
    mongoDB.getListHeadOfStates()
    .then((documents) => {
        res.render('headOfStates', {countries: documents})
    })
    .catch((error) => {
        res.send(error)
    })
})
app.get('/addHeadOfState', (req, res) => {
    res.render("/addHeadOfState")
})
//adding head of state
app.post('/addHeadOfState', (req, res) => {
    mongoDB.addHeadOfStates(req.body._id, req.body.headOfState)
    .then((result) => {
        res.redirect('/addHeadOfState')
        if (result.length != 3){
            res.send("<h4>Country Code must be 3 characters</h4>")  
        }
        else if (req.body.headOfState.length < 3) {
            res.send("<h4>Head of State  must be at least 3 characters</h4>")
        }
        else {
            res.send(result)
            res.redirect('/addHeadOfState')
        }
    })
    .catch((error) => {
    })
})

























app.listen(3007, () => {
    console.log("Listening on port 3007")
})