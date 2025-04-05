
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import PageHeader from '@/components/admin/PageHeader';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import SmartTable from '@/components/admin/SmartTable';
import StatisticsCard from '@/components/admin/StatisticsCard';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Wallet, 
  CreditCard, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight, 
  RefreshCw, 
  BarChart4,
  Clock,
  FileText,
  Filter,
  AlertCircle,
  Calendar
} from 'lucide-react';

// Mock data
const transactionHistory = [
  { id: 'TRX001', type: 'Payout', recipient: 'Halal Delights', amount: '-$2,450.78', date: '2023-04-02', status: 'Completed' },
  { id: 'TRX002', type: 'Revenue', source: 'Commission', amount: '+$3,187.25', date: '2023-04-02', status: 'Completed' },
  { id: 'TRX003', type: 'Refund', order: 'ORD-7842', amount: '-$129.99', date: '2023-04-01', status: 'Completed' },
  { id: 'TRX004', type: 'Revenue', source: 'Platform Fees', amount: '+$849.50', date: '2023-04-01', status: 'Completed' },
  { id: 'TRX005', type: 'Marketing', campaign: 'Google Ads', amount: '-$500.00', date: '2023-03-31', status: 'Completed' },
];

const pendingTransactions = [
  { id: 'PEND001', type: 'Payout', recipient: 'Zabiha Meats', amount: '$3,245.67', date: '2023-04-05', status: 'Scheduled' },
  { id: 'PEND002', type: 'Refund', order: 'ORD-8123', amount: '$89.99', date: '2023-04-04', status: 'Pending Approval' },
  { id: 'PEND003', type: 'Marketing', campaign: 'Facebook Ads', amount: '$750.00', date: '2023-04-10', status: 'Scheduled' },
];

const budgetAllocations = [
  { id: 'BUD001', category: 'Shop Payouts', allocated: '$45,000.00', spent: '$32,567.89', remaining: '$12,432.11', status: 'Active' },
  { id: 'BUD002', category: 'Marketing & Promotions', allocated: '$10,000.00', spent: '$4,250.00', remaining: '$5,750.00', status: 'Active' },
  { id: 'BUD003', category: 'Refund Reserve', allocated: '$5,000.00', spent: '$1,876.45', remaining: '$3,123.55', status: 'Active' },
  { id: 'BUD004', category: 'Platform Development', allocated: '$15,000.00', spent: '$8,945.00', remaining: '$6,055.00', status: 'Active' },
];

