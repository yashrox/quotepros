const user = require("../models/login");
const cont = require("../models/content");

module.exports = {

islogin :  function(req,res,next){
          if(req.isAuthenticated()){
            return next();
            }
              res.redirect("/login");
            } ,

checkowner : (req,res,next) => {
                    if(req.isAuthenticated()){
                        cont.findById(req.params.id, function(err, campground){
                          if(campground.author.id.equals(req.user._id)){
                            next();
                          } else {
                            res.redirect("/content/" + req.params.id);
                          }
                        });
                      } else {
                        res.redirect("/login");
                      }

                    }


}
