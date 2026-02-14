
import React, { useState, useRef } from 'react';
import { User, MediaItem } from '../types';

interface ProfileViewProps {
  user: User;
  isOwnProfile: boolean;
  onUpdateUser?: (updatedUser: User) => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ user, isOwnProfile, onUpdateUser }) => {
  const [activeTab, setActiveTab] = useState<'media' | 'info' | 'cookies'>('media');
  const [isFollowing, setIsFollowing] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const profileInputRef = useRef<HTMLInputElement>(null);

  const notify = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    const newMedia: MediaItem = {
      id: Math.random().toString(36),
      type: file.type.startsWith('video') ? 'video' : 'image',
      url,
      timestamp: new Date().toISOString(),
    };

    if (onUpdateUser) {
      onUpdateUser({
        ...user,
        media: [newMedia, ...user.media]
      });
      notify("New media uploaded!");
    }
  };

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const url = URL.createObjectURL(e.target.files[0]);
    if (onUpdateUser) {
      onUpdateUser({ ...user, profilePic: url });
      notify("Profile picture updated!");
    }
  };

  const removeMedia = (id: string) => {
    if (onUpdateUser) {
      onUpdateUser({
        ...user,
        media: user.media.filter(m => m.id !== id)
      });
      notify("Media removed.");
    }
  };

  const clearData = () => {
    if (confirm("Clear all browsing data? This will log you out.")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6 relative">
      {feedback && (
        <div className="fixed top-20 right-8 z-[60] bg-slate-900 border border-slate-700 text-white px-6 py-3 rounded-2xl shadow-2xl animate-in fade-in slide-in-from-right-4 font-bold">
          {feedback}
        </div>
      )}

      {/* Hero Header */}
      <div className="relative">
        <div className="h-48 bg-gradient-to-r from-slate-800 to-slate-900 rounded-3xl border border-slate-800"></div>
        <div className="absolute -bottom-16 left-8 flex items-end gap-6">
          <div className="relative group">
            <img 
              src={user.profilePic} 
              alt={user.name} 
              className="w-32 h-32 rounded-[2rem] object-cover border-4 border-slate-950 shadow-2xl" 
            />
            {isOwnProfile && (
              <button 
                onClick={() => profileInputRef.current?.click()}
                className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-[2rem] text-white"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              </button>
            )}
            <input type="file" hidden ref={profileInputRef} accept="image/*" onChange={handleProfilePicChange} />
          </div>
          <div className="mb-2">
            <h2 className="text-3xl font-black text-white">{user.name}</h2>
            <p className="text-slate-400 font-medium">@{user.username}</p>
          </div>
        </div>
        <div className="absolute top-4 right-4 flex gap-2">
          {isOwnProfile ? (
            <button 
              onClick={() => notify("Banner editing feature is in development!")}
              className="bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-xl text-sm font-bold border border-white/20 hover:bg-white/20 transition-all"
            >
              Edit Banner
            </button>
          ) : (
            <button 
              onClick={() => setIsFollowing(!isFollowing)}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${isFollowing ? 'bg-slate-800 text-white border border-slate-700' : 'bg-red-500 text-white shadow-lg shadow-red-500/20'}`}
            >
              {isFollowing ? 'Following' : 'Follow'}
            </button>
          )}
        </div>
      </div>

      <div className="mt-20 px-4 space-y-6">
        <p className="text-lg text-slate-300 max-w-xl">{user.bio}</p>
        
        <div className="flex gap-8 text-sm font-bold text-slate-500">
          <p><span className="text-white">1.2k</span> Followers</p>
          <p><span className="text-white">450</span> Following</p>
          <p><span className="text-white">X-Fire</span> {user.joinDate}</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-8 border-b border-slate-800">
          <button 
            onClick={() => setActiveTab('media')}
            className={`pb-4 px-2 relative transition-colors ${activeTab === 'media' ? 'text-red-500' : 'text-slate-500 hover:text-slate-300'}`}
          >
            Media
            {activeTab === 'media' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-500 rounded-full"></div>}
          </button>
          <button 
            onClick={() => setActiveTab('info')}
            className={`pb-4 px-2 relative transition-colors ${activeTab === 'info' ? 'text-red-500' : 'text-slate-500 hover:text-slate-300'}`}
          >
            User Info
            {activeTab === 'info' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-500 rounded-full"></div>}
          </button>
          {isOwnProfile && (
            <button 
              onClick={() => setActiveTab('cookies')}
              className={`pb-4 px-2 relative transition-colors ${activeTab === 'cookies' ? 'text-red-500' : 'text-slate-500 hover:text-slate-300'}`}
            >
              Cookies & Privacy
              {activeTab === 'cookies' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-500 rounded-full"></div>}
            </button>
          )}
        </div>

        {activeTab === 'media' && (
          <div className="space-y-6">
            {isOwnProfile && (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-40 border-2 border-dashed border-slate-800 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-red-500/50 hover:bg-red-500/5 transition-all group"
              >
                <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mb-3 group-hover:bg-red-500 transition-colors">
                  <svg className="w-6 h-6 text-slate-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                </div>
                <p className="text-slate-500 font-semibold group-hover:text-slate-300">Add Photos or Videos</p>
                <input type="file" hidden ref={fileInputRef} accept="image/*,video/*" onChange={handleMediaUpload} />
              </div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {user.media.map((item) => (
                <div key={item.id} className="relative group aspect-square rounded-2xl overflow-hidden border border-slate-800">
                  {item.type === 'image' ? (
                    <img src={item.url} alt="User media" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  ) : (
                    <video src={item.url} className="w-full h-full object-cover" />
                  )}
                  {isOwnProfile && (
                    <button 
                      onClick={() => removeMedia(item.id)}
                      className="absolute top-2 right-2 p-2 bg-black/60 backdrop-blur-md rounded-lg text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                  )}
                  {item.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                         <svg className="w-5 h-5 text-white fill-current" viewBox="0 0 20 20"><path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" /></svg>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {user.media.length === 0 && !isOwnProfile && (
                <div className="col-span-full py-20 text-center text-slate-500 italic">
                  No media shared yet.
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'info' && (
          <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-xl font-bold mb-4">Personal Details</h3>
            <div className="grid grid-cols-2 gap-6 text-sm">
              <div>
                <p className="text-slate-500 mb-1">Full Name</p>
                <p className="font-semibold">{user.name}</p>
              </div>
              <div>
                <p className="text-slate-500 mb-1">Email Address</p>
                <p className="font-semibold">{user.email}</p>
              </div>
              <div>
                <p className="text-slate-500 mb-1">Username</p>
                <p className="font-semibold">@{user.username}</p>
              </div>
              <div>
                <p className="text-slate-500 mb-1">Member Since</p>
                <p className="font-semibold">{user.joinDate}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'cookies' && isOwnProfile && (
          <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 space-y-6">
            <h3 className="text-xl font-bold">Privacy & Cookies</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold">Essential Cookies</p>
                <p className="text-sm text-slate-500">Required for the core functionality of X-Fire.</p>
              </div>
              <div className="w-12 h-6 bg-red-500 rounded-full relative">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold">Analytical Cookies</p>
                <p className="text-sm text-slate-500">Helps us understand how you use the platform.</p>
              </div>
              <button 
                onClick={() => onUpdateUser && onUpdateUser({ ...user, cookiesAccepted: !user.cookiesAccepted })}
                className={`w-12 h-6 rounded-full relative transition-colors ${user.cookiesAccepted ? 'bg-red-500' : 'bg-slate-700'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${user.cookiesAccepted ? 'right-1' : 'left-1'}`}></div>
              </button>
            </div>
            <button 
              onClick={clearData}
              className="text-red-400 text-sm font-bold hover:underline"
            >
              Clear all browsing data
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileView;
