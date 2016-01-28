//login using mongodb
var crypto = require('crypto');
var userSchema = require('./model/userSchema');
var requestGen = require('./commons/responseGenerator');
var mq_client = require('../rpc/client');

exports.signin = function(req, res) {

	res.render('home', {
		title : 'Login'
	});

}

exports.login = function login(req, res) {

	var emailId = req.param('emailId');
	var password = req.param('password');

	var msg_payload = {
			"emailId" : emailId,
			"password" : password
	};

	mq_client.make_request('login_queue',msg_payload,function(err, results) {

		if (err) {
			console.log(err);
			res.render('failed_Query');
		} else {
			console.log(results.status);
			if (results.status == 200) {

				req.session.username = results.data[0].userName;
				req.session.id = results.data[0].userId;
				req.session.name = results.data[0].firstName + ' ' + results.data[0].lastName;


				res.header('Cache-Control','no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
				if (req.param("firstLogIn") == "yes") {
					res.render("addProfile",{ title : 'Facebook - Add Profile Information'});
				}
				else {

					res.render('home_main', {title : 'Home'});
				}

			} else {
				console.log(err);
				// res.send(requestGen.responseGenerator(401,
				// null));
				res.render('failed_login');
			}
		}
	});

};