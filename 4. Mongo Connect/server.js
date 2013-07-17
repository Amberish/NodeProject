var fs = require("fs");
var config = JSON.parse(fs.readFileSync("config.json"));
var host = config.host;
var port = config.port;
var express = require("express");
var mongo = require("mongodb");

var app = express();

app.use(app.router);
app.use(express.static(__dirname+"/public"));

app.get("/hello/:text", function(request, response){
	response.send("Hello " + request.params.text);
});

app.get("/", function(request, response){
	response.send("Hello and welcome!<br/><ul><li><a href='http://127.0.0.1:1337/hello/YOUR_NAME'>hello</a></li> <li><a href='http://127.0.0.1:1337/user/USER_ID'>user</a></li></ul>");
});

app.get("/set_user_data/:user_id/:name/:email", function(request, response){
	data = {"id" : request.params.user_id, 
			"name" : request.params.name, 
			"email" : request.params.email
	};
	putData(data, function(status){
		if(status){
			response.send("Data successfully written", 200);
		}else{
			response.send("Some error occured", 404);
		}
	});
});

app.get("/user/:id", function(request, response){
	var user = getData(request.params.id.toString(), function(user){
		if(!user){
			response.send("Sorry! User not found!", 404);
		}else{
			response.send("Found user with id " + user.id + " => name: " + user.name + ", Email: " + user.email, 404);
		}
	});	
});

app.get("/get_all_data", function(request, response){
	var user = getAllData(function(users){
		if(!users){
			response.send("Error!", 404);
		}else{
			var str = "";
			for(var i = 0; i< users.length; i++){
				str += "User id : " + users[i].id + ", Name : " + users[i].name + ", Email : " + users[i].email + "<br/>"; 
			}
			response.send(str);
		}		
	});	
});

app.listen(port, host);


function getData(user_id, callback){

	var dbHost = "127.0.0.1";
	var dbPort = mongo.Connection.DEFAULT_PORT;

	var db = mongo.Db("my_collection", new mongo.Server(dbHost, dbPort, {}));
	db.open(function(error){
		console.log("Connected to Database at " + dbHost + ":" + dbPort);
		
		db.collection("user", function(error, collection){
			console.log("We have collection.");
			/*collection.insert({
				"id" : "1",
				"name" : "Amberish Raj",
				"email" : "amberish.raj@gmail.com"
			}, function(){
				console.log("Successfully added Amberish");
			});
			collection.insert({
				"id" : "2",
				"name" : "Amit Kushwaha",
				"email" : "amit.kushwaha5291@gmail.com"
			}, function(){
				console.log("Successfully added Amit");
			});*/
			collection.find({"id" : user_id.toString()}, function(error, cursor){
				cursor.toArray(function(error, users){
				if(error){
					console.log(error);
				}else{
					if(users.length == 0){
						callback(false);
						//console.log("Sorry! User not found!");
					}else{
						callback(users[0]);
						//console.log("Found user with id " + users[0].id + "=> name: " + users[0].name + ", Email: " + users[0].email );
					}
				}
				});
			});
		});
	});
	
}

function putData(data, callback){

	var dbHost = "127.0.0.1";
	var dbPort = mongo.Connection.DEFAULT_PORT;

	var db = mongo.Db("my_collection", new mongo.Server(dbHost, dbPort, {}));
	db.open(function(error){
		console.log("Connected to Database at " + dbHost + ":" + dbPort);
		
		db.collection("user", function(error, collection){
			console.log("We have collection.");
			
			collection.insert(data, function(error){
			if(error){
				callback(false);
			}else{
				callback(true);
			}
			});
		});
	});
}

function getAllData(callback){
	var dbHost = "127.0.0.1";
	var dbPort = mongo.Connection.DEFAULT_PORT;

	var db = mongo.Db("my_collection", new mongo.Server(dbHost, dbPort, {}));
	db.open(function(error){
		console.log("Connected to Database at " + dbHost + ":" + dbPort);
		
		db.collection("user", function(error, collection){
			console.log("We have collection.");
			collection.find(function(error, cursor){
				cursor.toArray(function(error, users){
				if(error){
					console.log(error);
					callback(false);
				}else{
					if(users.length == 0){
						callback(false);
						//console.log("Sorry! User not found!");
					}else{
						callback(users);
						//console.log("Found user with id " + users[0].id + "=> name: " + users[0].name + ", Email: " + users[0].email );
					}
				}
				});
			});
		});
	});
	
}