
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { MOCK_POSTS, MOCK_CATEGORIES } from './constants';
import { Post, Category } from './types';
import Home from './pages/Home';
import PostDetail from './pages/PostDetail';
import CategoryPage from './pages/CategoryPage';
import Admin from './pages/Admin';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
  const [categories] = useState<Category[]>(MOCK_CATEGORIES);

  const addPost = (newPost: Post) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col selection:bg-indigo-500 selection:text-white">
        <Navbar categories={categories} />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home posts={posts} categories={categories} />} />
            <Route path="/post/:slug" element={<PostDetail posts={posts} />} />
            <Route path="/category/:slug" element={<CategoryPage posts={posts} categories={categories} />} />
            <Route path="/admin" element={<Admin posts={posts} onAddPost={addPost} />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
