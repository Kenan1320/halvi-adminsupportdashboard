import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import PageHeader from '@/components/admin/PageHeader';
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Filter, 
  Download, 
  Search, 
  MoreVertical, 
  Mail, 
  Phone,
  User,
  Store
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const usersData = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    type: "user",
    status: "active",
    lastLogin: "2024-03-15T14:30:00Z",
    ordersCount: 15,
    spentTotal: 540.50,
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "987-654-3210",
    type: "user",
    status: "inactive",
    lastLogin: "2024-02-28T09:15:00Z",
    ordersCount: 8,
    spentTotal: 285.00,
  },
  {
    id: 3,
    name: "Shop ABC",
    email: "info@shopabc.com",
    phone: "555-123-4567",
    type: "shop",
    category: "Grocery",
    status: "active",
    lastLogin: "2024-03-18T18:45:00Z",
    ordersCount: 120,
    revenue: 3200.00,
  },
  {
    id: 4,
    name: "Marketplace XYZ",
    email: "contact@marketplacexyz.com",
    phone: "555-987-6543",
    type: "shop",
    category: "Electronics",
    status: "pending",
    lastLogin: "2024-03-01T11:00:00Z",
    ordersCount: 85,
    revenue: 1850.75,
  },
  {
    id: 5,
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    phone: "111-222-3333",
    type: "user",
    status: "active",
    lastLogin: "2024-03-20T20:00:00Z",
    ordersCount: 22,
    spentTotal: 765.25,
  },
  {
    id: 6,
    name: "Bob Williams",
    email: "bob.williams@example.com",
    phone: "444-555-6666",
    type: "user",
    status: "inactive",
    lastLogin: "2024-02-15T16:45:00Z",
    ordersCount: 5,
    spentTotal: 120.00,
  },
  {
    id: 7,
    name: "Store 123",
    email: "sales@store123.com",
    phone: "777-888-9999",
    type: "shop",
    category: "Clothing",
    status: "active",
    lastLogin: "2024-03-22T08:30:00Z",
    ordersCount: 200,
    revenue: 5500.50,
  },
  {
    id: 8,
    name: "Online Shop",
    email: "support@onlineshop.com",
    phone: "333-222-1111",
    type: "shop",
    category: "Home Goods",
    status: "pending",
    lastLogin: "2024-03-10T13:00:00Z",
    ordersCount: 92,
    revenue: 2100.00,
  },
  {
    id: 9,
    name: "Charlie Brown",
    email: "charlie.brown@example.com",
    phone: "666-777-8888",
    type: "user",
    status: "active",
    lastLogin: "2024-03-24T10:15:00Z",
    ordersCount: 30,
    spentTotal: 980.75,
  },
  {
    id: 10,
    name: "Diana Miller",
    email: "diana.miller@example.com",
    phone: "222-333-4444",
    type: "user",
    status: "inactive",
    lastLogin: "2024-02-01T22:00:00Z",
    ordersCount: 3,
    spentTotal: 75.00,
  },
];

const UsersPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredUsers = usersData.filter(user => {
    const searchTerm = searchQuery.toLowerCase();
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm) ||
      user.phone.includes(searchTerm);

    const matchesFilter =
      filter === 'all' ||
      (filter === 'active' && user.status === 'active') ||
      (filter === 'inactive' && user.status === 'inactive') ||
      (filter === 'users' && user.type === 'user') ||
      (filter === 'shops' && user.type === 'shop');

    return matchesSearch && matchesFilter;
  });

  return (
    <DashboardLayout title="Users">
      <PageHeader
        title="Users"
        description="Manage users and shops"
        actions={
          <div className="flex items-center space-x-2">
            <Input
              type="search"
              placeholder="Search users..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <Button variant="outline" size="sm" className="gap-1">
              <Filter size={14} />
              Filters
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Download size={14} />
              Export
            </Button>
          </div>
        }
      />

      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Users List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Phone
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Login
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Orders/Revenue
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map(user => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="mr-4">
                            <Avatar>
                              <AvatarImage src={`https://api.dicebear.com/7.x/ лица/svg?seed=${user.id}`} />
                              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{user.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          <a href={`tel:${user.phone}`} className="hover:text-blue-500 transition-colors">
                            {user.phone}
                          </a>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.type === 'shop' ? (
                          <div className="text-sm text-gray-900 flex items-center gap-2">
                            <Store className="h-4 w-4" />
                            Shop
                          </div>
                        ) : (
                          <div className="text-sm text-gray-900 flex items-center gap-2">
                            <User className="h-4 w-4" />
                            User
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.status === 'active' ? (
                          <Badge variant="default" className="bg-green-500 hover:bg-green-600">Active</Badge>
                        ) : (
                          <Badge variant="outline">Inactive</Badge>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{new Date(user.lastLogin).toLocaleDateString()}</div>
                        <div className="text-sm text-gray-500">{new Date(user.lastLogin).toLocaleTimeString()}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="font-medium">{'spentTotal' in user ? user.spentTotal : ('revenue' in user ? user.revenue : '-')}</p>
                        {user.type === 'shop' && 'category' in user ? (
                          <p className="text-sm text-muted-foreground">{user.category}</p>
                        ) : null}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>
                              <a href={`mailto:${user.email}`} className="flex items-center gap-2">
                                <Mail className="h-4 w-4 mr-2" />
                                Contact User
                              </a>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <a href={`tel:${user.phone}`} className="flex items-center gap-2">
                                <Phone className="h-4 w-4 mr-2" />
                                Call User
                              </a>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default UsersPage;
