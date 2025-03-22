const express = require('express');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const app = express();
const jwt = require('jsonwebtoken');


app.use(cookieParser());

app.get('/', (req, res) => {
  // bcrypt.genSalt(10, function (err, salt) {
  //   bcrypt.hash("gorabWSSLoj", salt, function (err, hash) {
  //     console.log(hash)
  //   });
  // });

  // bcrypt.compare("$2b$10$VWkwr9LXiWPPfNVydAtfceYzxDMd4q5hYP9U35QkkR87ER7cMBy4y",
  //   "gorabWSSLoj"
  //   , function (err, result) {
  //     // result == true
  //     console.log(result);
  //   });

  res.cookie("name", "gourabganguly");
  res.send("done ..")
 

});
app.get('/readcooke', (req, res) => { 
  console.log(req.cookies);
  res.send("read coocke page ")
})

app.get('/jwt', function (req, res) {
  let token = jwt.sign({ email: "gourab@gmail.com" }, "secret")  
  res.cookie("token", token);
  res.send("all Done" )
  console.log(token)
})

app.get('/readdata', function (req, res) { 
  // console.log(req.cookies)
  res.send("now you read ")
  let data = jwt.verify(req.cookies.token, "secret");
  console.log(data)
})

app.listen(3000)  