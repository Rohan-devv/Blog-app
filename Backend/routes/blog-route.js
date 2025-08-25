const express = require('express');
const blogRouter = express.Router();


const{fetchListOfBlogs,
     addNewBlog,
     deleteBlog,
     updateBlog} = require('../controller/blog-controller');



     blogRouter.get('/getBlogs', fetchListOfBlogs);
     blogRouter.post('/add', addNewBlog);
     blogRouter.delete('/delete/:id', deleteBlog);
     blogRouter.put('/update/:id', updateBlog);

     module.exports = blogRouter;