const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const { MONGODB_URI } = require('./config/keys')

mongoose.set('useCreateIndex', true)

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})

const app = express()
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

const router = require('./routes/rootRouter')
app.use(router)

// static files
if (process.env.NODE_ENV === 'production') {
  const path = require('path')
  app.use(express.static('client/build'))
  app.use(express.static('files'))

  // shows our index.html in client/build if neither path above was accessed
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

// Port
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`App started`)
})
