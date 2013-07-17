var fs = require("fs");
var config = JSON.parse(fs.readFileSync("config.json"));
var host = config.host;
var port = config.port;
var express = require("express");

var app = express();

app.use(app.router);
app.use(express.static(__dirname+"/public"));

app.get("/hello/:text", function(request, response){
	response.send("Hello " + request.params.text);
});

app.get("/", function(request, response){
	response.send("Hello and welcome!<br/><ul><li><a href='http://127.0.0.1:1337/hello/YOUR_NAME'>hello</a></li> <li><a href='http://127.0.0.1:1337/user/USER_ID'>user</a></li></ul>");
});

var users = {
				"1" : {
					"name" : "Amberish Raj",
					"employment" : "Web Developer"
				},
				"2" : {
					"name" : "Amit",
					"employment" : "Web Developer"
				}
		}

app.get("/user/:id", function(request, response){
	var user = users[request.params.id];
	if(user){
		response.send("Hi " + user["name"], 200);
	}else{
		response.send("Sorry! Usernot found.", 404);
	}
	
});

app.listen(port, host);