
import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight, 
  ChevronUp, 
  Filter, 
  MoreHorizontal, 
  RefreshCw, 
  Search
} from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Column {
  key: string;
  title: string;
  sortable?: boolean;
}

interface SmartTableProps {
  title?: string;
  subtitle?: string;
  data: any[];
  columns: Column[];
  isLoading?: boolean;
  filters?: string[];
  actions?: React.ReactNode;
  rowActions?: string[];
  onRowAction?: (action: string, rowData: any) => void;
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
    onChange: (page: number) => void;
  };
}

const SmartTable: React.FC<SmartTableProps> = ({
  title,
  subtitle,
  data,
  columns,
  isLoading = false,
  filters = [],
  actions,
  rowActions = [],
  onRowAction,
  pagination
}) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  return (
    <Card className="bg-card/80 backdrop-blur-sm shadow-sm overflow-hidden">
      {(title || subtitle || filters.length > 0 || actions) && (
        <div className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 border-b">
          <div>
            {title && <h3 className="font-semibold text-lg">{title}</h3>}
            {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
          </div>
          
          <div className="flex items-center space-x-2">
            {filters.length > 0 && (
              <Tabs value={activeFilter} onValueChange={setActiveFilter} className="mr-2">
                <TabsList className="bg-muted/80">
                  <TabsTrigger value="all">All</TabsTrigger>
                  {filters.map((filter) => (
                    <TabsTrigger key={filter} value={filter}>{filter}</TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            )}
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" aria-label="Refresh data">
                <RefreshCw size={15} />
              </Button>
              <Button variant="outline" size="sm" aria-label="Filter data">
                <Filter size={15} />
              </Button>
              {actions}
            </div>
          </div>
        </div>
      )}
      
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead className="bg-muted/50 text-muted-foreground text-xs">
            <tr>
              {columns.map((column) => (
                <th 
                  key={column.key} 
                  className={`px-4 py-3 text-left font-medium ${column.sortable ? 'cursor-pointer group' : ''}`}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.title}</span>
                    {column.sortable && (
                      <div className="text-muted-foreground/50 flex flex-col">
                        <ChevronUp 
                          size={12} 
                          className={`${sortKey === column.key && sortDirection === 'asc' ? 'text-primary' : 'group-hover:text-muted-foreground'} -mb-1`} 
                        />
                        <ChevronDown 
                          size={12} 
                          className={`${sortKey === column.key && sortDirection === 'desc' ? 'text-primary' : 'group-hover:text-muted-foreground'}`} 
                        />
                      </div>
                    )}
                  </div>
                </th>
              ))}
              {rowActions.length > 0 && <th className="px-4 py-3 text-right">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {isLoading ? (
              Array(5).fill(0).map((_, index) => (
                <tr key={`skeleton-${index}`} className="animate-pulse">
                  {columns.map((column) => (
                    <td key={`skeleton-${index}-${column.key}`} className="px-4 py-4">
                      <div className="h-4 bg-muted rounded w-3/4"></div>
                    </td>
                  ))}
                  {rowActions.length > 0 && (
                    <td className="px-4 py-4 text-right">
                      <div className="h-7 w-7 bg-muted rounded-full ml-auto"></div>
                    </td>
                  )}
                </tr>
              ))
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (rowActions.length > 0 ? 1 : 0)} className="px-4 py-8 text-center text-muted-foreground text-sm">
                  No data available
                </td>
              </tr>
            ) : (
              data.map((row, index) => (
                <tr key={index} className="hover:bg-muted/40 transition-colors">
                  {columns.map((column) => (
                    <td key={`${index}-${column.key}`} className="px-4 py-3">
                      {row[column.key]}
                    </td>
                  ))}
                  {rowActions.length > 0 && (
                    <td className="px-4 py-3 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {rowActions.map((action) => (
                            <DropdownMenuItem 
                              key={action}
                              onClick={() => onRowAction && onRowAction(action, row)}
                            >
                              {action}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {pagination && (
        <div className="p-4 border-t flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {(pagination.page - 1) * pagination.pageSize + 1} to {Math.min(pagination.page * pagination.pageSize, pagination.total)} of {pagination.total} entries
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => pagination.onChange(pagination.page - 1)}
              disabled={pagination.page === 1}
            >
              <ChevronLeft size={16} />
            </Button>
            <span className="text-sm">
              Page {pagination.page} of {Math.ceil(pagination.total / pagination.pageSize)}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => pagination.onChange(pagination.page + 1)}
              disabled={pagination.page >= Math.ceil(pagination.total / pagination.pageSize)}
            >
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default SmartTable;
