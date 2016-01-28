var requestGen = require('./commons/responseGenerator');

var userSchema = require('./model/userSchema');
var groupSchema = require('./model/groupSchema');

var getUserName = function(msg, callback) {

	userSchema.findOne({ userName : msg.userId }, function(err, doc) {
		var json_responses;

		if (err)
			json_responses = requestGen.responseGenerator(500, null);
		else {
			// object of the doc

			if (doc) {
				var data = {
						name : doc.firstName + " " + doc.lastName
				};
				json_responses = requestGen.responseGenerator(200, data);
			} else {
				console.log("Error!");
				// res.render('failed_login');
				json_responses = requestGen.responseGenerator(401, null);
			}
		}
		callback(null, json_responses);

	});
}

var newsFeed = function(msg, callback) {
	var json_responses;
	
	var userId = msg.userId;
	
	userSchema.findOne({ userName : userId, $and : [ { $or : [ { 'friends.isFriend' : true }, {userName : userId } ] } ] }, function(err, doc) {

		var myDoc = doc;

		if (err) {
			json_responses = requestGen.responseGenerator(401, null);
			callback(null, json_responses);
		} else {
			if (doc) {
				// console.log(doc);
				var userFriends = [];
				for (var i = 0; i < doc.friends.length; i++) {
					userFriends.push(doc.friends[i].user);
				}

				userSchema.find({userName : { $in : userFriends } }, function(err, docs) {
					if (err) {
						json_responses = requestGen.responseGenerator(401,null);
						callback(null, json_responses);
					} 
					else {
						if (docs) {
							var data = {
									posts : []
							};

							for (var i = 0; i < doc.posts.length; i++) {

								data.posts.push(doc.posts[i]);
							}

							for (var j = 0; j < docs.length; j++) {
								for (var i = 0; i < docs[j].posts.length; i++) {
									// console.log(i);
									if (docs[j].friends.length > 0)
										for (var k = 0; k < docs[j].friends.length; k++) {
											if (docs[j].friends[k].user === userId)
												data.posts.push(docs[j].posts[i]);
										}
								}
							}

							console.log('myDoc '+ myDoc);

							console.log('length: '+ myDoc.groups.length);

							if (myDoc.groups.length > 0) {
								console.log('inside group schema fn');
								groupSchema.find({groupId : {$in : myDoc.groups[0].groupId} }, function( err, docs) {

									if (docs.length > 0) {
										docs.forEach(function(doc) {

											for (var i = 0; i < doc.posts.length; i++) {

												data.posts.push(doc.posts[i]);
											}
										});
									}
									data.posts.sort();
									data.posts.reverse();
									json_responses = requestGen.responseGenerator(200, data);
									callback(null, json_responses);
								});
							} else {
								data.posts.sort();
								data.posts.reverse();
								json_responses = requestGen.responseGenerator(200,data);
								callback(null, json_responses);
							}

						} else {
							var data = {
									posts : []
							};

							data.posts.push(doc.posts);

							json_responses = requestGen.responseGenerator(200,data);
							callback(null, json_responses);
						}
						
					}
				});
			} else {
				json_responses = requestGen.responseGenerator(401, null);
				callback(null, json_responses);
			}

		}
	});
};

var postStatus = function(msg, callback) {

	userSchema.findOne({userName : msg.userId }, function(err, doc) {

		doc.posts.push({
			user : doc.firstName + " " + doc.lastName,
			postText : msg.postText,
			postTime : new Date()
		});

		doc.save(function(err) {
			var json_responses;

			if (err) {
				json_responses = requestGen.responseGenerator(401, null);
			} else {
				json_responses = requestGen.responseGenerator(200, null);
			}
			callback(null, json_responses);
		});

	});

}

exports.getUserName = getUserName;
exports.newsFeed = newsFeed;
exports.postStatus = postStatus;