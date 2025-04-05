import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import PageHeader from '@/components/admin/PageHeader';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart, 
  LineChart, 
  PieChart, 
  Clock, 
  ArrowUpRight, 
  ArrowDownRight, 
  Download, 
  Filter,
  ShoppingBag,
  Monitor,
  ChevronDown
} from 'lucide-react';
import { AreaChart, Area, BarChart2, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts';

// Mock data
const monthlyRevenue = [
  { name: 'Jan', revenue: 45000 },
  { name: 'Feb', revenue: 52000 },
  { name: 'Mar', revenue: 48000 },
  { name: 'Apr', revenue: 61000 },
  { name: 'May', revenue: 55000 },
  { name: 'Jun', revenue: 67000 },
  { name: 'Jul', revenue: 72000 },
  { name: 'Aug', revenue: 78000 },
  { name: 'Sep', revenue: 81000 },
  { name: 'Oct', revenue: 92000 },
  { name: 'Nov', revenue: 86000 },
  { name: 'Dec', revenue: 99000 }
];

const trafficSources = [
  { name: 'Direct', value: 40 },
  { name: 'Organic', value: 30 },
  { name: 'Referral', value: 20 },
  { name: 'Social', value: 10 },
];

const categoryPerformance = [
  { name: 'Halal Meat', sales: 28500, orders: 1245 },
  { name: 'Spices', sales: 22700, orders: 982 },
  { name: 'Sweets', sales: 18600, orders: 854 },
  { name: 'Frozen', sales: 14300, orders: 621 },
  { name: 'Bakery', sales: 12800, orders: 586 },
  { name: 'Beverages', sales: 8200, orders: 375 }
];

const userMetrics = [
  { name: 'Jan', newUsers: 1280, activeUsers: 7650 },
  { name: 'Feb', newUsers: 1420, activeUsers: 8100 },
  { name: 'Mar', newUsers: 1620, activeUsers: 8400 },
  { name: 'Apr', newUsers: 1890, activeUsers: 9120 },
  { name: 'May', newUsers: 2100, activeUsers: 9780 },
  { name: 'Jun', newUsers: 2340, activeUsers: 10250 },
];

const deviceBreakdown = [
  { name: 'Mobile', value: 68 },
  { name: 'Desktop', value: 26 },
  { name: 'Tablet', value: 6 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const topSellingItems = [
  { id: 1, name: 'Premium Halal Beef', category: 'Meat', sales: '$12,540', growth: '+12%', trend: 'up' },
  { id: 2, name: 'Organic Dates', category: 'Fruits', sales: '$8,350', growth: '+8%', trend: 'up' },
  { id: 3, name: 'Saffron Spice Pack', category: 'Spices', sales: '$6,720', growth: '-3%', trend: 'down' },
  { id: 4, name: 'Baklava Assortment', category: 'Sweets', sales: '$5,890', growth: '+15%', trend: 'up' },
];

const topShops = [
  { id: 1, name: 'Al-Baraka Meats', category: 'Butcher', revenue: '$68,290', orders: 578, growth: '+9%' },
  { id: 2, name: 'Medina Bakery', category: 'Bakery', revenue: '$42,150', orders: 413, growth: '+12%' },
  { id: 3, name: 'Noor Spice Market', category: 'Grocery', revenue: '$36,780', orders: 392, growth: '+7%' },
  { id: 4, name: 'Halal Delights', category: 'Restaurant', revenue: '$29,450', orders: 286, growth: '+5%' },
];

const AnalyticsPage = () => {
  const [dateRange, setDateRange] = useState('30days');

  return (
    <DashboardLayout title="Analytics & Insights">
      <PageHeader 
        title="Analytics & Insights" 
        description="Comprehensive view of platform performance and metrics"
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

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold mt-1">$865,420</p>
              </div>
              <div className="rounded-lg p-2 bg-primary/10">
                <CreditCard className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs">
              <div className="text-green-500 flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                8.2%
              </div>
              <span className="ml-1 text-muted-foreground">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
                <p className="text-2xl font-bold mt-1">12,847</p>
              </div>
              <div className="rounded-lg p-2 bg-blue-500/10">
                <ShoppingCart className="h-5 w-5 text-blue-500" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs">
              <div className="text-green-500 flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                5.4%
              </div>
              <span className="ml-1 text-muted-foreground">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Shops</p>
                <p className="text-2xl font-bold mt-1">426</p>
              </div>
              <div className="rounded-lg p-2 bg-amber-500/10">
                <StoreIcon className="h-5 w-5 text-amber-500" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs">
              <div className="text-green-500 flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                3.1%
              </div>
              <span className="ml-1 text-muted-foreground">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Users</p>
                <p className="text-2xl font-bold mt-1">32,659</p>
              </div>
              <div className="rounded-lg p-2 bg-green-500/10">
                <Users className="h-5 w-5 text-green-500" />
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
      </div>

      <div className="grid grid-cols-1 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-1">
              <CardTitle className="text-lg font-medium">Revenue Overview</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className={dateRange === '7days' ? 'bg-primary text-primary-foreground' : ''} onClick={() => setDateRange('7days')}>
                7D
              </Button>
              <Button variant="outline" size="sm" className={dateRange === '30days' ? 'bg-primary text-primary-foreground' : ''} onClick={() => setDateRange('30days')}>
                30D
              </Button>
              <Button variant="outline" size="sm" className={dateRange === '90days' ? 'bg-primary text-primary-foreground' : ''} onClick={() => setDateRange('90days')}>
                90D
              </Button>
              <Button variant="outline" size="sm" className={dateRange === '1year' ? 'bg-primary text-primary-foreground' : ''} onClick={() => setDateRange('1year')}>
                1Y
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={monthlyRevenue} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" stroke="#8884d8" fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sales">Sales Analytics</TabsTrigger>
          <TabsTrigger value="users">User Metrics</TabsTrigger>
          <TabsTrigger value="shops">Shop Performance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Traffic Sources</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={260}>
                  <PieChart>
                    <Pie
                      data={trafficSources}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {trafficSources.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Device Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <Smartphone size={20} className="text-blue-500" />
                    </div>
                    <div>
                      <p className="font-medium">Mobile</p>
                      <p className="text-sm text-muted-foreground">68% of visits</p>
                    </div>
                  </div>
                  <div className="text-xl font-bold">22,541</div>
                </div>
                
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <Desktop size={20} className="text-green-500" />
                    </div>
                    <div>
                      <p className="font-medium">Desktop</p>
                      <p className="text-sm text-muted-foreground">26% of visits</p>
                    </div>
                  </div>
                  <div className="text-xl font-bold">8,591</div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                      <Smartphone size={20} className="text-orange-500" />
                    </div>
                    <div>
                      <p className="font-medium">Tablet</p>
                      <p className="text-sm text-muted-foreground">6% of visits</p>
                    </div>
                  </div>
                  <div className="text-xl font-bold">1,984</div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Category Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={categoryPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                  <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="sales" name="Sales ($)" fill="#8884d8" />
                  <Bar yAxisId="right" dataKey="orders" name="Orders" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Top Selling Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-5">
                  {topSellingItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                          <ShoppingCart size={18} className="text-purple-500" />
                        </div>
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">{item.category}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <p className="font-bold">{item.sales}</p>
                        <p className={`text-xs flex items-center ${item.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                          {item.trend === 'up' ? (
                            <ArrowUpRight className="h-3 w-3 mr-1" />
                          ) : (
                            <ArrowDownRight className="h-3 w-3 mr-1" />
                          )}
                          {item.growth}
                        </p>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Top Performing Shops</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-5">
                  {topShops.map((shop) => (
                    <div key={shop.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                          <StoreIcon size={18} className="text-amber-500" />
                        </div>
                        <div>
                          <p className="font-medium">{shop.name}</p>
                          <p className="text-sm text-muted-foreground">{shop.category}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <p className="font-bold">{shop.revenue}</p>
                        <p className="text-xs text-green-500 flex items-center">
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                          {shop.growth}
                        </p>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="sales" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Sales</p>
                    <p className="text-2xl font-bold mt-1">$865,420</p>
                  </div>
                  <div className="rounded-lg p-2 bg-primary/10">
                    <CreditCard className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-xs">
                  <div className="text-green-500 flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    8.2%
                  </div>
                  <span className="ml-1 text-muted-foreground">vs last period</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Avg. Order Value</p>
                    <p className="text-2xl font-bold mt-1">$67.32</p>
                  </div>
                  <div className="rounded-lg p-2 bg-blue-500/10">
                    <Activity className="h-5 w-5 text-blue-500" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-xs">
                  <div className="text-green-500 flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    3.1%
                  </div>
                  <span className="ml-1 text-muted-foreground">vs last period</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Conversion Rate</p>
                    <p className="text-2xl font-bold mt-1">3.8%</p>
                  </div>
                  <div className="rounded-lg p-2 bg-green-500/10">
                    <BarChart2 className="h-5 w-5 text-green-500" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-xs">
                  <div className="text-green-500 flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    0.5%
                  </div>
                  <span className="ml-1 text-muted-foreground">vs last period</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Sales Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium mb-4">Sales by Category</h4>
                  <ResponsiveContainer width="100%" height={240}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Halal Meat', value: 45 },
                          { name: 'Spices', value: 20 },
                          { name: 'Sweets', value: 15 },
                          { name: 'Frozen', value: 10 },
                          { name: 'Bakery', value: 10 },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {categoryPerformance.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-4">Sales Timeline</h4>
                  <ResponsiveContainer width="100%" height={240}>
                    <BarChart data={monthlyRevenue.slice(6)}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="revenue" name="Revenue" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t">
                <h4 className="text-sm font-medium mb-4">Top Selling Shops</h4>
                <div className="space-y-4">
                  {topShops.slice(0, 3).map((shop) => (
                    <div key={shop.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                          <StoreIcon size={18} className="text-amber-500" />
                        </div>
                        <div>
                          <p className="font-medium">{shop.name}</p>
                          <p className="text-sm text-muted-foreground">{shop.orders} orders</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <p className="font-bold">{shop.revenue}</p>
                        <p className="text-xs text-green-500 flex items-center">
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                          {shop.growth}
                        </p>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex justify-center">
                  <Button variant="outline" size="sm" className="gap-1">
                    <ArrowRight className="h-4 w-4" />
                    View All Shops
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="users" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                    <p className="text-2xl font-bold mt-1">32,659</p>
                  </div>
                  <div className="rounded-lg p-2 bg-primary/10">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-xs">
                  <div className="text-green-500 flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    12.5%
                  </div>
                  <span className="ml-1 text-muted-foreground">growth</span>
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
                    <Users className="h-5 w-5 text-blue-500" />
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
                    <p className="text-sm font-medium text-muted-foreground">Active Rate</p>
                    <p className="text-2xl font-bold mt-1">76.2%</p>
                  </div>
                  <div className="rounded-lg p-2 bg-green-500/10">
                    <Activity className="h-5 w-5 text-green-500" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-xs">
                  <div className="text-green-500 flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    2.1%
                  </div>
                  <span className="ml-1 text-muted-foreground">vs last month</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">User Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={userMetrics} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <defs>
                    <linearGradient id="colorNewUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorActiveUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="newUsers" name="New Users" stroke="#3b82f6" fillOpacity={1} fill="url(#colorNewUsers)" />
                  <Area type="monotone" dataKey="activeUsers" name="Active Users" stroke="#10b981" fillOpacity={1} fill="url(#colorActiveUsers)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">User Demographics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm">Age Groups</p>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-xs text-muted-foreground">18-24</p>
                          <p className="text-xs font-medium">24%</p>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-primary rounded-full h-2" style={{ width: '24%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-xs text-muted-foreground">25-34</p>
                          <p className="text-xs font-medium">38%</p>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-primary rounded-full h-2" style={{ width: '38%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-xs text-muted-foreground">35-44</p>
                          <p className="text-xs font-medium">27%</p>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-primary rounded-full h-2" style={{ width: '27%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-xs text-muted-foreground">45+</p>
                          <p className="text-xs font-medium">11%</p>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-primary rounded-full h-2" style={{ width: '11%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-1 mt-4">
                      <p className="text-sm">Top Cities</p>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-xs text-muted-foreground">London</p>
                          <p className="text-xs font-medium">22%</p>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-blue-500 rounded-full h-2" style={{ width: '22%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-xs text-muted-foreground">Birmingham</p>
                          <p className="text-xs font-medium">18%</p>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-blue-500 rounded-full h-2" style={{ width: '18%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-xs text-muted-foreground">Manchester</p>
                          <p className="text-xs font-medium">14%</p>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-blue-500 rounded-full h-2" style={{ width: '14%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-xs text-muted-foreground">Leeds</p>
                          <p className="text-xs font-medium">9%</p>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-blue-500 rounded-full h-2" style={{ width: '9%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">User Engagement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                        <Activity size={20} className="text-blue-500" />
                      </div>
                      <div>
                        <p className="font-medium">Avg. Session Duration</p>
                        <p className="text-sm text-muted-foreground">Time spent on platform</p>
                      </div>
                    </div>
                    <div className="text-xl font-bold">6m 42s</div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                        <ShoppingCart size={20} className="text-green-500" />
                      </div>
                      <div>
                        <p className="font-medium">Cart Completion Rate</p>
                        <p className="text-sm text-muted-foreground">Carts to purchases</p>
                      </div>
                    </div>
                    <div className="text-xl font-bold">68%</div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                        <BarChart3 size={20} className="text-purple-500" />
                      </div>
                      <div>
                        <p className="font-medium">Pages Per Session</p>
                        <p className="text-sm text-muted-foreground">Avg pages viewed</p>
                      </div>
                    </div>
                    <div className="text-xl font-bold">4.2</div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                        <Users size={20} className="text-amber-500" />
                      </div>
                      <div>
                        <p className="font-medium">User Retention</p>
                        <p className="text-sm text-muted-foreground">30-day retention</p>
                      </div>
                    </div>
                    <div className="text-xl font-bold">42%</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="shops" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Shops</p>
                    <p className="text-2xl font-bold mt-1">426</p>
                  </div>
                  <div className="rounded-lg p-2 bg-primary/10">
                    <StoreIcon className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-xs">
                  <div className="text-green-500 flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    3.1%
                  </div>
                  <span className="ml-1 text-muted-foreground">vs last period</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">New Shops (MTD)</p>
                    <p className="text-2xl font-bold mt-1">24</p>
                  </div>
                  <div className="rounded-lg p-2 bg-blue-500/10">
                    <StoreIcon className="h-5 w-5 text-blue-500" />
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
                    <p className="text-sm font-medium text-muted-foreground">Avg Shop Rating</p>
                    <p className="text-2xl font-bold mt-1">4.6<span className="text-sm text-muted-foreground">/5</span></p>
                  </div>
                  <div className="rounded-lg p-2 bg-green-500/10">
                    <Activity className="h-5 w-5 text-green-500" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-xs">
                  <div className="text-green-500 flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    0.2
                  </div>
                  <span className="ml-1 text-muted-foreground">vs last month</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader className="pb-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <CardTitle className="text-lg font-medium">Shop Categories</CardTitle>
                <div className="flex items-center gap-2 flex-wrap">
                  <Button variant="outline" size="sm">All Categories</Button>
                  <Button variant="outline" size="sm">Best Performers</Button>
                  <Button variant="outline" size="sm">Needs Attention</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-sm font-medium">Shops by Category</h4>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-xs">Halal Restaurants</p>
                          <p className="text-xs font-medium">128 shops (30%)</p>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-primary rounded-full h-2" style={{ width: '30%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-xs">Butcher Shops</p>
                          <p className="text-xs font-medium">97 shops (23%)</p>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-primary rounded-full h-2" style={{ width: '23%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-xs">Bakeries</p>
                          <p className="text-xs font-medium">76 shops (18%)</p>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-primary rounded-full h-2" style={{ width: '18%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-xs">Grocery Stores</p>
                          <p className="text-xs font-medium">64 shops (15%)</p>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-primary rounded-full h-2" style={{ width: '15%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-xs">Others</p>
                          <p className="text-xs font-medium">61 shops (14%)</p>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-primary rounded-full h-2" style={{ width: '14%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-sm font-medium">Recent Shops</h4>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-2 rounded border hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                            <StoreIcon size={16} className="text-amber-500" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Al-Baraka Butchers</p>
                            <p className="text-xs text-muted-foreground">Joined 2 days ago</p>
                          </div>
                        </div>
                        <Badge>Butcher</Badge>
                      </div>
                      
                      <div className="flex items-center justify-between p-2 rounded border hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                            <StoreIcon size={16} className="text-amber-500" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Zaytoon Bakery</p>
                            <p className="text-xs text-muted-foreground">Joined 3 days ago</p>
                          </div>
                        </div>
                        <Badge>Bakery</Badge>
                      </div>
                      
                      <div className="flex items-center justify-between p-2 rounded border hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                            <StoreIcon size={16} className="text-amber-500" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Sunnah Restaurant</p>
                            <p className="text-xs text-muted-foreground">Joined 5 days ago</p>
                          </div>
                        </div>
                        <Badge>Restaurant</Badge>
                      </div>
                      
                      <div className="flex items-center justify-between p-2 rounded border hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                            <StoreIcon size={16} className="text-amber-500" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Halal Sweet Shop</p>
                            <p className="text-xs text-muted-foreground">Joined 6 days ago</p>
                          </div>
                        </div>
                        <Badge>Confectionery</Badge>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-medium">Top Performing Shops</h4>
                    <Button variant="outline" size="sm">View All</Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {topShops.map((shop) => (
                      <Card key={shop.id} className="overflow-hidden">
                        <div className="h-12 bg-gradient-to-r from-primary to-primary-foreground opacity-20"></div>
                        <CardContent className="-mt-6 relative">
                          <div className="absolute top-0 left-4 h-12 w-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center border-4 border-background">
                            <StoreIcon size={20} className="text-amber-500" />
                          </div>
                          <div className="pt-8">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium">{shop.name}</h3>
                              <Badge variant="outline">{shop.category}</Badge>
                            </div>
                            <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
                              <div>
                                <p className="text-muted-foreground">Revenue</p>
                                <p className="font-medium">{shop.revenue}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Orders</p>
                                <p className="font-medium">{shop.orders}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Growth</p>
                                <p className="font-medium text-green-500">{shop.growth}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Rating</p>
                                <p className="font-medium">4.8/5</p>
                              </div>
                            </div>
                            <div className="mt-4 pt-4 border-t flex items-center justify-between">
                              <Button variant="ghost" size="sm">View Details</Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default AnalyticsPage;
