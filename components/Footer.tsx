
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="text-3xl font-bold gradient-text mb-6 inline-block">LUMINA</Link>
            <p className="text-slate-400 max-w-md text-lg leading-relaxed mb-8">
              Redefining the digital publication experience with AI-assisted storytelling and minimalist luxury design. Join our journey into the future of information.
            </p>
            <div className="flex gap-4">
              {['twitter', 'instagram', 'linkedin', 'github'].map(social => (
                <a key={social} href="#" className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center hover:border-indigo-500 hover:text-indigo-400 transition-all capitalize text-xs">
                  {social[0]}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Explore</h4>
            <ul className="space-y-4 text-slate-400">
              <li><Link to="/" className="hover:text-indigo-400 transition-colors">Home</Link></li>
              <li><Link to="/category/technology" className="hover:text-indigo-400 transition-colors">Technology</Link></li>
              <li><Link to="/category/lifestyle" className="hover:text-indigo-400 transition-colors">Lifestyle</Link></li>
              <li><Link to="/category/design" className="hover:text-indigo-400 transition-colors">Design</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Subscribe</h4>
            <p className="text-sm text-slate-400 mb-4">Get curated insights delivered to your inbox weekly.</p>
            <form className="relative">
              <input 
                type="email" 
                placeholder="email@example.com" 
                className="w-full bg-slate-900 border border-slate-800 rounded-full py-4 px-6 focus:outline-none focus:border-indigo-500 transition-all text-sm"
              />
              <button className="absolute right-2 top-2 bottom-2 px-6 bg-indigo-500 rounded-full text-xs font-bold hover:bg-indigo-600 transition-colors">
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© 2024 Lumina Luxe. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-300">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300">Terms of Service</a>
            <a href="#" className="hover:text-slate-300">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
