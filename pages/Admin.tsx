
import React, { useState, useRef } from 'react';
import { Post } from '../types';
import { generateBlogPost, generateFeaturedImage, analyzeSEO } from '../geminiService';

interface AdminProps {
  posts: Post[];
  onAddPost: (post: Post) => void;
}

const Admin: React.FC<AdminProps> = ({ posts, onAddPost }) => {
  const [activeTab, setActiveTab] = useState<'list' | 'create'>('create');
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGeneratingImg, setIsGeneratingImg] = useState(false);
  const [isAnalyzingSEO, setIsAnalyzingSEO] = useState(false);
  const [seoResult, setSeoResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [newPost, setNewPost] = useState<Partial<Post>>({
    title: '',
    excerpt: '',
    content: '',
    category: 'Technology',
    tags: [],
    featuredImage: ''
  });

  const handleGenerateText = async () => {
    if (!prompt) return;
    setIsGenerating(true);
    try {
      const result = await generateBlogPost(prompt);
      setNewPost(prev => ({ ...prev, ...result }));
    } catch (error) {
      alert('Generation failed. Please check your API key.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateImage = async () => {
    if (!newPost.title) {
      alert('Please enter a title first so I can generate a relevant image.');
      return;
    }
    setIsGeneratingImg(true);
    try {
      const imgUrl = await generateFeaturedImage(newPost.title);
      if (imgUrl) setNewPost(prev => ({ ...prev, featuredImage: imgUrl }));
    } catch (error) {
      alert('Image generation failed.');
    } finally {
      setIsGeneratingImg(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPost(prev => ({ ...prev, featuredImage: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleSEOAudit = async () => {
    if (!newPost.content) return;
    setIsAnalyzingSEO(true);
    try {
      const result = await analyzeSEO(newPost.title || '', newPost.content || '');
      setSeoResult(result);
    } catch (error) {
      console.error(error);
    } finally {
      setIsAnalyzingSEO(false);
    }
  };

  const handlePublish = () => {
    if (!newPost.title || !newPost.content) {
      alert('Please fill in title and content.');
      return;
    }

    const postToSave: Post = {
      id: Math.random().toString(36).substr(2, 9),
      title: newPost.title || 'Untitled',
      slug: (newPost.title || 'untitled').toLowerCase().replace(/\s+/g, '-'),
      excerpt: newPost.excerpt || '',
      content: newPost.content || '',
      author: {
        name: 'Admin Master',
        avatar: 'https://i.pravatar.cc/150?u=admin',
        bio: 'Professional storyteller and digital strategist.',
        role: 'Editor-in-Chief'
      },
      category: newPost.category || 'General',
      tags: newPost.tags || [],
      featuredImage: newPost.featuredImage || `https://picsum.photos/seed/${Math.random()}/1200/800`,
      publishedAt: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      views: 0
    };

    onAddPost(postToSave);
    alert('Article Published Globally!');
    setActiveTab('list');
    setNewPost({ title: '', content: '', excerpt: '', featuredImage: '', tags: [], category: 'Technology' });
    setSeoResult(null);
  };

  return (
    <div className="pt-28 min-h-screen bg-[#020617]">
      <div className="container mx-auto px-4 md:px-8 flex flex-col lg:flex-row gap-8">
        
        {/* Navigation Sidebar */}
        <aside className="lg:w-72 flex-shrink-0">
          <div className="sticky top-28 space-y-6">
            <div className="p-6 rounded-3xl bg-slate-900/50 border border-white/5 backdrop-blur-xl">
              <h2 className="text-xl font-bold mb-6 gradient-text">Studio</h2>
              <nav className="space-y-2">
                <button 
                  onClick={() => setActiveTab('create')}
                  className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-all ${activeTab === 'create' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'text-slate-400 hover:bg-white/5'}`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5" /></svg>
                  New Article
                </button>
                <button 
                  onClick={() => setActiveTab('list')}
                  className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-all ${activeTab === 'list' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'text-slate-400 hover:bg-white/5'}`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                  My Library
                </button>
              </nav>
            </div>

            {seoResult && (
              <div className="p-6 rounded-3xl bg-emerald-950/20 border border-emerald-500/20 animate-in fade-in zoom-in duration-500">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-emerald-400">SEO Health</h3>
                  <span className="text-2xl font-black text-emerald-500">{seoResult.score}</span>
                </div>
                <div className="space-y-2">
                  {seoResult.improvements.slice(0, 3).map((imp: string, i: number) => (
                    <p key={i} className="text-[10px] text-slate-400 flex gap-2">
                      <span className="text-emerald-500">✓</span> {imp}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* Dynamic Workspace */}
        <main className="flex-grow pb-20">
          {activeTab === 'list' ? (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
              <h1 className="text-4xl font-bold mb-8">Published Stories</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {posts.map(post => (
                  <div key={post.id} className="p-6 rounded-3xl bg-slate-900/30 border border-white/5 flex gap-4 hover:bg-slate-900/50 transition-all group">
                    <img src={post.featuredImage} className="w-24 h-24 rounded-2xl object-cover" />
                    <div>
                      <h3 className="font-bold mb-1 group-hover:text-indigo-400 transition-colors">{post.title}</h3>
                      <p className="text-xs text-slate-500 mb-4">{post.publishedAt} • {post.category}</p>
                      <div className="flex gap-2">
                        <button className="text-[10px] font-bold uppercase tracking-tighter text-slate-400 hover:text-white">Edit</button>
                        <button className="text-[10px] font-bold uppercase tracking-tighter text-red-400 hover:text-red-300">Archive</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
              {/* Write Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                <div>
                  <h1 className="text-4xl font-black mb-2">Write Content</h1>
                  <p className="text-slate-500">Unleash your creativity with AI-powered tools.</p>
                </div>
                <div className="flex gap-4">
                   <button 
                    onClick={handleSEOAudit}
                    disabled={isAnalyzingSEO}
                    className="px-6 py-3 rounded-full border border-emerald-500/30 text-emerald-400 text-xs font-bold hover:bg-emerald-500/10 disabled:opacity-50"
                  >
                    {isAnalyzingSEO ? 'Analyzing...' : 'SEO Check'}
                  </button>
                  <button 
                    onClick={handlePublish}
                    className="px-10 py-3 bg-white text-slate-950 rounded-full text-xs font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-white/10"
                  >
                    Publish Article
                  </button>
                </div>
              </div>

              {/* AI Prompting Area */}
              <div className="mb-12 p-1 rounded-[2.5rem] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                <div className="bg-slate-950 rounded-[2.4rem] p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="p-2 bg-indigo-500/10 rounded-lg"><svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg></span>
                    <h3 className="font-black text-lg">Gemini Writing Assistant</h3>
                  </div>
                  <div className="flex flex-col md:flex-row gap-4">
                    <input 
                      type="text" 
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="Explain the future of quantum computing in web development..." 
                      className="flex-grow bg-slate-900/50 border border-white/5 rounded-2xl px-6 py-4 focus:outline-none focus:border-indigo-500 transition-all text-sm"
                    />
                    <button 
                      onClick={handleGenerateText}
                      disabled={isGenerating}
                      className="px-8 py-4 bg-indigo-600 rounded-2xl font-bold text-sm hover:bg-indigo-500 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isGenerating ? (
                        <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> Thinking...</>
                      ) : 'Generate Draft'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Editor Grid */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
                {/* Inputs */}
                <div className="space-y-8">
                  <div className="group">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-3 block">Article Title</label>
                    <input 
                      type="text" 
                      value={newPost.title}
                      onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                      placeholder="Title of your story..."
                      className="w-full bg-transparent border-b border-slate-800 focus:border-indigo-500 py-4 text-3xl font-black outline-none transition-all placeholder:text-slate-800"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-3 block">Category</label>
                      <select 
                        value={newPost.category}
                        onChange={(e) => setNewPost({...newPost, category: e.target.value})}
                        className="w-full bg-slate-900 border border-white/5 rounded-2xl p-4 outline-none focus:border-indigo-500 transition-all appearance-none"
                      >
                        <option>Technology</option>
                        <option>Design</option>
                        <option>Lifestyle</option>
                        <option>Business</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-3 block">Tags</label>
                      <input 
                        type="text" 
                        value={newPost.tags?.join(', ')}
                        onChange={(e) => setNewPost({...newPost, tags: e.target.value.split(',').map(t => t.trim())})}
                        className="w-full bg-slate-900 border border-white/5 rounded-2xl p-4 outline-none focus:border-indigo-500 transition-all"
                        placeholder="AI, Tech, Future..."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-3 block">Featured Image</label>
                    <div className="relative group overflow-hidden rounded-[2rem] border-2 border-dashed border-slate-800 hover:border-indigo-500/50 transition-all bg-slate-900/20">
                      <input 
                        type="file" 
                        ref={fileInputRef}
                        className="hidden" 
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                      {newPost.featuredImage ? (
                        <div className="relative aspect-video">
                          <img src={newPost.featuredImage} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                            <button 
                              onClick={triggerFileUpload}
                              className="p-3 bg-white text-slate-950 rounded-full hover:scale-110 transition-transform"
                              title="Replace with local file"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                            </button>
                            <button 
                              onClick={() => setNewPost({...newPost, featuredImage: ''})}
                              className="p-3 bg-red-500 text-white rounded-full hover:scale-110 transition-transform"
                              title="Remove image"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center p-12 text-center">
                          <svg className="w-12 h-12 text-slate-700 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                          <p className="text-slate-500 text-sm mb-6">No image selected</p>
                          <div className="flex flex-wrap justify-center gap-3">
                            <button 
                              onClick={triggerFileUpload}
                              className="px-6 py-3 bg-slate-800 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-700 transition-all flex items-center gap-2"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                              Upload Image
                            </button>
                            <button 
                              onClick={handleGenerateImage}
                              disabled={isGeneratingImg}
                              className="px-6 py-3 bg-white text-slate-950 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-500 hover:text-white transition-all disabled:opacity-50 flex items-center gap-2"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                              {isGeneratingImg ? 'Creating...' : 'Generate AI'}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-3 block">Excerpt</label>
                    <textarea 
                      value={newPost.excerpt}
                      onChange={(e) => setNewPost({...newPost, excerpt: e.target.value})}
                      className="w-full bg-slate-900 border border-white/5 rounded-2xl p-6 outline-none focus:border-indigo-500 transition-all text-sm h-32 resize-none"
                      placeholder="Brief summary for social sharing..."
                    ></textarea>
                  </div>
                </div>

                {/* Editor Content Area */}
                <div className="flex flex-col">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-3 block">Article Content</label>
                  <div className="flex-grow min-h-[600px] flex flex-col bg-slate-900/20 border border-white/5 rounded-3xl overflow-hidden backdrop-blur-md">
                    <div className="flex items-center gap-2 p-3 bg-slate-900 border-b border-white/5 overflow-x-auto">
                       <button className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white/5 text-slate-400 hover:text-white">B</button>
                       <button className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white/5 text-slate-400 hover:text-white">I</button>
                       <button className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white/5 text-slate-400 hover:text-white">Link</button>
                       <div className="w-px h-4 bg-white/10 mx-2"></div>
                       <button className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white/5 text-slate-400 hover:text-white">H1</button>
                       <button className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white/5 text-slate-400 hover:text-white">H2</button>
                       <button className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white/5 text-slate-400 hover:text-white">Quote</button>
                    </div>
                    <textarea 
                      value={newPost.content}
                      onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                      className="flex-grow w-full bg-transparent p-8 outline-none text-slate-300 leading-relaxed font-mono text-sm resize-none"
                      placeholder="Once upon a time in a digital landscape far away..."
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Admin;
