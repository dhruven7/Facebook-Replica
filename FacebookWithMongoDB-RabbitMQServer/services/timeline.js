var requestGen = require('./commons/responseGenerator');
var userSchema = require('./model/userSchema');

var timelineDetails = function(msg, callback) {
	
	userSchema.findOne({ userName : msg.userId }, function(err, doc) {
		var json_response;
		if (err)
			json_response = requestGen.responseGenerator(401, null);
		else {
			// object of the doc
			if (doc) {
				var data = {
						wholeName : doc.firstName + " " + doc.lastName,
						city : doc.address.city,
						country : doc.address.country,
						userId : doc.userName,
						companyName : doc.workDetails[0].companyName,
						position : doc.workDetails[0].position,
						schoolName : doc.educationDetails[0].schoolName,
						major : doc.educationDetails[0].major
				};
				json_response = requestGen.responseGenerator(200, data);
			} else {
				console.log("No data Found!");
				// res.render('failed_login');
				json_response = requestGen.responseGenerator(401, null);
			}
		}
		callback(null, json_response);
	});
}

var userTimelineDetails = function(msg, callback) {
	userSchema.findOne({ userName : msg.visitId }, function(err, doc) {
		var json_response;
		if (err)
			json_response = requestGen.responseGenerator(401, null);
		else {
			// object of the doc
			if (doc) {
				var isFriend = false, isReqSent = false;
				for (var i = 0; i < doc.friends.length; i++) {
					friend = doc.friends[i];
					if (friend.user == msg.userId) {
						isReqSent = true;
						if (friend.isFriend == true) {
							isFriend = true;
						}
					}
				}

				var data = {
						wholeName : doc.firstName + " " + doc.lastName,
						city : doc.address.city,
						country : doc.address.country,
						userId : doc.userName,
						companyName : doc.workDetails[0].companyName,
						position : doc.workDetails[0].position,
						schoolName : doc.educationDetails[0].schoolName,
						major : doc.educationDetails[0].major,
						isFriend : isFriend,
						isReqSent : isReqSent
				};

				json_response = requestGen.responseGenerator(200, data);
			} else {
				console.log("No data Found!");
				// res.render('failed_login');
				json_response = requestGen.responseGenerator(401, null);
			}
		}
		callback(null, json_response);
	});
}

var getWallPosts = function(msg, callback) {
	userSchema.find({ userName : msg.userId }, function(err, docs) {
		var json_response;
		if (err) {
			json_response = requestGen.responseGenerator(401, null);
		} else {
			if (docs) {
				json_response = requestGen
				.responseGenerator(200, docs[0].posts);
			} else {
				json_response = requestGen.responseGenerator(401, null);
			}
		}
		callback(null, json_response);
	});
}

var poststatusOnTimeline = function(msg, callback) {
	userSchema.findOne({ userName : msg.userId }, function(err, doc) {

		doc.posts.push({
			user : doc.firstName + " " + doc.lastName,
			postText : msg.postText,
			postTime : new Date()
		});

		doc.save(function(err) {
			var json_response;
			if (err) {
				json_response = requestGen.responseGenerator(401, null);
			} else {
				json_response = requestGen.responseGenerator(200, null);
			}
			callback(null, json_response);
		});

	});
}

var postStatusOnUserTimeline = function(msg, callback) {

	userSchema.findOne({ userName : msg.visitId }, function(err, doc) {

		doc.posts.push({
			user : msg.username,
			postText : msg.postText,
			postTime : new Date()
		});

		doc.save(function(err) {
			var json_response;
			if (err) {
				json_response = requestGen.responseGenerator(401, null);
			} else {
				json_response = requestGen.responseGenerator(200, null);
			}
			callback(null, json_response);
		});

	});

}

var checkFriendStatus = function(msg, callback) {

	var freindship_status = {
			isFriend : false,
			isRequestSent : false
	};

	userSchema.findOne({ userName : msg.userId, 'friends.user' : msg.friendName }, function(err, doc) {
		var json_response;
		if (err) {
			json_response = requestGen.responseGenerator(401, null);
		} else {
			if (doc) {

				freindship_status.isRequestSent = true;
				var myFriends;
				for (var i = 0; i < doc.friends.length; i++) {
					if (doc.friends[i].user === msg.friendName) {
						myFriends = doc.friends[i];
					}
				}

				if (myFriends.isFriend === true) {
					freindship_status.isFriend = true;
				}
				json_response = requestGen.responseGenerator(200,freindship_status);
			} else {
				json_response = requestGen.responseGenerator(200,freindship_status);
			}

		}
		callback(null, json_response);
	});
}

var sendFriendRequest = function(msg, callback) {

	userSchema.findOne({userName : msg.visitId }, function(err, doc) {

		doc.friends.push({
			user : msg.userId,
			isFriend : false
		});

		console.log("Doc " + doc);
		doc.save(function(err) {
			var json_response;
			if (err) {
				json_response = requestGen.responseGenerator(401, null);
			} else {
				json_response = requestGen.responseGenerator(200, null);
			}
			callback(null, json_response);
		});
	});
}

var acceptFriendRequest = function(msg, callback) {

	userSchema.update({ 'userName' : msg.userId, 'friends.user' : msg.visitId }, { $set : { 'friends.$.isFriend' : true } }, function(err, doc) {
		console.log("Doc " + JSON.stringify(doc));
		var json_response;
		if (err) {
			json_response = requestGen.responseGenerator(401, null);
			callback(null, json_response);
		} else {
			userSchema.findOne({userName : msg.visitId }, function(err, doc) {

				doc.friends.push({
					user : msg.userId,
					isFriend : true
				});

				console.log("Doc " + doc);
				doc.save(function(err) {

					if (err) {
						json_response = requestGen.responseGenerator(401, null);
					} else {
						json_response = requestGen.responseGenerator(200, null);
					}
					callback(null, json_response);
				});
			});
		}
	});

}

var ignoreFriendRequest = function(msg, callback) {
	userSchema.findOne({userName : msg.visitId }, function(err, doc) {

		doc.friends.pull({
			user : msg.userId,
			isFriend : false
		});

		doc.save(function(err) {
			var json_response;
			if (err) {
				json_response = requestGen.responseGenerator(401, null);
			} else {
				json_response = requestGen.responseGenerator(200, null);
			}
			callback(null, json_response);
		});
	});
}

exports.timelineDetails = timelineDetails;
exports.userTimelineDetails = userTimelineDetails;
exports.getWallPosts = getWallPosts;
exports.poststatusOnTimeline = poststatusOnTimeline;
exports.postStatusOnUserTimeline = postStatusOnUserTimeline;
exports.checkFriendStatus = checkFriendStatus;
exports.sendFriendRequest = sendFriendRequest;
exports.acceptFriendRequest = acceptFriendRequest;
exports.ignoreFriendRequest = ignoreFriendRequest;
