
import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Post, Category } from '../types';
import PostCard from '../components/PostCard';

interface CategoryPageProps {
  posts: Post[];
  categories: Category[];
}

const CategoryPage: React.FC<CategoryPageProps> = ({ posts, categories }) => {
  const { slug } = useParams<{ slug: string }>();
  
  const category = useMemo(() => categories.find(c => c.slug === slug), [categories, slug]);
  const filteredPosts = useMemo(() => posts.filter(p => p.category.toLowerCase() === slug?.toLowerCase()), [posts, slug]);

  if (!category) {
    return (
      <div className="min-h-screen pt-40 container mx-auto px-4 md:px-8 text-center">
        <h1 className="text-4xl font-bold">Category not found</h1>
        <Link to="/" className="mt-8 inline-block text-indigo-400 hover:text-white">Return home</Link>
      </div>
    );
  }

  return (
    <div className="pt-32 md:pt-48 pb-24">
      <header className="container mx-auto px-4 md:px-8 mb-20 text-center max-w-4xl">
        <span className="text-indigo-400 font-bold text-xs uppercase tracking-widest mb-4 block">Topic Archive</span>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 capitalize">{category.name}</h1>
        <p className="text-xl text-slate-400 leading-relaxed">{category.description}</p>
        <div className="mt-12 flex items-center justify-center gap-4">
          <div className="h-px w-20 bg-slate-800"></div>
          <p className="text-sm text-slate-500 font-medium uppercase tracking-widest">{filteredPosts.length} Articles</p>
          <div className="h-px w-20 bg-slate-800"></div>
        </div>
      </header>

      <section className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row gap-8 items-center justify-between mb-12 py-6 border-y border-slate-900">
          <div className="flex gap-4">
            {['All', 'Latest', 'Popular', 'Featured'].map(filter => (
              <button key={filter} className="px-6 py-2 rounded-full text-sm font-medium border border-slate-800 hover:border-indigo-500 hover:text-indigo-400 transition-all">
                {filter}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-80">
            <input 
              type="text" 
              placeholder="Search in this category..." 
              className="w-full bg-slate-900 border border-slate-800 rounded-full py-3 px-6 focus:outline-none focus:border-indigo-500 transition-all text-sm"
            />
            <svg className="w-4 h-4 text-slate-500 absolute right-6 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {filteredPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
          {filteredPosts.length === 0 && (
            <div className="col-span-full py-20 text-center">
              <p className="text-slate-400 text-lg">No articles found in this category yet.</p>
            </div>
          )}
        </div>

        {filteredPosts.length > 0 && (
          <div className="mt-24 text-center">
            <button className="px-12 py-4 rounded-full border border-slate-700 font-bold hover:bg-white hover:text-slate-950 transition-all">
              Load More Articles
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default CategoryPage;
