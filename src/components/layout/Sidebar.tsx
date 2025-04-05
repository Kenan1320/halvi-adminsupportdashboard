
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
  ChevronRight,
  MessageSquare,
  TicketCheck,
  RefreshCcw,
  AlertCircle,
  UserPlus
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLocation, Link } from 'react-router-dom';
import { useDevice } from '@/hooks/use-device';

interface SidebarProps {
  collapsed: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, toggleSidebar }) => {
  const location = useLocation();
  const { view } = useDevice();
  const isSupportRoute = location.pathname.includes('support');

  // Admin navigation items
  const adminNavItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard', isActive: location.pathname === '/dashboard' },
    { icon: Store, label: 'Shops', path: '/shops', isActive: location.pathname === '/shops' },
    { icon: ShoppingBag, label: 'Products', path: '/products', isActive: location.pathname === '/products' },
    { icon: ShoppingCart, label: 'Orders', path: '/orders', isActive: location.pathname === '/orders' },
    { icon: PieChart, label: 'Revenue', path: '/revenue', isActive: location.pathname === '/revenue' },
    { icon: Users, label: 'Users', path: '/users', isActive: location.pathname === '/users' },
    { icon: Tag, label: 'Promotions', path: '/promotions', isActive: location.pathname === '/promotions' },
    { icon: Settings, label: 'Settings', path: '/settings', isActive: location.pathname === '/settings' },
  ];

  // Support navigation items
  const supportNavItems = [
    { icon: LayoutDashboard, label: 'Support Home', path: '/support', isActive: location.pathname === '/support' },
    { icon: MessageSquare, label: 'Live Chat', path: '/support/chat', isActive: location.pathname === '/support/chat' },
    { icon: TicketCheck, label: 'Tickets', path: '/support/tickets', isActive: location.pathname === '/support/tickets' },
    { icon: RefreshCcw, label: 'Refunds', path: '/support/refunds', isActive: location.pathname === '/support/refunds' },
    { icon: Users, label: 'User Profiles', path: '/support/users', isActive: location.pathname === '/support/users' },
    { icon: ShoppingCart, label: 'Order Lookup', path: '/support/orders', isActive: location.pathname === '/support/orders' },
    { icon: AlertCircle, label: 'Escalations', path: '/support/escalations', isActive: location.pathname === '/support/escalations' },
    { icon: UserPlus, label: 'Agent Tools', path: '/support/tools', isActive: location.pathname === '/support/tools' },
  ];

  // Choose which nav items to display based on the route
  const navItems = isSupportRoute ? supportNavItems : adminNavItems;

  return (
    <aside 
      className={cn(
        "glass-card h-screen overflow-y-auto fixed left-0 top-0 z-10 transition-all duration-300 flex flex-col py-6",
        collapsed ? "w-20" : "w-64",
        view === 'mobile' && collapsed && "-left-20",
        view === 'mobile' && !collapsed && "left-0 w-3/4 md:w-64"
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
          <Link 
            key={index} 
            to={item.path}
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
          </Link>
        ))}
      </div>

      <div className="mt-auto px-3">
        <div className={cn(
          "rounded-xl bg-gradient-glass p-4 text-center",
          collapsed && "p-2"
        )}>
          {!collapsed ? (
            <>
              <p className="text-xs text-muted-foreground mb-2">
                {isSupportRoute ? "Support Portal" : "Admin Portal"}
              </p>
              <p className="text-sm font-medium">
                {isSupportRoute ? "Halvi Support Center" : "Halvi Command Center"}
              </p>
            </>
          ) : (
            <p className="text-xs text-muted-foreground">
              {isSupportRoute ? "HS" : "HC"}
            </p>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
