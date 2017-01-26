
exports.dishRouter = function() {

var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');


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

    res.end('Will send all the dishes to you!');

})

.post(function(req, res, next) {

    res.end('Will add the dish: ' + req.body.name + ' with details: '
    + req.body.description);

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

});
}
