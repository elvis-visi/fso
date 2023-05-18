/* helper functions that are meant to assist in dealing with the blog list. */

//dummy function that receives an array of blog posts as a parameter and always returns the value 1

const dummy = (blogs) => {
    return 1;
}

//returns the total sum of likes in all of the blog posts.
const totalLikes = (blogs) => {

 const accumulator =  blogs.reduce((total,blog) => total + blog.likes, 0)
    
  return accumulator;
}

module.exports = {
    dummy, totalLikes
  }