
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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'glass py-3 shadow-2xl border-b border-white/5' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold tracking-tighter flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white text-lg font-black group-hover:rotate-12 transition-all shadow-lg shadow-indigo-500/20">L</div>
          <span className="gradient-text tracking-[0.2em] font-light">LUMINA</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-10">
          <Link to="/" className={`text-xs uppercase tracking-widest font-bold hover:text-indigo-400 transition-colors ${location.pathname === '/' ? 'text-indigo-400' : 'text-slate-400'}`}>Home</Link>
          {categories.slice(0, 4).map(cat => (
            <Link 
              key={cat.id} 
              to={`/category/${cat.slug}`} 
              className={`text-xs uppercase tracking-widest font-bold hover:text-indigo-400 transition-colors ${location.pathname.includes(cat.slug) ? 'text-indigo-400' : 'text-slate-400'}`}
            >
              {cat.name}
            </Link>
          ))}
          
          <div className="flex items-center gap-4 ml-4">
            <Link 
              to="/admin" 
              className="px-6 py-2.5 rounded-full bg-white text-slate-950 hover:bg-indigo-500 hover:text-white transition-all text-xs font-black uppercase tracking-tighter flex items-center gap-2 shadow-xl"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              Write Post
            </Link>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden text-slate-300 p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden glass absolute top-full left-0 right-0 border-t border-slate-800 animate-in slide-in-from-top-4 duration-500">
          <div className="flex flex-col p-6 space-y-6">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-sm font-bold uppercase tracking-widest text-slate-300">Home</Link>
            {categories.map(cat => (
              <Link key={cat.id} to={`/category/${cat.slug}`} onClick={() => setIsMenuOpen(false)} className="text-sm font-bold uppercase tracking-widest text-slate-300">{cat.name}</Link>
            ))}
            <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="px-6 py-4 bg-indigo-600 rounded-2xl text-center font-bold">Write a Post</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
