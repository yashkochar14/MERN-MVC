const express = require('express')
const mongoose = require('mongoose')

const authors = require('./routes/authors')
const books = require('./routes/books')
const genre = require('./routes/genre')

const port = 5000
const mongo_uri = 'mongodb+srv://yashkochar01:yashkochar01@yash.o1jpp.mongodb.net/'

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
app.use('/api/genre', genre)

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})
