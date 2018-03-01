var mongoose 			= require('mongoose');
var Allergy 			= mongoose.model('Allergy');

exports.findAll = function(req, res) {
	Allergy.find(function(err, allergies){
		if(err) res.send(500, err.message);
		res.status(200).jsonp(allergies);
	});
};

exports.findById = function(req, res) {
	Allergy.findById(req.params.id, function(err, allergy){
		if(err) res.send(500, err.message);
		res.status(200).jsonp(allergy);
	});
};

exports.addAllergy = function(req, res) {
	Allergy.create({
		name:   req.body.name
	}, function(err, user){
		if(err) res.send(500, err.message);
		res.status(200).jsonp(allergy);
	});
};