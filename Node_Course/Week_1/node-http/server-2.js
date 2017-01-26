var http = require('http');
var fs = require('fs');
var path = require('path');

var hostname = 'localhost';
var port = 3000;


var server = http.createServer(function(req, res){
	
	console.log('Request for ' + req.url + ' by method ' + req.method);

	if(req.method == 'GET') {
	
		var fileUrl;

		if (req.url == '/') fileUrl = '/index.html'; // se nao estiver nada especificado ele vai direto pro index.html
		else fileUrl = req.url;	//caso contrario a file eh a url memso 

		var filePath = path.resolve('./public'+fileUrl);   //ajuta as / de acordo com o SO

		var fileExt = path.extname(filePath);	//Checa a extensao e retorna ela

		if (fileExt == '.html') {
			fs.exists(filePath, function(exists) {
				
				if(!exists) {	//eh um html mas nao existe
					res.writeHead(404, { 'Content-Type' : 'text/html' });
					res.end('<h1> Error 404: ' + fileUrl+ 'not found </h1>');
					return;
				} 
					//eh um html e existe (Y)
				res.writeHead(200, {'Content-Type' : 'text/html' });
				fs.createReadStream(filePath).pipe(res);

			});
		} else {	//nao eh um html			
					res.writeHead(404, { 'Content-Type' : 'text/html' });
					res.end('<h1> Error 404: ' + fileUrl+ 'not found </h1>');
		}
	}
	else {		
		res.writeHead(404, { 'Content-Type' : 'text/html' });
		res.end('<h1> Error 404: ' + fileUrl+ 'not found </h1>');
	}
})

server.listen(port, hostname, function(){
		console.log('Server running at http://${hostname}:${port}/');
});
