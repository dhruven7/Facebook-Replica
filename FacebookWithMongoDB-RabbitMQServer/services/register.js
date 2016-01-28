var requestGen = require('./commons/responseGenerator');
var crypto = require('crypto');
var userSchema = require('./model/userSchema');

exports.register = function(msg, callback) {
	var emailId = msg.inputUsername;
	var password = msg.inputPassword;
	var firstName = msg.inputFirstName;
	var lastName = msg.inputLastName;
	var DOB = msg.inputDOB;
	var gender = msg.gender;

	var salt = "FacebookLab2";
	password = crypto.createHash('sha512').update(password + salt).digest("hex");

	var newUser = new userSchema({

		userName : emailId,
		password : password,
		firstName : firstName,
		lastName : lastName,
		dateOfBirth : DOB,
		gender : gender
	});

	newUser.save(function(err) {
		var json_responses;
		if (err) {
			console.log(err);
			json_responses = requestGen.responseGenerator(500, null);
		}

		else {
			console.log('New User created!');
			json_responses = requestGen.responseGenerator(200, null);

		}
		callback(null, json_responses);
	});
}

exports.addProfileInfo = function(msg, callback) {
	var schoolName = msg.schoolName
	var major = msg.major;
	var e_startDate = msg.eStartDate;
	var e_endDate = msg.eEndDate;
	var companyName = msg.companyName;
	var position = msg.position;
	var w_startDate = msg.wStartDate;
	var w_endDate = msg.wEndDate;
	var phoneNumber = msg.phoneNumber;
	var relationship = msg.relationship;
	var city = msg.city;
	var country = msg.country;
	var music = msg.music;
	var shows = msg.shows;
	var sports = msg.sports;

	userSchema.findOne({ userName : msg.userId }, function(err, doc) {

		doc.educationDetails.push({
			schoolName : schoolName,
			major : major,
			startDate : e_startDate,
			endDate : e_endDate
		});

		doc.workDetails.push({
			companyName : companyName,
			position : position,
			startDate : w_startDate,
			endDate : w_endDate
		});

		doc.phoneNumber = phoneNumber;
		doc.relationship = relationship;

		doc.interests.music = music;
		doc.interests.shows = shows;
		doc.interests.sports = sports;

		doc.address.city = city;
		doc.address.country = country;

		doc.save(function(err) {

			var json_responses;
			if (err) {
				console.log(err);
				json_responses = requestGen.responseGenerator(500, null);
			}

			else {
				json_responses = requestGen.responseGenerator(200, null);

			}
			callback(null, json_responses);

		});

	});

}