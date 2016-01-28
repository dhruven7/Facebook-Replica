/**
 * New node file
 */
var requestGen = require('./commons/responseGenerator');
var userSchema = require('./model/userSchema');
var groupSchema = require('./model/groupSchema');
var mq_client = require('../rpc/client');

exports.renderSearch = function(req, res) {
	var userId = req.session.username;
	var searchText = req.param('searchValue');

	console.log(userId);
	if (userId) {
		res.header('Cache-Control','no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
		res.render('SearchResults', { title : 'Search', searchText : searchText });

	} else {
		res.redirect('/');
	}
}

exports.userSearch = function(req, res) {

	var searchText = req.param('searchValue');
	//console.log("user: " + searchText);
	
	var msg_payload = {
			searchText: searchText,
			"func" : "userSearch"
	};
	
	mq_client.make_request('search_queue', msg_payload, function(err,results) {
		console.log(results);
		if (err) {
			console.log(err);
			res.render('failed_Query');
		} else {
			
			//console.log("about results" + results);
			res.send(results);
		}
	});

};
exports.groupSearch = function(req, res) {

	var searchText = req.param('searchValue');

	var msg_payload = {
			searchText: searchText,
			"func" : "groupSearch"
	};
	
	
	mq_client.make_request('search_queue', msg_payload, function(err,results) {
		console.log(results);
		if (err) {
			console.log(err);
			res.render('failed_Query');
		} else {
			
			//console.log("about results" + results);
			res.send(results);
		}
	});
	
	//console.log("group: " + searchText);
};
