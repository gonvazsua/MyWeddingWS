var mongoose 			= require('mongoose');
var User 				= mongoose.model('User');

exports.findAll = function(req, res) {
	User.find(function(err, users){
		if(err) res.send(500, err.message);
		res.status(200).jsonp(users);
	});
};

exports.findById = function(req, res) {
	User.findById(req.params.id, function(err, user){
		if(err) res.send(500, err.message);
		res.status(200).jsonp(user);
	});
};

exports.addUser = function(req, res) {
	var user = new User({
		password:   	req.body.password,
		email:     		req.body.email,
		name:     		req.body.name,
		lastname:     	req.body.lastname,
		isConfirmed:    req.body.isConfirmed,
		isActive:     	req.body.isActive,
		useBus:     	req.body.useBus,
		allergies: 		req.body.allergies,
		lastLogin:		new Date(),
		address:		req.body.address,
		city:			req.body.city,
		postalCode:		req.body.postalCode
	});
	user.save(function(err, user){
		if(err) res.send(500, err.message);
		res.status(200).jsonp(user);
	});
};

exports.update = function(req, res) {
	User.findById(req.params.id, function(err, user){
		if(err) res.send(500, err.message);

		user.email 			= req.body.email;
		user.name 			= req.body.name;
		user.lastname 		= req.body.lastname;
		user.isConfirmed	= req.body.isConfirmed;
		user.isActive		= req.body.isActive;
		user.useBus			= req.body.useBus;
		user.allergies		= req.body.allergies;
		user.isAdmin		= req.body.isAdmin;
		user.address		= req.body.address;
		user.city			= req.body.city;
		user.postalCode		= req.body.postalCode;
		user.companion		= req.body.companion;

		user.save(function(err, user){
			if(err) res.send(500, err.message);
			res.status(200).jsonp(user);
		});

	});
};