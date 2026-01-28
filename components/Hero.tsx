
import React from 'react';
import { Link } from 'react-router-dom';
import { Post } from '../types';

interface HeroProps {
  post: Post;
}

const Hero: React.FC<HeroProps> = ({ post }) => {
  return (
    <section className="relative h-[80vh] min-h-[600px] w-full overflow-hidden flex items-end pb-12 md:pb-24">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-4xl">
          <span className="inline-block px-3 py-1 rounded-full bg-indigo-500 text-white text-[10px] uppercase tracking-widest font-bold mb-4 animate-pulse">
            Featured
          </span>
          <h1 className="text-4xl md:text-7xl font-bold leading-tight mb-6 hover:text-indigo-200 transition-colors">
            <Link to={`/post/${post.slug}`}>{post.title}</Link>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl line-clamp-2">
            {post.excerpt}
          </p>
          
          <div className="flex items-center gap-4">
            <img src={post.author.avatar} alt={post.author.name} className="w-10 h-10 rounded-full border-2 border-slate-700" />
            <div>
              <p className="text-sm font-semibold">{post.author.name}</p>
              <p className="text-xs text-slate-400">{post.publishedAt} • 5 min read</p>
            </div>
            <Link 
              to={`/post/${post.slug}`}
              className="ml-8 px-8 py-4 bg-white text-slate-950 rounded-full font-bold text-sm hover:bg-indigo-500 hover:text-white transition-all transform hover:-translate-y-1 shadow-xl"
            >
              Read Article
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
