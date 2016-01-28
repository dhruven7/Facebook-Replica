var requestGen = require('./commons/responseGenerator');
var userSchema = require('./model/userSchema');
var mq_client = require('../rpc/client');

exports.renderer = function(req, res) {
	
	var userId = req.session.username;

	//console.log(userId);

	if (userId) {
		res.header('Cache-Control','no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
		res.render('frnd_view_renderer');

	} 
	else {
		res.redirect('/');
	}
	
	
}

exports.list = function(req, res) {

	var userId = req.session.username;

	var msg_payload = {
			userId: userId,
			"func" : "friendList"
	};

	if (userId) {

		mq_client.make_request('friend_queue', msg_payload, function(err,results) {
			console.log(results);
			if (err) {
				console.log(err);
				res.render('failed_Query');
			} else {

				//console.log("about results" + results);
				res.send(results);
			}
		});
		
	} else {
		res.send(requestGen.responseGenerator(500, null));
	}

};

exports.pendingList = function(req, res) {
	// var session_id = req.session.userId;

	var userId = req.session.username;

	var msg_payload = {
			userId: userId,
			"func" : "pendingList"
	};

	if (userId) {
		mq_client.make_request('friend_queue', msg_payload, function(err,results) {
			console.log(results);
			if (err) {
				console.log(err);
				res.render('failed_Query');
			} else {

				//console.log("about results" + results);
				res.send(results);
			}
		});

	} 
	else {
		res.send(requestGen.responseGenerator(500, null));
	}
};
