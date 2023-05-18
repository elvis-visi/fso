const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const config = require('./utils/config')


const mongoose = require('mongoose')

//The responsibility of establishing the connection to the database has been given
// to the app.js module
mongoose.set('strictQuery', false)

mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)

module.exports = app



/*

The file takes different middleware into use, and one of these is the blogsRouter
that is attached to the /api/notes route.

The router we defined earlier is used if the URL of the request starts
with /api/notes. For this reason, the blogsRouter object must only define
the relative parts of the routes, i.e. the empty path / or just the
parameter /:id.
*/