var mongoose 		= require('mongoose');
var User			= require('../models/user');
var env				= require('../environment');
var jwt    			= require('jsonwebtoken');
var bcrypt   		= require('bcrypt-nodejs');

exports.authenticate = function(req, res){
	
	User.findOne({
		email : req.body.email
	}, function(err, user) {

		if(err) throw err;

		if (!user) {
			res.json({ success: false, message: 'Usuario no encontrado' });
		} else if (user) {

			//check cripted password
			if(!bcrypt.compareSync(req.body.password, user.password)) {
				res.json({ success: false, message: 'Password incorrecta' });
			} else {

				var payload = {
					email: user.email,
					admin: user.isAdmin
				};
				
				var token = jwt.sign(payload, env.secret, {expiresIn: 604800});
				
				res.json({
		          success: true,
				  token: token,
				  user: user
		        });

			}

		}

	});
};

exports.signup = function(req, res) {
	
	var requestUser = JSON.parse(req.body.user);

	if(!requestUser) res.json({ success: false, message: 'Error al guardar usuario' })

	User.findOne({
		email : requestUser.email
	}, function(err, user) {

		if(user) 
			res.json({ success: false, message: 'El email ya existe' });
		else {

			//Crypt password
			var cryptPass = bcrypt.hashSync(requestUser.password, bcrypt.genSaltSync(8), null);

			User.create({
				password:   	cryptPass,
				email:     		requestUser.email,
				name:     		requestUser.name,
				lastname:     	requestUser.lastname,
				isConfirmed:    requestUser.isConfirmed,
				isActive:     	requestUser.isActive,
				useBus:     	requestUser.useBus,
				allergies: 		requestUser.allergies
			}, function(err, savedUser){

				if(err){
					console.log("Error guardando usuario: " + err);
					res.json({ success: false, message: 'Error al guardar usuario' })
				} else {
					
					var payload = {
						email: savedUser.email,
						admin: savedUser.isAdmin
					};
					
					var token = jwt.sign(payload, env.secret, {expiresIn: 604800});

					res.json({
			          success: true,
					  token: token,
					  user: savedUser
			        });
			    }

			});

		}

	});

};

exports.checkSuperPassword = function(req, res) {	
	if(req.body.secret){
		if(req.body.secret == env.guest) res.json({ success: true, message: 'Clave correcta' });
		else res.json({ success: false, message: 'Clave incorrecta' });
	}
	else res.json({ success: false, message: 'Clave no encontrada' }); 
};