import express from 'express'

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send("<h1>Welcome guys</h1>")
})

app.get('/explore', (req, res) => {
  res.send("<h1>This is your Gourab </h1> <h3>We Explore Together</h3>So lets start")
})

app.listen(port, () => {
  console.log(`Successfully rendering on port ${port}`)
})