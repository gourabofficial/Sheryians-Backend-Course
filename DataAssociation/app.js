const express = require('express');
const app = express();
const userModel = require('./Models/user');
const postModel = require('./Models/post');



app.get("/", (req, res) => {
  res.send("Hari Bol");
});


app.get("/create", async (req, res) => {
 let user = await userModel.create({
    username: "Gourab",
    email: "gourab@gmail.com",
    age: 20,
 })
  res.send(user);
});

app.get("/post/create", async (req, res) => {
let post = await postModel.create({
    postdata: "haan ji , good morning..",
    user: "678c76bf7856a742ebc0978f",
  });
 let user = await userModel.findOne({ _id: "678c76bf7856a742ebc0978f" });
  user.posts.push(post._id);

  res.send(post);
  await user.save();
  res.send({post,user})
   
 });

app.listen(3000);