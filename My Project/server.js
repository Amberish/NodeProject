var http = require("http");
var fs = require("fs");

var server = http.createServer(function(request, response){
	response.writeHead(200, {"Content-type" : "text/html"});
	fs.readFile("index.html", function(error, data){
		response.end(data);
	});
	
});

server.listen(1337, '127.0.0.1');