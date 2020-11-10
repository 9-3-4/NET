const con = require("./../config/db.js");

// construction
const User = function (user) {
    console.log(user);
    this.NOM = user.NOM;
    this.email = user.email;
    this.MDP = user.password;
  };

  //Création d'un user
User.create = (newCustomer, result) => {
    con.query("INSERT INTO t_user SET ?", newCustomer, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created customer: ", { id: res.insertId, ...newCustomer });
      result(null, { id: res.insertId, ...newCustomer });
    });
  };

  module.exports = User;