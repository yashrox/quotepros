const express = require("express");
const router  = express.Router();
const user  =require("../models/login");
const passport = require("passport");



router.get("/register", (req,res) => {
  res.render("register")
})

router.post("/register", (req,res) => {

//var user = mongoose.model("user",usersch);
const newuser = new user({username: req.body.username});

   user.register(newuser, req.body.password,(err,val) => {
    if(err){
      req.flash("error" , err.message);
      return res.redirect("/register");
    }


    passport.authenticate("local")(req, res, ()=> {
          res.redirect("/content");
      })
  });
})


//login routes
//=========
router.get("/login", (req,res) => {
  res.render("login");
})

router.post("/login", passport.authenticate("local",{
  successRedirect: "/content",
  failureRedirect: "/login"
}),(req,res) => {
  console.log(currentUser);
})


router.get("/logout", (req,res) => {
  req.flash("success" , "SUCCESSFULLY LOGOUT");
  req.logout();
  res.redirect("/content");
})

module.exports = router;
