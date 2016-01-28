var requestGen = require('./commons/responseGenerator');
var userSchema = require('./model/userSchema');
var mq_client = require('../rpc/client');

exports.renderVisitTimeline = function(req, res) {
	var userId = req.session.username;
	var visitId = req.param('username');
	if (userId) {
		res.header('Cache-Control','no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
		if (userId == visitId) {
			res.redirect('/timelineM');
		} else {
			res.render('visit_timeline', { title : 'Timeline', userId : visitId });

		}
	} else {
		res.redirect('/');
	}
}

exports.renderTimeline = function(req, res) {
	var userId = req.session.username;

	if (userId) {
		res.header('Cache-Control','no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
		res.render('timeline_new', { title : 'Timeline' });
	} else {
		res.redirect('/');
	}
}

exports.timelineDetails = function(req, res) {

	var userId = req.session.username;
	var msg_payload = {
			"userId" : userId,
			"func" : "ownTimeline"
	}
	if (userId) {
		mq_client.make_request('timeline_queue', msg_payload, function(err,results) {

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

exports.userTimelineDetails = function(req, res) {

	var userId = req.session.username;
	var visitId = req.param('user');

	var userId = req.session.username;
	var msg_payload = {
			"userId" : userId,
			"visitId" : visitId,
			"func" : "visitTimeline"
	}
	if (userId) {
		mq_client.make_request('timeline_queue', msg_payload, function(err,results) {

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
