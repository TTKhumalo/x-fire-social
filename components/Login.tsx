
import React, { useState } from 'react';

interface LoginProps {
  onLogin: (userData: any) => void;
}

type AuthMode = 'login' | 'register' | 'forgot';

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'login') {
      if (!formData.username || !formData.password) {
        setMessage({ type: 'error', text: 'Please fill in all fields' });
        return;
      }
      // Simulate login
      onLogin({ platform: 'credentials', ...formData });
    } else if (mode === 'register') {
      if (!formData.name || !formData.username || !formData.email || !formData.password) {
        setMessage({ type: 'error', text: 'All fields are required' });
        return;
      }
      // Simulate registration
      onLogin({ platform: 'credentials', ...formData });
    } else {
      // Forgot password mode
      if (!formData.email) {
        setMessage({ type: 'error', text: 'Enter your email to recover' });
        return;
      }
      setMessage({ type: 'success', text: 'Recovery instructions sent to your email!' });
      setTimeout(() => setMode('login'), 3000);
    }
  };

  const renderSocialLogins = () => (
    <div className="space-y-3 mt-6">
      <div className="relative flex items-center py-2">
        <div className="flex-grow border-t border-slate-800"></div>
        <span className="flex-shrink mx-4 text-slate-500 text-xs font-bold uppercase tracking-widest">Or continue with</span>
        <div className="flex-grow border-t border-slate-800"></div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <button 
          onClick={() => onLogin({ platform: 'google' })}
          className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-4 rounded-xl transition-all active:scale-95 text-sm"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-4 h-4" alt="Google" />
          Google
        </button>
        <button 
          onClick={() => onLogin({ platform: 'icloud' })}
          className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-4 rounded-xl transition-all active:scale-95 text-sm"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 384 512"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
          iCloud
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 relative overflow-hidden p-4">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-red-600/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-orange-600/10 blur-[120px] rounded-full"></div>

      <div className="z-10 bg-slate-900/40 backdrop-blur-3xl border border-slate-800 p-8 md:p-10 rounded-[2.5rem] shadow-2xl w-full max-w-md transform transition-all">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-tr from-red-600 to-orange-500 rounded-2xl mx-auto flex items-center justify-center shadow-xl shadow-red-500/20 mb-6 group cursor-default">
            <svg className="w-10 h-10 text-white group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
            {mode === 'login' ? 'Welcome Back' : mode === 'register' ? 'Join X-Fire' : 'Recover Access'}
          </h1>
          <p className="text-slate-400 text-sm">
            {mode === 'login' ? 'Continue your journey' : mode === 'register' ? 'Create your flame today' : 'Get back to your account'}
          </p>
        </div>

        {message && (
          <div className={`mb-6 p-4 rounded-xl text-sm font-medium ${message.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div className="space-y-1">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all placeholder:text-slate-500"
              />
            </div>
          )}

          {(mode === 'login' || mode === 'register') && (
            <div className="space-y-1">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="username or email"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all placeholder:text-slate-500"
              />
            </div>
          )}

          {mode === 'register' && (
            <div className="space-y-1">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all placeholder:text-slate-500"
              />
            </div>
          )}

          {mode === 'forgot' && (
            <div className="space-y-1">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all placeholder:text-slate-500"
              />
            </div>
          )}

          {(mode === 'login' || mode === 'register') && (
            <div className="space-y-1">
              {mode === 'login' && (
                <div className="flex items-center justify-end mb-1">
                  <button 
                    type="button"
                    onClick={() => setMode('forgot')}
                    className="text-xs font-bold text-red-500 hover:text-red-400 mr-1"
                  >
                    Forgot?
                  </button>
                </div>
              )}
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="password"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all placeholder:text-slate-500"
              />
            </div>
          )}

          <button 
            type="submit"
            className="w-full bg-gradient-to-tr from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400 text-white font-bold py-4 rounded-xl transition-all active:scale-95 shadow-lg shadow-red-500/20 mt-4"
          >
            {mode === 'login' ? 'Login' : mode === 'register' ? 'Sign Up' : 'Reset Password'}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-slate-400 text-sm font-medium">
            {mode === 'login' ? "Don't have an account?" : mode === 'register' ? "Already a member?" : "Remembered it?"}
            <button 
              onClick={() => {
                setMode(mode === 'login' ? 'register' : 'login');
                setMessage(null);
              }}
              className="ml-2 text-red-500 font-bold hover:underline"
            >
              {mode === 'login' ? 'Register Now' : 'Log In'}
            </button>
          </p>
        </div>

        {mode !== 'forgot' && renderSocialLogins()}
      </div>
    </div>
  );
};

export default Login;
