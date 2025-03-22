const express = require('express');
const app = express();
const userModel = require('./Models/user')
const postModel = require('./Models/post')
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(cookieParser());


app.get('/', (req, res) => {
  res.render('index');
});

app.get('/login', (req, res) => {
  res.render('login');
});

//profile route
app.get('/profile', isLogin, async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email }).populate({
    path: 'posts',
    populate: { path: 'user', select: 'username' },
  });

  res.render('profile', { user, posts: user.posts });
});


// like route
app.get('/like/:id', isLogin, async (req, res) => {
  let post = await postModel.findOne({ _id: req.params.id }).populate('user');

  if (post.likes.indexOf(req.user.userid) === -1) {
    post.likes.push(req.user.userid);
  }
  else {
    post.likes.splice(post.likes.indexOf(req.user.userid), 1);
  }
  await post.save();
  res.redirect('/profile');
});

// edit user route
app.get('/edit/:id', async (req, res) => {
  let post = await postModel.findOne({ _id: req.params.id }).populate('user');
  res.render('edit', { post });

});

// update user route
app.post('/update/:id', async (req, res) => {
  let post = await postModel.findOne({ _id: req.params.id }, { content: req.body.content });
  res.redirect('/profile');

});

// delete user post

app.post('/delete/:id', async (req, res) => {
  try {

    const post = await postModel.findByIdAndDelete(req.params.id);

    if (!post) {
      return res.status(404).send('Post not found');
    }

    await userModel.updateOne(
      { _id: post.user },
      { $pull: { posts: post._id } }
    );

    res.redirect('/profile');
  } catch (err) {
    console.error('Error deleting post:', err);
    res.status(500).send('Internal Server Error');
  }
});




//post route
app.post('/post', isLogin, async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email });
  let { content } = req.body;
  console.log(content);
  console.log(user);

  let post = await postModel.create({
    user: user._id,
    content

  })
  user.posts.push(post._id);
  await user.save();
  res.redirect('/profile');


});

//logout route
app.get('/logout', (req, res) => {
  res.cookie("token", "")
  res.send('logout successfully');

});


app.post('/register', async (req, res) => {
  try {
    let { email, password, name, age } = req.body;
    let username = req.body.username || req.body.UserName; 
    console.log({ email, password, username, name, age }); 

    if (!email || !password || !username || !name || !age) {
      return res.status(400).send('All fields are required');
    }

    let user = await userModel.findOne({ email });
    if (user) {
      return res.status(400).send('User already exists');
    }

    bcrypt.genSalt(10, (err, salt) => {
      if (err) return res.status(500).send('Error generating salt');

      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) return res.status(500).send('Error hashing password');

        let user = await userModel.create({
          email,
          name,
          username,
          age,
          password: hash,
        });

        let token = jwt.sign({ email: email, userid: user._id }, "ronaldo");
        res.cookie('token', token);
        res.status(201).send("Registered Successfully");
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});



// login route 
app.post('/login', async (req, res) => {
  let { email, password } = req.body;

  let user = await userModel.findOne({ email });
  if (!user) {
    return res.status(400).send('Somthing went wrong');
  }

  bcrypt.compare(password, user.password, function (err, result) {
    if (result) {
      let token = jwt.sign({ email: email, userid: user._id }, "ronaldo");
      res.cookie('token', token);
      res.redirect("/profile");
    } else {
      res.redirect('/login')
    }
  });
})

function isLogin(req, res, next) {
  if (req.cookies.token === "") return res.redirect('/login');
  else {
    let data = jwt.verify(req.cookies.token, "ronaldo");
    req.user = data;
    next();
  }
}


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});