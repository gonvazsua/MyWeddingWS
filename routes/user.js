var express 	= require("express"),
	users 		= express.Router(),
	model 		= require('../models/user'),
	UserCtrl 	= require('../controllers/user');

users.route('/')
	.get(UserCtrl.findAll)
	.post(UserCtrl.addUser);

users.route('/:id')
	.get(UserCtrl.findById)
	.put(UserCtrl.update);

module.exports = users;