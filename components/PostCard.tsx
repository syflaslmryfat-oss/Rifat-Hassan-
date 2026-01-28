
import React from 'react';
import { Link } from 'react-router-dom';
import { Post } from '../types';

interface PostCardProps {
  post: Post;
  isHorizontal?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ post, isHorizontal }) => {
  if (isHorizontal) {
    return (
      <Link to={`/post/${post.slug}`} className="group flex gap-6 items-center p-4 rounded-2xl hover:bg-slate-900 transition-all border border-transparent hover:border-slate-800">
        <div className="w-32 h-24 overflow-hidden rounded-xl flex-shrink-0">
          <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        </div>
        <div>
          <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">{post.category}</span>
          <h3 className="text-lg font-bold leading-tight group-hover:text-indigo-300 transition-colors mt-1">{post.title}</h3>
          <p className="text-xs text-slate-500 mt-2">{post.publishedAt}</p>
        </div>
      </Link>
    );
  }

  return (
    <div className="group relative">
      <Link to={`/post/${post.slug}`} className="block overflow-hidden rounded-2xl aspect-[16/10] mb-5">
        <img 
          src={post.featuredImage} 
          alt={post.title} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
        />
        <div className="absolute top-4 left-4">
          <span className="bg-slate-950/80 backdrop-blur-md text-white text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wider border border-white/10">
            {post.category}
          </span>
        </div>
      </Link>
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span>{post.publishedAt}</span>
          <span>•</span>
          <span>{post.views} views</span>
        </div>
        <h3 className="text-2xl font-bold leading-snug group-hover:text-indigo-400 transition-colors">
          <Link to={`/post/${post.slug}`}>{post.title}</Link>
        </h3>
        <p className="text-slate-400 line-clamp-2 text-sm leading-relaxed">
          {post.excerpt}
        </p>
        <div className="flex items-center gap-3 pt-2">
          <img src={post.author.avatar} alt={post.author.name} className="w-6 h-6 rounded-full" />
          <span className="text-xs font-medium text-slate-300">{post.author.name}</span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
