const express = require('express');
const app = express();

const model = require('./model');

// curd operation

app.get('/', function (req, res) {
  res.send("Hare Krishna , Hari Bol Hari Bol Hari Bol")
});


app.get('/create', async (req, res) => {

  try {
    const userdata = await model.create({
      name: "Gourab Ganguly",
      username: "gourabsr4",
      email: "gourab@gmail.com"
    });

    res.send(userdata);
  } catch (err) {
    res.send(err);
  }
});

  app.get('/update', async (req, res) => {

    const userupdate =await model.findOneAndUpdate({ username: "gourabsr4" }, { name: "Cristiano Ronaldo" }, { new: true });
    res.send(userupdate);
});

app.get('/read', async (req, res) => {
  const userdatainfo = await model.find();
  res.send(userdatainfo);
})

app.get('/delete', async (req, res) => {
  const userdatadelete = await model.findOneAndDelete({ username: "gourabsr4" });
  res.send(userdatadelete)
 })

app.listen(3000);