var SQLClient = require('mariasql');
var config = require('./config');
var client = new SQLClient(config.db);

var database = {
  adminLogin:function(userName, password){

    var prep = client.prepare('select * from users where ')
    client.query('select * from users where name=?', ['Admin'] , (err, rows)=>{
      if (err){
        console.log(err);
      }else{
        console.dir(rows);
      }
    });
    client.end();
  },
  memberLogin:function(name, password){

  }
};

module.exports = database;
