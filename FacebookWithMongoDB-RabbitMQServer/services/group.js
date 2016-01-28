var groupSchema = require('./model/groupSchema');
var userSchema = require('./model/userSchema');
var requestGen = require('./commons/responseGenerator');
var _ = require('underscore');

var memberDoc;

var createGroup = function(msg, callback) {

	var group_name = msg.group_name;
	var group_desc = msg.group_desc;
	var members_to_add = msg.add_friends;
	// var userID = req.session.userId;
	var userId = msg.username;
	var userName = msg.name;
	var json_response;


	var memberArray = [];

	memberArray.push({
		memberId : userId,
		memberName : userName
	});
	console.log('Member: ' + members_to_add);

	if (typeof (members_to_add) != 'undefined') {
		members_to_add.forEach(function(element, index, array) {
			memberArray.push({
				memberId : JSON.parse(element).userId,
				memberName : JSON.parse(element).userName
			});
		});
	}

	// console.log('Member: ' + JSON.stringify(memberArray));
	var groupInfo = new groupSchema({
		groupName : group_name,
		description : group_desc,
		adminId : userId,
		members : memberArray
	});

	console.log(JSON.stringify(groupInfo));

	groupInfo.save(function(err) {

		if (err) {
			console.log("Error !");
			json_response = requestGen.responseGenerator(401, null);
		}

		else {
			console.log('New Group created!');
			addGroupToUsers();
			json_response = requestGen.responseGenerator(200, null);
		}
		callback(null, json_response);
	});

	var addGroupToUsers = function() {

		var membersId = [];

		for (var i = 0; i < memberArray.length; i++) {
			membersId.push(memberArray[i].memberId);
		}

		console.log("members " + membersId);

		var groupId;

		console.log("group name " + group_name);

		groupSchema.findOne({ groupName : group_name }, function(err, doc) {

			console.log("group doc" + doc);
			console.log("doc group id" + doc.groupId);
			console.log("doc group name" + doc.groupName);
			console.log("doc adminId" + doc.adminId);

			groupId = doc.groupId;
		});

		console.log("group id " + groupId);

		userSchema.find({userName : {$in : membersId }}, function(err, docs) {

			docs.forEach(function(doc) {
				doc.groups.push({
					groupId : groupId
				});
				doc.save();
				console.log("user doc with groups: " + doc);
			});
		});

	};
}

var getGroupList = function(msg, callback) {

	var json_response;
	
	groupSchema.find({'members.memberId' : msg.userId }, function(err, groups) {
		
		if (err)
			json_response = requestGen.responseGenerator(500, null);
		else {
			// object of the user
			if (groups.length > 0) {
				console.log(groups);
				var groupList = [];

				groups.forEach(function(element, index, array) {
					groupList.push({
						groupId : element.groupId,
						groupName : element.groupName
					});
				});

				json_response = requestGen.responseGenerator(200, groupList);
			} else {
				console.log("No group Found");
				// res.render('failed_login');
				json_response = requestGen.responseGenerator(401, null);
			}

		}
		callback(null, json_response);
	});
}

var getGroupTopList = function(msg, callback) {
	var json_response;

	groupSchema.find({ 'members.memberId' : msg.userId }).sort({ 'group_id' : -1 }).limit(5).exec(function(err, groups) {


		if (err)
			json_response = requestGen.responseGenerator(500, null);
		else {
			// object of the user
			if (groups.length > 0) {
				console.log(groups);
				var groupList = [];

				groups.forEach(function(element, index, array) {
					groupList.push({
						groupId : element.groupId,
						groupName : element.groupName
					});
				});

				json_response = requestGen.responseGenerator(200, groupList);
			} else {
				console.log("No group Found");
				// res.render('failed_login');
				json_response = requestGen.responseGenerator(401, null);
			}
		}
		callback(null, json_response);
	});
}

var getGroupInfo = function(msg, callback) {

	var json_response;

	groupSchema.findOne({ groupId : msg.groupID }, function(err, doc) {
		var is_member = false;
		var is_admin = false;
		
		memberDoc = doc.members;
		
		console.log("document in get group info" + doc)
		
		if (doc.adminId === msg.userId) {
			is_admin = true;
		}

		for (var i = 0; i < doc.members.length; i++) {
			if (doc.members[i].memberId == msg.userId) {
				is_member = true;
			}
		}

		var group = {
				groupname : doc.groupName,
				groupDescription : doc.description,
				adminID : doc.adminId,
				member_list : doc.members,
				is_admin : is_admin,
				is_member : is_member
		};


		if (err) {
			json_response = requestGen.responseGenerator(401, null);
		} else {
			json_response = requestGen.responseGenerator(200, group);
		}
		callback(null, json_response);
	});
}

