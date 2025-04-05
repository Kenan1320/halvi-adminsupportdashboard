
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import PageHeader from '@/components/admin/PageHeader';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Users as UsersIcon, 
  User as UserIcon, 
  Search, 
  Filter, 
  Plus,
  ShoppingCart,
  ArrowUpRight,
  UserPlus,
  Mail,
  MessageSquare as MessageIcon
} from 'lucide-react';

// Mock data
const usersList = [
  { 
    id: 'USR-10492', 
    name: 'Ahmed Al-Farsi', 
    email: 'ahmed.alfarsi@example.com',
    phone: '+44 7700 900123',
    joinDate: 'May 12, 2022',
    lastActive: '2 hours ago',
    orders: 24,
    spentTotal: '$1,245.60',
    status: 'active',
    avatar: '/placeholder.svg',
    type: 'customer',
    tags: ['frequent buyer', 'halal food enthusiast']
  },
  { 
    id: 'USR-10387', 
    name: 'Fatima Zahra', 
    email: 'fatima.zahra@example.com',
    phone: '+44 7700 900456',
    joinDate: 'January 3, 2022',
    lastActive: '5 days ago',
    orders: 16,
    spentTotal: '$824.30',
    status: 'active',
    avatar: '/placeholder.svg',
    type: 'customer',
    tags: ['vegetarian', 'subscription user']
  },
  { 
    id: 'USR-10298', 
    name: 'Mohammed Nur', 
    email: 'mohammed.nur@example.com',
    phone: '+44 7700 900789',
    joinDate: 'March 22, 2022',
    lastActive: '1 day ago',
    orders: 32,
    spentTotal: '$1,956.45',
    status: 'active',
    avatar: '/placeholder.svg',
    type: 'customer',
    tags: ['frequent buyer', 'premium member']
  },
  { 
    id: 'USR-10156', 
    name: 'Layla Rahman', 
    email: 'layla.rahman@example.com',
    phone: '+44 7700 900234',
    joinDate: 'June 5, 2022',
    lastActive: '12 hours ago',
    orders: 8,
    spentTotal: '$356.75',
    status: 'active',
    avatar: '/placeholder.svg',
    type: 'customer',
    tags: ['new user']
  },
  { 
    id: 'USR-9987', 
    name: 'Omar Khan', 
    email: 'omar.khan@example.com',
    phone: '+44 7700 900567',
    joinDate: 'February 18, 2022',
    lastActive: '3 weeks ago',
    orders: 5,
    spentTotal: '$143.20',
    status: 'inactive',
    avatar: '/placeholder.svg',
    type: 'customer',
    tags: ['inactive']
  },
  { 
    id: 'USR-6024', 
    name: 'Aisha Mahmood', 
    email: 'aisha.mahmood@example.com',
    phone: '+44 7700 900890',
    joinDate: 'April 10, 2021',
    lastActive: 'online now',
    orders: 67,
    spentTotal: '$3,421.80',
    status: 'active',
    avatar: '/placeholder.svg',
    type: 'customer',
    tags: ['VIP customer', 'frequent buyer']
  },
  { 
    id: 'ADM-1024', 
    name: 'Zainab Malik', 
    email: 'zainab.admin@halvi.co',
    phone: '+44 7700 900111',
    joinDate: 'January 5, 2021',
    lastActive: 'online now',
    orders: 0,
    spentTotal: '$0.00',
    status: 'active',
    avatar: '/placeholder.svg',
    type: 'admin',
    tags: ['super admin']
  },
  { 
    id: 'SUP-2048', 
    name: 'Yusuf Ahmed', 
    email: 'yusuf.support@halvi.co',
    phone: '+44 7700 900222',
    joinDate: 'March 15, 2021',
    lastActive: '30 minutes ago',
    orders: 0,
    spentTotal: '$0.00',
    status: 'active',
    avatar: '/placeholder.svg',
    type: 'support',
    tags: ['tier 2 support']
  },
];

