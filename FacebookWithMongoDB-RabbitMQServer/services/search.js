/**
 * http://usejsdoc.org/
 */
var requestGen = require('./commons/responseGenerator');
var userSchema = require('./model/userSchema');
var groupSchema = require('./model/groupSchema');

exports.userSearch = function(msg, callback){
	
	var json_response;
	
	var searchText = msg.searchText;
	
	var data = [];
	
	userSchema.find({ $or : [ {	userName : new RegExp(searchText, 'i') }, 
	                          { firstName : new RegExp(searchText, 'i')}, 
	                          { lastName : new RegExp(searchText, 'i') } ] }, function(err, docs) {
	                        	  if (err) {
	                        		  json_response = requestGen.responseGenerator(401, null);
	                        	  } else {

	                        		  if (docs.length > 0) {

	                        			  docs.forEach(function(doc) {
	                        				  data.push({
	                        					  userId : doc.userName,
	                        					  firstName : doc.firstName,
	                        					  lastName : doc.lastName
	                        				  });
	                        			  });

	                        			  json_response = requestGen.responseGenerator(200, data);

	                        		  } else {
	                        			  json_response = requestGen.responseGenerator(200, null);
	                        		  }

	                        	  }
	                        	  
	                        	  callback(null, json_response);
	                          });
	
};

exports.groupSearch = function(msg, callback){
	
	var json_response;
	
	var searchText = msg.searchText;
	
	var data = [];

	groupSchema.find({ $or : [ { groupName : new RegExp(searchText, 'i')}, 
	                           { description : new RegExp(searchText, 'i') } ] }, function(err, docs) {
	                        	   if (err) {
	                        		   json_response = requestGen.responseGenerator(401, null);
	                        	   } else {
	                        		   console.log("docs" + docs);

	                        		   if (docs.length > 0) {

	                        			   docs.forEach(function(doc) {
	                        				   data.push({
	                        					   groupId : doc.groupId,
	                        					   groupName : doc.groupName
	                        				   });
	                        			   });

	                        			   json_response = requestGen.responseGenerator(200, data);

	                        		   } else {
	                        			   json_response = requestGen.responseGenerator(200, null);
	                        		   }

	                        	   }
	                        	   
	                        	   callback(null, json_response);
	                           });
	
};