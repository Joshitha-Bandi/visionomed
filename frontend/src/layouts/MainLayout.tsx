import { Outlet, Link } from 'react-router-dom';
import { HeartPulse, User, Bell, Home, Camera, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const MainLayout = () => {
  const { user, signOut, isConfigured } = useAuth();

  return (
    <div className="min-h-screen bg-secondary font-sans text-slate-900">
      {/* Navbar */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HeartPulse className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-primary tracking-tight">VisionoMed</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-slate-600 hover:text-primary font-medium flex items-center gap-1">
              <Home className="h-4 w-4" /> Dashboard
            </Link>
            <Link to="/scan" className="text-slate-600 hover:text-primary font-medium flex items-center gap-1">
              <Camera className="h-4 w-4" /> Scan
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <button className="text-slate-500 hover:text-primary relative">
              <Bell className="h-6 w-6" />
              <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-danger ring-2 ring-white"></span>
            </button>
            
            {user ? (
              <div className="group relative">
                <button className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                    {user.email?.[0].toUpperCase()}
                  </div>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="p-3 border-b border-slate-100">
                    <p className="text-sm font-medium text-slate-900 truncate">{user.email}</p>
                  </div>
                  <button onClick={signOut} className="w-full text-left px-4 py-3 text-sm text-danger hover:bg-danger/5 flex items-center gap-2 transition-colors">
                    <LogOut className="h-4 w-4" /> Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="flex items-center gap-2 text-primary font-medium hover:underline">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-5 w-5" />
                </div>
                <span className="hidden sm:inline">Sign In</span>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around py-3 pb-safe z-50">
        <Link to="/" className="flex flex-col items-center text-slate-500 hover:text-primary">
          <Home className="h-6 w-6" />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link to="/scan" className="flex flex-col items-center text-primary relative -top-6">
          <div className="bg-primary text-white p-4 rounded-full shadow-lg hover:bg-blue-800 transition-colors">
            <Camera className="h-6 w-6" />
          </div>
        </Link>
        <Link to="/profile" className="flex flex-col items-center text-slate-500 hover:text-primary">
          <User className="h-6 w-6" />
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </div>
    </div>
  );
};
