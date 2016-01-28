/**
 * http://usejsdoc.org/
 */

var requestGen = require('./commons/responseGenerator');
var userSchema = require('./model/userSchema');

exports.about = function(msg, callback){
	
	var userId = msg.userId;
	var json_response;
	
	userSchema.findOne({ userName : userId }, function(err, doc) {
		if (err)
			json_response = requestGen.responseGenerator(401, null);

		else {
			// object of the doc
			if (doc) {
				// console.log(doc);
				// res.header('Cache-Control', 'no-cache, private, no-store,
				// must-revalidate, max-stale=0, post-check=0,
				// pre-check=0');
				// res.render('home_main', { title: 'Home'});
				var data = {
						music : doc.interests.music,
						shows : doc.interests.shows,
						sports : doc.interests.sports,
						city : doc.address.city,
						country : doc.address.country,
						phoneNumber : doc.phoneNumber,
						relationship : doc.relationship,
						emailId : doc.userName,
						dateOfBirth : doc.dateOfBirth,
						companyName : doc.workDetails[0].companyName,
						position : doc.workDetails[0].position,
						schoolName : doc.educationDetails[0].schoolName,
						major : doc.educationDetails[0].major
				};
				
				json_response = requestGen.responseGenerator(200, data);
				//console.log("aboutttt resulltsssss: " + JSON.stringify(json_response));
			} else {
				console.log("Error!");
				// res.render('failed_login');
				json_response = requestGen.responseGenerator(401, null);
			}
		}
		
		callback(null, json_response);
	});

};