const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const util = require('util')
const stream = require('stream')
const pipeline = util.promisify(stream.pipeline)
const stringify = require('csv-stringify')
const fs = require('fs')
const fsp = require('fs').promises

var cors = require("cors");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


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


  async function generateReport(){
    //create query cursor
    let  usersCursor= userModel.find({active:true}).cursor({transform:(user)=>{        
        let {_id:userId,email,gen,stat}= user.toObject()
        return {userId,email,gen,stat}
    }})
    //create object to csv transformer
    let csvStream = stringify({
            header: true,
            columns: {
               userId: 'USER_ID',
               email:'EMAIL',
               gen: 'GENDER',
               stat:'STATUS'
            }
        })        
    //create a file sink
    let dst = `./report.csv`
    await pipeline(usersCursor,csvStream,fs.createWriteStream(dst))
    console.log('report generated')
}

app.get("/csv",(req,res)=>{
  generateReport()
  let report =  generateReport()
  console.log(report)
  res.send()
})


app.listen(8002, () => {
  console.log(`Example app listening at 8002`);
});
