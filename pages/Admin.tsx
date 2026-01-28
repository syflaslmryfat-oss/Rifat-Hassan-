
import React, { useState } from 'react';
import { Post } from '../types';
import { generateBlogPost, optimizeSEO } from '../geminiService';

interface AdminProps {
  posts: Post[];
  onAddPost: (post: Post) => void;
}

const Admin: React.FC<AdminProps> = ({ posts, onAddPost }) => {
  const [activeTab, setActiveTab] = useState<'list' | 'create'>('list');
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [newPost, setNewPost] = useState<Partial<Post>>({
    title: '',
    excerpt: '',
    content: '',
    category: 'Technology',
    tags: []
  });

  const handleGenerate = async () => {
    if (!prompt) return;
    setIsGenerating(true);
    try {
      const result = await generateBlogPost(prompt);
      setNewPost({
        ...newPost,
        ...result,
      });
      alert('Content generated successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to generate content. Check API key.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePublish = () => {
    if (!newPost.title || !newPost.content) {
      alert('Please fill in required fields.');
      return;
    }

    const postToSave: Post = {
      id: Math.random().toString(36).substr(2, 9),
      title: newPost.title || 'Untitled',
      slug: (newPost.title || 'untitled').toLowerCase().replace(/\s+/g, '-'),
      excerpt: newPost.excerpt || '',
      content: newPost.content || '',
      author: {
        name: 'Admin User',
        avatar: 'https://picsum.photos/seed/admin/100/100',
        bio: 'Site administrator.',
        role: 'Editor'
      },
      category: newPost.category || 'General',
      tags: newPost.tags || [],
      featuredImage: `https://picsum.photos/seed/${Math.random()}/1200/800`,
      publishedAt: new Date().toISOString().split('T')[0],
      views: 0
    };

    onAddPost(postToSave);
    alert('Post published!');
    setActiveTab('list');
    setNewPost({});
  };

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Sidebar */}
          <aside className="md:w-64 flex-shrink-0">
            <h1 className="text-3xl font-bold mb-10 gradient-text">Dashboard</h1>
            <nav className="space-y-2">
              <button 
                onClick={() => setActiveTab('list')}
                className={`w-full text-left px-6 py-4 rounded-xl font-bold transition-all ${activeTab === 'list' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-900 text-slate-400'}`}
              >
                All Posts
              </button>
              <button 
                onClick={() => setActiveTab('create')}
                className={`w-full text-left px-6 py-4 rounded-xl font-bold transition-all ${activeTab === 'create' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-900 text-slate-400'}`}
              >
                Create Post
              </button>
              <button className="w-full text-left px-6 py-4 rounded-xl font-bold text-slate-400 hover:bg-slate-900 transition-all">Categories</button>
              <button className="w-full text-left px-6 py-4 rounded-xl font-bold text-slate-400 hover:bg-slate-900 transition-all">Analytics</button>
              <button className="w-full text-left px-6 py-4 rounded-xl font-bold text-slate-400 hover:bg-slate-900 transition-all">Settings</button>
            </nav>
          </aside>

          {/* Content Area */}
          <main className="flex-grow">
            {activeTab === 'list' ? (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold">Manage Content</h2>
                  <button onClick={() => setActiveTab('create')} className="px-6 py-2 bg-indigo-500 rounded-full text-sm font-bold">New Post</button>
                </div>
                <div className="bg-slate-900/50 border border-slate-800 rounded-3xl overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-900 border-b border-slate-800">
                        <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">Title</th>
                        <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">Category</th>
                        <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">Date</th>
                        <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">Status</th>
                        <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {posts.map(post => (
                        <tr key={post.id} className="hover:bg-slate-900/30 transition-colors">
                          <td className="px-8 py-6">
                            <p className="font-bold text-white mb-1">{post.title}</p>
                            <p className="text-xs text-slate-500">{post.slug}</p>
                          </td>
                          <td className="px-8 py-6">
                            <span className="text-xs px-3 py-1 bg-slate-800 rounded-full text-indigo-300">{post.category}</span>
                          </td>
                          <td className="px-8 py-6 text-sm text-slate-400">{post.publishedAt}</td>
                          <td className="px-8 py-6">
                            <span className="flex items-center gap-2 text-xs font-bold text-green-400">
                              <span className="w-2 h-2 rounded-full bg-green-400"></span>
                              Published
                            </span>
                          </td>
                          <td className="px-8 py-6">
                            <div className="flex gap-4">
                              <button className="p-2 hover:text-indigo-400 transition-colors">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                              </button>
                              <button className="p-2 hover:text-red-400 transition-colors">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="animate-in fade-in slide-in-from-left-4 duration-500 max-w-4xl">
                <h2 className="text-2xl font-bold mb-8">Compose New Masterpiece</h2>
                
                {/* AI Assistant Box */}
                <div className="p-8 rounded-3xl bg-indigo-950/30 border border-indigo-500/30 mb-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    </div>
                    <h3 className="text-lg font-bold text-indigo-300">AI Writing Assistant</h3>
                  </div>
                  <p className="text-sm text-slate-400 mb-6 leading-relaxed">Let Gemini help you draft a perfect article. Enter a topic, and we'll handle the structure, excerpt, and content.</p>
                  <div className="flex gap-4">
                    <input 
                      type="text" 
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="e.g., The impact of spatial computing on web design" 
                      className="flex-grow bg-slate-950 border border-indigo-500/20 rounded-xl px-6 py-3 text-sm focus:outline-none focus:border-indigo-500 transition-all"
                    />
                    <button 
                      onClick={handleGenerate}
                      disabled={isGenerating}
                      className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-sm font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isGenerating ? 'Drafting...' : 'Generate Draft'}
                    </button>
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Title</label>
                    <input 
                      type="text" 
                      value={newPost.title}
                      onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                      className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 focus:outline-none focus:border-indigo-500 transition-all text-xl font-bold"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Category</label>
                      <select 
                        value={newPost.category}
                        onChange={(e) => setNewPost({...newPost, category: e.target.value})}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 focus:outline-none focus:border-indigo-500 transition-all appearance-none"
                      >
                        <option>Technology</option>
                        <option>Design</option>
                        <option>Lifestyle</option>
                        <option>Business</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Tags (Comma separated)</label>
                      <input 
                        type="text" 
                        value={newPost.tags?.join(', ')}
                        onChange={(e) => setNewPost({...newPost, tags: e.target.value.split(',').map(t => t.trim())})}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 focus:outline-none focus:border-indigo-500 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Excerpt</label>
                    <textarea 
                      value={newPost.excerpt}
                      onChange={(e) => setNewPost({...newPost, excerpt: e.target.value})}
                      className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 focus:outline-none focus:border-indigo-500 transition-all text-sm h-24"
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Content (Markdown supported)</label>
                    <textarea 
                      value={newPost.content}
                      onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                      className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 focus:outline-none focus:border-indigo-500 transition-all text-base min-h-[400px] leading-relaxed"
                    ></textarea>
                  </div>

                  <div className="flex gap-4 pt-6">
                    <button 
                      onClick={handlePublish}
                      className="px-12 py-4 bg-white text-slate-950 font-bold rounded-2xl hover:bg-indigo-500 hover:text-white transition-all transform hover:-translate-y-1"
                    >
                      Publish Article
                    </button>
                    <button className="px-12 py-4 bg-slate-900 border border-slate-800 text-slate-300 font-bold rounded-2xl hover:border-slate-700 transition-all">
                      Save as Draft
                    </button>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Admin;
