const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'BRDONJU12',
  database : 'users'
});
module.exports  =  connection;