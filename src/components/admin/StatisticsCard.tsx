
import React from 'react';
import { Card } from "@/components/ui/card";
import { cn } from '@/lib/utils';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';

interface StatisticsCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    isPositive: boolean;
  };
  description?: string;
  icon?: React.ReactNode;
  className?: string;
}

const StatisticsCard: React.FC<StatisticsCardProps> = ({
  title,
  value,
  change,
  description,
  icon,
  className
}) => {
  return (
    <Card className={cn("p-4 md:p-5 flex items-start gap-4", className)}>
      {icon && (
        <div className="shrink-0 h-10 w-10 rounded-full bg-muted flex items-center justify-center">
          {icon}
        </div>
      )}
      <div className="flex-1">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-2xl font-bold">{value}</span>
          {change && (
            <div className={`flex items-center text-xs font-medium ${
              change.isPositive ? 'text-green-500' : 'text-red-500'
            }`}>
              {change.isPositive ? (
                <ArrowUpRight size={14} className="mr-1" />
              ) : (
                <ArrowDownRight size={14} className="mr-1" />
              )}
              {Math.abs(change.value)}%
            </div>
          )}
        </div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </div>
    </Card>
  );
};

export default StatisticsCard;
