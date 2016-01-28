var requestGen = require('./commons/responseGenerator');

var mq_client = require('../rpc/client');

exports.profile = function(req, res) {

	var userId = req.session.username;
	console.log(req.session.username);

	if (userId) {

		var schoolName = req.param("schoolName")
		, major = req.param("major")
		, e_startDate = req.param("eStartDate")
		, e_endDate = req.param("eEndDate")
		, companyName = req.param("companyName")
		, position = req.param("position")
		, w_startDate = req.param("wStartDate")
		, w_endDate = req.param("wEndDate")
		, phoneNumber = req.param("phoneNumber")
		, relationship = req.param("relationship")
		, city = req.param("city")
		, country = req.param("country")
		, music = req.param("music")
		, shows = req.param("shows")
		, sports = req.param("sports");

		var msg_payload = {
				"schoolName" : schoolName,
				"major" : major,
				"e_startDate" : e_startDate,
				"e_endDate" : e_endDate,
				"companyName" : companyName,
				"position" : position,
				"w_startDate" : w_startDate,
				"w_endDate" : w_endDate,
				"phoneNumber" : phoneNumber,
				"relationship" : relationship,
				"city" : city,
				"country" : country,
				"music" : music,
				"shows" : shows,
				"sports" : sports,
				"func" : "addProfileInfo",
				"userId" : userId
		};

		mq_client.make_request('register_queue',msg_payload,function(err, results) {

			console.log(results);
			if (err) {
				console.log(err);
				// res.send(requestGen.responseGenerator(401,
				// null));
				res.render('failed_Query');
			} else {
				if (results.status == 200) {
					// res.send(requestGen.responseGenerator(200,
					// null));
					res.header('Cache-Control','no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
					res.render('home_main', {title : "Home"});
				} else {
					console.log(err);
					// res.send(requestGen.responseGenerator(401,
					// null));
					res.render('failed_Query');
				}
			}
		});

	} else {
		res.redirect('/');
	}
};