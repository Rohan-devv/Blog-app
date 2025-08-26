const express = require('express');
const blogRouter = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const{fetchListOfBlogs,
     addNewBlog,
     deleteBlog,
     updateBlog} = require('../controller/blog-controller');



     // ✅ protect all blog routes
blogRouter.get('/getBlogs', authMiddleware, fetchListOfBlogs);
blogRouter.post('/add', authMiddleware, addNewBlog);
blogRouter.delete('/delete/:id', authMiddleware, deleteBlog);
blogRouter.put('/update/:id', authMiddleware, updateBlog);

     module.exports = blogRouter;