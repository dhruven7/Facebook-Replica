/**
 * New node file
 */
var requestGen = require('./commons/responseGenerator');
var userSchema = require('./model/userSchema');

var mq_client = require('../rpc/client');

exports.getJsonTimeline = function(req, res) {

	var userId = req.session.username;
	var msg_payload = {
			"userId" : userId,
			"func" : "getWallPosts"
	}
	if (userId) {
		mq_client.make_request('timeline_queue', msg_payload, function(err, results) {

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

exports.getJsonUserTimeline = function(req, res) {

	var visitId = req.param('user');
	var userId = req.session.username;

	var msg_payload = {
			"userId" : visitId,
			"func" : "getWallPosts"
	}
	if (userId) {
		mq_client.make_request('timeline_queue', msg_payload, function(err, results) {

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

exports.postStatusTimeline = function(req, res) {
	var postText = req.param('postValue');
	var userId = req.session.username;

	var msg_payload = {
			"userId" : userId,
			"postText" : postText,
			"func" : "poststatusOnTimeline"
	};
	if (userId) {
		mq_client.make_request('timeline_queue', msg_payload, function(err, results) {

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

exports.postStatusUserTimeline = function(req, res) {
	var postText = req.param('postValue');
	var visitId = req.param('user');
	var userId = req.session.username;
	var username = req.session.name;

	var msg_payload = {
			"userId" : userId,
			"postText" : postText,
			"visitId" : visitId,
			"username" : username,
			"func" : "postStatusOnUserTimeline"
	};
	if (userId) {
		mq_client.make_request('timeline_queue', msg_payload, function(err, results) {

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
exports.sendFriendRequest = function(req, res) {

	var userId = req.session.username;
	var visitId = req.param('user');

	var msg_payload = {
			"userId" : userId,
			"visitId" : visitId,
			"func" : "sendFriendReq"
	}
	if (userId) {
		mq_client.make_request('timeline_queue', msg_payload, function(err, results) {

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

exports.acceptFriendRequest = function(req, res) {
	var userId = req.session.username;
	var visitId = req.param('user');

	var msg_payload = {
			"userId" : userId,
			"visitId" : visitId,
			"func" : "acceptFriendReq"
	}
	if (userId) {
		mq_client.make_request('timeline_queue', msg_payload, function(err, results) {

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

exports.ignoreFriendRequest = function(req, res) {

	var userId = req.session.username;
	var visitId = req.param('user');

	var msg_payload = {
			"userId" : userId,
			"visitId" : visitId,
			"func" : "ignoreFriendReq"
	}
	if (userId) {
		mq_client.make_request('timeline_queue', msg_payload, function(err, results) {

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
