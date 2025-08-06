import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <header className="bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 shadow-lg mb-8">
            <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                <h3 className="text-3xl font-extrabold text-white tracking-wide drop-shadow-lg">
                    MERN BLOG APP
                </h3>
                <nav>
                    <ul className="flex gap-10">
                        <Link to="/">
                            <li className="text-white font-medium hover:text-yellow-300 transition cursor-pointer px-3 py-1 rounded hover:bg-white/10">
                                Home
                            </li>
                        </Link>
                        <Link to="/add-blog">
                            <li className="text-white font-medium hover:text-yellow-300 transition cursor-pointer px-3 py-1 rounded hover:bg-white/10">
                                Add Blog
                            </li>
                        </Link>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header