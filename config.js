var config = {};

config.logger = {
  colorize : true
};

config.server = {
  host:'localhost',
  port:'3000'
};

//Config data to access mysql database
config.db = {
    user: 'root',
    host: '127.0.0.1',
    password: '',
    db: 'church'
};

//Response structure for admin login
config.adminResponse = {
  status: 200,
  token: '',
  userName: '',
  error:''
};

//Secret key for json web token
config.jwtSecretKey = 'yG5SZyflp4';

module.exports = config;
