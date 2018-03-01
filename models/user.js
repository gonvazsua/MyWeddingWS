var mongoose 	= require('mongoose'),
    Schema   	= mongoose.Schema;

var userSchema 	= new Schema({
  password:     { type: String },
  email:     	  { type: String },
  name:     	  { type: String },
  lastname:     { type: String },
  isConfirmed:  { type: Boolean },
  isActive:     { type: Boolean },
  useBus:     	{ type: Boolean },
  allergies: 	  { type: Array },
  isAdmin:  	  { type: Boolean },
  lastLogin:    { type: Date }
});

module.exports = mongoose.model('User', userSchema);