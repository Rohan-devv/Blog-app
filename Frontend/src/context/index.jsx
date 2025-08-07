import { createContext, useState } from "react";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });

  const [blogList, setBlogList] = useState([]);
  const [pendingBlogs, setPendingBlogs] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  return (
    <GlobalContext.Provider value={{ formData, setFormData, blogList, setBlogList, pendingBlogs, setPendingBlogs, isEdit, setIsEdit }}>
      {children}
    </GlobalContext.Provider>
  );
}
