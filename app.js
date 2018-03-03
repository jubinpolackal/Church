var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var https = require('https');
var path = require('path');
var fs = require('fs');
var SQLClient = require('mariasql');
var config = require('./config');
var jwt = require('jsonwebtoken');
var publicRoutes = require('./routes/routes-public');
var routesProtected = require('./routes/routes-protected');

const app = express();

// Parsers
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));

// Send all other requests to the Angular app
/*app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});*/

//Unprotected routes
app.get('/', (req, res)=>{
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.use('/public', publicRoutes);

//Protected routes
//TODO:

//Authenticate using json webtoken for protected routes
function isAuthenticated(req, res, next){
  var token = req.body.token ||
  req.query.token ||
  req.headers['x-access-token'] ||
  req.headers['authorization'];
}

//Set Port
const port = process.env.PORT || config.server.port;
app.set('port', port);



const server = http.createServer(app);

server.listen(port, () => {
  console.log('Church started on '+config.server.host+':'+config.server.port);
});
