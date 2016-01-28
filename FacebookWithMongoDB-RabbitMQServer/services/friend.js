/**
 * http://usejsdoc.org/
 */
var requestGen = require('./commons/responseGenerator');
var userSchema = require('./model/userSchema');


exports.friendList = function(msg, callback){
	var userId = msg.userId;
	var json_response;
	
	userSchema.findOne( { userName : userId }, function(err, doc) {

		var myDoc = doc;

		if (err) {
			console.log("error if 1 in friend list");
			json_response = requestGen.responseGenerator(401, null);
			callback(null, json_response);
		}

		else {
			if (doc) {
				var userFriends = [];
				for (var i = 0; i < doc.friends.length; i++) {
					userFriends.push(doc.friends[i].user);
				}
				userSchema.find({userName : {$in : userFriends}}, function(err, docs) {
					if (err) {
						console.log("error if 2 in friend list");
						json_response = requestGen.responseGenerator(401,null);
					} 
					else {
						if (docs) {

							var data = [];

							docs.forEach(function(doc) {
								console.log(doc);
								for (var j = 0; j < myDoc.friends.length; j++) {
									if (myDoc.friends[j].user === doc.userName
											&& myDoc.friends[j].isFriend === true) {
										data.push({
											userId : doc.userName,
											name : doc.firstName + " " + doc.lastName,
											isFriend : myDoc.friends[j].isFriend
										});
									}
								}
							});

							json_response = requestGen.responseGenerator(200,data);
						} else {
							console.log("error else 1 in friend list");
							json_response = requestGen.responseGenerator(401,null);
						}
					}
					callback(null, json_response);
				});
			} else {
				console.log("error else 2 in friend list");
				json_response = requestGen.responseGenerator(401,null);
				callback(null, json_response);
			}
		}
	});
	
};

exports.pendingList = function(msg, callback){

	var userId = msg.userId;
	var json_response;


	userSchema.findOne({userName : userId,'friends.isFriend' : false}, function(err, doc) {

		var myDoc = doc;

		if (err) {
			console.log("error if 1 in pending list");
			json_response = requestGen.responseGenerator(401, null);
			callback(null, json_response);
		}

		else {
			if (doc) {
				console.log(doc);
				var userFriends = [];
				for (var i = 0; i < doc.friends.length; i++) {
					if (!doc.friends[i].isFriend)
						userFriends.push(doc.friends[i].user);
				}

				userSchema.find({userName : {$in : userFriends}},function(err, docs) {
					if (err) {
						console.log("error if 2 in pending list");
						json_response = requestGen.responseGenerator(401,null);
					} else {
						if (docs) {

							var data = [];

							docs.forEach(function(doc) {

								for (var j = 0; j < myDoc.friends.length; j++) {
									if (myDoc.friends[j].user === doc.userName) {
										data.push({
											user : doc.userName,
											name : doc.firstName+ " " + doc.lastName
										});
									}
								}
							});

							json_response = requestGen.responseGenerator(200,data);
						} else {
							console.log("error else 1 in pending list");
							json_response = requestGen.responseGenerator(401,null);
						}
					}
					callback(null, json_response);
				});
			} else {
				console.log("error else 2 in pending list");
				json_response = requestGen.responseGenerator(401,{message: 'No pending list!'});
				callback(null, json_response);
			}
		}
	});

};

