
import React from 'react';
import { Search, Bell, User, Moon, Sun, Smartphone, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface TopNavProps {
  toggleSidebar: () => void;
  title?: string;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  view: 'mobile' | 'desktop';
  toggleView: () => void;
}

const TopNav: React.FC<TopNavProps> = ({ 
  toggleSidebar, 
  title = "Dashboard",
  theme,
  toggleTheme,
  view,
  toggleView
}) => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-10 bg-background/50 backdrop-blur-lg border-b border-border h-16 px-4 md:px-6 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <h1 className="text-lg font-semibold">{title}</h1>
      </div>

      <div className="flex items-center space-x-3 md:space-x-5">
        {view === 'desktop' && (
          <div className="relative hidden md:flex">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              className="h-9 w-56 md:w-64 rounded-full bg-muted px-10 text-sm focus:outline-none focus:ring-1 focus:ring-halvi-accent"
            />
          </div>
        )}

        <Button 
          onClick={toggleView}
          className="h-9 w-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-white hover:bg-halvi-accent/20 transition-colors"
          variant="ghost"
          size="icon"
          title={view === 'desktop' ? 'Switch to mobile view' : 'Switch to desktop view'}
        >
          {view === 'desktop' ? <Smartphone size={18} /> : <Monitor size={18} />}
        </Button>

        <Button 
          onClick={toggleTheme}
          className="h-9 w-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-white hover:bg-halvi-accent/20 transition-colors"
          variant="ghost"
          size="icon"
          title={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </Button>

        <button className="h-9 w-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-white hover:bg-halvi-accent/20 transition-colors relative">
          <Bell size={18} />
          <span className="absolute top-1 right-1.5 h-2 w-2 rounded-full bg-halvi-amber animate-pulse"></span>
        </button>

        <div className="flex items-center space-x-3">
          <div 
            className="h-9 w-9 rounded-full bg-gradient-halvi flex items-center justify-center overflow-hidden cursor-pointer"
            onClick={() => navigate('/')}
          >
            <User size={18} className="text-white" />
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium leading-none">Admin User</p>
            <p className="text-xs text-muted-foreground mt-1">Super Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNav;
