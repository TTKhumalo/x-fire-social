
import React, { useState, useEffect } from 'react';
import { User } from '../types';
import { generateSmartSearchSuggestion } from '../services/geminiService';

interface SearchProps {
  query: string;
  users: User[];
  onUserClick: (user: User) => void;
}

const Search: React.FC<SearchProps> = ({ query, users, onUserClick }) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(query.toLowerCase()) || 
    u.username.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.trim()) {
        const aiSuggestions = await generateSmartSearchSuggestion(query);
        setSuggestions(aiSuggestions);
      }
    };
    fetchSuggestions();
  }, [query]);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-black mb-6">Search Results for "{query}"</h2>
        
        {suggestions.length > 0 && (
          <div className="mb-8">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">AI Suggestions</p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((s, i) => (
                <span key={i} className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-full text-sm font-medium text-red-400 hover:bg-slate-800 cursor-pointer transition-colors">
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-4">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">People</p>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div 
                key={user.id}
                onClick={() => onUserClick(user)}
                className="flex items-center justify-between p-4 bg-slate-900/50 border border-slate-800 rounded-2xl hover:bg-slate-900 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <img src={user.profilePic} alt={user.name} className="w-14 h-14 rounded-2xl object-cover" />
                  <div>
                    <h4 className="font-bold text-lg group-hover:text-red-500 transition-colors">{user.name}</h4>
                    <p className="text-slate-500">@{user.username}</p>
                  </div>
                </div>
                <button className="bg-white text-slate-950 px-6 py-2 rounded-xl font-bold hover:scale-105 active:scale-95 transition-all">
                  View
                </button>
              </div>
            ))
          ) : (
            <p className="text-slate-500 italic py-4">No users found.</p>
          )}
        </div>
      </div>

      <div className="pt-8 border-t border-slate-800">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Top Posts</p>
        <div className="grid grid-cols-2 gap-4">
          {users.flatMap(u => u.media).slice(0, 4).map((m, i) => (
            <div key={i} className="aspect-video rounded-2xl overflow-hidden border border-slate-800 group relative cursor-pointer">
              <img src={m.url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex items-end">
                <p className="text-xs font-bold">Post from @{users[0].username}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
