
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import PageHeader from '@/components/admin/PageHeader';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import SmartTable from '@/components/admin/SmartTable';
import StatisticsCard from '@/components/admin/StatisticsCard';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  DollarSign, 
  TrendingUp, 
  Calendar, 
  BarChart, 
  LineChart, 
  CreditCard, 
  ArrowRightLeft,
  AlertCircle,
  TrendingDown,
  Clock,
  Download
} from 'lucide-react';

// Mock data
const transactionHistory = [
  { id: 'TRX001', type: 'Commission', shop: 'Halal Delights', amount: '$245.78', date: '2023-04-02', status: 'Completed' },
  { id: 'TRX002', type: 'Commission', shop: 'Zabiha Meats', amount: '$187.25', date: '2023-04-02', status: 'Completed' },
  { id: 'TRX003', type: 'Platform Fee', shop: 'Modest Fashion Co', amount: '$49.99', date: '2023-04-01', status: 'Completed' },
  { id: 'TRX004', type: 'Refund Fee', shop: 'Islamic Books Store', amount: '$15.00', date: '2023-04-01', status: 'Pending' },
  { id: 'TRX005', type: 'Advertising', shop: 'Salam Bakery', amount: '$99.99', date: '2023-03-31', status: 'Completed' },
];

const pendingPayouts = [
  { id: 'PAY001', shop: 'Halal Delights', amount: '$1,245.67', period: 'March 2023', status: 'Ready for Payout' },
  { id: 'PAY002', shop: 'Zabiha Meats', amount: '$2,871.33', period: 'March 2023', status: 'Ready for Payout' },
  { id: 'PAY003', shop: 'Modest Fashion Co', amount: '$987.50', period: 'March 2023', status: 'Ready for Payout' },
];

