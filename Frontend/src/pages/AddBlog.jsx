import { useContext, useEffect } from "react";
import { GlobalContext } from "../context";
import axios from "axios";
import { useNavigate, useLocation } from 'react-router-dom';


export default function AddBlog() {
  const { formData, setFormData,isEdit, setIsEdit } = useContext(GlobalContext);
  const navigate = useNavigate();
  const location = useLocation();

<h1>hii</h1>
<h1>hii</h1>

  console.log(formData);


  async function handlleBlogDataToDatabase() {
    console.log("Function called!");

    const response = isEdit ? await axios.put(`http://localhost:3000/api/blogs/update/${location.state.getCurrentBlogItem._id}`, {
      title: formData.title,
      description: formData.description,
    }) : await axios.post('http://localhost:3000/api/blogs/add', {
      title: formData.title,
      description: formData.description,
    })


    const result = response.data;


    console.log(result);

    if(result) {
      setIsEdit(false);
      setFormData({
        title: '',
        description: '',
      });
      navigate("/");
    }

  }

  useEffect(() => {
  console.log(location);
  if(location.state){
    const {getCurrentBlogItem} = location.state;
    setIsEdit(true);
    setFormData({
      title: getCurrentBlogItem.title,
      description: getCurrentBlogItem.description,
    });
  }

  },[location])










  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fdfcfb] to-[#e2d1c3] px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
      📝 {isEdit ? "Edit the Blog" : "Add a Blog"}
    </h1>
        <form 
         onSubmit={(e) => {
              e.preventDefault(); // ⛔ prevents page reload
              handlleBlogDataToDatabase();
            }}
            className="flex flex-col gap-4">
          <input
            name="title"
            id="title"
            type="text"
            placeholder="Blog Title"
            className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            value={formData.title}
            onChange={(e) => setFormData({
              ...formData,
              title: e.target.value
            })}
          />
          <textarea
            name="description"
            id="description"
            placeholder="Enter Blog Description"
            rows={6}
            className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition resize-none"
            value={formData.description}
            onChange={(e) => setFormData({
              ...formData,
              description: e.target.value
            })}
          />
          <button
           
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 rounded-xl transition duration-200 shadow-md"
          >
           { isEdit ? "Update Blog" : "➕ Add New Blog"}
          </button>
        </form>
      </div>
    </div>
  );
}
