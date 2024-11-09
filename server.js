const express = require('express')
const mongoose = require('mongoose')

const authors = require('./routes/authors')
const books = require('./routes/books')

const port = 5000
const mongo_uri = 'mongodb+srv://katregunjan21:GunjanID$$9876@cluster0.d5io4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

mongoose.connect(mongo_uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => {
    console.log(`Connected to MongoDB Atlas`)
  })
  .catch(err => {
    console.error('Error connecting to database', err)
    process.exit(1)
  })

const app = express()
const cors = require('cors');
app.use(cors());

app.use(express.json())
app.use('/api/authors', authors)
app.use('/api/books', books)

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})