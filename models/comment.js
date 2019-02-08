const mongoose = require("mongoose");

const comsch = new mongoose.Schema({
                      title : {type : String , required : true},
                      date : {type: Date ,default : Date.now },
                      content : {
                                    id: { type : mongoose.Schema.Types.ObjectId ,
                                       ref : "user",
                                     }  ,
                                    username : String ,
                        }


                    });
module.exports = mongoose.model("comment" , comsch);