const shopsUsers = [
  { 
    id: 'SHP-342', 
    name: 'Baraka Halal Meats', 
    ownerName: 'Hassan Abdullah',
    email: 'contact@barakahalal.com',
    phone: '+44 7700 900456',
    joinDate: 'Jan 5, 2021',
    lastActive: '3 hours ago',
    orders: 1245,
    revenue: '$85,420.50',
    status: 'active',
    avatar: '/placeholder.svg',
    type: 'shop',
    category: 'Butcher',
    tags: ['verified', 'high performer']
  },
  { 
    id: 'SHP-287', 
    name: 'Medina Spices', 
    ownerName: 'Fatima Zaidi',
    email: 'info@medinaspices.com',
    phone: '+44 7700 900789',
    joinDate: 'Feb 12, 2021',
    lastActive: '1 day ago',
    orders: 892,
    revenue: '$42,150.25',
    status: 'active',
    avatar: '/placeholder.svg',
    type: 'shop',
    category: 'Grocery',
    tags: ['verified']
  },
  { 
    id: 'SHP-209', 
    name: 'Halal Sweet Delights', 
    ownerName: 'Ahmed Malik',
    email: 'hello@halalsweets.com',
    phone: '+44 7700 900123',
    joinDate: 'Apr 8, 2021',
    lastActive: '5 hours ago',
    orders: 734,
    revenue: '$36,780.15',
    status: 'active',
    avatar: '/placeholder.svg',
    type: 'shop',
    category: 'Confectionery',
    tags: ['verified', 'trending']
  },
  { 
    id: 'SHP-176', 
    name: 'Al-Madina Bakery', 
    ownerName: 'Zainab Hassan',
    email: 'orders@madinabakery.com',
    phone: '+44 7700 900456',
    joinDate: 'Mar 22, 2021',
    lastActive: 'online now',
    orders: 982,
    revenue: '$52,340.60',
    status: 'active',
    avatar: '/placeholder.svg',
    type: 'shop',
    category: 'Bakery',
    tags: ['verified', 'high performer']
  },
  { 
    id: 'SHP-123', 
    name: 'Sunnah Foods', 
    ownerName: 'Omar Farooq',
    email: 'omar@sunnahfoods.com',
    phone: '+44 7700 900789',
    joinDate: 'May 15, 2021',
    lastActive: '2 days ago',
    orders: 563,
    revenue: '$29,450.80',
    status: 'suspended',
    avatar: '/placeholder.svg',
    type: 'shop',
    category: 'Restaurant',
    tags: ['under review']
  }
];

const UsersPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [userTypeFilter, setUserTypeFilter] = useState('all');
  const [userStatusFilter, setUserStatusFilter] = useState('all');

  const allUsers = [...usersList, ...shopsUsers];
  
  const filteredUsers = allUsers.filter(user => 
    (userTypeFilter === 'all' || user.type === userTypeFilter) && 
    (userStatusFilter === 'all' || user.status === userStatusFilter) &&
    (user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
     user.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
     (user.email && user.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
     (user.tags && user.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))))
  );

  return (
    <DashboardLayout title="User Management">
      <PageHeader 
        title="User Management" 
        description="Manage all platform users, customers, shops, admins, and support staff"
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <Filter size={14} />
              Filters
            </Button>
            <Button size="sm" className="h-8 gap-1">
              <Plus size={14} />
              Add User
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold mt-1">32,659</p>
              </div>
              <div className="rounded-lg p-2 bg-primary/10">
                <UsersIcon className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs">
              <div className="text-green-500 flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                12.5%
              </div>
              <span className="ml-1 text-muted-foreground">from last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">New Users (MTD)</p>
                <p className="text-2xl font-bold mt-1">2,841</p>
              </div>
              <div className="rounded-lg p-2 bg-blue-500/10">
                <UserPlus className="h-5 w-5 text-blue-500" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs">
              <div className="text-green-500 flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                8.3%
              </div>
              <span className="ml-1 text-muted-foreground">vs last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Users</p>
                <p className="text-2xl font-bold mt-1">24,827</p>
              </div>
              <div className="rounded-lg p-2 bg-green-500/10">
                <UserIcon className="h-5 w-5 text-green-500" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs">
              <div className="text-green-500 flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                3.4%
              </div>
              <span className="ml-1 text-muted-foreground">vs last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">User Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="relative w-full sm:w-auto sm:min-w-[300px]">
              <Search className="absolute top-1/2 transform -translate-y-1/2 left-3 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input 
                placeholder="Search users..." 
                className="pl-9" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full sm:w-auto">
              <Button variant={userTypeFilter === 'all' ? 'default' : 'outline'} size="sm" onClick={() => setUserTypeFilter('all')}>
                All Users
              </Button>
              <Button variant={userTypeFilter === 'customer' ? 'default' : 'outline'} size="sm" onClick={() => setUserTypeFilter('customer')}>
                Customers
              </Button>
              <Button variant={userTypeFilter === 'shop' ? 'default' : 'outline'} size="sm" onClick={() => setUserTypeFilter('shop')}>
                Shops
              </Button>
              <Button variant={userTypeFilter === 'admin' ? 'default' : 'outline'} size="sm" onClick={() => setUserTypeFilter('admin')}>
                Admins
              </Button>
              <Button variant={userTypeFilter === 'support' ? 'default' : 'outline'} size="sm" onClick={() => setUserTypeFilter('support')}>
                Support
              </Button>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-6">
            <Badge variant={userStatusFilter === 'all' ? 'default' : 'outline'} className="cursor-pointer" onClick={() => setUserStatusFilter('all')}>
              All Status
            </Badge>
            <Badge variant={userStatusFilter === 'active' ? 'default' : 'outline'} className="cursor-pointer" onClick={() => setUserStatusFilter('active')}>
              Active
            </Badge>
            <Badge variant={userStatusFilter === 'inactive' ? 'default' : 'outline'} className="cursor-pointer" onClick={() => setUserStatusFilter('inactive')}>
              Inactive
            </Badge>
            <Badge variant={userStatusFilter === 'suspended' ? 'default' : 'outline'} className="cursor-pointer" onClick={() => setUserStatusFilter('suspended')}>
              Suspended
            </Badge>
          </div>
          
          <div className="overflow-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">User</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Type</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Contact</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Joined</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Last Active</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Orders/Revenue</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-muted/50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback className={`
                            ${user.type === 'customer' ? 'bg-blue-100 text-blue-500' : ''}
                            ${user.type === 'shop' ? 'bg-amber-100 text-amber-500' : ''}
                            ${user.type === 'admin' ? 'bg-purple-100 text-purple-500' : ''}
                            ${user.type === 'support' ? 'bg-green-100 text-green-500' : ''}
                          `}>
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className={`
                        ${user.type === 'customer' ? 'bg-blue-50 text-blue-600 border-blue-200' : ''}
                        ${user.type === 'shop' ? 'bg-amber-50 text-amber-600 border-amber-200' : ''}
                        ${user.type === 'admin' ? 'bg-purple-50 text-purple-600 border-purple-200' : ''}
                        ${user.type === 'support' ? 'bg-green-50 text-green-600 border-green-200' : ''}
                      `}>
                        {user.type === 'customer' && 'Customer'}
                        {user.type === 'shop' && (user.category || 'Shop')}
                        {user.type === 'admin' && 'Admin'}
                        {user.type === 'support' && 'Support'}
                      </Badge>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {user.tags && user.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs py-0 px-1 h-4">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-xs">
                          <Mail className="h-3 w-3 text-muted-foreground" />
                          <span>{user.email}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs">
                          <Phone className="h-3 w-3 text-muted-foreground" />
                          <span>{user.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <p className="text-sm">{user.joinDate}</p>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant={user.lastActive === 'online now' ? 'default' : 'outline'} className="font-normal">
                        {user.lastActive}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1">
                          <ShoppingCart className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm">{user.orders} orders</span>
                        </div>
                        <p className="text-sm font-medium">
                          {user.spentTotal || user.revenue}
                        </p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant={
                        user.status === 'active' ? 'success' : 
                        user.status === 'inactive' ? 'secondary' : 
                        'destructive'
                      }>
                        {user.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                          <UserIcon className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                          <MessageIcon className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="h-8">
                          More
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredUsers.length === 0 && (
              <div className="text-center py-12">
                <UsersIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No users found</h3>
                <p className="text-muted-foreground">Try adjusting your filters or search query</p>
              </div>
            )}
          </div>
          
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-muted-foreground">Showing {filteredUsers.length} of {allUsers.length} users</p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default UsersPage;
