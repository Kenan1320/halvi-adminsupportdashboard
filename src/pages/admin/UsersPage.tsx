
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import PageHeader from '@/components/admin/PageHeader';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import SmartTable from '@/components/admin/SmartTable';
import StatisticsCard from '@/components/admin/StatisticsCard';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Users, 
  UserPlus,
  User, 
  ShoppingBag, 
  Store, 
  Headset, 
  Shield,
  Search,
  UserCheck,
  Tag,
  Lock
} from 'lucide-react';

// Mock data
const mockUsers = [
  { id: 'U001', name: 'Ahmed Khan', email: 'ahmed@example.com', type: 'Customer', orders: 24, joined: '2022-08-15', status: 'Active' },
  { id: 'U002', name: 'Fatima Ali', email: 'fatima@example.com', type: 'Customer', orders: 67, joined: '2022-05-22', status: 'Active' },
  { id: 'U003', name: 'Mohammed Patel', email: 'mohammed@example.com', type: 'Business Owner', orders: 0, joined: '2022-11-03', status: 'Active' },
  { id: 'U004', name: 'Aisha Hussein', email: 'aisha@example.com', type: 'Support Agent', orders: 0, joined: '2023-01-12', status: 'Active' },
  { id: 'U005', name: 'Samir Rahman', email: 'samir@example.com', type: 'Customer', orders: 3, joined: '2023-02-28', status: 'Suspended' },
];

const userSegments = [
  { id: 'SEG001', name: 'Frequent Buyers', count: 215, criteria: 'More than 10 orders', actions: 'Loyalty rewards, Early access to sales' },
  { id: 'SEG002', name: 'New Customers', count: 187, criteria: 'Joined in last 30 days', actions: 'Welcome offers, Onboarding emails' },
  { id: 'SEG003', name: 'High Spenders', count: 78, criteria: 'Average order value > $100', actions: 'Premium promotions, VIP support' },
  { id: 'SEG004', name: 'At-Risk', count: 43, criteria: 'No purchase in 60+ days', actions: 'Re-engagement campaigns, Surveys' },
];

