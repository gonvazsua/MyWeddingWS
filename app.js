var port 			      = process.env.ALWAYSDATA_HTTPD_PORT || 3000;
var host 			      = process.env.ALWAYSDATA_HTTPD_IP || 'localhost';
var env  			      = require('./environment');
var express 		    = require("express"),
    app 			      = express(),
    bodyParser  	  = require("body-parser"),
    methodOverride 	= require("method-override");
    mongoose 		    = require('mongoose'),
    jwt				      = require('jsonwebtoken'),
    tokenMw 		    = require('./controllers/token'),
    router 			    = express.Router(),
    auths 			    = require('./routes/auth'),
    users 			    = require('./routes/user'),
    allergies 		  = require('./routes/allergy');


//Connection to BD
mongoose.connect(env.database, function (err, res){
	if(err){
		console.log('ERROR: connecting to Database. ' + err);
		log.info("ERROR connectin to MongoDB");
	}
	//throw err;
});

//CORS
var allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  //intercepts OPTIONS method
  if ('OPTIONS' === req.method) {
    //respond with 200
    res.sendStatus(200);
  }
  else {
  //move on
    next();
  }
}

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(allowCrossDomain);

//API Authenticate -> Important goes here for avoid token verification
app.use('/', auths);

//Midleware token function
app.use(tokenMw.tokenVerify);

//API Users
app.use('/users', users);

//API Allergies
app.use('/allergies', allergies);

//Handle errors
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send(err.stack)
})

// Start server
app.listen(port, host, function() {
	var date = new Date();
	console.log("Started served at: " 
		+ date.getFullYear() + "/" + date.getMonth() + "/" + date.getDay() + " - " 
		+ date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
});