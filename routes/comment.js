const express = require("express");
const router = express.Router();
const comment = require("../models/comment");
const contdata = require("../models/content");
const middle = require("../middleware/logmid")
//const user = require("../models/login");

router.post("/content/:id/comment" ,middle.islogin , (req,res) => {

  // contdata.findById(req.params.id , (err,data) => {
  //   if(err){
  //     console.log(err);
  //     res.redirect("back");
  //   }else{
  //         comment.create(req.body.com , (err,datas) => {
  //           if(err){
  //             console.log("err");
  //           }else{
  //             datas.content.id = req.user._id;
  //             datas.content.username = req.user.username;
  //             console.log(datas.content.username);
  //             datas.save();
  //             data.comments.push(datas);
  //             data.save();
  //             res.redirect("/content/" + data._id)
  //
  //           }
  //         })
  //   }
  // })

    contdata.findById(req.params.id).exec()
    .then( (data) => {

      comment.create(req.body.com)
            .then((datas) => {
                      datas.content.id = req.user._id ;
                      datas.content.username = req.user.username
                      datas.save() ;
                      data.comments.push(datas) ;
                      data.save() ;
                        res.flash("sucess" , "SUCCESSFULLY ADDED A COMMENT")
                        res.redirect("/content/" + data._id)
                      
            }).catch(
              (err) => {
                console.log(err)
                req.flash("error" , "err.message");
                res.redirect("back");
              }
            )


    } ).catch( (err) => {
            res.status(500).json({error : err.message  })
    } )





})


router.put("/content/:id/comment/:ids" , middle.checkowner , (req,res) => {

  comment.findByIdAndUpdate(req.params.ids , req.body.com ).exec()
  .then( (value) => {
      console.log(value);
      console.log(req.body.com);
      req.flash("sucess" , "COMMENT UPDATED SUCCESSFULLY")
      res.redirect("/content/"+req.params.id);
  } )


})


router.delete("/content/:id/comment/:ids" , middle.checkowner ,(req,res) => {
  comment.findByIdAndDelete(req.params.ids)
  .then( (value) => { console.log(value)
              res.redirect("/content/"+req.params.id)
 })
  .catch( (err) => {console.log(err.message)} )

})


module.exports = router ;











//<!-- Latest compiled and minified CSS -->
//<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">

//<!-- jQuery library -->
//<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

//<!-- Latest compiled JavaScript -->
//<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
