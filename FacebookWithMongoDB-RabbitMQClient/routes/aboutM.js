var requestGen = require('./commons/responseGenerator');
var userSchema = require('./model/userSchema');
var mq_client = require('../rpc/client');

exports.renderAbout = function(req, res) {

	var userId = req.session.username;

	//console.log(userId);

	if (userId) {
		res.header('Cache-Control','no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
		res.render('about', { title : 'About'});

	} 
	else {
		res.redirect('/');
	}
}

exports.about = function(req, res) {

	var userId = req.session.username;

	var msg_payload = {
		userId: userId	
	};
	
	if (userId) {

		mq_client.make_request('about_queue', msg_payload, function(err,results) {
			console.log(results);
			if (err) {
				console.log(err);
				res.render('failed_Query');
			} else {
				
				console.log("about results" + results);
				res.send(results);
			}
		});

	} else {
		res.send(requestGen.responseGenerator(500, null));
	}
};