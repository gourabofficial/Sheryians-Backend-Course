
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  fs.readdir('./file', function (err, files) {
    if (err) {
      console.error('Error reading files:', err);
      return res.status(500).send('Internal Server Error');
    }
    res.render('index', { files: files });
  });
});


app.get('/file/:filename', function (req, res) { 
  fs.readFile(`./file/${req.params.filename}`, 'utf8', function (err, filedata) {
    res.render('show', {filename: req.params.filename, filedata: filedata});
  });
});

app.post('/create', function (req, res) {
  fs.writeFile(`./file/${req.body.title.split(' ').join('')}.txt`, req.body.details, function (err) { 
    res.redirect('/');
  })
});

app.listen(port, function () {
  console.log(`Server is running at http://localhost:${port}`);
});
