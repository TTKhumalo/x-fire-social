
import React, { useState, useEffect } from 'react';
import { User, ViewType, Post, MediaItem } from './types';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Feed from './components/Feed';
import ProfileView from './components/ProfileView';
import Search from './components/Search';
import Sidebar from './components/Sidebar';

const MOCK_CURRENT_USER: User = {
  id: 'user_1',
  name: 'Alex Rivera',
  username: 'arivera',
  email: 'alex@xfire.com',
  bio: 'Digital explorer | Visionary Developer | X-Fire pioneer 🔥',
  profilePic: 'https://picsum.photos/seed/alex/200',
  media: [
    { id: 'm1', type: 'image', url: 'https://picsum.photos/seed/media1/800/600', timestamp: new Date().toISOString() },
    { id: 'm2', type: 'image', url: 'https://picsum.photos/seed/media2/800/600', timestamp: new Date().toISOString() }
  ],
  cookiesAccepted: true,
  joinDate: 'Jan 2024'
};

const MOCK_USERS: User[] = [
  MOCK_CURRENT_USER,
  {
    id: 'user_2',
    name: 'Sarah Chen',
    username: 'schen_dev',
    email: 'sarah@xfire.com',
    bio: 'Coding the future, one flame at a time.',
    profilePic: 'https://picsum.photos/seed/sarah/200',
    media: [
      { id: 'm3', type: 'image', url: 'https://picsum.photos/seed/media3/800/600', timestamp: new Date().toISOString() }
    ],
    cookiesAccepted: true,
    joinDate: 'Feb 2024'
  },
  {
    id: 'user_3',
    name: 'Jordan Smith',
    username: 'jsmithy',
    email: 'jordan@xfire.com',
    bio: 'Photography & Adventure Enthusiast.',
    profilePic: 'https://picsum.photos/seed/jordan/200',
    media: [],
    cookiesAccepted: false,
    joinDate: 'Mar 2024'
  }
];

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeView, setActiveView] = useState<ViewType>('feed');
  const [targetUser, setTargetUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Persist "auth" session
  useEffect(() => {
    const savedUser = localStorage.getItem('xfire_user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  const handleAuthSuccess = (authData: any) => {
    const baseUser = { ...MOCK_CURRENT_USER };
    if (authData.name) baseUser.name = authData.name;
    if (authData.username) baseUser.username = authData.username;
    if (authData.email) baseUser.email = authData.email;
    setCurrentUser(baseUser);
    localStorage.setItem('xfire_user', JSON.stringify(baseUser));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('xfire_user');
    setActiveView('feed');
  };

  const navigateToProfile = (user?: User) => {
    if (user && user.id !== currentUser?.id) {
      setTargetUser(user);
      setActiveView('external-profile');
    } else {
      setTargetUser(null);
      setActiveView('profile');
    }
  };

  if (!currentUser) {
    return <Login onLogin={handleAuthSuccess} />;
  }

  const renderPlaceholder = (title: string, subtitle: string) => (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-8 bg-slate-900/30 border border-slate-800 rounded-3xl backdrop-blur-sm">
      <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mb-6 text-slate-500">
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
      </div>
      <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
      <p className="text-slate-500 max-w-xs">{subtitle}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-red-500 selection:text-white">
      <Navbar 
        user={currentUser} 
        activeView={activeView}
        onNavigate={setActiveView} 
        onSearch={(q) => { setSearchQuery(q); setActiveView('search'); }}
        onLogout={handleLogout}
        onProfileClick={() => navigateToProfile()}
      />
      
      <main className="container mx-auto px-4 pt-20 pb-10 flex gap-6">
        <aside className="hidden lg:block w-64 shrink-0">
          <Sidebar 
            activeView={activeView} 
            onNavigate={setActiveView} 
            onProfileClick={() => navigateToProfile()}
          />
        </aside>

        <section className="flex-grow max-w-2xl mx-auto lg:mx-0">
          {activeView === 'feed' && (
            <Feed onUserClick={navigateToProfile} currentUser={currentUser} />
          )}
          
          {activeView === 'profile' && (
            <ProfileView 
              user={currentUser} 
              isOwnProfile={true} 
              onUpdateUser={(updated) => {
                setCurrentUser(updated);
                localStorage.setItem('xfire_user', JSON.stringify(updated));
              }}
            />
          )}

          {activeView === 'external-profile' && targetUser && (
            <ProfileView 
              user={targetUser} 
              isOwnProfile={false} 
            />
          )}

          {activeView === 'search' && (
            <Search 
              query={searchQuery} 
              users={MOCK_USERS} 
              onUserClick={navigateToProfile}
            />
          )}

          {activeView === 'messages' && renderPlaceholder('Direct Messages', 'Connect instantly with your flames. Real-time chat coming soon!')}
          {activeView === 'notifications' && renderPlaceholder('Activity Feed', 'Stay updated with likes, mentions, and fires in your network.')}
          {activeView === 'settings' && renderPlaceholder('Preferences', 'Customize your X-Fire experience and security settings.')}
          {activeView === 'ai-chat' && renderPlaceholder('X-Fire AI', 'Your personal Grok-style assistant is analyzing the flames of the internet.')}
        </section>

        <aside className="hidden xl:block w-80 shrink-0">
          <div className="sticky top-24 space-y-6">
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-xl">
              <h3 className="text-lg font-bold mb-4 text-red-500 flex items-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" /></svg>
                Trending Now
              </h3>
              <ul className="space-y-4">
                {['#XFireLaunch', '#Web3Social', '#DesignTrends', '#GeminiAI'].map((tag) => (
                  <li key={tag} className="group cursor-pointer" onClick={() => { setSearchQuery(tag); setActiveView('search'); }}>
                    <p className="text-sm font-semibold group-hover:text-red-400 transition-colors">{tag}</p>
                    <p className="text-xs text-slate-500">2.4k fires</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default App;
