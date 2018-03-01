var express 	= require("express"),
	allergies 	= express.Router(),
	model 		= require('../models/allergy'),
	AllergyCtrl	= require('../controllers/allergy');

allergies.route('/')
	.get(AllergyCtrl.findAll)
	.post(AllergyCtrl.addAllergy);

allergies.route('/:id')
	.get(AllergyCtrl.findById);

module.exports = allergies;