
import React from 'react';
import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FeedItem } from '@/types/dashboard';

interface PulseFeedProps {
  items: FeedItem[];
}

const getStatusStyles = (status?: string) => {
  switch (status) {
    case 'approved':
      return 'bg-halvi-success/10 text-halvi-success';
    case 'rejected':
      return 'bg-halvi-danger/10 text-halvi-danger';
    case 'flagged':
      return 'bg-halvi-warning/10 text-halvi-warning';
    case 'urgent':
      return 'bg-destructive/10 text-destructive';
    case 'open':
      return 'bg-halvi-royal/10 text-halvi-royal';
    case 'waiting':
      return 'bg-halvi-amber/10 text-halvi-amber';
    case 'completed':
      return 'bg-green-500/10 text-green-500';
    case 'pending':
    default:
      return 'bg-halvi-accent/10 text-halvi-accent';
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'shop':
      return '🏪';
    case 'order':
      return '📦';
    case 'product':
      return '🛍️';
    case 'user':
      return '👤';
    default:
      return '📋';
  }
};

const PulseFeed: React.FC<PulseFeedProps> = ({ items }) => {
  return (
    <div className="glass-card p-5 glow-shadow h-full animate-fade-in">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-md font-medium">Activity Feed</h3>
        <button className="text-xs text-halvi-accent hover:text-halvi-amber transition-colors">
          View All
        </button>
      </div>

      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 scrollbar-none">
        {items.map((item, index) => (
          <div 
            key={item.id} 
            className="flex gap-3 animate-slide-in" 
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-lg">
              {getTypeIcon(item.type)}
            </div>
            
            <div className="flex-1">
              <p className="text-sm">{item.message}</p>
              <div className="flex items-center mt-1 text-xs text-muted-foreground">
                <Clock size={12} className="mr-1" />
                <span>{item.time}</span>
              </div>
            </div>
            
            {item.status && (
              <span className={cn(
                "self-start px-2 py-1 rounded-full text-xs font-medium",
                getStatusStyles(item.status)
              )}>
                {item.status}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PulseFeed;
