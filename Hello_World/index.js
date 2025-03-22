const express = require('express')

const app = express()
const port = 3000



app.use((req, res, next) => {
 console.log('middleware ...')
  next();
});


app.get('/', (req, res) => {
  res.send('Hare Krishna, Jai Jagannath, Hari bol')
  
});
app.use((req, res, next) => {
  console.log('middleware 2 ...')
   next();
 });

app.get('/instagram', (req, res) => { 
    res.send('gourab_sr4 ')
})
app.get('/facebook', (req,res) => {
    res.send('<h1>My Facebook id : </h1> Gourab Ganguly')
})

app.get('/contact', (req,res) => {
  res.send('<h3>Ph No: 6294692462</h3> ')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})