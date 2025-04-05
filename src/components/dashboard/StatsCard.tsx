
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  percentChange?: number;
  trend?: 'up' | 'down';
  color?: string;
  prefix?: string;
  suffix?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  percentChange,
  trend = 'up',
  color = 'bg-halvi-accent',
  prefix = '',
  suffix = '',
}) => {
  const [displayedValue, setDisplayedValue] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const frameDuration = 1000 / 60;
    const totalFrames = Math.round(duration / frameDuration);
    const easeOutQuad = (t: number) => t * (2 - t);
    
    let frame = 0;
    const counter = setInterval(() => {
      frame++;
      const progress = easeOutQuad(frame / totalFrames);
      setDisplayedValue(Math.floor(progress * value));
      
      if (frame === totalFrames) {
        clearInterval(counter);
        setDisplayedValue(value);
      }
    }, frameDuration);

    return () => clearInterval(counter);
  }, [value]);

  return (
    <div className="glass-card p-5 animate-fade-in glow-shadow">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <h3 className="text-2xl font-bold animate-count">
            {prefix}{displayedValue.toLocaleString()}{suffix}
          </h3>
          
          {percentChange && (
            <div className="flex items-center mt-2 text-xs">
              <span 
                className={cn(
                  "inline-flex items-center px-1.5 py-0.5 rounded-full text-xs mr-1",
                  trend === 'up' ? 'bg-halvi-success/10 text-halvi-success' : 'bg-halvi-danger/10 text-halvi-danger'
                )}
              >
                {trend === 'up' ? '↑' : '↓'} {percentChange}%
              </span>
              <span className="text-muted-foreground">vs last period</span>
            </div>
          )}
        </div>
        
        <div className={cn(
          "rounded-full p-2.5 flex items-center justify-center",
          color
        )}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
