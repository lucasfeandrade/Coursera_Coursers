var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var Busboy = require('busboy');
var inspect = require('util').inspect;
var http = require('http');
var hostname = 'localhost';
var port = 3000;

var app = express();    //using express

app.use(morgan('dev'));     //login information

//Cria uma rota para nao precisar especificar qual caminho
//individualmente, faz tudo no mesmo

var dishRouter = express.Router();
dishRouter.use(bodyParser.json());

dishRouter.route('/')
.all(function(req,res,next) {

    res.writeHead(200, { 'Content-Type': 'text/plain'});

    next();
})

.get(function(req,res,next) {
    console.log(req);
    res.end('Will send all the dishes to you!');

})

.post(function(req, res, next) {
    //console.log(req.headers);
    //console.log(req.query.filename);
    //console.log(req.body);

    var busboy = new Busboy({ headers: req.headers });
       busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
         console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
         file.on('data', function(data) {
           console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
         });
         file.on('end', function() {
           console.log('File [' + fieldname + '] Finished');
         });
       });
       busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
         console.log('Field [' + fieldname + ']: value: ' + inspect(val));
       });
       busboy.on('finish', function() {
         console.log('Done parsing form!');

         console.log(req.headers);
         console.log(req.query.filename);
        //  console.log(req);
          console.log(req.files);
        // res.writeHead(303, { Connection: 'close', Location: '/' });
         res.end();
       });
       req.pipe(busboy);
})

.delete(function(req, res, next){

    res.end('Deleting all dishes');

})

dishRouter.route('/:dishId')
.all(function(req,res,next) {

    res.writeHead(200, { 'Content-Type': 'text/plain'});

    next();
})


.put(function(req, res, next){
    //exemplo de como pegar informacoes como parametro do get
    res.write('Updating the dish: ' + req.params.dishId + '\n');
    res.end('Will update the dish : ' + req.body.name +'with details: '
    +req.body.description);
})

.get(function(req, res, next){
    //exemplo de como pegar informacoes como parametro do get
    res.end('Will sens details of the dish: ' + req.params.dishId +
            'to you!');
})

.delete(function(req, res, next){
    //exemplo de como pegar informacoes como parametro do get
    res.end('Deleting dish: ' + req.params.dishId );
});

app.use('/dishes', dishRouter);  //aplica a rota em /dishes

app.use(express.static(__dirname+'/public'));

app.listen(port, hostname, function(){
    console.log('Server running at http://${hostname}')
});
