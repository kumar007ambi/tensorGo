const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

var cors = require("cors");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())

//model
const userModel = require("./model/userSchema");
//db connection
mongoose
  .connect('mongodb://localhost:27017/app', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Connection Successfull`);
  })
  .catch((err) => console.log(`Not Connected`));


//
app.post('/create',cors(),async (req,res)=>{
    var uname = req.body.uname;
    var email = req.body.email;
    var gen = req.body,gen;
    // console.log("asascs",name,email,gen )
    if(!uname||!email||!gen){
        return res.json({message:"Please fill the form correctly",result:"failed"})
    }
    try{
        // const emailExist = userModel.findOne({ email: email });
        // if (emailExist) {
        //     return res.status(400).json({ message: "Email already Exists", result: "failed" });
        //   }else{
            let userObj = {
                uname: req.body.uname,
                email:  req.body.email,
                gen:  req.body.gen,
                stat: "InActive",
              };
             
              const user = new userModel(userObj);
              console.log('hhshsxs',user)
              let uResponse = await user.save();
            //   console.log("ssssss",uResponse)
              if(uResponse!=""){
                  return res.json({message:"User created successfully",result:"success"})
              }
        //   }

    }catch(err){
        console.log(err)
    }

})

//
app.get('/edit/:id',cors(),async (req,res)=>{
    try {
        var id = req.params.id;
        var userDetails = await userModel.findById({ _id: id });
        if (userDetails != "") {
          res.json({
            message: "Data Fetched",
            result: "success",
            data: userDetails,
          });
        }
        console.log("id", userDetails);
      } catch (err) {
        console.log(err);
      }
})


//update
app.put( '/update/:id',cors(),async (req, res) => {
    var  uname = req.body.umane;
    var  email = req.body.email;
    var gen = req.body.gen;
    var updateDate = new Date();
    console.log("date",updateDate)
    // console.log("log", uname, email, gen);
    // console.log("image", req.file);
    try {
      var id = req.params.id;
        var userObj = {
          uname: req.body.uname,
          email: req.body.email,
          gen:req.body.gen,
          updated_at:updateDate
        };
    //   console.log("image", userObj);
      var userDetails = await userModel.findByIdAndUpdate(id,userObj);
      if (userDetails != "") {
        res.json({
          message: "Data updated successfully",
          result: "success",
          data: userDetails,
        });
      }
    //   console.log("id from update", userDetails);
    } catch (err) {
      console.log(err);
    }
  });



app.listen(8000, () => {
  console.log(`Example app listening at 8000`);
});
