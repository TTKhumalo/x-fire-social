
import React from 'react';
import { ViewType } from '../types';

interface SidebarProps {
  activeView: ViewType;
  onNavigate: (view: ViewType) => void;
  onProfileClick: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onNavigate, onProfileClick }) => {
  const items = [
    { id: 'feed', label: 'Home', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg> },
    { id: 'search', label: 'Explore', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 20l4-4m0 0l4 4m-4-4v12"></path></svg> },
    { id: 'notifications', label: 'Notifications', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg> },
    { id: 'messages', label: 'Messages', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg> },
  ];

  const handlePostClick = () => {
    onNavigate('feed');
    setTimeout(() => {
      const postBox = document.getElementById('post-box');
      if (postBox) {
        postBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
        const textarea = postBox.querySelector('textarea');
        if (textarea) textarea.focus();
      }
    }, 100);
  };

  return (
    <div className="space-y-2 sticky top-24">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onNavigate(item.id as ViewType)}
          className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all font-semibold ${
            activeView === item.id 
              ? 'bg-red-500 text-white shadow-lg shadow-red-500/20' 
              : 'text-slate-400 hover:bg-slate-900 hover:text-white'
          }`}
        >
          {item.icon}
          <span>{item.label}</span>
        </button>
      ))}

      <button
        onClick={onProfileClick}
        className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all font-semibold ${
          activeView === 'profile' 
            ? 'bg-red-500 text-white shadow-lg shadow-red-500/20' 
            : 'text-slate-400 hover:bg-slate-900 hover:text-white'
        }`}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
        <span>Profile</span>
      </button>

      <button 
        onClick={handlePostClick}
        className="w-full mt-4 bg-gradient-to-tr from-red-600 to-orange-500 text-white font-bold py-4 rounded-full shadow-lg hover:brightness-110 active:scale-95 transition-all"
      >
        Post Flame
      </button>
    </div>
  );
};

export default Sidebar;
