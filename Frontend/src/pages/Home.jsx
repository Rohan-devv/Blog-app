import React, { useEffect, useContext } from 'react';
import { GlobalContext } from '../context';
import axios from 'axios';
import { FaTrash, FaEdit } from 'react-icons/fa';
import{useNavigate} from 'react-router-dom';


const Home = () => {
  const { blogList, setBlogList, pendingBlogs, setPendingBlogs } = useContext(GlobalContext);
  const navigate = useNavigate();

  async function fetchListOfBlogs() {
    setPendingBlogs(true);
    const response = await axios.get('http://localhost:3000/api/blogs');
    const result = response.data;

    console.log(result);

    if (result && result.blogList && result.blogList.length) {
      setBlogList(result.blogList);
       setPendingBlogs(false);
    }

    else {
       setPendingBlogs(false);
        setBlogList([]);
    }
  }

  async function handleDeleteBlog(getCurrentId) {
    console.log("Deleting blog with ID:", getCurrentId);

    const response = await axios.delete(`http://localhost:3000/api/blogs/delete/${getCurrentId}`);
    const result = response.data;

    if(result?.message){
      fetchListOfBlogs();
    }

  }

  async function handleUpdateBlog(getCurrentBlogItem) {
    console.log("Update this Blog:",getCurrentBlogItem );
    navigate('/add-blog', { state:{getCurrentBlogItem} });

  }

  useEffect(() => {
    fetchListOfBlogs();
  }, []);

  return (
  <div className="min-h-screen bg-gray-100 py-10 px-4">
    <h1 className="text-4xl font-bold text-center mb-10 text-blue-600">📝 Blog List</h1>

    {pendingBlogs ? (
      <p className="text-center text-lg text-gray-500">Loading...</p>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogList && blogList.length > 0 ? blogList.map((blogItem) => (
          <div
            key={blogItem._id}
            className="bg-white rounded-xl shadow-lg p-6 transition-transform hover:scale-105 hover:shadow-xl"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{blogItem.title}</h2>
            <p className="text-gray-600 mb-4">{blogItem.description}</p>

            <div className="flex gap-4">
              <button
                onClick={() => handleDeleteBlog(blogItem._id)}
                className="text-red-500 hover:text-red-700 text-xl"
              >
                <FaTrash />
              </button>
              <button
               onClick = {() => handleUpdateBlog(blogItem)}
               className="text-blue-500 hover:text-blue-700 text-xl">
                <FaEdit />
              </button>
            </div>
          </div>
        )) : <h3>No blogs added!</h3>}
      </div>
    )}
  </div>
  <h1>hii</h1>
  <h1>hii</h1>
  <h1>hii</h1>
  
);
}

export default Home;
