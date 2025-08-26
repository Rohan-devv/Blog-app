import React from 'react'
import Header from './components/Header'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import AddBlog from './pages/AddBlog'
import Login from './pages/Login'
import Register from './pages/Register'
import PrivateRoute from './PrivateRoute'   // ✅ import kiya

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        {/* ✅ Protected Routes */}
        <Route 
          path="/getBlogs" 
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/add-blog" 
          element={
            <PrivateRoute>
              <AddBlog />
            </PrivateRoute>
          } 
        />

        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  )
}

export default App
