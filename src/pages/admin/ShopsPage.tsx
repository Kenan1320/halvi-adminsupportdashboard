
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import PageHeader from '@/components/admin/PageHeader';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import SmartTable from '@/components/admin/SmartTable';
import StatisticsCard from '@/components/admin/StatisticsCard';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Building2, Check, Clock, Store, CheckCircle2, ShieldOff, Percent, Activity } from 'lucide-react';
import { AlertCircle } from 'lucide-react';

// Mock data
const mockShops = [
  { id: 'SH001', name: 'Halal Delights', category: 'Restaurant', status: 'Active', products: 32, rating: 4.8, certification: 'Verified', revenue: '$5,432' },
  { id: 'SH002', name: 'Modest Fashion Co', category: 'Clothing', status: 'Pending', products: 78, rating: 4.2, certification: 'Pending', revenue: '$3,120' },
  { id: 'SH003', name: 'Zabiha Meats', category: 'Grocery', status: 'Active', products: 46, rating: 4.6, certification: 'Verified', revenue: '$8,790' },
  { id: 'SH004', name: 'Islamic Books Store', category: 'Books', status: 'Active', products: 215, rating: 4.5, certification: 'Verified', revenue: '$1,945' },
  { id: 'SH005', name: 'Salam Bakery', category: 'Bakery', status: 'Suspended', products: 28, rating: 3.7, certification: 'Expired', revenue: '$2,310' },
];

const pendingApplications = [
  { id: 'APP001', name: 'Barakah Foods', category: 'Restaurant', submitted: '2023-04-01', owner: 'Ahmed Khan', certification: 'Uploaded', status: 'Verification Needed' },
  { id: 'APP002', name: 'Modestly Yours', category: 'Clothing', submitted: '2023-04-02', owner: 'Sarah Ahmed', certification: 'Uploaded', status: 'Document Review' },
  { id: 'APP003', name: 'Tech Halal', category: 'Electronics', submitted: '2023-04-03', owner: 'Malik Farooq', certification: 'Pending', status: 'Incomplete' },
];

const ShopsPage = () => {
  const [activeTab, setActiveTab] = useState('directory');

  const handleRowAction = (action: string, rowData: any) => {
    console.log(`Action ${action} on:`, rowData);
    // Implementation for different actions
  };

  return (
    <DashboardLayout title="Shops Management">
      <PageHeader 
        title="Shops Management" 
        description="Manage all shops and applications on the Halvi platform"
        actions={
          <Button>
            <Building2 size={16} className="mr-2" />
            Add Shop
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatisticsCard 
          title="Total Shops" 
          value="215" 
          change={{ value: 12, isPositive: true }} 
          icon={<Store size={20} />}
        />
        <StatisticsCard 
          title="Active Shops" 
          value="189" 
          icon={<CheckCircle2 size={20} />}
        />
        <StatisticsCard 
          title="Pending Applications" 
          value="17" 
          change={{ value: 5, isPositive: false }} 
          icon={<Clock size={20} />}
        />
        <StatisticsCard 
          title="Suspended Shops" 
          value="9" 
          icon={<ShieldOff size={20} />}
        />
      </div>

      <Card className="mb-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none px-4 h-auto bg-transparent">
            <TabsTrigger value="directory" className="py-3 px-4">Shop Directory</TabsTrigger>
            <TabsTrigger value="applications" className="py-3 px-4">Applications Queue</TabsTrigger>
            <TabsTrigger value="analytics" className="py-3 px-4">Analytics</TabsTrigger>
            <TabsTrigger value="communications" className="py-3 px-4">Communication Logs</TabsTrigger>
          </TabsList>

          <TabsContent value="directory" className="p-0 mt-0">
            <SmartTable
              columns={[
                { key: 'id', title: 'ID', sortable: true },
                { key: 'name', title: 'Shop Name', sortable: true },
                { key: 'category', title: 'Category', sortable: true },
                { key: 'status', title: 'Status', sortable: true },
                { key: 'products', title: 'Products', sortable: true },
                { key: 'rating', title: 'Rating', sortable: true },
                { key: 'certification', title: 'Halal Cert', sortable: true },
                { key: 'revenue', title: 'Revenue', sortable: true },
              ]}
              data={mockShops}
              filters={['Active', 'Pending', 'Suspended']}
              rowActions={['View Details', 'Edit', 'Suspend', 'Set Commission']}
              onRowAction={handleRowAction}
              pagination={{
                page: 1,
                pageSize: 10,
                total: 215,
                onChange: (page) => console.log('Changed to page', page)
              }}
            />
          </TabsContent>

          <TabsContent value="applications" className="p-0 mt-0">
            <div className="p-4 border-b bg-amber-50 dark:bg-amber-950/20 flex items-center gap-3">
              <AlertCircle size={18} className="text-amber-500" />
              <p className="text-sm">New applications require verification of halal certifications before approval.</p>
            </div>
            <SmartTable
              columns={[
                { key: 'id', title: 'Application ID', sortable: true },
                { key: 'name', title: 'Shop Name', sortable: true },
                { key: 'category', title: 'Category', sortable: true },
                { key: 'submitted', title: 'Submitted Date', sortable: true },
                { key: 'owner', title: 'Owner', sortable: true },
                { key: 'certification', title: 'Certification', sortable: true },
                { key: 'status', title: 'Status', sortable: true },
              ]}
              data={pendingApplications}
              rowActions={['Review Application', 'Verify Certification', 'Approve', 'Reject']}
              onRowAction={handleRowAction}
              pagination={{
                page: 1,
                pageSize: 10,
                total: 17,
                onChange: (page) => console.log('Changed to page', page)
              }}
            />
          </TabsContent>

          <TabsContent value="analytics" className="p-4 mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <StatisticsCard 
                title="Average Shop Rating" 
                value="4.5 / 5" 
                change={{ value: 0.2, isPositive: true }}
              />
              <StatisticsCard 
                title="Average Commission Rate" 
                value="12.3%" 
                icon={<Percent size={20} />}
              />
              <StatisticsCard 
                title="Shop Growth Rate" 
                value="8.7%" 
                change={{ value: 2.3, isPositive: true }}
                icon={<Activity size={20} />}
              />
            </div>
            
            <div className="text-center p-8 text-muted-foreground">
              Shop analytics charts and performance data will be displayed here
            </div>
          </TabsContent>

          <TabsContent value="communications" className="p-4 mt-0">
            <div className="text-center p-8 text-muted-foreground">
              Communication logs with shops will be displayed here
            </div>
          </TabsContent>
        </Tabs>
      </Card>

      <Card className="p-4 mb-6 border-l-4 border-l-amber-400">
        <div className="flex items-start gap-3">
          <AlertCircle size={20} className="text-amber-500 mt-0.5" />
          <div>
            <h3 className="font-medium">Automated Alerts</h3>
            <p className="text-sm text-muted-foreground mt-1">5 shops have halal certifications expiring in the next 30 days. <Button variant="link" className="p-0 h-auto text-sm">View Alerts</Button></p>
          </div>
        </div>
      </Card>
    </DashboardLayout>
  );
};

export default ShopsPage;
