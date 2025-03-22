const express = require('express')

const todoRoutes = require('./Routes/todo.Routes');



const app = express()
const port = 3000


app.use('/todos', todoRoutes);



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})