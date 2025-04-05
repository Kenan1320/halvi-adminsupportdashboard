
import React from 'react';
import { 
  LayoutDashboard, 
  Store, 
  ShoppingBag, 
  ShoppingCart, 
  PieChart, 
  Users, 
  Tag, 
  Settings, 
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  collapsed: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, toggleSidebar }) => {
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', isActive: true },
    { icon: Store, label: 'Shops', isActive: false },
    { icon: ShoppingBag, label: 'Products', isActive: false },
    { icon: ShoppingCart, label: 'Orders', isActive: false },
    { icon: PieChart, label: 'Revenue', isActive: false },
    { icon: Users, label: 'Users', isActive: false },
    { icon: Tag, label: 'Promotions', isActive: false },
    { icon: Settings, label: 'Settings', isActive: false },
  ];

  return (
    <aside 
      className={cn(
        "glass-card h-screen overflow-y-auto fixed left-0 top-0 z-10 transition-all duration-300 flex flex-col py-6",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="px-4 mb-8 flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-halvi flex items-center justify-center">
              <span className="font-bold text-white">H</span>
            </div>
            <h1 className="text-xl font-bold text-gradient">Halvi</h1>
          </div>
        )}
        {collapsed && (
          <div className="mx-auto h-10 w-10 rounded-full bg-gradient-halvi flex items-center justify-center">
            <span className="font-bold text-white">H</span>
          </div>
        )}
        <button 
          onClick={toggleSidebar}
          className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-accent/50 transition-colors"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      <div className="px-3 space-y-1 flex-1">
        {navItems.map((item, index) => (
          <a 
            key={index} 
            href="#" 
            className={cn(
              "sidebar-link group", 
              item.isActive && "active"
            )}
          >
            <item.icon size={20} className={cn(
              "transition-all duration-300", 
              item.isActive ? "text-halvi-amber" : "text-muted-foreground group-hover:text-halvi-amber"
            )} />
            {!collapsed && (
              <span className={cn(
                "transition-all duration-300", 
                item.isActive ? "text-halvi-amber" : "text-muted-foreground group-hover:text-halvi-amber"
              )}>
                {item.label}
              </span>
            )}
            {item.isActive && !collapsed && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-halvi-amber" />
            )}
          </a>
        ))}
      </div>

      <div className="mt-auto px-3">
        <div className={cn(
          "rounded-xl bg-gradient-glass p-4 text-center",
          collapsed && "p-2"
        )}>
          {!collapsed ? (
            <>
              <p className="text-xs text-muted-foreground mb-2">Admin Portal</p>
              <p className="text-sm font-medium">Halvi Command Center</p>
            </>
          ) : (
            <p className="text-xs text-muted-foreground">HC</p>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
