import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import PageHeader from '@/components/admin/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Filter, 
  Download, 
  Search, 
  MoreVertical,
  MessageSquare,
  User,
  Clock,
  Tag,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const tickets = [
  {
    id: 1,
    subject: 'Order Issue',
    customer: 'John Doe',
    date: '2024-07-15',
    status: 'open',
    priority: 'high',
    category: 'Order Problems',
  },
  {
    id: 2,
    subject: 'Refund Request',
    customer: 'Jane Smith',
    date: '2024-07-14',
    status: 'pending',
    priority: 'medium',
    category: 'Refunds',
  },
  {
    id: 3,
    subject: 'Account Access',
    customer: 'Alice Johnson',
    date: '2024-07-13',
    status: 'closed',
    priority: 'low',
    category: 'Account Support',
  },
];

const TicketsPage = () => {
  return (
    <DashboardLayout title="Tickets">
      <PageHeader 
        title="Tickets" 
        description="Manage and view support tickets"
        actions={
          <>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <Filter size={14} />
                Filters
              </Button>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <Download size={14} />
                Export
              </Button>
            </div>
          </>
        }
      />

      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search tickets..."
            className="w-full pl-10 pr-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {tickets.map((ticket) => (
          <Card key={ticket.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {ticket.subject}
              </CardTitle>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="text-blue-500 border-blue-500">{ticket.status}</Badge>
                <MoreVertical className="h-4 w-4 cursor-pointer text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span>{ticket.customer}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-muted-foreground mt-2">
                    <Clock className="h-4 w-4" />
                    <span>{ticket.date}</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Tag className="h-4 w-4" />
                    <span>Category: {ticket.category}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-muted-foreground mt-2">
                    <span>Priority: {ticket.priority}</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default TicketsPage;
