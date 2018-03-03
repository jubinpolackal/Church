var express = require('express');
var bodyParser = require('body-parser');
var config = require('../config');
var jwt = require('jsonwebtoken')
var app = express();
var apiRoutes = express.Router();
var http = require('http');
var db = require('../database');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.set('tokenSecret', config.jwtSecretKey);

apiRoutes.route('/admin-login').post((req, res, body)=>{
    var user = req.body;
    var userResponse = config.adminResponse;
    if (!user){
      res.sendStatus(400);
    }else{
      db.adminLogin(user.userName,
                    user.password,
                    (rows)=>{
                      console.log('Admin login [OK]');
                      var token = jwt.sign({data:user.userName},
                        app.get('tokenSecret'),
                        {expiresIn:'5h'});

                      userResponse.token = token;
                      userResponse.status = 200;
                      userResponse.userName = user.userName;
                      userResponse.error = 'Login success';
                      res.send(userResponse);
                    },
                    (err)=>{
                      console.log('Admin login [FAILED]');
                      userResponse.status = 400;
                      userResponse.error = err.message;
                      console.log(err);
                      userResponse.token = '';
                      userResponse.userName = '';
                      res.send(userResponse);
                    });
  }
});

module.exports = apiRoutes;