const UsersPage = () => {
  const [activeTab, setActiveTab] = useState('directory');

  const handleRowAction = (action: string, rowData: any) => {
    console.log(`Action ${action} on:`, rowData);
    // Implementation for different actions
  };

  return (
    <DashboardLayout title="Users Management">
      <PageHeader 
        title="Users Management" 
        description="Manage customers, business owners, and platform users"
        actions={
          <Button>
            <UserPlus size={16} className="mr-2" />
            Add User
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatisticsCard 
          title="Total Users" 
          value="12,847" 
          change={{ value: 8.3, isPositive: true }} 
          icon={<Users size={20} />}
        />
        <StatisticsCard 
          title="Customers" 
          value="11,522" 
          change={{ value: 9.1, isPositive: true }} 
          icon={<User size={20} />}
        />
        <StatisticsCard 
          title="Business Owners" 
          value="1,247" 
          change={{ value: 4.5, isPositive: true }} 
          icon={<Store size={20} />}
        />
        <StatisticsCard 
          title="Support Agents" 
          value="78" 
          icon={<Headset size={20} />}
        />
      </div>

      <Card className="mb-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none px-4 h-auto bg-transparent">
            <TabsTrigger value="directory" className="py-3 px-4">User Directory</TabsTrigger>
            <TabsTrigger value="profiles" className="py-3 px-4">User Profiles</TabsTrigger>
            <TabsTrigger value="segments" className="py-3 px-4">User Segmentation</TabsTrigger>
            <TabsTrigger value="management" className="py-3 px-4">Management Tools</TabsTrigger>
          </TabsList>

          <TabsContent value="directory" className="p-0 mt-0">
            <div className="p-4 border-b flex items-center gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search users by name, email, ID..."
                    className="h-10 w-full rounded-md border border-input bg-background px-10 text-sm focus:outline-none focus:ring-1 focus:ring-halvi-accent"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  Export
                </Button>
              </div>
            </div>
            <SmartTable
              columns={[
                { key: 'id', title: 'User ID', sortable: true },
                { key: 'name', title: 'Name', sortable: true },
                { key: 'email', title: 'Email', sortable: true },
                { key: 'type', title: 'User Type', sortable: true },
                { key: 'orders', title: 'Orders', sortable: true },
                { key: 'joined', title: 'Join Date', sortable: true },
                { key: 'status', title: 'Status', sortable: true },
              ]}
              data={mockUsers}
              filters={['All', 'Customers', 'Business Owners', 'Support Agents', 'Admins']}
              rowActions={['View Profile', 'Edit', 'Suspend', 'Delete', 'Reset Password']}
              onRowAction={handleRowAction}
              pagination={{
                page: 1,
                pageSize: 10,
                total: 12847,
                onChange: (page) => console.log('Changed to page', page)
              }}
            />
          </TabsContent>

          <TabsContent value="profiles" className="p-4 mt-0">
            <div className="flex flex-col items-center justify-center text-center p-8">
              <div className="w-full max-w-3xl">
                <h3 className="text-lg font-medium mb-4">User Profile Information</h3>
                <p className="text-sm text-muted-foreground mb-6">Search for a user or select from the directory to view detailed profile</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <Card className="p-4 flex flex-col items-center">
                    <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-3">
                      <User size={28} className="text-muted-foreground" />
                    </div>
                    <h3 className="font-medium">Profile Info</h3>
                    <p className="text-xs text-muted-foreground mt-1">Contact details and preferences</p>
                  </Card>
                  
                  <Card className="p-4 flex flex-col items-center">
                    <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-3">
                      <ShoppingBag size={28} className="text-muted-foreground" />
                    </div>
                    <h3 className="font-medium">Order History</h3>
                    <p className="text-xs text-muted-foreground mt-1">Past purchases and returns</p>
                  </Card>
                  
                  <Card className="p-4 flex flex-col items-center">
                    <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-3">
                      <MessageSquare size={28} className="text-muted-foreground" />
                    </div>
                    <h3 className="font-medium">Communication</h3>
                    <p className="text-xs text-muted-foreground mt-1">Support tickets and messages</p>
                  </Card>
                </div>
                
                <Button className="mt-4">Search User</Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="segments" className="p-0 mt-0">
            <SmartTable
              title="User Segments"
              subtitle="Automatically generated user groups"
              columns={[
                { key: 'id', title: 'Segment ID', sortable: true },
                { key: 'name', title: 'Segment Name', sortable: true },
                { key: 'count', title: 'User Count', sortable: true },
                { key: 'criteria', title: 'Criteria', sortable: true },
                { key: 'actions', title: 'Recommended Actions', sortable: false },
              ]}
              data={userSegments}
              rowActions={['View Users', 'Edit Segment', 'Create Campaign', 'Export List']}
              onRowAction={handleRowAction}
              pagination={{
                page: 1,
                pageSize: 10,
                total: 8,
                onChange: (page) => console.log('Changed to page', page)
              }}
              actions={
                <Button size="sm">
                  <Tag size={16} className="mr-2" />
                  Create Segment
                </Button>
              }
            />
            
            <div className="p-4">
              <Card className="p-4 border-l-4 border-l-purple-400">
                <div className="flex items-start gap-3">
                  <Tag size={20} className="text-purple-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Automatic Segmentation</h3>
                    <p className="text-sm text-muted-foreground mt-1">System automatically segments users based on behavior patterns for more targeted engagement.</p>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="management" className="p-4 mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                    <UserCheck size={20} className="text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-medium">Bulk User Approval</h3>
                    <p className="text-xs text-muted-foreground">Verify multiple users at once</p>
                  </div>
                </div>
                <Button size="sm" className="w-full mt-2">
                  Access Tool
                </Button>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                    <Lock size={20} className="text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-medium">Password Management</h3>
                    <p className="text-xs text-muted-foreground">Reset passwords and manage security</p>
                  </div>
                </div>
                <Button size="sm" className="w-full mt-2">
                  Access Tool
                </Button>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                    <Shield size={20} className="text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-medium">Permissions Manager</h3>
                    <p className="text-xs text-muted-foreground">Assign user roles and permissions</p>
                  </div>
                </div>
                <Button size="sm" className="w-full mt-2">
                  Access Tool
                </Button>
              </Card>
            </div>
            
            <Card className="p-4">
              <h3 className="text-lg font-medium mb-4">Global User Settings</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Default User Role</label>
                    <select className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-1 focus:ring-halvi-accent">
                      <option>Customer</option>
                      <option>Business Owner</option>
                      <option>Support Agent</option>
                      <option>Admin</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-1 block">Password Policy</label>
                    <select className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-1 focus:ring-halvi-accent">
                      <option>Standard Security</option>
                      <option>High Security</option>
                      <option>Maximum Security</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">Account Verification</label>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 text-sm">
                      <input type="radio" name="verification" defaultChecked />
                      Email Verification
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <input type="radio" name="verification" />
                      Phone Verification
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <input type="radio" name="verification" />
                      Both
                    </label>
                  </div>
                </div>
                
                <div>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" defaultChecked />
                    Auto-suspend accounts with suspicious activity
                  </label>
                </div>
                
                <div>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" defaultChecked />
                    Require 2FA for admin accounts
                  </label>
                </div>
              </div>
              <Button className="mt-4">Save Settings</Button>
            </Card>
          </TabsContent>
        </Tabs>
      </Card>
    </DashboardLayout>
  );
};

export default UsersPage;
