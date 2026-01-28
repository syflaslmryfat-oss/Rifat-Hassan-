
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Category } from '../types';

interface NavbarProps {
  categories: Category[];
}

const Navbar: React.FC<NavbarProps> = ({ categories }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass py-3 shadow-lg' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold tracking-tighter flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs group-hover:scale-110 transition-transform">L</div>
          <span className="gradient-text">LUMINA</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className={`text-sm font-medium hover:text-indigo-400 transition-colors ${location.pathname === '/' ? 'text-indigo-400' : 'text-slate-300'}`}>Home</Link>
          {categories.slice(0, 3).map(cat => (
            <Link 
              key={cat.id} 
              to={`/category/${cat.slug}`} 
              className={`text-sm font-medium hover:text-indigo-400 transition-colors ${location.pathname.includes(cat.slug) ? 'text-indigo-400' : 'text-slate-300'}`}
            >
              {cat.name}
            </Link>
          ))}
          <Link 
            to="/admin" 
            className="px-5 py-2 rounded-full border border-slate-700 hover:border-indigo-500 hover:text-indigo-400 transition-all text-sm font-medium"
          >
            Dashboard
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-slate-300" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden glass absolute top-full left-0 right-0 border-t border-slate-800 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col p-4 space-y-4">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-slate-300">Home</Link>
            {categories.map(cat => (
              <Link key={cat.id} to={`/category/${cat.slug}`} onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-slate-300">{cat.name}</Link>
            ))}
            <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-indigo-400">Admin</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
