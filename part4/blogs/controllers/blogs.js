const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)

})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', async (request, response) => {

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

  try {
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  } catch (error) {
    next(error)
  }

})

//delete a single blog based on its id
blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

//updating blogs
blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog)
  } catch (error) {
    next(error)
  }

})

module.exports = blogsRouter

/*
{ new: true } parameter, which will cause our event handler to be called with the new modified document instead of the original.
*/