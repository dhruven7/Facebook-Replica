var requestGen = require('./commons/responseGenerator');

var userSchema = require('./model/userSchema');
var groupSchema = require('./model/groupSchema');
var mq_client = require('../rpc/client');

exports.homepage = function(req, res) {

	var userId = req.session.username;

	if (userId) {
		res.header('Cache-Control','no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
		res.render('home_main', { title : 'Home'});
	} else {
		res.redirect('/');
	}

};

exports.getUserName = function(req, res) {

	var userId = req.session.username;

	var msg_payload = {
			userId : userId,
			func : "getUserId"
	};

	if (userId) {
		mq_client.make_request('homepage_queue', msg_payload, function(err, results) {

			console.log(results);
			if (err) {
				console.log(err);
				res.render('failed_Query');
			} else {
				res.send(results);
			}
		});

	} else {
		res.redirect('/');
	}

};

exports.newsFeed = function(req, res) {

	var userId = req.session.username;
	
	
	var msg_payload = {
			userId : userId,
			func : "newsFeed"
	};


	if (userId) {
		
		mq_client.make_request('homepage_queue', msg_payload, function(err, results) {

			console.log(results);
			if (err) {
				console.log(err);
				res.render('failed_Query');
			} else {
				res.send(results);
			}
		});
		
	} else {
		res.send(requestGen.responseGenerator(500, null));
	}
}

exports.postStatus = function(req, res) {

	var userId = req.session.username;

	var postText = req.param('postValue');

	var msg_payload = {
			userId : userId,
			postText : postText,
			func : "postStatus"
	};

	if (userId) {
		mq_client.make_request('homepage_queue', msg_payload, function(err, results) {

			console.log(results);
			if (err) {
				console.log(err);
				res.render('failed_Query');
			} else {
				res.send(results);
			}
		});
	} else {
		res.send(requestGen.responseGenerator(500, null));
	}
};