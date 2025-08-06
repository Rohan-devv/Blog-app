import { useContext } from "react";
import { GlobalContext } from "../context";

export default function AddBlog() {
    const [formData, setFormData] = useContext(GlobalContext);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fdfcfb] to-[#e2d1c3] px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          📝 Add a Blog
        </h1>
        <form className="flex flex-col gap-4">
          <input
            name="title"
            id="title"
            type="text"
            placeholder="Blog Title"
            className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            value= {formData.title}
          />
          <textarea
            name="description"
            id="description"
            placeholder="Enter Blog Description"
            rows={6}
            className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition resize-none"
            value= {formData.description}
            onChange={(e) => setFormData({
                ...formData,
                title: e.target.value
            })}
          />
          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 rounded-xl transition duration-200 shadow-md"
          >
            ➕ Add New Blog
          </button>
        </form>
      </div>
    </div>
  );
}
