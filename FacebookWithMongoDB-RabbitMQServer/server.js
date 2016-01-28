/**
 * New node file
 */
// super simple rpc server example
var amqp = require('amqp'), util = require('util');

var login = require('./services/login');
var register = require('./services/register');
var homepage = require('./services/homepage');
var group = require('./services/group');
var timeline = require('./services/timeline');
var about = require('./services/about');
var search = require('./services/search');
var friend = require('./services/friend');

var cnn = amqp.createConnection({
	host : '127.0.0.1'
});

cnn.on('ready', function() {
	console.log("listening on register_queue");

	cnn.queue('register_queue', function(q) {
		q.subscribe(function(message, headers, deliveryInfo, m) {
			util.log("register_queue: ");
			util.log(util.format(deliveryInfo.routingKey, message));
			util.log("Message: " + JSON.stringify(message));
			util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));

			switch (message.func) {
			case "register":
				register.register(message, function(err, res) {

					util.log("Correlation ID: " + m.correlationId);
					// return index sent
					cnn.publish(m.replyTo, res, {
						contentType : 'application/json',
						contentEncoding : 'utf-8',
						correlationId : m.correlationId
					});
				});
				break;
			case "addProfileInfo":
				register.addProfileInfo(message, function(err, res) {

					util.log("Correlation ID: " + m.correlationId);
					// return index sent
					cnn.publish(m.replyTo, res, {
						contentType : 'application/json',
						contentEncoding : 'utf-8',
						correlationId : m.correlationId
					});
				});
				break;
			}
		});
	});

	console.log("listening on login_queue");
	cnn.queue('login_queue', function(q) {
		q.subscribe(function(message, headers, deliveryInfo, m) {
			util.log("login_queue: ");
			util.log(util.format(deliveryInfo.routingKey, message));
			util.log("Message: " + JSON.stringify(message));
			util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));

			login.login(message, function(err, res) {

				util.log("Correlation ID: " + m.correlationId);
				// return index sent
				cnn.publish(m.replyTo, res, {
					contentType : 'application/json',
					contentEncoding : 'utf-8',
					correlationId : m.correlationId
				});
			});
		});
	});

	console.log("listening on homepage_queue");
	cnn.queue('homepage_queue', function(q) {
		q.subscribe(function(message, headers, deliveryInfo, m) {
			util.log("homepage_queue: ");
			util.log(util.format(deliveryInfo.routingKey, message));
			util.log("Message: " + JSON.stringify(message));
			util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));

			switch (message.func) {
			case "getUserId":
				homepage.getUserName(message, function(err, res) {

					util.log("Correlation ID: " + m.correlationId);
					// return index sent
					cnn.publish(m.replyTo, res, {
						contentType : 'application/json',
						contentEncoding : 'utf-8',
						correlationId : m.correlationId
					});
				});
				break;
			case "newsFeed":
				homepage.newsFeed(message, function(err, res) {

					util.log("Correlation ID: " + m.correlationId);
					// return index sent
					cnn.publish(m.replyTo, res, {
						contentType : 'application/json',
						contentEncoding : 'utf-8',
						correlationId : m.correlationId
					});
				});
				break;
			case "postStatus":
				homepage.postStatus(message, function(err, res) {

					util.log("Correlation ID: " + m.correlationId);
					// return index sent
					cnn.publish(m.replyTo, res, {
						contentType : 'application/json',
						contentEncoding : 'utf-8',
						correlationId : m.correlationId
					});
				});
				break;

			}
		});
	});

	console.log("listening on timeline_queue");
	cnn.queue('timeline_queue', function(q) {
		q.subscribe(function(message, headers, deliveryInfo, m) {
			util.log("timeline_queue: ");
			util.log(util.format(deliveryInfo.routingKey, message));
			util.log("Message: " + JSON.stringify(message));
			util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));

			switch (message.func) {
			case "ownTimeline":
				timeline.timelineDetails(message, function(err, res) {

					util.log("Correlation ID: " + m.correlationId);
					// return index sent
					cnn.publish(m.replyTo, res, {
						contentType : 'application/json',
						contentEncoding : 'utf-8',
						correlationId : m.correlationId
					});
				});
				break;
			case "visitTimeline":
				timeline.userTimelineDetails(message, function(err, res) {

					util.log("Correlation ID: " + m.correlationId);
					// return index sent
					cnn.publish(m.replyTo, res, {
						contentType : 'application/json',
						contentEncoding : 'utf-8',
						correlationId : m.correlationId
					});
				});
				break;
			case "getWallPosts":
				timeline.getWallPosts(message, function(err, res) {

					util.log("Correlation ID: " + m.correlationId);
					// return index sent
					cnn.publish(m.replyTo, res, {
						contentType : 'application/json',
						contentEncoding : 'utf-8',
						correlationId : m.correlationId
					});
				});
				break;
			case "poststatusOnTimeline":
				timeline.poststatusOnTimeline(message, function(err, res) {

					util.log("Correlation ID: " + m.correlationId);
					// return index sent
					cnn.publish(m.replyTo, res, {
						contentType : 'application/json',
						contentEncoding : 'utf-8',
						correlationId : m.correlationId
					});
				});
				break;
			case "postStatusOnUserTimeline":
				timeline.postStatusOnUserTimeline(message, function(err, res) {

					util.log("Correlation ID: " + m.correlationId);
					// return index sent
					cnn.publish(m.replyTo, res, {
						contentType : 'application/json',
						contentEncoding : 'utf-8',
						correlationId : m.correlationId
					});
				});
				break;
			case "sendFriendReq":
				timeline.sendFriendRequest(message, function(err, res) {

					util.log("Correlation ID: " + m.correlationId);
					// return index sent
					cnn.publish(m.replyTo, res, {
						contentType : 'application/json',
						contentEncoding : 'utf-8',
						correlationId : m.correlationId
					});
				});
				break;
			case "acceptFriendReq":
				timeline.acceptFriendRequest(message, function(err, res) {

					util.log("Correlation ID: " + m.correlationId);
					// return index sent
					cnn.publish(m.replyTo, res, {
						contentType : 'application/json',
						contentEncoding : 'utf-8',
						correlationId : m.correlationId
					});
				});
				break;
			case "ignoreFriendReq":
				timeline.ignoreFriendRequest(message, function(err, res) {

					util.log("Correlation ID: " + m.correlationId);
					// return index sent
					cnn.publish(m.replyTo, res, {
						contentType : 'application/json',
						contentEncoding : 'utf-8',
						correlationId : m.correlationId
					});
				});
				break;

			}
		});
	});

	console.log("listening on group_queue");
	cnn.queue('group_queue', function(q) {
		q.subscribe(function(message, headers, deliveryInfo, m) {
			util.log("group_queue: ");
			util.log(util.format(deliveryInfo.routingKey, message));
			util.log("Message: " + JSON.stringify(message));
			util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));

			switch (message.func) {
			case "createGroup":
				group.createGroup(message, function(err, res) {

					util.log("Correlation ID: " + m.correlationId);
					// return index sent
					cnn.publish(m.replyTo, res, {
						contentType : 'application/json',
						contentEncoding : 'utf-8',
						correlationId : m.correlationId
					});
				});
				break;
			case "groupList":
				group.getGroupList(message, function(err, res) {

					util.log("Correlation ID: " + m.correlationId);
					// return index sent
					cnn.publish(m.replyTo, res, {
						contentType : 'application/json',
						contentEncoding : 'utf-8',
						correlationId : m.correlationId
					});
				});
				break;
			case "groupTopList":
				group.getGroupTopList(message, function(err, res) {

					util.log("Correlation ID: " + m.correlationId);
					// return index sent
					cnn.publish(m.replyTo, res, {
						contentType : 'application/json',
						contentEncoding : 'utf-8',
						correlationId : m.correlationId
					});
				});
				break;
			case "groupInfo":
				group.getGroupInfo(message, function(err, res) {

					util.log("Correlation ID: " + m.correlationId);
					// return index sent
					cnn.publish(m.replyTo, res, {
						contentType : 'application/json',
						contentEncoding : 'utf-8',
						correlationId : m.correlationId
					});
				});
				break;
			case "groupMembers":
				group.getGroupMember(message, function(err, res) {

					util.log("Correlation ID: " + m.correlationId);
					// return index sent
					cnn.publish(m.replyTo, res, {
						contentType : 'application/json',
						contentEncoding : 'utf-8',
						correlationId : m.correlationId
					});
				});
				break;
			case "groupPosts":
				group.getGroupPost(message, function(err, res) {

					util.log("Correlation ID: " + m.correlationId);
					// return index sent
					cnn.publish(m.replyTo, res, {
						contentType : 'application/json',
						contentEncoding : 'utf-8',
						correlationId : m.correlationId
					});
				});
				break;
			case "postInGroup":
				group.postInGroup(message, function(err, res) {

					util.log("Correlation ID: " + m.correlationId);
					// return index sent
					cnn.publish(m.replyTo, res, {
						contentType : 'application/json',
						contentEncoding : 'utf-8',
						correlationId : m.correlationId
					});
				});
				break;
			case "joinGroup":
				group.joinGroup(message, function(err, res) {

					util.log("Correlation ID: " + m.correlationId);
					// return index sent
					cnn.publish(m.replyTo, res, {
						contentType : 'application/json',
						contentEncoding : 'utf-8',
						correlationId : m.correlationId
					});
				});
				break;
			case "leaveGroup":
				group.leaveGroup(message, function(err, res) {

					util.log("Correlation ID: " + m.correlationId);
					// return index sent
					cnn.publish(m.replyTo, res, {
						contentType : 'application/json',
						contentEncoding : 'utf-8',
						correlationId : m.correlationId
					});
				});
				break;
				
			case "deleteGroup":
				group.deleteGroup(message, function(err, res) {

					util.log("Correlation ID: " + m.correlationId);
					// return index sent
					cnn.publish(m.replyTo, res, {
						contentType : 'application/json',
						contentEncoding : 'utf-8',
						correlationId : m.correlationId
					});
				});
				break;	
			}
		});
	});

	console.log("listening on about_queue");
	cnn.queue('about_queue', function(q) {
		q.subscribe(function(message, headers, deliveryInfo, m) {
			util.log("about_queue: ");
			util.log(util.format(deliveryInfo.routingKey, message));
			util.log("Message: " + JSON.stringify(message));
			util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));

			about.about(message, function(err, res) {

				util.log("Correlation ID: " + m.correlationId);
				// return index sent
				cnn.publish(m.replyTo, res, {
					contentType : 'application/json',
					contentEncoding : 'utf-8',
					correlationId : m.correlationId
				});
			});
		});
	});
	
	
	console.log("listening on search_queue");
	cnn.queue('search_queue', function(q) {
		q.subscribe(function(message, headers, deliveryInfo, m) {
			util.log("search_queue: ");
			util.log(util.format(deliveryInfo.routingKey, message));
			util.log("Message: " + JSON.stringify(message));
			util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));
			
			switch (message.func) {
			case "userSearch":
				search.userSearch(message, function(err, res) {
	
					util.log("Correlation ID: " + m.correlationId);
					// return index sent
					cnn.publish(m.replyTo, res, {
						contentType : 'application/json',
						contentEncoding : 'utf-8',
						correlationId : m.correlationId
					});
				});
				break;
			case "groupSearch":
				search.groupSearch(message, function(err, res) {
	
					util.log("Correlation ID: " + m.correlationId);
					// return index sent
					cnn.publish(m.replyTo, res, {
						contentType : 'application/json',
						contentEncoding : 'utf-8',
						correlationId : m.correlationId
					});
				});
				break;
			}	
		});
	});
	
	
	console.log("listening on friend_queue");
	cnn.queue('friend_queue', function(q) {
		q.subscribe(function(message, headers, deliveryInfo, m) {
			util.log("friend_queue: ");
			util.log(util.format(deliveryInfo.routingKey, message));
			util.log("Message: " + JSON.stringify(message));
			util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));
			switch (message.func) {
			case "friendList":
				friend.friendList(message, function(err, res) {
	
					util.log("Correlation ID: " + m.correlationId);
					// return index sent
					cnn.publish(m.replyTo, res, {
						contentType : 'application/json',
						contentEncoding : 'utf-8',
						correlationId : m.correlationId
					});
				});
				break;
			case "pendingList":
				friend.pendingList(message, function(err, res) {
	
					util.log("Correlation ID: " + m.correlationId);
					// return index sent
					cnn.publish(m.replyTo, res, {
						contentType : 'application/json',
						contentEncoding : 'utf-8',
						correlationId : m.correlationId
					});
				});
				break;
			}
		});
	});
});