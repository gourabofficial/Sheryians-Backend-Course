const express = require('express');
const app = express();
const path = require('path');
const userModel = require('./Model/user');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');


app.get('/', (req, res) => {
  res.render('index');
});



app.get('/read', async (req, res) => {
  let users = await userModel.find(); 
  res.render('read', {users});
});

app.get('/delete/:id', async (req, res) => {
  let users = await userModel.findOneAndDelete({ _id: req.params.id }); 
  res.redirect("/read");
});

app.get('/edit/:id', async (req, res) => {
  let user = await userModel.findOne({ _id: req.params.id });
  res.render('edit', {user});

});


app.post('/update/:userid', async (req, res) => {
  let { name, email, image } = req.body;
  let user = await userModel.findOneAndUpdate({ _id: req.params.userid },{name, email, image}, {new: true});
  res.redirect('/read');

});

app.post('/create', async(req, res) => {
  let { name, email, image } = req.body;

  // if (!name) {
  //   name = 'Unknown User';  
  // }
  
  let createduser = await userModel.create({
    name,
    email,
    image
  });
  res.send(createduser);
});

app.listen(3000);