
import React from 'react';
import { Post, Category } from '../types';
import Hero from '../components/Hero';
import PostCard from '../components/PostCard';
import { Link } from 'react-router-dom';

interface HomeProps {
  posts: Post[];
  categories: Category[];
}

const Home: React.FC<HomeProps> = ({ posts, categories }) => {
  const featuredPost = posts.find(p => p.isFeatured) || posts[0];
  const trendingPosts = posts.filter(p => p.isTrending);
  const recentPosts = posts.filter(p => p.id !== featuredPost.id).slice(0, 6);

  return (
    <div className="animate-in fade-in duration-700">
      <Hero post={featuredPost} />

      {/* Trending Section */}
      <section className="py-24 bg-slate-950">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Trending Stories</h2>
            <div className="h-px flex-grow bg-slate-900 mx-8 hidden md:block"></div>
            <Link to="/trending" className="text-indigo-400 font-bold text-sm uppercase tracking-widest hover:text-white transition-colors">View All</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trendingPosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-24 border-y border-slate-900">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <span className="text-indigo-400 font-bold text-xs uppercase tracking-widest">Explore</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4">Curated Topics</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map(category => (
              <Link 
                key={category.id} 
                to={`/category/${category.slug}`}
                className="group relative overflow-hidden rounded-3xl aspect-square"
              >
                <img src={category.image} alt={category.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-50" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <h3 className="text-2xl font-bold mb-2 group-hover:-translate-y-2 transition-transform">{category.name}</h3>
                  <p className="text-xs text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500">{category.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Magazine Grid Layout */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row gap-16">
            <div className="md:w-2/3">
              <h2 className="text-3xl font-bold mb-10 pb-4 border-b border-slate-900">Latest Updates</h2>
              <div className="space-y-12">
                {recentPosts.map(post => (
                  <div key={post.id} className="group grid grid-cols-1 md:grid-cols-5 gap-8">
                    <div className="md:col-span-2 overflow-hidden rounded-2xl aspect-[4/3]">
                      <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="md:col-span-3 flex flex-col justify-center">
                      <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-3">{post.category}</span>
                      <h3 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-indigo-300 transition-colors">
                        <Link to={`/post/${post.slug}`}>{post.title}</Link>
                      </h3>
                      <p className="text-slate-400 mb-6 line-clamp-3 leading-relaxed">{post.excerpt}</p>
                      <div className="flex items-center gap-3">
                        <img src={post.author.avatar} alt={post.author.name} className="w-6 h-6 rounded-full" />
                        <span className="text-xs font-medium text-slate-500">By {post.author.name} • {post.publishedAt}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <aside className="md:w-1/3">
              <div className="sticky top-24 space-y-12">
                <div className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800">
                  <h3 className="text-xl font-bold mb-6">Popular Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Tech', 'Minimal', 'Future', 'Design', 'Business', 'Success', 'Productivity', 'Mindset'].map(tag => (
                      <span key={tag} className="px-4 py-2 bg-slate-800 rounded-full text-xs font-medium hover:bg-indigo-500 transition-colors cursor-pointer">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-6">Editor's Choice</h3>
                  <div className="space-y-6">
                    {posts.slice(0, 4).map(post => (
                      <PostCard key={post.id} post={post} isHorizontal />
                    ))}
                  </div>
                </div>

                <div className="p-8 rounded-3xl bg-indigo-600 overflow-hidden relative group">
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-4">Master the Digital Era</h3>
                    <p className="text-indigo-100 text-sm mb-6 leading-relaxed">Download our exclusive 2024 strategy guide for content creators and digital entrepreneurs.</p>
                    <button className="w-full py-4 bg-white text-indigo-600 rounded-xl font-bold text-sm hover:scale-105 transition-transform">
                      Download PDF
                    </button>
                  </div>
                  <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-32 h-32 bg-white/10 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
