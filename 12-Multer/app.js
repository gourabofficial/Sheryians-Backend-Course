const express = require('express');
const app = express();
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
    
  }
})

const upload = multer({ storage: storage })

app.post('/upload', upload.single("file"), (req, res) => {
  console.log(req.file)
  res.redirect('/');
});



app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});