var mongoose 			= require('mongoose');
var Comment 			= mongoose.model('Comment');

exports.findAll = function(req, res) {
	Comment.find({}).
	populate('user').
	exec(function(err, comments) {
		if(err) res.send(500, err.message);
		res.status(200).jsonp(comments);
	})
};

exports.findById = function(req, res) {
	Comment.findById(req.params.id, function(err, comment){
		if(err) res.send(500, err.message);
		res.status(200).jsonp(comment);
	});
};

exports.addComment = function(req, res) {
	Comment.create({
		user:         req.body.user._id,
		comment:        req.body.comment,
		creationDate:   new Date()
		}, function(err, comment){
			if(err) res.send(500, err.message);
			res.status(200).jsonp(comment);
		}
	);
};

exports.delete = function(req, res) {
	Comment.remove({
        _id:         req.body._id,
	}, function(err, comment){
		if(err) res.send(500, err.message);
		res.status(200);
	});
};