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
    //check for an empty response
    expect(response.body).not.toHaveLength(0)

    // iterate over each blog object in the response body
    response.body.forEach(blog => {
        // for each blog object, check if the id property is defined
        expect(blog.id).toBeDefined()
        // default ._id property should be removed from the blogs
        expect(blog._id).toBeUndefined()

    })
})

//verify creation of new blog by posting to /api/blogs
test('creating of new blog', async () => {

    await api
        .post('/api/blogs')
        .send(helper.singleBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    // Verify that the total number of blogs is increased by one

    const blogsAtEnd = await helper.blogsinDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    // Verify that the content of the blog post is saved correctly to the database, singleBlog title:
    // "My New Blog Post",

    //get all titles through mapping, does it contain the above title

    const allTitles = blogsAtEnd.map(blog => blog.title)
    expect(allTitles).toContain("My New Blog Post")


})



afterAll(async () => {
    await mongoose.connection.close()
})