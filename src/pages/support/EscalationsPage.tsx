import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import PageHeader from '@/components/admin/PageHeader';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Clock, 
  ArrowUpRight, 
  ArrowDownRight, 
  Download, 
  Filter,
  ShoppingBag,
  Monitor,
  ChevronDown,
  CreditCard,
  ShoppingCart,
  Store as StoreIcon,
  Users,
  Smartphone,
  Activity,
  BarChart2 as BarChart3,
  MoreVertical,
  ArrowRight,
  MailWarning,
  PhoneCall,
  MessageSquare,
  Send
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableFooter,
  TableRow,
} from "@/components/ui/table"

// Mock data for escalations
const escalations = [
  {
    id: 1,
    customerName: 'Aisha Khan',
    shopName: 'Al-Baraka Meats',
    dateReported: '2024-03-15',
    issue: 'Incorrect order received',
    status: 'Open',
    priority: 'High',
    agentAssigned: 'Omar Hassan',
  },
  {
    id: 2,
    customerName: 'Fatima Ali',
    shopName: 'Medina Bakery',
    dateReported: '2024-03-10',
    issue: 'Late delivery',
    status: 'In Progress',
    priority: 'Medium',
    agentAssigned: 'Layla Ahmed',
  },
  {
    id: 3,
    customerName: 'Yusuf Raza',
    shopName: 'Noor Spice Market',
    dateReported: '2024-03-05',
    issue: 'Damaged goods',
    status: 'Resolved',
    priority: 'Low',
    agentAssigned: 'Ali Khan',
  },
];

const EscalationsPage = () => {
  return (
    <DashboardLayout title="Escalations Management">
      <PageHeader 
        title="Escalations Management" 
        description="Review and manage customer and shop escalations"
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

      <Card>
        <CardContent>
          <Table>
            <TableCaption>A list of customer and shop escalations.</TableCaption>
            <TableHead>
              <TableRow>
                <TableHead>Customer Name</TableHead>
                <TableHead>Shop Name</TableHead>
                <TableHead>Date Reported</TableHead>
                <TableHead>Issue</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Agent Assigned</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHead>
            <TableBody>
              {escalations.map((escalation) => (
                <TableRow key={escalation.id}>
                  <TableCell>{escalation.customerName}</TableCell>
                  <TableCell>{escalation.shopName}</TableCell>
                  <TableCell>{escalation.dateReported}</TableCell>
                  <TableCell>{escalation.issue}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                      {escalation.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                      {escalation.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>{escalation.agentAssigned}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <MailWarning className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <PhoneCall className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={8} className="text-center">
                  {escalations.length} Total Escalations
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default EscalationsPage;
