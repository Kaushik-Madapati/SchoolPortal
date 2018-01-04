var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var RoomInfoSchema   = new Schema({
	name: String,
	phone: String,
	teacher_name:String,
	teacherID:Number,
	
});

module.exports = mongoose.model('RoomInfo', RoomInfoSchema);

