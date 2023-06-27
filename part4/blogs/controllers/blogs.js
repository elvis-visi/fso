const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogsRouter.post('/', (request, response) => {

  //check whether the likes property is missing

  if (!('likes' in request.body)) {
    request.body.likes = 0;
  }

  const { title, url } = request.body;

  if (!title || !url) {
    return response.status(400).json({
      error: 'Title and URL are required',
    });
  }

  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
    .catch(error => next(error))
})

module.exports = blogsRouter