const RevenuePage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleRowAction = (action: string, rowData: any) => {
    console.log(`Action ${action} on:`, rowData);
    // Implementation for different actions
  };

  return (
    <DashboardLayout title="Revenue Management">
      <PageHeader 
        title="Revenue Management" 
        description="Monitor and manage platform earnings and payouts"
        showExport={true}
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatisticsCard 
          title="Total Revenue" 
          value="$278,942.67" 
          change={{ value: 12.5, isPositive: true }} 
          icon={<DollarSign size={20} />}
        />
        <StatisticsCard 
          title="Monthly Earnings" 
          value="$42,187.33" 
          change={{ value: 8.7, isPositive: true }} 
          icon={<TrendingUp size={20} />}
        />
        <StatisticsCard 
          title="Pending Payouts" 
          value="$15,872.50" 
          icon={<Clock size={20} />}
        />
        <StatisticsCard 
          title="Avg. Commission" 
          value="12.8%" 
          change={{ value: 0.5, isPositive: true }} 
          icon={<BarChart size={20} />}
        />
      </div>

      <Card className="mb-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none px-4 h-auto bg-transparent">
            <TabsTrigger value="dashboard" className="py-3 px-4">Earnings Dashboard</TabsTrigger>
            <TabsTrigger value="commission" className="py-3 px-4">Commission Management</TabsTrigger>
            <TabsTrigger value="payouts" className="py-3 px-4">Payout Processing</TabsTrigger>
            <TabsTrigger value="transactions" className="py-3 px-4">Transaction History</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="p-4 mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Card className="p-4 h-64 flex items-center justify-center">
                <div className="text-center">
                  <BarChart size={36} className="mx-auto text-muted-foreground/50 mb-2" />
                  <h3 className="text-lg font-medium">Revenue by Category</h3>
                  <p className="text-sm text-muted-foreground">Chart showing revenue distribution across product categories</p>
                </div>
              </Card>
              
              <Card className="p-4 h-64 flex items-center justify-center">
                <div className="text-center">
                  <LineChart size={36} className="mx-auto text-muted-foreground/50 mb-2" />
                  <h3 className="text-lg font-medium">Revenue Trends</h3>
                  <p className="text-sm text-muted-foreground">Monthly revenue trends for the past 12 months</p>
                </div>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card className="p-4">
                <h3 className="font-medium mb-2">Revenue Sources</h3>
                <div className="space-y-3 mt-4">
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Commissions</span>
                      <span>68%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-halvi-accent h-2 rounded-full" style={{ width: '68%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Platform Fees</span>
                      <span>22%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-halvi-amber h-2 rounded-full" style={{ width: '22%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Premium Services</span>
                      <span>10%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-halvi-royal h-2 rounded-full" style={{ width: '10%' }}></div>
                    </div>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4">
                <h3 className="font-medium mb-2">Top Earning Shops</h3>
                <div className="space-y-3 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Halal Delights</span>
                    <span className="text-sm font-medium">$4,872.45</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Zabiha Meats</span>
                    <span className="text-sm font-medium">$3,567.89</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Modest Fashion Co</span>
                    <span className="text-sm font-medium">$2,931.22</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Salam Bakery</span>
                    <span className="text-sm font-medium">$1,845.67</span>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4">
                <h3 className="font-medium mb-2">Growth Forecast</h3>
                <div className="flex items-center gap-2 mt-4">
                  <TrendingUp size={36} className="text-green-500" />
                  <div>
                    <p className="text-xl font-bold">+18.4%</p>
                    <p className="text-xs text-muted-foreground">Projected growth next quarter</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground">Based on current growth trajectory and market expansion plans</p>
                </div>
                <Button size="sm" variant="link" className="mt-2 px-0">View detailed forecast</Button>
              </Card>
            </div>
            
            <Card className="p-4 border-l-4 border-l-yellow-400">
              <div className="flex items-start gap-3">
                <AlertCircle size={20} className="text-yellow-500 mt-0.5" />
                <div>
                  <h3 className="font-medium">Irregular Financial Activity</h3>
                  <p className="text-sm text-muted-foreground mt-1">System has detected unusual transaction patterns from 3 shops. <Button variant="link" className="p-0 h-auto text-sm">Investigate</Button></p>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="commission" className="p-4 mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Card className="p-4">
                <h3 className="text-lg font-medium mb-4">Global Commission Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Default Commission Rate</label>
                    <div className="flex items-center gap-2 mt-1">
                      <input 
                        type="range" 
                        min="0" 
                        max="30" 
                        step="0.1" 
                        defaultValue="12" 
                        className="flex-1"
                      />
                      <span className="text-sm font-bold">12.0%</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Minimum Commission</label>
                    <div className="flex items-center gap-2 mt-1">
                      <input 
                        type="number" 
                        min="0" 
                        defaultValue="5" 
                        className="flex-1 h-9 rounded-md border border-input bg-background px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-halvi-accent"
                      />
                      <span className="text-sm">%</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">High Volume Discount</label>
                    <div className="flex items-center gap-2 mt-1">
                      <input 
                        type="number" 
                        min="0" 
                        defaultValue="2" 
                        className="flex-1 h-9 rounded-md border border-input bg-background px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-halvi-accent"
                      />
                      <span className="text-sm">%</span>
                    </div>
                  </div>
                </div>
                <Button className="mt-4 w-full">Save Global Settings</Button>
              </Card>
              
              <Card className="p-4">
                <h3 className="text-lg font-medium mb-4">Category-Based Commission</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Food & Grocery</span>
                    <div className="flex items-center gap-2">
                      <input 
                        type="number" 
                        min="0" 
                        defaultValue="10" 
                        className="w-16 h-8 rounded-md border border-input bg-background px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-halvi-accent"
                      />
                      <span className="text-sm">%</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Clothing & Fashion</span>
                    <div className="flex items-center gap-2">
                      <input 
                        type="number" 
                        min="0" 
                        defaultValue="15" 
                        className="w-16 h-8 rounded-md border border-input bg-background px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-halvi-accent"
                      />
                      <span className="text-sm">%</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Books & Media</span>
                    <div className="flex items-center gap-2">
                      <input 
                        type="number" 
                        min="0" 
                        defaultValue="12" 
                        className="w-16 h-8 rounded-md border border-input bg-background px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-halvi-accent"
                      />
                      <span className="text-sm">%</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Electronics</span>
                    <div className="flex items-center gap-2">
                      <input 
                        type="number" 
                        min="0" 
                        defaultValue="8" 
                        className="w-16 h-8 rounded-md border border-input bg-background px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-halvi-accent"
                      />
                      <span className="text-sm">%</span>
                    </div>
                  </div>
                </div>
                <Button className="mt-4 w-full">Update Category Rates</Button>
              </Card>
            </div>
            
            <Card className="p-4">
              <h3 className="text-lg font-medium mb-4">Custom Shop Commission Rates</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50 text-muted-foreground text-xs">
                    <tr>
                      <th className="px-4 py-3 text-left font-medium">Shop Name</th>
                      <th className="px-4 py-3 text-left font-medium">Default Rate</th>
                      <th className="px-4 py-3 text-left font-medium">Custom Rate</th>
                      <th className="px-4 py-3 text-left font-medium">Reason</th>
                      <th className="px-4 py-3 text-left font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    <tr>
                      <td className="px-4 py-3">Halal Delights</td>
                      <td className="px-4 py-3">12%</td>
                      <td className="px-4 py-3">10%</td>
                      <td className="px-4 py-3">High volume seller</td>
                      <td className="px-4 py-3">
                        <Button size="sm" variant="outline">Edit</Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">Zabiha Meats</td>
                      <td className="px-4 py-3">12%</td>
                      <td className="px-4 py-3">11%</td>
                      <td className="px-4 py-3">Early adopter</td>
                      <td className="px-4 py-3">
                        <Button size="sm" variant="outline">Edit</Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">Modest Fashion Co</td>
                      <td className="px-4 py-3">15%</td>
                      <td className="px-4 py-3">15%</td>
                      <td className="px-4 py-3">Standard rate</td>
                      <td className="px-4 py-3">
                        <Button size="sm" variant="outline">Edit</Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <Button className="mt-4" variant="outline">
                Add Custom Rate
              </Button>
            </Card>
          </TabsContent>

          <TabsContent value="payouts" className="p-0 mt-0">
            <div className="p-4 border-b bg-muted">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="font-medium">Payout Schedule</h3>
                  <p className="text-sm text-muted-foreground">Next automatic payout runs in 3 days</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline">
                    <Calendar size={16} className="mr-2" />
                    Change Schedule
                  </Button>
                  <Button size="sm">
                    <CreditCard size={16} className="mr-2" />
                    Process Now
                  </Button>
                </div>
              </div>
            </div>
            
            <SmartTable
              title="Pending Payouts"
              subtitle="Ready to be processed"
              columns={[
                { key: 'id', title: 'Payout ID', sortable: true },
                { key: 'shop', title: 'Shop', sortable: true },
                { key: 'amount', title: 'Amount', sortable: true },
                { key: 'period', title: 'Period', sortable: true },
                { key: 'status', title: 'Status', sortable: true },
              ]}
              data={pendingPayouts}
              rowActions={['Process Now', 'Edit Amount', 'Hold', 'View Details']}
              onRowAction={handleRowAction}
              pagination={{
                page: 1,
                pageSize: 10,
                total: 26,
                onChange: (page) => console.log('Changed to page', page)
              }}
            />
          </TabsContent>

          <TabsContent value="transactions" className="p-0 mt-0">
            <SmartTable
              title="Transaction History"
              subtitle="Complete transaction records"
              columns={[
                { key: 'id', title: 'Transaction ID', sortable: true },
                { key: 'type', title: 'Type', sortable: true },
                { key: 'shop', title: 'Shop', sortable: true },
                { key: 'amount', title: 'Amount', sortable: true },
                { key: 'date', title: 'Date', sortable: true },
                { key: 'status', title: 'Status', sortable: true },
              ]}
              data={transactionHistory}
              filters={['All', 'Commission', 'Platform Fee', 'Refund Fee', 'Advertising']}
              rowActions={['View Details', 'Download Receipt']}
              onRowAction={handleRowAction}
              pagination={{
                page: 1,
                pageSize: 10,
                total: 542,
                onChange: (page) => console.log('Changed to page', page)
              }}
              actions={
                <Button variant="outline" size="sm">
                  <Download size={16} className="mr-2" />
                  Export All
                </Button>
              }
            />
          </TabsContent>
        </Tabs>
      </Card>
    </DashboardLayout>
  );
};

export default RevenuePage;
