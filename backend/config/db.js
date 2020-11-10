const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "p@ssw0rd1",
    database : "groupomania"
  
  });

  module.exports = con; 