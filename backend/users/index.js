const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const cors = require("cors");

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

//all users
app.get('/users',cors(),async(req,res)=>{
    userModel.find({},function(err,data){
        if(err){
            res.send("Something Went wrong")
        }
        res.json(data)
    })
   
})  


app.listen(8001, () => {
  console.log(`Example app listening at 8001`);
});
