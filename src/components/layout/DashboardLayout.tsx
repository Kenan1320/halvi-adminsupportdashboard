
import React from 'react';
import Sidebar from './Sidebar';
import TopNav from './TopNav';
import { useTheme } from '@/hooks/use-theme';
import { useDevice } from '@/hooks/use-device';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, title }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const { theme, toggleTheme } = useTheme();
  const { view, toggleView, isMobileDevice } = useDevice();

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Auto-collapse sidebar on mobile view
  React.useEffect(() => {
    if (view === 'mobile' || isMobileDevice) {
      setSidebarCollapsed(true);
    }
  }, [view, isMobileDevice]);

  return (
    <div className={`flex min-h-screen bg-background islamic-pattern ${view === 'mobile' ? 'max-w-md mx-auto shadow-xl' : 'w-full'}`}>
      <Sidebar collapsed={sidebarCollapsed} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav 
          toggleSidebar={toggleSidebar} 
          title={title}
          theme={theme}
          toggleTheme={toggleTheme}
          view={view}
          toggleView={toggleView}
        />
        <main className={`flex-1 overflow-y-auto px-4 py-6 md:px-6 ${view === 'mobile' ? 'max-w-md' : ''}`}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
