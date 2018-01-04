var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var StudentInfoSchema   = new Schema({
	name: String,
	room: String,
	parent_name: String,
	parent_phone: String,
	parent_email: String,
	roomID:Number,
	description:String
	
});

module.exports = mongoose.model('StudentInfo', StudentInfoSchema);

