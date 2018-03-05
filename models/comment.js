var mongoose 	= require('mongoose'),
    Schema   	= mongoose.Schema;

var commentSchema = new Schema({
    user            : { type: Schema.Types.ObjectId, ref: 'User' },
    creationDate    : { type: Date },
    comment         : { type: String }
});

module.exports = mongoose.model('Comment', commentSchema);