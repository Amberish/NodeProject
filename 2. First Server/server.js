var http = require("http");
var fs = require("fs");
var config = JSON.parse(fs.readFileSync("config.json"));
console.log("Starting Server");
var host = config.host;
var port = config.port;
var server = http.createServer(function(request, response){
	console.log("Request from URL:", request.url);	
	fs.readFile("./public"+request.url, function(error, data){
		if(error){
			response.writeHead(404, {"Content-type" : "text/html"});
			response.end("Sorry! Some error occured!");
		}else{
			response.writeHead(200, {"Content-type" : "text/html"});
			response.end(data);
		}		
	});
});

server.listen(port, host, function(){
	console.log("Listening at : "+ host + ":" + port);
});