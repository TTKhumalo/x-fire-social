
import React, { useState } from 'react';
import { User, ViewType } from '../types';

interface NavbarProps {
  user: User;
  activeView: ViewType;
  onNavigate: (view: ViewType) => void;
  onSearch: (query: string) => void;
  onLogout: () => void;
  onProfileClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, activeView, onNavigate, onSearch, onLogout, onProfileClick }) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput);
    }
  };

  const iconClass = (view: ViewType) => `p-2 transition-all hover:scale-110 active:scale-95 group relative ${
    activeView === view ? 'text-red-500' : 'text-slate-400 hover:text-white'
  }`;

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800 z-50 flex items-center justify-between px-6">
      <div className="flex items-center gap-8">
        <div 
          onClick={() => onNavigate('feed')}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-8 h-8 bg-gradient-to-tr from-red-600 to-orange-500 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform shadow-lg shadow-red-500/20">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tighter text-white hidden sm:block uppercase">X-FIRE</span>
        </div>

        <form onSubmit={handleSearch} className="relative hidden md:block w-64 lg:w-96">
          <input
            type="text"
            placeholder="Search users or posts..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-full py-2 px-10 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all text-white"
          />
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </form>
      </div>

      <div className="flex items-center gap-1">
        {/* Home Icon */}
        <button 
          onClick={() => onNavigate('feed')}
          className={iconClass('feed')} 
          title="Home"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </button>

        {/* Chatbot Icon (AI) */}
        <button 
          onClick={() => onNavigate('ai-chat')}
          className={iconClass('ai-chat')} 
          title="AI Assistant"
        >
           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
           </svg>
           <span className="absolute top-1 right-1 w-2 h-2 bg-blue-400 rounded-full blur-[2px] animate-pulse"></span>
        </button>

        {/* Message Icon */}
        <button 
          onClick={() => onNavigate('messages')}
          className={iconClass('messages')} 
          title="Messages"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
        
        {/* Notification Icon */}
        <button 
          onClick={() => onNavigate('notifications')}
          className={iconClass('notifications')} 
          title="Notifications"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-slate-950"></span>
        </button>

        {/* Settings Icon */}
        <button 
          onClick={() => onNavigate('settings')}
          className={iconClass('settings')} 
          title="Settings"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
        
        <div className="flex items-center gap-3 pl-4 border-l border-slate-800 ml-2">
          <img 
            src={user.profilePic} 
            alt={user.name} 
            onClick={onProfileClick}
            className={`w-8 h-8 rounded-full cursor-pointer hover:ring-2 hover:ring-red-500 transition-all object-cover ${activeView === 'profile' ? 'ring-2 ring-red-500' : ''}`} 
          />
          <button 
            onClick={onLogout}
            className="text-xs font-bold text-slate-500 hover:text-red-400 transition-colors uppercase tracking-widest hidden sm:block"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
