var express 	= require("express"),
	comments 	= express.Router(),
	model 		= require('../models/comment'),
	CommentCtrl	= require('../controllers/comment');

comments.route('/')
	.get(CommentCtrl.findAll)
	.post(CommentCtrl.addComment);

comments.route('/:id')
    .get(CommentCtrl.findById)
    .delete(CommentCtrl.delete);

module.exports = comments;