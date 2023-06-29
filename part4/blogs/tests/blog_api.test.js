const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')


//The tests only use the Express application defined in the app.js file, 
//which does not listen to any ports:
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')

/*
insertMany() performs only a single round trip to the server, while save() performs one for every document to be inserted
*/
beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs)
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


//verify that if likes property is missing from request,
//it will default to the value 0

test('default to 0 if likes is missing from request', async () => {

    const blog = {
        "title": "no likes",
        "author": "John Doe",
        "url": "http://mynewblogpost.com"
    }


    const response = await api
        .post('/api/blogs')
        .send(blog)
        .expect(201) //created
        .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBe(0)

})

/*
verify that if the title or url properties are missing from the request data, the backend responds to the request with the status code 400 Bad Request.
*/

test('title is missing', async () => {
    const blog = {
        "author": "John Doe",
        "url": "http://mynewblogpost.com"
    }

    await api
        .post('/api/blogs')
        .send(blog)
        .expect(400)

    const blogsAtEnd = await helper.blogsinDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('url is missing', async () => {
    const blog = {
        "title": "no likes",
        "author": "John Doe",

    }

    await api
        .post('/api/blogs')
        .send(blog)
        .expect(400)

    const blogsAtEnd = await helper.blogsinDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('blog without url is not added', async () => {

    const blog = {
        "author": "John Doe",
    }

    await api
        .post('/api/blogs')
        .send(blog)
        .expect(400)

    const blogsAtEnd = await helper.blogsinDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
});



afterAll(async () => {
    await mongoose.connection.close()
})








/*

insertMany(), the operation either inserts all documents or no documents. However, you can provide the ordered option to allow insertion of as many documents as possible, in the event of an error.

That being said, using insertMany() in this context should work fine, as long as helper.initialBlogs is an array of objects where each object represents the data for a new blog.

*/