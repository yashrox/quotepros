var express = require("express")
var router = express.Router();
const contdata = require("../models/content")
const user = require("../models/login")
const  cachedel   = require("../middleware/cacherem");
const middle = require("../middleware/logmid");
var methodover      =    require("method-override");


router.get("/content" ,async(req,res) => {
   const data = await contdata.find().cache(" ");   //.cache();

    res.render("quotation/content",{data : data})
    if(data instanceof Array){
      console.log("yes")
    }

});

router.get("/content/new", middle.islogin ,(req,res) => {
  res.render("quotation/new");
})

router.post("/content" , cachedel , async(req,res) => {

      var description = req.body.description ;
      var image = req.body.image;
      var quote = req.body.quote;
      var country =req.body.country;
      var userimg  =req.body.userimg;
      var name  = req.body.name ;

     var  author = {
                      id : req.user._id,
                      username: req.user.username,
                    };

      var  data = {quote,image,author,description,country,userimg,name};
        //console.log(req.user._id)
    const infor=  await contdata.create(data);
    res.redirect("/content");

})

router.get("/content/:id" ,(req,res) => {

  contdata.findById(req.params.id).populate("comments")
  .exec()
  .then( (data) => {

    res.render("quotation/show" , {data : data})
  } ).catch( (err) => {
        console.log(err);
        res.status(500).json({
          error : err
        })
  } )
  // .exec((err , data) => {
  //
  //         if(err){
  //           console.log(err);
  //           res.redirect("back");
  //         }else{
  //           res.render("quotation/show", {data : data});
  //         }
  //
  //
  // })


  })


//edit routes

router.get("/content/:id/edit", middle.checkowner, async(req,res) => {
    const data = await contdata.findById(req.params.id);
    res.render("quotation/edit",  {data : data});
})

//update

router.put("/content/:id", middle.checkowner , cachedel ,async(req,res) => {
  try{

    const val = await contdata.findByIdAndUpdate(req.params.id , req.body.edit)
    req.flash("success" , "CAMPGROUND UPDATED SUCCESSFULLY")
    res.redirect("/content/" +req.params.id);

    }
    catch(c){
      res.write(c) ;
    }
})

//delte
router.delete("/content/:id" , middle.checkowner, cachedel ,async(req,res) => {
  await contdata.findByIdAndRemove(req.params.id);
  res.redirect("/content");

} )



module.exports =router;
