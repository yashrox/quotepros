const mongoose = require("mongoose");

const contentsch = new mongoose.Schema({
  description : {type :  String , required : true },
  quote :  {type : String, required : true },
  image :  { type : String , required : true},
  author: {
              id :{
                      type: mongoose.Schema.Types.ObjectId,
                      ref: "user",
                  },
              username : String,
          },
  comments : [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "comment",
          }
  ],

  userimg : String,
  name : String ,
  country : String,


});

module.exports = mongoose.model("contdata",contentsch);
