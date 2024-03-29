const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response,next) => {
  const { username, name, password } = request.body

  if(password.length < 3){
    return response.status(400).json({ error: 'password too short' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  try{
    const savedUser = await user.save()
    response.status(201).json(savedUser)
  }catch(Exception){
    next(Exception)
  }

})

usersRouter.get('/', async (request, response) => {

    const users = await User
    //ids referencing blog objects in the blogs field
    //of the user document will be replaced by the 
    //referenced blog documents
    .find({}).populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })
    response.json(users)

})


module.exports = usersRouter