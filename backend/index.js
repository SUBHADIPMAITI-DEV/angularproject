require('dotenv').config()
const express = require('express');
const mongoose=require('mongoose');
var cors=require('cors');
const app = express();
const url = 'mongodb://mongonode/AlienDBex'
// const url = 'mongodb://0.0.0.0/AlienDBex'
// const url = 'mongodb://127.0.0.1/AlienDBex'
// 
mongoose.connect(url, {useNewUrlParser:true})
const con = mongoose.connection
const bodyParser = require('body-parser');
const jwt=require('jsonwebtoken')
con.on('open', () => {
    console.log('connected...')
})
app.use(cors())

app.use(express.json())
const port = 3000

const employeeRouter=require('./controller/EmployeeController')
app.use('/employee',employeeRouter)


const user={
  name:"sudip",
  age:"21",
}

// get all user
var token;
console.log(token);
app.get('/user',auth,(req,res)=>{
  res.json(user);
})

// login
app.post('/login',(req,res)=>{
  let response={};
  const value={
    username:"admin",
    password: "admin",
  }
  if(req.body.username==value.username){
    if(req.body.password==value.password){
      token= jwt.sign({username:value.username,password:value.password},process.env.ACESS_TOKEN || 'my-secret-key',{ expiresIn: '1d' });
       response.status=200;
       response.message="Successfully login";
       response.body=token;
    }else{
      response.status=202;
       response.message="Invalid Password";
       response.body={};
    }
  }else{
    response.status=202;
    response.message="Invalid Username";
    response.body={};
  }
 
 return res.status(response.status).send(response);
})

// auth function 
function auth(req,res,next){
   if (token !== undefined) {
    jwt.verify(token,process.env.ACESS_TOKEN,(err,verified)=>{
      if(err) return res.status(404).send("token note verify");
      req.user= verified;
      next();
    });
   }else{
    return res.status(404).send("need login fast");
   }
}
// logout

app.post('/logout',(req,res)=>{
  token=undefined;
  res.send("logout")
})
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})