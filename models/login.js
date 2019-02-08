const mongoose = require("mongoose");

const passmong = require("passport-local-mongoose");

const usersch = new mongoose.Schema({
  username :String,
  password :String,
})

usersch.plugin(passmong);

module.exports = mongoose.model("user",usersch);



/*
var connect = function()
    const usersch = new mongoose.Schema({
        username: String,
        password: String
    });
    usersch.plugin(passmong);
  return  mongoose.model("user", usersch);
}

module.exports = connect();
*/
