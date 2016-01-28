//register user in mongodo db
var mq_client = require('../rpc/client');

exports.register = function register(req, res) {

	var emailId = req.param('inputUsername')
	, password = req.param('inputPassword')
	, firstName = req.param('inputFirstName')
	, lastName = req.param('inputLastName')
	, DOB = req.param('inputDOB')
	, gender = req.param('gender');

	var msg_payload = {
			"inputUsername" : emailId,
			"inputPassword" : password,
			"inputFirstName" : firstName,
			"inputLastName" : lastName,
			"inputDOB" : DOB,
			"gender" : gender,
			"func" : "register"
	};

	mq_client.make_request('register_queue', msg_payload,
			function(err, results) {

		console.log(results);
		if (err) {
			console.log(err);
			// res.send(requestGen.responseGenerator(401, null));
			res.render('failed_Query');
		} else {
			if (results.status == 200) {
				console.log('New User created!');
				// res.send(requestGen.responseGenerator(200, null));
				res.render('login', {
					title : 'Facebook - Login Please'
				});
			} else {
				console.log(err);
				// res.send(requestGen.responseGenerator(401, null));
				res.render('failed_Query');
			}
		}
	});

};