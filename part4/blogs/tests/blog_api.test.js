const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')


//The tests only use the Express application defined in the app.js file, 
//which does not listen to any ports:
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs
        .map(blog => new Blog(blog))

    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

test('blogs returned as JSON', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

})

//unique id property of blog posts is named id



test('id property exists in each blog object', async () => {
    // call the /api/blogs endpoint
    const response = await api.get('/api/blogs')

    // check whether there is a response body
    expect(response.body).toBeDefined()

    // iterate over each blog object in the response body
    response.body.forEach(blog => {
        // for each blog object, check if the id property is defined
        expect(blog.id).toBeDefined()
    })
})




afterAll(async () => {
    await mongoose.connection.close()
})