var http = require('http'),
    morgan = require('morgan'); //login informationn on server side
    express = require('express');

var hostname = 'localhost';
var port = 3000;

var app = express();

app.use(morgan('dev'));     //one of de middleware usado por express
// serve pra mostrar as informacoes do log
app.use(express.static(__dirname+'/public')); //dizendo que o public contem todos os arquivos
//o massa eh que so aparece o que tem no public

app.listen(port, hostname, function() {
    console.log('Server running at http http://${hostname}:${port}/');
});
