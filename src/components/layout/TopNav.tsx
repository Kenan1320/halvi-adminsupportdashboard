
import React from 'react';
import { Search, Bell, User, Moon } from 'lucide-react';

interface TopNavProps {
  toggleSidebar: () => void;
}

const TopNav: React.FC<TopNavProps> = ({ toggleSidebar }) => {
  return (
    <header className="sticky top-0 z-10 bg-background/50 backdrop-blur-lg border-b border-border h-16 px-6 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <h1 className="text-lg font-semibold">Dashboard</h1>
      </div>

      <div className="flex items-center space-x-5">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            className="h-9 w-64 rounded-full bg-muted px-10 text-sm focus:outline-none focus:ring-1 focus:ring-halvi-accent"
          />
        </div>

        <button className="h-9 w-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-white hover:bg-halvi-accent/20 transition-colors relative">
          <Bell size={18} />
          <span className="absolute top-1 right-1.5 h-2 w-2 rounded-full bg-halvi-amber animate-pulse"></span>
        </button>

        <button className="h-9 w-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-white hover:bg-halvi-accent/20 transition-colors">
          <Moon size={18} />
        </button>

        <div className="flex items-center space-x-3">
          <div className="h-9 w-9 rounded-full bg-gradient-halvi flex items-center justify-center overflow-hidden">
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
