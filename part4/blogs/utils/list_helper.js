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

module.exports = {
    dummy, totalLikes,favoriteBlog
  }