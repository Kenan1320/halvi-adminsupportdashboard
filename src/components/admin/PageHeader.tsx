
import React from 'react';
import { Button } from "@/components/ui/button";
import { Search, BellDot, Download } from 'lucide-react';
import { Card } from "@/components/ui/card";

interface PageHeaderProps {
  title: string;
  description?: string;
  showSearch?: boolean;
  showExport?: boolean;
  showNotifications?: boolean;
  actions?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  showSearch = true,
  showExport = false,
  showNotifications = true,
  actions
}) => {
  return (
    <div className="mb-6">
      <Card className="p-4 md:p-6 bg-card/80 backdrop-blur-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gradient">{title}</h1>
            {description && <p className="text-muted-foreground mt-1">{description}</p>}
          </div>
          
          <div className="flex items-center space-x-3">
            {showSearch && (
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="h-9 w-56 md:w-64 rounded-full bg-muted px-10 text-sm focus:outline-none focus:ring-1 focus:ring-halvi-accent"
                />
              </div>
            )}
            
            {showExport && (
              <Button variant="outline" size="sm" className="hidden md:flex">
                <Download size={16} className="mr-2" />
                Export
              </Button>
            )}
            
            {showNotifications && (
              <Button variant="ghost" size="icon" className="relative">
                <BellDot size={18} />
                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-halvi-amber animate-pulse"></span>
              </Button>
            )}
            
            {actions}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PageHeader;
