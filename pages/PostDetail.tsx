
import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Post } from '../types';

interface PostDetailProps {
  posts: Post[];
}

const PostDetail: React.FC<PostDetailProps> = ({ posts }) => {
  const { slug } = useParams<{ slug: string }>();
  const post = useMemo(() => posts.find(p => p.slug === slug), [posts, slug]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-4">404</h1>
          <p className="text-slate-400 mb-8">Article not found.</p>
          <Link to="/" className="px-8 py-4 bg-indigo-500 rounded-full font-bold">Back Home</Link>
        </div>
      </div>
    );
  }

  return (
    <article className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Article Header */}
      <header className="relative py-32 md:py-48 bg-slate-950 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <img src={post.featuredImage} alt="" className="w-full h-full object-cover blur-3xl scale-110" />
          <div className="absolute inset-0 bg-slate-950/60"></div>
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
          <div className="max-w-4xl mx-auto">
            <Link to={`/category/${post.category.toLowerCase()}`} className="inline-block mb-6 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest">
              {post.category}
            </Link>
            <h1 className="text-4xl md:text-7xl font-bold leading-tight mb-10">{post.title}</h1>
            
            <div className="flex items-center justify-center gap-6">
              <div className="flex items-center gap-3">
                <img src={post.author.avatar} alt={post.author.name} className="w-12 h-12 rounded-full border-2 border-slate-800" />
                <div className="text-left">
                  <p className="font-bold text-white leading-none mb-1">{post.author.name}</p>
                  <p className="text-xs text-slate-400">{post.author.role}</p>
                </div>
              </div>
              <div className="w-px h-10 bg-slate-800"></div>
              <div className="text-left">
                <p className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-1">Published</p>
                <p className="text-sm font-medium">{post.publishedAt}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 md:px-8 -mt-20 relative z-20 pb-24">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12">
          
          {/* Main Column */}
          <div className="md:w-2/3">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden mb-12 shadow-2xl">
              <img src={post.featuredImage} alt={post.title} className="w-full aspect-video object-cover" />
              <div className="p-8 md:p-16">
                <div className="prose prose-invert prose-lg max-w-none text-slate-300 leading-relaxed space-y-6">
                  <p className="text-2xl font-light italic text-indigo-200 border-l-4 border-indigo-500 pl-8 py-2 my-10">
                    "{post.excerpt}"
                  </p>
                  <p>{post.content}</p>
                  <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
                  
                  <h2 className="text-3xl font-bold text-white pt-8">The Core Philosophy</h2>
                  <p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?</p>
                  
                  <img src="https://picsum.photos/seed/inner/1200/600" alt="Inner image" className="rounded-2xl w-full my-12" />
                  
                  <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.</p>
                </div>

                <div className="mt-16 pt-8 border-t border-slate-800 flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <span key={tag} className="px-4 py-2 bg-slate-950 border border-slate-800 rounded-full text-xs font-medium hover:border-indigo-500 transition-colors">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Author Box */}
            <div className="p-8 md:p-12 bg-slate-900/40 rounded-3xl border border-slate-800 flex flex-col md:flex-row gap-8 items-center md:items-start">
              <img src={post.author.avatar} alt={post.author.name} className="w-24 h-24 rounded-full border-4 border-indigo-500/20" />
              <div>
                <span className="text-indigo-400 text-xs font-bold uppercase tracking-widest mb-2 block">About the Author</span>
                <h3 className="text-2xl font-bold mb-4">{post.author.name}</h3>
                <p className="text-slate-400 mb-6 leading-relaxed">{post.author.bio}</p>
                <button className="px-6 py-2 rounded-full border border-slate-700 hover:border-indigo-500 hover:text-indigo-400 transition-all text-sm font-medium">
                  View Profile
                </button>
              </div>
            </div>

            {/* Comments Section (Placeholder) */}
            <div className="mt-20">
              <h3 className="text-2xl font-bold mb-8">Conversation (2)</h3>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-indigo-500 flex-shrink-0 flex items-center justify-center font-bold">JD</div>
                  <div className="flex-grow bg-slate-900/50 p-6 rounded-2xl rounded-tl-none border border-slate-800">
                    <div className="flex justify-between items-center mb-4">
                      <p className="font-bold">John Doe</p>
                      <p className="text-xs text-slate-500">2 hours ago</p>
                    </div>
                    <p className="text-slate-400 text-sm">Absolutely fascinating read. The point about typography as a system of trust really resonated with me.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-purple-500 flex-shrink-0 flex items-center justify-center font-bold">MK</div>
                  <div className="flex-grow bg-slate-900/50 p-6 rounded-2xl rounded-tl-none border border-slate-800">
                    <div className="flex justify-between items-center mb-4">
                      <p className="font-bold">Marie Kelly</p>
                      <p className="text-xs text-slate-500">5 hours ago</p>
                    </div>
                    <p className="text-slate-400 text-sm">Waiting for Part 2! Could you elaborate more on the specific AI tools you mentioned?</p>
                  </div>
                </div>
              </div>
              <div className="mt-12 bg-slate-950 p-8 rounded-3xl border border-slate-800">
                <h4 className="font-bold mb-4">Add your thoughts</h4>
                <textarea className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 min-h-[120px] focus:outline-none focus:border-indigo-500 transition-colors text-sm mb-4" placeholder="Join the discussion..."></textarea>
                <button className="px-8 py-3 bg-indigo-500 rounded-full font-bold text-sm hover:bg-indigo-600 transition-colors">Post Comment</button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="md:w-1/3">
            <div className="sticky top-24 space-y-12">
              <div className="p-8 rounded-3xl border border-slate-800 bg-slate-900/20 backdrop-blur-md">
                <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" /></svg>
                  Table of Contents
                </h4>
                <ul className="space-y-4 text-sm text-slate-400">
                  <li className="hover:text-indigo-400 transition-colors cursor-pointer border-l-2 border-indigo-500 pl-4 font-bold text-white">Introduction</li>
                  <li className="hover:text-indigo-400 transition-colors cursor-pointer pl-4">The Evolution Shift</li>
                  <li className="hover:text-indigo-400 transition-colors cursor-pointer pl-4">The Core Philosophy</li>
                  <li className="hover:text-indigo-400 transition-colors cursor-pointer pl-4">Practical Implementations</li>
                  <li className="hover:text-indigo-400 transition-colors cursor-pointer pl-4">Conclusion & Outlook</li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-bold mb-6">Related Stories</h4>
                <div className="space-y-6">
                  {posts.filter(p => p.id !== post.id).slice(0, 3).map(p => (
                    <Link key={p.id} to={`/post/${p.slug}`} className="group flex gap-4 items-center">
                      <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                        <img src={p.featuredImage} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div>
                        <h5 className="font-bold text-sm leading-snug group-hover:text-indigo-400 transition-colors line-clamp-2">{p.title}</h5>
                        <p className="text-[10px] text-slate-500 mt-2 uppercase tracking-widest">{p.category}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
};

export default PostDetail;