const WalletPage = () => {
  const handleRowAction = (action: string, rowData: any) => {
    console.log(`Action ${action} on:`, rowData);
    // Implementation for different actions
  };

  return (
    <DashboardLayout title="Admin Wallet">
      <PageHeader 
        title="Admin Wallet" 
        description="Manage platform finances and transactions"
        showExport={true}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="p-4 flex flex-col md:flex-row items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-gradient-halvi flex items-center justify-center">
            <Wallet size={28} className="text-white" />
          </div>
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">Available Balance</p>
            <h2 className="text-2xl md:text-3xl font-bold">$138,457.82</h2>
            <p className="text-xs text-muted-foreground mt-1">Last updated: Today, 2:45 PM</p>
          </div>
        </Card>

        <StatisticsCard 
          title="Pending Payouts" 
          value="$18,921.45" 
          description="Next payout run: Tomorrow"
          icon={<Clock size={20} />}
        />
        
        <StatisticsCard 
          title="Monthly Revenue" 
          value="$42,187.33" 
          change={{ value: 15.7, isPositive: true }} 
          icon={<BarChart4 size={20} />}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="p-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Income</p>
            <p className="text-xl font-bold text-green-500">+$58,457.82</p>
            <p className="text-xs text-muted-foreground">This month</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
            <ArrowUpRight size={20} className="text-green-500" />
          </div>
        </Card>
        
        <Card className="p-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Expenses</p>
            <p className="text-xl font-bold text-red-500">-$36,890.15</p>
            <p className="text-xs text-muted-foreground">This month</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
            <ArrowDownRight size={20} className="text-red-500" />
          </div>
        </Card>
        
        <Card className="p-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Net Revenue</p>
            <p className="text-xl font-bold">$21,567.67</p>
            <p className="text-xs text-muted-foreground">This month</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
            <DollarSign size={20} className="text-blue-500" />
          </div>
        </Card>
      </div>

      <Card className="mb-6">
        <Tabs defaultValue="transaction" className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none px-4 h-auto bg-transparent">
            <TabsTrigger value="transaction" className="py-3 px-4">Transaction Ledger</TabsTrigger>
            <TabsTrigger value="payout" className="py-3 px-4">Payout Management</TabsTrigger>
            <TabsTrigger value="refund" className="py-3 px-4">Refund & Dispute Funding</TabsTrigger>
            <TabsTrigger value="budget" className="py-3 px-4">Budgeting & Allocation</TabsTrigger>
          </TabsList>

          <TabsContent value="transaction" className="p-0 mt-0">
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="font-medium">Transaction History</h3>
                <Button variant="outline" size="sm" className="gap-1">
                  <Filter size={14} />
                  Filter
                </Button>
                <Button variant="outline" size="sm" className="gap-1">
                  <Calendar size={14} />
                  Date Range
                </Button>
              </div>
              <div>
                <Button variant="outline" size="sm" className="gap-1">
                  <FileText size={14} />
                  Export
                </Button>
              </div>
            </div>
            
            <SmartTable
              columns={[
                { key: 'id', title: 'Transaction ID', sortable: true },
                { key: 'type', title: 'Type', sortable: true },
                { key: 'recipient', title: 'Recipient/Source', sortable: true },
                { key: 'amount', title: 'Amount', sortable: true },
                { key: 'date', title: 'Date', sortable: true },
                { key: 'status', title: 'Status', sortable: true },
              ]}
              data={transactionHistory}
              filters={['All', 'Payouts', 'Revenue', 'Refunds', 'Marketing']}
              rowActions={['View Details', 'Download Receipt']}
              onRowAction={handleRowAction}
              pagination={{
                page: 1,
                pageSize: 10,
                total: 157,
                onChange: (page) => console.log('Changed to page', page)
              }}
            />
          </TabsContent>

          <TabsContent value="payout" className="p-0 mt-0">
            <div className="p-4 border-b flex items-center justify-between">
              <div>
                <h3 className="font-medium">Pending Payouts</h3>
                <p className="text-sm text-muted-foreground">Scheduled and pending payouts to shops</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Calendar size={16} className="mr-2" />
                  Schedule
                </Button>
                <Button size="sm">
                  <CreditCard size={16} className="mr-2" />
                  Process Now
                </Button>
              </div>
            </div>
            
            <SmartTable
              columns={[
                { key: 'id', title: 'Payout ID', sortable: true },
                { key: 'type', title: 'Type', sortable: true },
                { key: 'recipient', title: 'Recipient', sortable: true },
                { key: 'amount', title: 'Amount', sortable: true },
                { key: 'date', title: 'Scheduled Date', sortable: true },
                { key: 'status', title: 'Status', sortable: true },
              ]}
              data={pendingTransactions}
              rowActions={['Process Now', 'Edit', 'Cancel', 'View Details']}
              onRowAction={handleRowAction}
              pagination={{
                page: 1,
                pageSize: 10,
                total: 12,
                onChange: (page) => console.log('Changed to page', page)
              }}
            />
            
            <div className="p-4">
              <Card className="p-4 border-l-4 border-l-blue-400">
                <div className="flex items-start gap-3">
                  <CreditCard size={20} className="text-blue-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Instant Payout System</h3>
                    <p className="text-sm text-muted-foreground mt-1">Instant payouts are available for verified shops with good standing. Processing fees apply.</p>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="refund" className="p-4 mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Card className="p-4">
                <h3 className="text-lg font-medium mb-4">Refund Processing</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium block mb-1">Order ID</label>
                    <input 
                      type="text" 
                      placeholder="Enter order ID"
                      className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium block mb-1">Refund Amount</label>
                    <div className="flex">
                      <div className="flex items-center h-9 rounded-l-md border border-r-0 border-input bg-muted px-3">
                        <span className="text-sm text-muted-foreground">$</span>
                      </div>
                      <input 
                        type="number" 
                        className="flex-1 h-9 rounded-r-md border border-input bg-background px-3 text-sm"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium block mb-1">Refund Reason</label>
                    <select className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm">
                      <option>Product damaged</option>
                      <option>Wrong item received</option>
                      <option>Customer changed mind</option>
                      <option>Order not received</option>
                      <option>Other</option>
                    </select>
                  </div>
                  
                  <Button className="w-full">
                    <RefreshCw size={16} className="mr-2" />
                    Process Refund
                  </Button>
                </div>
              </Card>
              
              <Card className="p-4">
                <h3 className="text-lg font-medium mb-4">Dispute Resolution Fund</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Available Fund</span>
                    <span className="text-lg font-bold">$5,000.00</span>
                  </div>
                  
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-halvi-accent rounded-full" style={{ width: '62%' }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Used: $3,123.55</span>
                    <span>Allocated: $5,000.00</span>
                  </div>
                  
                  <div className="pt-2">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Active Disputes</span>
                      <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400 text-xs px-2 py-0.5 rounded">12 pending</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Avg. Resolution Time</span>
                      <span className="text-sm font-medium">1.2 days</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">
                      Add Funds
                    </Button>
                    <Button variant="outline" className="flex-1">
                      View Disputes
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
            
            <Card className="p-4 border-l-4 border-l-yellow-400">
              <div className="flex items-start gap-3">
                <AlertCircle size={20} className="text-yellow-500 mt-0.5" />
                <div>
                  <h3 className="font-medium">High Volume of Refunds</h3>
                  <p className="text-sm text-muted-foreground mt-1">3 shops have unusually high refund rates this week. <Button variant="link" className="p-0 h-auto text-sm">Investigate</Button></p>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="budget" className="p-0 mt-0">
            <SmartTable
              title="Budget Allocations"
              subtitle="Financial planning and resource allocation"
              columns={[
                { key: 'id', title: 'Budget ID', sortable: true },
                { key: 'category', title: 'Category', sortable: true },
                { key: 'allocated', title: 'Allocated', sortable: true },
                { key: 'spent', title: 'Spent', sortable: true },
                { key: 'remaining', title: 'Remaining', sortable: true },
                { key: 'status', title: 'Status', sortable: true },
              ]}
              data={budgetAllocations}
              rowActions={['View Details', 'Add Funds', 'Edit Budget', 'Generate Report']}
              onRowAction={handleRowAction}
              actions={
                <Button size="sm">
                  <PlusCircle size={16} className="mr-2" />
                  New Budget
                </Button>
              }
            />
            
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-4">
                <h3 className="font-medium mb-3">Budget Overview</h3>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <div className="bg-muted/50 rounded-md p-3">
                    <p className="text-xs text-muted-foreground">Total Allocated</p>
                    <p className="text-lg font-bold">$75,000.00</p>
                  </div>
                  <div className="bg-muted/50 rounded-md p-3">
                    <p className="text-xs text-muted-foreground">Total Spent</p>
                    <p className="text-lg font-bold">$47,639.34</p>
                  </div>
                  <div className="bg-muted/50 rounded-md p-3">
                    <p className="text-xs text-muted-foreground">Remaining</p>
                    <p className="text-lg font-bold text-green-500">$27,360.66</p>
                  </div>
                  <div className="bg-muted/50 rounded-md p-3">
                    <p className="text-xs text-muted-foreground">Forecasted Expenses</p>
                    <p className="text-lg font-bold text-amber-500">$22,450.00</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4">
                <h3 className="font-medium mb-3">Top Expenses</h3>
                <div className="space-y-3 mt-4">
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Shop Payouts</span>
                      <span>68%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-halvi-accent h-2 rounded-full" style={{ width: '68%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Marketing</span>
                      <span>15%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-halvi-amber h-2 rounded-full" style={{ width: '15%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Refunds</span>
                      <span>10%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-halvi-royal h-2 rounded-full" style={{ width: '10%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Development</span>
                      <span>7%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '7%' }}></div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </DashboardLayout>
  );
};

export default WalletPage;
