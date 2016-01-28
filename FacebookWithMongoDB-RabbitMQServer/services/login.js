/**
 * New node file
 */
var crypto = require('crypto');
var userSchema = require('./model/userSchema');
var requestGen = require('./commons/responseGenerator');

exports.login = function(msg, callback) {

	var emailId = msg.emailId;
	var password = msg.password;

	var salt = "FacebookLab2";
	var newPassword = crypto.createHash('sha512').update(password + salt).digest("hex");
	console.log(newPassword);

	userSchema.find({userName : emailId, password : newPassword }, function(err, user) {
		var json_responses;
		if (err)
			json_responses = requestGen.responseGenerator(401, null);
		else {
			// object of the user
			if (user.length > 0) {
				json_responses = requestGen.responseGenerator(200, user);
			} else {

				json_responses = requestGen.responseGenerator(401, null);
			}
		}
		console.log(json_responses);
		callback(null, json_responses);
	});
};