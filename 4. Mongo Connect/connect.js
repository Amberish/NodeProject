var mongo = require("mongodb");

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
						callback(users[0])
						//console.log("Found user with id " + users[0].id + "=> name: " + users[0].name + ", Email: " + users[0].email );
					}
				}
				});
			});
		});
	});
	
}

getData("2", function(user){
	if(!user){
		console.log("Sorry! User not found!");
	}else{
		console.log("Found user with id " + user.id + "=> name: " + user.name + ", Email: " + user.email );
	}
});