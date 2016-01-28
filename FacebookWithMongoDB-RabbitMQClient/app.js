/**
 * Module dependencies.
 */

var express = require('express')
	, routes = require('./routes')
	, http = require('http')
	, path = require('path')
	, logout = require('./routes/logout')
	, expressSession = require("express-session")
	, mongoStore = require("connect-mongo")(expressSession)
	, mongo = require("./routes/mongo");


// testing mongoose

var registerM = require('./routes/registerM')
	, loginM = require('./routes/loginM')
	, profileM = require('./routes/profileM')
	, aboutM = require('./routes/aboutM')
	, timelineM = require('./routes/timelineM')
	, homepageM = require('./routes/homepageM')
	, groupM = require('./routes/groupM')
	, getFrndsM = require('./routes/getFrndsM')
	, getJsonTimelineM = require('./routes/getJsonTimelineM')
	, searchM = require('./routes/searchM');

// URL for the sessions collections in mongoDB
var mongoSessionConnectURL = "mongodb://localhost:27017/sessions";


var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(expressSession({
	secret : 'cmpe273_teststring',
	resave : false, // don't save session if unmodified
	saveUninitialized : false, // don't create session until something stored
	duration : 30 * 60 * 1000,
	activeDuration : 5 * 60 * 1000,
	store : new mongoStore({
		url : mongoSessionConnectURL
	})
}));
app.use(app.router);
app.engine('ejs', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

// GET Requests

app.get('/', loginM.signin);
app.get('/signin', loginM.signin);
app.get('/logout', logout.logout);


// Page render
app.post('/registerM', registerM.register);
app.post('/loginM', loginM.login);
app.get('/aboutM', aboutM.about);
app.get('/about', aboutM.renderAbout);
app.get('/homepage', homepageM.homepage);
app.get('/groups', groupM.listGroupsOfUserPage);
app.get('/groupInfoPageM', groupM.groupInfoPage);
app.get('/getFrndsPage', getFrndsM.renderer);
app.get('/userTimelineM', timelineM.renderVisitTimeline);
app.get('/timelineM', timelineM.renderTimeline);

app.post('/addProfileM', profileM.profile);
app.get('/timelineDetailsM', timelineM.timelineDetails);
app.get('/userTimelineDetailsM', timelineM.userTimelineDetails);
app.post('/postStatusTimelineM', getJsonTimelineM.postStatusTimeline);
app.post('/postStatusUserTimelineM', getJsonTimelineM.postStatusUserTimeline);
app.get('/getJsonTimelineM', getJsonTimelineM.getJsonTimeline);
app.get('/getJsonUserTimelineM', getJsonTimelineM.getJsonUserTimeline);
app.post('/getUserNameM', homepageM.getUserName);
app.get('/newsFeedM', homepageM.newsFeed);
app.post('/postStatusM', homepageM.postStatus);
app.get('/getFrndsM', getFrndsM.list);
app.get('/pendingListM', getFrndsM.pendingList);
app.get('/userSearchM', searchM.userSearch);
app.get('/groupSearchM', searchM.groupSearch);
app.get('/search', searchM.renderSearch);
app.post('/sendFriendRequest', getJsonTimelineM.sendFriendRequest);
app.post('/acceptFriendRequest', getJsonTimelineM.acceptFriendRequest);
app.post('/ignoreFriendRequest', getJsonTimelineM.ignoreFriendRequest);

app.post('/createGroupM', groupM.createGroup);
app.get('/getGroupListM', groupM.getGroupList);
app.post('/joinGroupM', groupM.joinGroup);
app.post('/leaveGroupM', groupM.leaveGroup);
app.post('/removeMemberM', groupM.removeMember);
app.post('/postInGroupM', groupM.postInGroup);
app.get('/getGroupPostM', groupM.getGroupPost);
app.get('/getGroupMemberM', groupM.getGroupMember);
app.get('/getGroupInfoM', groupM.getGroupInfo);
app.get('/getGroupTopListM', groupM.getGroupTopList);
app.post('/deleteGroup', groupM.deleteGroup);

// connect to the mongo collection session and then createServer
mongo.connect(mongoSessionConnectURL, function() {
	console.log('Connected to mongo at: ' + mongoSessionConnectURL);
	http.createServer(app).listen(app.get('port'), function() {
		console.log('Express server listening on port ' + app.get('port'));
	});
});