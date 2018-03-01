var express 	= require("express"),
	auths 	= express.Router(),
	model 		= require('../models/user'),
	AuthCtrl	= require('../controllers/auth');

auths.route('/authenticate')	
	.post(AuthCtrl.authenticate);

auths.route('/signup')
	.post(AuthCtrl.signup);

auths.route('/secret')
	.post(AuthCtrl.checkSuperPassword);

module.exports = auths;