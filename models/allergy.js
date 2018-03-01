var mongoose 	= require('mongoose'),
    Schema   	= mongoose.Schema;

var allerySchema = new Schema({
	name:     { type: String }
});

module.exports = mongoose.model('Allergy', allerySchema);