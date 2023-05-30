/* helper functions that are meant to assist in dealing with the blog list. */

//dummy function that receives an array of blog posts as a parameter and always returns the value 1

const _ = require('lodash');

const dummy = (blogs) => {
    return 1;
}

//returns the total sum of likes in all of the blog posts.
const totalLikes = (blogs) => {

 const accumulator =  blogs.reduce((total,blog) => total + blog.likes, 0)
    
  return accumulator;
}

//which blog has the most likes
const favoriteBlog = (blogs) => {

    if(blogs.length == 0)
    {
        return null;
    }

    let mostFavoriteBlog = blogs[0]; //number of likes
 

    for(let i = 1; i < blogs.length; i++)
    {
        if(blogs[i].likes > mostFavoriteBlog.likes)
        {
            mostFavoriteBlog = blogs[i];
          
        }
    }

    const res = {
        title : mostFavoriteBlog.title,
        author :mostFavoriteBlog.author,
        likes : mostFavoriteBlog.likes
    }

    return res;

}

//returns the author who has the largest amount of blogs.
//return value also contains the number of blogs the top author
const mostBlogs = (blogs) => {

    //hashmap  iterate over each blog, and map current author to his occurences
    let authorBlogs =  new Map();

    for(let blog of blogs)
    {

        if(authorBlogs.has(blog.author))
        {
            authorBlogs.set(blog.author,authorBlogs.get(blog.author) + 1 )
        }else{
            authorBlogs.set(blog.author, 1);
        }

    }

    let maxCount = 0;
    let authorMostBlogs = null;
    //iterate over map, who has the largest count

    for( let [author,count] of authorBlogs.entries())
    {
        if(count > maxCount)
        {
            maxCount = count;
            authorMostBlogs = author;
        }
    }

    return {
        author : authorMostBlogs,
        blogs: maxCount
    }
    


}

//returns the author, whose blog posts have the largest amount of likes.
//return value also contains the total number of likes that the author
const mostLikes = (blogs) => {

}

module.exports = {
    dummy, totalLikes,favoriteBlog,mostBlogs
  }