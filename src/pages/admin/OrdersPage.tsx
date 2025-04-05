
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import PageHeader from '@/components/admin/PageHeader';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import SmartTable from '@/components/admin/SmartTable';
import StatisticsCard from '@/components/admin/StatisticsCard';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  ShoppingCart, 
  CheckCircle2, 
  Clock, 
  RefreshCw, 
  TruckIcon, 
  PackageCheck, 
  Download, 
  FileText,
  Tag
} from 'lucide-react';

// Mock data
const mockOrders = [
  { id: 'ORD001', customer: 'Fatima Ahmed', shop: 'Halal Delights', amount: '$75.99', date: '2023-04-02', status: 'Delivered', payment: 'Paid' },
  { id: 'ORD002', customer: 'Mohammed Ali', shop: 'Zabiha Meats', amount: '$124.50', date: '2023-04-02', status: 'Processing', payment: 'Paid' },
  { id: 'ORD003', customer: 'Aisha Khan', shop: 'Modest Fashion Co', amount: '$89.97', date: '2023-04-01', status: 'Shipped', payment: 'Paid' },
  { id: 'ORD004', customer: 'Yusuf Omar', shop: 'Islamic Books Store', amount: '$45.00', date: '2023-04-01', status: 'Refund Requested', payment: 'Paid' },
  { id: 'ORD005', customer: 'Sara Mohammad', shop: 'Salam Bakery', amount: '$32.99', date: '2023-03-31', status: 'Delivered', payment: 'Paid' },
];

const disputeOrders = [
  { id: 'ORD006', customer: 'Hassan Ahmed', shop: 'Tech Halal', amount: '$149.99', date: '2023-03-30', issue: 'Damaged Product', status: 'Pending Review' },
  { id: 'ORD007', customer: 'Layla Khan', shop: 'Modest Fashion Co', amount: '$67.50', date: '2023-03-29', issue: 'Wrong Size', status: 'In Progress' },
  { id: 'ORD008', customer: 'Ibrahim Ali', shop: 'Zabiha Meats', amount: '$89.99', date: '2023-03-28', issue: 'Missing Items', status: 'Awaiting Shop Response' },
];

