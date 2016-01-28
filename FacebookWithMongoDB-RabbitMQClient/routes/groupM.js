/**
 * New node file
 */
var groupSchema = require('./model/groupSchema');
var userSchema = require('./model/userSchema');
var requestGen = require('./commons/responseGenerator');

var mq_client = require('../rpc/client');

function listGroupsOfUserPage(req, res) {
	var userId = req.session.username;

	if (userId) {
		res.header('Cache-Control','no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
		res.render('groups_user', { title : 'Groups' });
	}
	else {
		res.redirect('/');
	}
}

function groupInfoPage(req, res) {
	var userId = req.session.username;

	if (userId) {
		res.header('Cache-Control','no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
		res.render('group_home', { title : 'Group', group_id : req.param('group_id') });
	} 

	else {
		res.redirect('/');
	}
}

var createGroup = function(req, res) {

	var group_name = req.param('group_name');
	var group_desc = req.param('group_desc');
	var add_friends = req.param('add_friends');
	// var userID = req.session.userId;
	var username = req.session.username;
	var name = req.session.name;

	var msg_payload = {
			"group_name" : group_name,
			"group_desc" : group_desc,
			"add_friends" : add_friends,
			"username" : username,
			"name" : name,
			"func" : "createGroup"
	};

	if (username) {
		mq_client.make_request('group_queue', msg_payload, function(err, results) {

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

var getGroupList = function(req, res) {
	var userId = req.session.username;
	var msg_payload = {
			"userId" : userId,
			"func" : "groupList"
	};
	if (userId) {
		mq_client.make_request('group_queue', msg_payload, function(err, results) {

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

var getGroupTopList = function(req, res) {
	var userId = req.session.username;
	var msg_payload = {
			"userId" : userId,
			"func" : "groupTopList"
	};
	if (userId) {
		mq_client.make_request('group_queue', msg_payload, function(err, results) {

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

var getGroupInfo = function(req, res) {
	var groupID = req.param('group_id');
	var userId = req.session.username;

	var msg_payload = {
			"userId" : userId,
			"groupID" : groupID,
			"func" : "groupInfo"
	};

	if (userId) {
		mq_client.make_request('group_queue', msg_payload, function(err, results) {

			console.log(results);
			if (err) {
				console.log(err);
				res.render('failed_Query');
			} else {
				console.log("group info:" + JSON.stringify(results));
				res.send(results);
			}
		});
	} else {
		res.send(requestGen.responseGenerator(500, null));
	}
}

var getGroupMember = function(req, res, data) {
	var groupID = req.param('group_id');
	var userId = req.session.username;

	var msg_payload = {
			"groupID" : groupID,
			"func" : "groupMembers"
	};

	if (userId) {
		mq_client.make_request('group_queue', msg_payload, function(err, results) {

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

var getGroupPost = function(req, res) {
	var groupID = req.param('group_id');
	var userId = req.session.username;

	var msg_payload = {
			"groupID" : groupID,
			"func" : "groupPosts"
	};

	if (userId) {
		mq_client.make_request('group_queue', msg_payload, function(err, results) {

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

var postInGroup = function(req, res) {
	var groupID = req.param('group_id');
	// var userID = req.session.userId;
	var status = req.param('post_status');
	var userId = req.session.username;
	var username = req.session.name;

	var msg_payload = {
			"userId" : userId,
			"groupID" : groupID,
			"status" : status,
			"username" : username,
			"func" : "postInGroup"
	};

	if (userId) {
		mq_client.make_request('group_queue', msg_payload, function(err, results) {

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

var joinGroup = function(req, res) {

	var groupID = req.param('group_id');
	// var userID = req.param('user_id');
	var userId = req.session.username;
	var userName = req.session.name;

	var msg_payload = {
			"userId" : userId,
			"groupID" : groupID,
			"username" : userName,
			"func" : "joinGroup"
	};

	if (userId) {
		mq_client.make_request('group_queue', msg_payload, function(err, results) {

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

var leaveGroup = function(req, res) {
	var groupID = req.param('group_id');
	var userId = req.session.username;
	var username = req.session.name;

	var msg_payload = {
			"userId" : userId,
			"groupID" : groupID,
			"username" : username,
			"func" : "leaveGroup"
	};

	if (userId) {
		mq_client.make_request('group_queue', msg_payload, function(err, results) {

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

var removeMember = function(req, res) {
	var groupID = req.param('group_id');
	var userId = req.param('user_id');
	var userName = req.param('user_name');

	var msg_payload = {
			"userId" : userId,
			"groupID" : groupID,
			"username" : userName,
			"func" : "leaveGroup"
	};

	if (userId) {
		mq_client.make_request('group_queue', msg_payload, function(err, results) {

			console.log( "results in remove group:  " + results);
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


exports.deleteGroup = function(req, res){
	
	var groupId = req.param('groupId');
	
	var msg_payload = {
			"groupId" : groupId,
			"func" : "deleteGroup"
	};
	
	mq_client.make_request('group_queue', msg_payload, function(err, results) {

		//console.log( "results in remove group:  " + results);
		if (err) {
			console.log(err);
			res.render('failed_Query');
		} else {
			res.send(results);
		}
	});
	
};

exports.createGroup = createGroup;
exports.getGroupList = getGroupList;
exports.getGroupTopList = getGroupTopList;
exports.getGroupInfo = getGroupInfo;
exports.getGroupMember = getGroupMember;
exports.getGroupPost = getGroupPost;
exports.postInGroup = postInGroup;
exports.listGroupsOfUserPage = listGroupsOfUserPage;
exports.groupInfoPage = groupInfoPage;
exports.joinGroup = joinGroup;
exports.leaveGroup = leaveGroup;
exports.removeMember = removeMember;