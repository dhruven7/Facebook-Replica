//Variables

var mongoose = require('mongoose');
var connection = mongoose.createConnection("mongodb://localhost:27017/facebook");
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(connection);
var Settings = new Schema({
	  nextSeqNumber: { type: Number, default: 1 }
	});
var membersList = new Schema({
	memberId : String,
	memberName : String
}, {
	_id : false
});
var postsGroupSchema = new Schema({
	user : String,
	postText : String,
	postTime: Date
}, {
	_id : false
});
var groupSchema = new Schema({
	groupId : {
		type : String,
		required : true
	},
	groupName : {
		type : String,
		required : true
	},
	description : String,
	adminId : String,
	members : [ membersList ],
	posts : [ postsGroupSchema ]
}, {
	versionKey : false
});

var Groups = mongoose.model('Groups', groupSchema);
groupSchema.plugin(autoIncrement.plugin, {
    model: 'Groups',
    field: 'groupId',
    startAt: 1,
    incrementBy: 1
});

module.exports = Groups;