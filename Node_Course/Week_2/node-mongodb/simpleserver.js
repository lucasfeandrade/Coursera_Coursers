var MongoClient = require('mongodb').MongoClient,
	assert = require('assert');


// Connection Url
var url = 'mongodb://localhost:27017/conFusion';
// Use connect method to connect to the Server
MongoClient.connect(url, function (err, db) {
	assert.equal(err,null); 	//checa se tem erro
	console.log("Connected correctly to server");

	var collection = db.collection("dishes");
	
	//metodo pra inserir
	collection.insertOne({name: "Uthapizza", description: "test"},
	function(err,result){
		assert.equal(err,null);
		console.log("After Insert:");
		console.log(result.ops);  //mostra o que foi inserido

		//metodo para fazer a query e transformar em um array os resultados
		collection.find({}).toArray(function(err,docs){
			assert.equal(err,null);
			console.log("Found:");
			console.log(docs);

			db.dropCollection("dishes", function(err, result){
				assert.equal(err,null);
				db.close();
			});
		});
	});
});