var getGroupMember = function(msg, callback) {
	var json_response;

	groupSchema.findOne({ groupId : msg.groupID }, function(err, doc) {

		if (err) {
			json_response = requestGen.responseGenerator(401, null);
		} else {
			json_response = requestGen.responseGenerator(200, doc.members);
		}
		callback(null, json_response);
	});
}

var getGroupPost = function(msg, callback) {

	var json_response;

	groupSchema.findOne({ groupId : msg.groupID }, function(err, doc) {

		if (err) {
			json_response = requestGen.responseGenerator(401, null);
		} else {
			doc.posts.sort();
			doc.posts.reverse();
			json_response = requestGen.responseGenerator(200, doc.posts);
		}
		callback(null, json_response);
	});

}

var postInGroup = function(msg, callback) {
	var json_response;

	groupSchema.findOne({ groupId : msg.groupID }, function(err, doc) {

		doc.posts.push({
			user : msg.username,
			postText : msg.status,
			postTime : new Date()
		});

		doc.save(function(err) {

			if (err) {
				json_response = requestGen.responseGenerator(401, null);
			} else {
				console.log("Adding post to group: " + msg.userId);
				json_response = requestGen.responseGenerator(200, null);
			}
			callback(null, json_response);
		});
	});

}

var joinGroup = function(msg, callback) {

	var json_response;

	groupSchema.findOne({ groupId : msg.groupID }, function(err, doc) {

		doc.members.push({
			memberId : msg.userId,
			memberName : msg.username
		});

		doc.save(function(err) {

			if (err) {
				json_response = requestGen.responseGenerator(401, null);
			} else {
				json_response = requestGen.responseGenerator(200, null);
				addGroupToUsers();
			}
			callback(null, json_response);
		});
		
		var addGroupToUsers = function() {

			userSchema.find({userName : {$in : msg.userId }}, function(err, docs) {

				docs.forEach(function(doc) {
					doc.groups.push({
						groupId : msg.groupID
					});
					doc.save();
					console.log("user doc with groups: " + doc);
				});
			});

		};
	});
}

var leaveGroup = function(msg, callback) {
	
	console.log("userId in leavegroup" + msg.userId);
	
	var member = {
			memberId : msg.userId,
			memberName : msg.username
	};

	var json_response;

	groupSchema.findOne({ groupId : msg.groupID }, function(err, doc) {

		doc.members.remove(member);
		console.log("Removing memebr: " + msg.userId);

		doc.save(function(err) {

			if (err) {
				json_response = requestGen.responseGenerator(401, null);
			} else {
				json_response = requestGen.responseGenerator(200, null);
				removeGroupFromUsers();
			}
			callback(null, json_response);
		});
		
		var removeGroupFromUsers = function() {

			userSchema.findOne({userName :  msg.userId }, function(err, doc) {

					doc.groups.remove({groupId: msg.groupID});
					doc.save();
					console.log("user doc with groups: " + doc);
			});
		};
	});
};


var deleteGroup = function(msg, callback) {
	
	var json_response;
		
	console.log( "message " + msg);
	
	groupSchema.remove({groupId: msg.groupId}, function(err, removed){
		
		if (err) {
			json_response = requestGen.responseGenerator(401, null);
		} else {
			json_response = requestGen.responseGenerator(200, null);
			
			//var users = Object.keys(memberDoc).map(function(k) { return memberDoc[k] });
			
			var users = [];
		//	console.log( "users in member array: " + memberDoc[0].memberId);
		//	console.log( "users in member array: " + memberDoc[1].memberId);
			
			for(var i = 0; i< memberDoc.length; i++){
				users[i] = memberDoc[i].memberId;
			}
			
		//	console.log("users 1 "+ users[0]);
		//	console.log("users 1"+ users[1]);
			
			userSchema.find({userName: {$in: users}}, function(err, docs){
				
				docs.forEach(function(doc){
					doc.groups.remove({groupId: msg.groupId }); 	
					doc.save();
				});
				
			
				callback(null, json_response);
			}); 
		}
	
		//callback(null, json_response);
	});
	
};

exports.createGroup = createGroup;
exports.getGroupList = getGroupList;
exports.getGroupTopList = getGroupTopList;
exports.getGroupInfo = getGroupInfo;
exports.getGroupMember = getGroupMember;
exports.getGroupPost = getGroupPost;
exports.postInGroup = postInGroup;
exports.joinGroup = joinGroup;
exports.leaveGroup = leaveGroup;
exports.deleteGroup = deleteGroup;