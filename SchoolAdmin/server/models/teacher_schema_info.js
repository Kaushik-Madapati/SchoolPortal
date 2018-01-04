var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var TeacherInfoSchema   = new Schema({
	name: String,
	phone: String,
	email: String,
	roomID:Number,
	roomName:String,
	no_of_pto:Number,
	no_of_sick_leave:Number,
	no_of_call_off:Number,
	vaccationID:Number,
	description:String
	
});

module.exports = mongoose.model('TeacherInfo', TeacherInfoSchema);

