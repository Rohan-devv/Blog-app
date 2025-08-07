const mongoose = require ('mongoose');
const Blog = require('../model/Blog');

// fetch list of blogs 

const fetchListOfBlogs =  async(req, res ) => {
    let blogList;

    try{
        blogList  = await Blog.find();

    } catch(e){
        console.error("Error fetching blogs:", e);
        return res.status(500).json({ error: "Internal server error" });
    }

    if(!blogList){
        return res.status(404).json({ message : "NO blogs found" });
    }

    return res.status(200).json({blogList});
};

// Add a new blog
const addNewBlog = async (req, res) => {

    const { title, description} = req.body;
    const currentDate = new Date();
    const newlyCreatedBlog = new Blog({
        title,
        description,
        date: currentDate,

});
    try{
        await newlyCreatedBlog.save();

    } catch(e){
        console .log(e);

    }
    try{
        const session =  await mongoose.startSession();
        session.startTransaction();
        await newlyCreatedBlog.save({session});
            session.commitTransaction();

    } catch(e){
        console.log(e);
    }
    return res.status(200).json({ message:"Blog added successfully"});
};

// Delete a blog
const deleteBlog = async(req,res) =>{
    const id = req.params.id;
    try{
        const findCurrentBlog =  await Blog.findByIdAndDelete(id);

        if(!findCurrentBlog){
            return res.status(404).json({message: "Blog not found"})
        }
        return res.status(200).json ({message:"Blog deleted successfully"});
    } catch(e){
        console.log(e);
        return res.status(500).json({message: "Unable to delete blog ! please try again later"})
    }
};

// Update a blog
const updateBlog = async(req, res) => {
    const id = req.params.id;
    let updatedBlog;
    const { title, description } = req.body;

    try {
        const updatedBlog = await Blog.findByIdAndUpdate(id, {
            title,description

        }) 
    }  catch(e){

            console.log(e);
            return res.status(500).json({ message: "Unable to update blog! Please try again later" });
        }
        
        if(!updatedBlog){
            return res.status(404).json({ message: "Blog not found" });
        }

        return res.status(200).json({updatedBlog});

    };

    module.exports = {
        fetchListOfBlogs,
        addNewBlog,
        deleteBlog,
        updateBlog
    };