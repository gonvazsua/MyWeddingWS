var mongoose 			= require('mongoose');
var Comment 			= mongoose.model('Comment');

exports.findAll = function(req, res) {
	Comment.find({}).
	sort([['creationDate', 'descending']]).
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
	Comment.findByIdAndRemove(req.params.id, function(err){
		if(err) res.send(500, err.message);
		res.send(200);
	});	
};