const OrdersPage = () => {
  const handleRowAction = (action: string, rowData: any) => {
    console.log(`Action ${action} on:`, rowData);
    // Implementation for different actions
  };

  return (
    <DashboardLayout title="Orders Management">
      <PageHeader 
        title="Orders Management" 
        description="Track and manage orders across all shops"
        showExport={true}
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatisticsCard 
          title="Total Orders" 
          value="8,742" 
          change={{ value: 12, isPositive: true }} 
          icon={<ShoppingCart size={20} />}
        />
        <StatisticsCard 
          title="Completed Orders" 
          value="7,325" 
          icon={<CheckCircle2 size={20} />}
        />
        <StatisticsCard 
          title="Processing Orders" 
          value="1,128" 
          icon={<Clock size={20} />}
        />
        <StatisticsCard 
          title="Refund Requests" 
          value="289" 
          change={{ value: 5, isPositive: false }} 
          icon={<RefreshCw size={20} />}
        />
      </div>

      <Card className="mb-6">
        <Tabs defaultValue="management" className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none px-4 h-auto bg-transparent">
            <TabsTrigger value="management" className="py-3 px-4">Order Management</TabsTrigger>
            <TabsTrigger value="timeline" className="py-3 px-4">Order Timeline</TabsTrigger>
            <TabsTrigger value="disputes" className="py-3 px-4">Disputes & Refunds</TabsTrigger>
            <TabsTrigger value="reports" className="py-3 px-4">Reports & Exports</TabsTrigger>
          </TabsList>

          <TabsContent value="management" className="p-0 mt-0">
            <SmartTable
              columns={[
                { key: 'id', title: 'Order ID', sortable: true },
                { key: 'customer', title: 'Customer', sortable: true },
                { key: 'shop', title: 'Shop', sortable: true },
                { key: 'amount', title: 'Amount', sortable: true },
                { key: 'date', title: 'Order Date', sortable: true },
                { key: 'status', title: 'Status', sortable: true },
                { key: 'payment', title: 'Payment', sortable: true },
              ]}
              data={mockOrders}
              filters={['All', 'Processing', 'Shipped', 'Delivered', 'Refunded']}
              rowActions={['View Order', 'Update Status', 'Process Refund', 'Contact Customer']}
              onRowAction={handleRowAction}
              pagination={{
                page: 1,
                pageSize: 10,
                total: 8742,
                onChange: (page) => console.log('Changed to page', page)
              }}
            />
          </TabsContent>

          <TabsContent value="timeline" className="p-4 mt-0">
            <div className="flex flex-col items-center justify-center text-center p-8">
              <div className="w-full max-w-3xl">
                <h3 className="text-lg font-medium mb-4">Order Timeline View</h3>
                <div className="flex items-center justify-between mb-8">
                  <Button variant="outline" size="sm">Search Orders</Button>
                  <div className="text-sm text-muted-foreground">Enter Order ID to track journey</div>
                  <Button size="sm">Track Order</Button>
                </div>
                
                <div className="relative">
                  <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-0.5 bg-muted"></div>
                  
                  <div className="relative pl-10 pb-10">
                    <div className="absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-halvi-royal flex items-center justify-center">
                      <ShoppingCart size={16} className="text-white" />
                    </div>
                    <div className="bg-card shadow rounded-md p-4 ml-6">
                      <h4 className="font-medium">Order Placed</h4>
                      <p className="text-sm text-muted-foreground">Customer places the order and completes payment</p>
                    </div>
                  </div>
                  
                  <div className="relative pl-10 pb-10">
                    <div className="absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                      <Clock size={16} className="text-muted-foreground" />
                    </div>
                    <div className="bg-card shadow rounded-md p-4 ml-6">
                      <h4 className="font-medium">Processing</h4>
                      <p className="text-sm text-muted-foreground">Shop processes the order and prepares for shipment</p>
                    </div>
                  </div>
                  
                  <div className="relative pl-10 pb-10">
                    <div className="absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                      <TruckIcon size={16} className="text-muted-foreground" />
                    </div>
                    <div className="bg-card shadow rounded-md p-4 ml-6">
                      <h4 className="font-medium">In Transit</h4>
                      <p className="text-sm text-muted-foreground">Order has been shipped and is on the way</p>
                    </div>
                  </div>
                  
                  <div className="relative pl-10">
                    <div className="absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                      <PackageCheck size={16} className="text-muted-foreground" />
                    </div>
                    <div className="bg-card shadow rounded-md p-4 ml-6">
                      <h4 className="font-medium">Delivered</h4>
                      <p className="text-sm text-muted-foreground">Order has been delivered to the customer</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="disputes" className="p-0 mt-0">
            <div className="p-4 border-b bg-amber-50 dark:bg-amber-950/20 flex items-center gap-3">
              <RefreshCw size={18} className="text-amber-500" />
              <p className="text-sm">Orders with disputes require admin review before refund processing.</p>
            </div>
            <SmartTable
              columns={[
                { key: 'id', title: 'Order ID', sortable: true },
                { key: 'customer', title: 'Customer', sortable: true },
                { key: 'shop', title: 'Shop', sortable: true },
                { key: 'amount', title: 'Amount', sortable: true },
                { key: 'date', title: 'Order Date', sortable: true },
                { key: 'issue', title: 'Issue', sortable: true },
                { key: 'status', title: 'Status', sortable: true },
              ]}
              data={disputeOrders}
              rowActions={['Review Dispute', 'Approve Refund', 'Deny Refund', 'Add Note']}
              onRowAction={handleRowAction}
              pagination={{
                page: 1,
                pageSize: 10,
                total: 289,
                onChange: (page) => console.log('Changed to page', page)
              }}
            />
          </TabsContent>

          <TabsContent value="reports" className="p-4 mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                    <FileText size={20} className="text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-medium">Daily Sales Report</h3>
                    <p className="text-xs text-muted-foreground">Orders summary for today</p>
                  </div>
                </div>
                <Button size="sm" className="w-full mt-2" variant="outline">
                  <Download size={14} className="mr-2" />
                  Export CSV
                </Button>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                    <FileText size={20} className="text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-medium">Weekly Performance</h3>
                    <p className="text-xs text-muted-foreground">Orders analysis for past week</p>
                  </div>
                </div>
                <Button size="sm" className="w-full mt-2" variant="outline">
                  <Download size={14} className="mr-2" />
                  Export CSV
                </Button>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                    <FileText size={20} className="text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-medium">Custom Report</h3>
                    <p className="text-xs text-muted-foreground">Build your custom orders report</p>
                  </div>
                </div>
                <Button size="sm" className="w-full mt-2" variant="outline">
                  <Download size={14} className="mr-2" />
                  Generate Report
                </Button>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </Card>

      <Card className="p-4 mb-6 border-l-4 border-l-blue-400">
        <div className="flex items-start gap-3">
          <Tag size={20} className="text-blue-500 mt-0.5" />
          <div>
            <h3 className="font-medium">Auto-Tagged Orders</h3>
            <p className="text-sm text-muted-foreground mt-1">System has auto-tagged 12 orders as potential fraud based on patterns. <Button variant="link" className="p-0 h-auto text-sm">Review Flagged Orders</Button></p>
          </div>
        </div>
      </Card>
    </DashboardLayout>
  );
};

export default OrdersPage;
