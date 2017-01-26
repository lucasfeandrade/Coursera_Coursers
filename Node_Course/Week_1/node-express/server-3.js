var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var hostname = 'localhost';
var port = 3000;

var app = express();    //using express

app.use(morgan('dev'));     //login information

app.use(bodyParser.json()); //if there is json, parse it

app.all('/dishes', function(req,res,next) {

    res.writeHead(200, { 'Content-Type': 'text/plain'});

    next();

});

//respostas pro get
app.get('/dishes', function(req,res,next){

    res.end('Will send all the dishes to you!');

});

app.post('/dishes', function(req, res, next) {

    res.end('Will add the dish: ' + req.body.name + ' with details: '
    + req.body.description);

});

app.delete('/dishes', function(req, res, next){

    res.end('Deleting all dishes');

});

app.get('/dishes/:dishId', function(req, res, next){
    //exemplo de como pegar informacoes como parametro do get
    res.end('Will sens details of the dish: ' + req.params.dishId +
            'to you!')
});

app.put('/dishes/:dishId', function(req, res, next){
    //exemplo de como pegar informacoes como parametro do get
    res.write('Updating the dish: ' + req.params.dishId + '\n');
    res.end('Will update the dish : ' + req.body.name +'with details: '
    +req.body.description);
});

app.get('/dishes/:dishId', function(req, res, next){
    //exemplo de como pegar informacoes como parametro do get
    res.end('Will sens details of the dish: ' + req.params.dishId +
            'to you!')
});

app.delete('/dishes/:dishId', function(req, res, next){
    //exemplo de como pegar informacoes como parametro do get
    res.end('Deleting dish: ' + req.params.dishId );
});

app.use(express.static(__dirname+'/public'));

app.listen(port, hostname, function(){
    console.log('Server running at http://${hostname}')
});
