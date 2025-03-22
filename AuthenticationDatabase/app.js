const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const user = require('./Model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());


app.set('view engine', 'ejs');


app.get('/', (req, res) => {
  res.render('index');
});


app.post('/create', (req, res) => {
  let { username, email, password, age } = req.body;

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      let createUser = await user.create({
        username,
        email,
        password: hash,
        age
      })

      let token = jwt.sign({ email }, "ronaldo");
      res.cookie('token', token);
      res.send(createUser);
    });
  })
})

app.get('/logout', (req, res) => {
  res.clearCookie('token')
  res.send("Logout Success");
})

app.get('/login', (req, res) => {
  res.render('login');
});


app.post('/login', async (req, res) => {
  let userinfo = await user.findOne({ email: req.body.email });
  // console.log(userinfo)
  if (!userinfo) return res.send("Somthing went wrong");

  bcrypt.compare(req.body.password, userinfo.password, (err, result) => {
    if (!result) {
      let token = jwt.sign({ email:userinfo.email }, "ronaldo");
      res.cookie('token', token);
      return res.send("Invalid Password");
    } else {
      res.send("Login Success");
    }
  })

});



app.listen(3000);