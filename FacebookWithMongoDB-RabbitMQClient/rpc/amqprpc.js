var amqp = require('amqp')
, crypto = require('crypto');

var TIMEOUT=8000; //time to wait for response in ms
var CONTENT_TYPE='application/json';
var CONTENT_ENCODING='utf-8';
var self;

exports = module.exports = AmqpRpc;

function AmqpRpc(connection){
	self = this;
	this.connection = connection; 
	this.requests = {}; //hash to store request in wait for response
	this.response_queue = false; //placeholder for the future queue
}


AmqpRpc.prototype.makeRequest = function(queue_name, content, callback){

	self = this;
	var correlationId = crypto.randomBytes(16).toString('hex');

	var tId = setTimeout(function(corr_id){
		callback(new Error("timeout " + corr_id));
		delete self.requests[corr_id];
	}, TIMEOUT, correlationId);

	var entry = {
			callback:callback,
			timeout: tId 
	};

	self.requests[correlationId]=entry;

	self.setupResponseQueue(function(){

		self.connection.publish(queue_name, content, {
			correlationId:correlationId,
			contentType:CONTENT_TYPE,
			contentEncoding:CONTENT_ENCODING,
			replyTo:self.response_queue});
	});
};


AmqpRpc.prototype.setupResponseQueue = function(next){
	if(this.response_queue) return next();

	self = this;

	self.connection.queue('', {exclusive:true}, function(q){  

		self.response_queue = q.name;

		q.subscribe(function(message, headers, deliveryInfo, m){
			var correlationId = m.correlationId;
			if(correlationId in self.requests){
				var entry = self.requests[correlationId];
				clearTimeout(entry.timeout);
				delete self.requests[correlationId];
				entry.callback(null, message);
			}
		});
		return next();    
	});
};