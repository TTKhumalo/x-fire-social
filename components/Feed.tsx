
import React, { useState, useRef } from 'react';
import { Post, User } from '../types';

interface FeedProps {
  currentUser: User;
  onUserClick: (user: User) => void;
}

const INITIAL_POSTS: Post[] = [
  {
    id: 'p1',
    userId: 'user_2',
    userName: 'Sarah Chen',
    userPic: 'https://picsum.photos/seed/sarah/200',
    content: 'Just deployed the new X-Fire core! The performance gains are insane. 🔥🚀',
    media: { id: 'm_p1', type: 'image', url: 'https://picsum.photos/seed/code/800/600', timestamp: new Date().toISOString() },
    likes: 124,
    comments: 12,
    timestamp: '2h ago',
    likedByUser: false
  },
  {
    id: 'p2',
    userId: 'user_3',
    userName: 'Jordan Smith',
    userPic: 'https://picsum.photos/seed/jordan/200',
    content: 'The sunset over the hills today was magical. Captured this moment on my hike.',
    media: { id: 'm_p2', type: 'image', url: 'https://picsum.photos/seed/sunset/800/600', timestamp: new Date().toISOString() },
    likes: 89,
    comments: 5,
    timestamp: '5h ago',
    likedByUser: false
  }
];

const Feed: React.FC<FeedProps> = ({ currentUser, onUserClick }) => {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [newPostContent, setNewPostContent] = useState('');
  const [toast, setToast] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handlePost = () => {
    if (!newPostContent.trim()) return;
    
    const newPost: Post = {
      id: Math.random().toString(36),
      userId: currentUser.id,
      userName: currentUser.name,
      userPic: currentUser.profilePic,
      content: newPostContent,
      likes: 0,
      comments: 0,
      timestamp: 'Just now',
      likedByUser: false
    };

    setPosts([newPost, ...posts]);
    setNewPostContent('');
    showToast("Flame posted successfully! 🔥");
  };

  const handleLike = (postId: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const isLiking = !post.likedByUser;
        return {
          ...post,
          likedByUser: isLiking,
          likes: isLiking ? post.likes + 1 : post.likes - 1
        };
      }
      return post;
    }));
  };

  const handleComment = (postId: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return { ...post, comments: post.comments + 1 };
      }
      return post;
    }));
    showToast("Comment functionality coming soon!");
  };

  return (
    <div className="space-y-6 relative">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 bg-red-600 text-white px-6 py-3 rounded-full shadow-2xl font-bold animate-bounce border-2 border-white/20">
          {toast}
        </div>
      )}

      {/* Create Post */}
      <div id="post-box" className="bg-slate-900/50 border border-slate-800 p-4 rounded-2xl backdrop-blur-md">
        <div className="flex gap-4">
          <img src={currentUser.profilePic} alt={currentUser.name} className="w-12 h-12 rounded-full object-cover shrink-0" />
          <div className="flex-grow">
            <textarea
              ref={textareaRef}
              placeholder="What's heating up?"
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              className="w-full bg-transparent border-none text-lg focus:ring-0 placeholder:text-slate-500 resize-none h-24 text-white"
            ></textarea>
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <div className="flex gap-4 text-red-500">
                <button className="p-2 hover:bg-red-500/10 rounded-full transition-colors" title="Attach Image">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                </button>
                <button className="p-2 hover:bg-red-500/10 rounded-full transition-colors" title="Attach Video">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                </button>
              </div>
              <button 
                onClick={handlePost}
                disabled={!newPostContent.trim()}
                className="bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white font-bold py-2 px-6 rounded-full transition-all shadow-lg shadow-red-500/10"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Feed List */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 transition-colors hover:bg-slate-900/80">
            <div className="flex items-center justify-between mb-4">
              <div 
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => onUserClick({ id: post.userId, name: post.userName, profilePic: post.userPic } as User)}
              >
                <img src={post.userPic} alt={post.userName} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <h4 className="font-bold hover:underline">{post.userName}</h4>
                  <p className="text-xs text-slate-500">{post.timestamp}</p>
                </div>
              </div>
              <button className="text-slate-500 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
              </button>
            </div>
            
            <p className="text-slate-200 mb-4 whitespace-pre-wrap">{post.content}</p>
            
            {post.media && (
              <div className="rounded-xl overflow-hidden mb-4 border border-slate-800">
                <img src={post.media.url} alt="Post content" className="w-full object-cover max-h-[500px]" />
              </div>
            )}

            <div className="flex items-center gap-6 pt-4 border-t border-slate-800/50">
              <button 
                onClick={() => handleLike(post.id)}
                className={`flex items-center gap-2 transition-all group ${post.likedByUser ? 'text-red-500' : 'text-slate-400 hover:text-red-500'}`}
              >
                <svg 
                  className={`w-5 h-5 group-active:scale-150 transition-all ${post.likedByUser ? 'fill-current' : 'fill-none'}`} 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
                <span className="text-sm font-medium">{post.likes}</span>
              </button>
              
              <button 
                onClick={() => handleComment(post.id)}
                className="flex items-center gap-2 text-slate-400 hover:text-blue-500 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                </svg>
                <span className="text-sm font-medium">{post.comments}</span>
              </button>
              
              <button 
                onClick={() => showToast("Link copied to clipboard!")}
                className="flex items-center gap-2 text-slate-400 hover:text-green-500 transition-colors ml-auto"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;
