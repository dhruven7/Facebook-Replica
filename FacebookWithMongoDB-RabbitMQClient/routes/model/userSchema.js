var crypto = require('crypto');
var mongoose = require('mongoose');
var connection = mongoose.connect("mongodb://localhost:27017/facebook");
var Schema = mongoose.Schema;

var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(connection);
var Settings = new Schema({
	  nextSeqNumber: { type: Number, default: 1 }
	});

var Schema = mongoose.Schema;
var workSchema = new Schema({
	companyName: String,
	position: String,
	startDate: Date,
	endDate: Date
}, {
	_id: false
});
var schoolSchema = new Schema({
	schoolName: String,
	major: String,
	startDate: Date,
	endDate: Date
}, {
	_id: false
});
var friendsList = new Schema({
	user: String,
	isFriend: Boolean
}, {
	_id: false
});
var groupsList = new Schema({
	groupId: String
}, {
	_id: false
});
var postsSchema = new Schema({
	user: String,
	postText: String,
	postTime: Date
}, {
	_id: false
});

var userSchema = new Schema({
	userId : {type: String, required: true, unique: true},
	userName: {type: String, required: true, unique: true},
	password: {type: String, required: true},
	firstName: {type: String , required: true},
	lastName: {type: String , required: true},
	dateOfBirth: {type: Date , required: true},
	gender: {type: String , required: true},
	phoneNumber: Number,
	relationship: String,
	interests: {
		music: String,
		shows: String,
		sports: String
	},
	address: {
		street: String,
		city: String,
		state: String,
		country: String
	},
	workDetails:  [workSchema],
	educationDetails: [schoolSchema],
	friends: [friendsList],
	groups: [groupsList],
	posts: [postsSchema]
},{
	versionKey: false
});

var Users = mongoose.model('Users', userSchema);
userSchema.plugin(autoIncrement.plugin, {
    model: 'Users',
    field: 'userId',
    startAt: 1,
    incrementBy: 1
});

module.exports = Users;