 const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const passportlocal = require("passport-local");
const passmong = require("passport-local-mongoose");
const user = require("./models/login");
const methodover = require("method-override");
const flash  = require("connect-flash") ;
 //require("./services/cache");
const app = express();


app.use(require("express-session")({
    secret: "Once again Rusty",
    resave: false,
    saveUninitialized: false
}));

app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended: true}))
app.use(methodover("_method"));
app.set("view engine","ejs");

mongoose.connect( "mongodb://project123:project123@ds147461.mlab.com:47461/quotation");



//intialization of routes
const content = require("./routes/contentrot");
const userrot = require("./routes/loginrot");
const comrot  = require("./routes/comment");

//passport initialize
app.use(passport.initialize());
app.use(passport.session());


passport.deserializeUser(user.deserializeUser());
passport.serializeUser(user.serializeUser());
passport.use(new passportlocal(user.authenticate()));


app.use(flash())

app.use(function (req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error =  req.flash("error");
    res.locals.success = req.flash("success");
    next();
})


app.use(content);
app.use(userrot);
app.use(comrot);





app.get("/", (req,res) => {
  res.render("index");
})



app.listen(300);
console.log("server started");




//<script async defer src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"
  //type="text/javascript"></script>
