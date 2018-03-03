var SQLClient = require('mariasql');
var config = require('./config');
var client = new SQLClient(config.db);

var database = {
  adminLogin:function(userName, password, success, error) {

    var prep = client.prepare('select * from users where userName = :userName AND password = :password');
    try{
      client.query(prep({userName: userName, password: password}) , (err, rows)=>{
        if (err){
          console.log('ERROR: '+err);
          error(err);
        }else{
          if (rows.length > 0){
            success(rows);
          }else{
            error(new Error('Invalid credentials'));
          }
          return true;
        }
      });
      client.end();
    }catch(e){
      console.log(e);
    }
  },

  memberLogin:function(name, password){

  }
};

module.exports = database;
