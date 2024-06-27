const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const userList = {
  "username":{
    username:"username",
    password:"password",
    firstname:"USER",
    lastname:"NAME",
    restaurants:{}
  }
};


// Secret key for JWT
const secretKey = 'your_secret_key';


app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if(userList[username] != undefined){
      res.status(200);
      res.send(userList[username]);
      return
    }
    res.status(401);
    res.send("Incorrect Username or Password");

  });

  app.post("/getuser",(req,res)=>{
    const {username} = req.body;

    if(userList[username] != undefined){
      res.status(201)
      res.send(userList[username])
      return
    }
    res.status(401)
    res.send("Invalid User")
  })

  app.post("/deleteRestaurant",(req,res)=>{
    const {id,username} = req.body;
    userList[username].restaurants[id] = undefined;
    res.status(200);
    res.send(userList['username'].restaurants)
  })

  app.post("/addRestaurant",(req,res)=>{
    const {username} = req.body;
    let newRestaurant = {
      ...req.body,
      username:undefined,
    }

    try{

      newRestaurant['dishes'] = req.body.dishes.split(",").map(val=>val.trim());
    }
    catch{}

    if(userList[username].restaurants[newRestaurant.id] == undefined)
      newRestaurant['id']=Math.random()


      userList[username].restaurants[newRestaurant.id] = newRestaurant;

    // if(userList[username] != undefined){
      res.status(201)
      res.send(userList[username])
      // return
    // }÷
    // res.status(401)
    // res.send("Invalid User")
  })

  app.post('/register', (req, res) => {
    const { username, password,firstname,lastname } = req.body;
    const newUser = {
      username,
      password,
      firstname,
      lastname,
      restaurants:{}
    }

    if(userList[username] != undefined){
    res.status(401);
    res.send("username is already in use");
    return
    }

    userList[username]=newUser;
    console.log(userList)
    res.status(200);
    res.send(newUser);

  });

app.get('/verify',(req,res)=>{
    console.log(req.headers.token)
    console.log(jwt.verify(req.headers.token,secretKey))
    res.send("OK")
})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
