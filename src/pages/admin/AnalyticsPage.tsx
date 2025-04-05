
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import PageHeader from '@/components/admin/PageHeader';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import StatisticsCard from '@/components/admin/StatisticsCard';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  BarChart2, 
  LineChart, 
  PieChart, 
  Users, 
  ShoppingCart, 
  TrendingUp, 
  Calendar, 
  Download, 
  Share2,
  Filter,
  MapPin,
  ShoppingBag,
  Star,
  Search,
  Smartphone,
  Laptop,
  CalendarClock,
  PlusCircle,
  Save,
  Send
} from 'lucide-react';

const AnalyticsPage = () => {
  return (
    <DashboardLayout title="Analytics & Reporting">
      <PageHeader 
        title="Analytics & Reporting" 
        description="Comprehensive insights and data analysis for your platform"
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Calendar size={16} className="mr-2" />
              Last 30 Days
            </Button>
            <Button variant="outline">
              <Download size={16} className="mr-2" />
              Export
            </Button>
            <Button variant="outline">
              <Share2 size={16} className="mr-2" />
              Share
            </Button>
          </div>
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
          title="Total Orders" 
          value="8,742" 
          change={{ value: 12.5, isPositive: true }} 
          icon={<ShoppingCart size={20} />}
        />
        <StatisticsCard 
          title="Total Revenue" 
          value="$278,942" 
          change={{ value: 15.8, isPositive: true }} 
          icon={<TrendingUp size={20} />}
        />
        <StatisticsCard 
          title="Avg. Order Value" 
          value="$86.45" 
          change={{ value: 3.2, isPositive: true }} 
          icon={<BarChart2 size={20} />}
        />
      </div>

      <Card className="mb-6">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none px-4 h-auto bg-transparent">
            <TabsTrigger value="overview" className="py-3 px-4">Platform Overview</TabsTrigger>
            <TabsTrigger value="sales" className="py-3 px-4">Sales Analytics</TabsTrigger>
            <TabsTrigger value="user" className="py-3 px-4">User Behavior</TabsTrigger>
            <TabsTrigger value="marketing" className="py-3 px-4">Marketing Impact</TabsTrigger>
            <TabsTrigger value="custom" className="py-3 px-4">Custom Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="p-4 mt-0">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium">Platform Performance Overview</h3>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Filter size={14} className="mr-2" />
                  Filters
                </Button>
                <Button variant="outline" size="sm">
                  <Calendar size={14} className="mr-2" />
                  Date Range
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card className="p-4 h-80 flex items-center justify-center">
                <div className="text-center">
                  <LineChart size={36} className="mx-auto text-muted-foreground/50 mb-2" />
                  <h3 className="text-lg font-medium">Revenue Trends</h3>
                  <p className="text-sm text-muted-foreground">Monthly revenue for the past 12 months</p>
                </div>
              </Card>
              
              <Card className="p-4 h-80 flex items-center justify-center">
                <div className="text-center">
                  <BarChart2 size={36} className="mx-auto text-muted-foreground/50 mb-2" />
                  <h3 className="text-lg font-medium">Order Volume</h3>
                  <p className="text-sm text-muted-foreground">Orders processed per month</p>
                </div>
              </Card>
              
              <Card className="p-4 h-80 flex items-center justify-center">
                <div className="text-center">
                  <PieChart size={36} className="mx-auto text-muted-foreground/50 mb-2" />
                  <h3 className="text-lg font-medium">Product Categories</h3>
                  <p className="text-sm text-muted-foreground">Sales distribution by category</p>
                </div>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Card className="p-4">
                <h3 className="font-medium mb-4">Top Performing Shops</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                        <Store size={16} className="text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Halal Delights</p>
                        <p className="text-xs text-muted-foreground">Food & Grocery</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">$24,587</p>
                      <p className="text-xs text-green-500">+18.5% MoM</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                        <Store size={16} className="text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Zabiha Meats</p>
                        <p className="text-xs text-muted-foreground">Meat & Poultry</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">$18,942</p>
                      <p className="text-xs text-green-500">+12.3% MoM</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                        <Store size={16} className="text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Modest Fashion Co</p>
                        <p className="text-xs text-muted-foreground">Clothing</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">$15,876</p>
                      <p className="text-xs text-green-500">+9.7% MoM</p>
                    </div>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4">
                <h3 className="font-medium mb-4">Geographic Distribution</h3>
                <div className="flex items-center justify-center h-40">
                  <div className="text-center">
                    <MapPin size={36} className="mx-auto text-muted-foreground/50 mb-2" />
                    <p className="text-sm text-muted-foreground">Geographic map will be displayed here</p>
                  </div>
                </div>
                <div className="space-y-3 mt-4">
                  <div className="flex justify-between">
                    <span className="text-sm">United States</span>
                    <span className="text-sm font-medium">42%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">United Kingdom</span>
                    <span className="text-sm font-medium">18%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Canada</span>
                    <span className="text-sm font-medium">12%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Australia</span>
                    <span className="text-sm font-medium">8%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Other</span>
                    <span className="text-sm font-medium">20%</span>
                  </div>
                </div>
              </Card>
            </div>
            
            <Card className="p-4">
              <h3 className="font-medium mb-4">Platform Growth Metrics</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-muted/50 rounded-md p-3">
                  <h4 className="text-sm font-medium mb-2">User Growth</h4>
                  <div className="flex items-center gap-2">
                    <div className="text-2xl font-bold">+24%</div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Year over year</p>
                </div>
                
                <div className="bg-muted/50 rounded-md p-3">
                  <h4 className="text-sm font-medium mb-2">Shop Growth</h4>
                  <div className="flex items-center gap-2">
                    <div className="text-2xl font-bold">+18%</div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Year over year</p>
                </div>
                
                <div className="bg-muted/50 rounded-md p-3">
                  <h4 className="text-sm font-medium mb-2">Product Growth</h4>
                  <div className="flex items-center gap-2">
                    <div className="text-2xl font-bold">+32%</div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Year over year</p>
                </div>
                
                <div className="bg-muted/50 rounded-md p-3">
                  <h4 className="text-sm font-medium mb-2">Revenue Growth</h4>
                  <div className="flex items-center gap-2">
                    <div className="text-2xl font-bold">+27%</div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Year over year</p>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="sales" className="p-4 mt-0">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium">Sales Performance Analytics</h3>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Filter size={14} className="mr-2" />
                  Filters
                </Button>
                <Button variant="outline" size="sm">
                  <Download size={14} className="mr-2" />
                  Export Data
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <StatisticsCard 
                title="Total Sales" 
                value="$278,942" 
                change={{ value: 15.8, isPositive: true }} 
              />
              <StatisticsCard 
                title="Conversion Rate" 
                value="3.8%" 
                change={{ value: 0.5, isPositive: true }} 
              />
              <StatisticsCard 
                title="Cart Abandonment" 
                value="24.3%" 
                change={{ value: 2.1, isPositive: true }} 
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Card className="p-4 h-80 flex items-center justify-center">
                <div className="text-center">
                  <LineChart size={36} className="mx-auto text-muted-foreground/50 mb-2" />
                  <h3 className="text-lg font-medium">Sales Trends</h3>
                  <p className="text-sm text-muted-foreground">Weekly sales performance</p>
                </div>
              </Card>
              
              <Card className="p-4 h-80 flex items-center justify-center">
                <div className="text-center">
                  <BarChart2 size={36} className="mx-auto text-muted-foreground/50 mb-2" />
                  <h3 className="text-lg font-medium">Top Product Categories</h3>
                  <p className="text-sm text-muted-foreground">Sales by product category</p>
                </div>
              </Card>
            </div>
            
            <Card className="p-4 mb-6">
              <h3 className="font-medium mb-4">Top Selling Products</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50 text-muted-foreground text-xs">
                    <tr>
                      <th className="px-4 py-3 text-left font-medium">Product</th>
                      <th className="px-4 py-3 text-left font-medium">Category</th>
                      <th className="px-4 py-3 text-left font-medium">Price</th>
                      <th className="px-4 py-3 text-left font-medium">Units Sold</th>
                      <th className="px-4 py-3 text-left font-medium">Revenue</th>
                      <th className="px-4 py-3 text-left font-medium">Growth</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    <tr>
                      <td className="px-4 py-3">Premium Halal Beef</td>
                      <td className="px-4 py-3">Meat</td>
                      <td className="px-4 py-3">$24.99</td>
                      <td className="px-4 py-3">1,245</td>
                      <td className="px-4 py-3">$31,112.55</td>
                      <td className="px-4 py-3 text-green-500">+22%</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">Modest Hijab - Blue</td>
                      <td className="px-4 py-3">Clothing</td>
                      <td className="px-4 py-3">$19.99</td>
                      <td className="px-4 py-3">987</td>
                      <td className="px-4 py-3">$19,720.13</td>
                      <td className="px-4 py-3 text-green-500">+15%</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">Organic Dates Pack</td>
                      <td className="px-4 py-3">Food</td>
                      <td className="px-4 py-3">$12.99</td>
                      <td className="px-4 py-3">1,478</td>
                      <td className="px-4 py-3">$19,199.22</td>
                      <td className="px-4 py-3 text-green-500">+28%</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">Prayer Rug - Luxury</td>
                      <td className="px-4 py-3">Home</td>
                      <td className="px-4 py-3">$49.99</td>
                      <td className="px-4 py-3">349</td>
                      <td className="px-4 py-3">$17,446.51</td>
                      <td className="px-4 py-3 text-green-500">+8%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-4">
                <h3 className="font-medium mb-4">Sales by Payment Method</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Credit Card</span>
                      <span>68%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-halvi-accent h-2 rounded-full" style={{ width: '68%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>PayPal</span>
                      <span>22%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-halvi-amber h-2 rounded-full" style={{ width: '22%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Apple Pay</span>
                      <span>8%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-halvi-royal h-2 rounded-full" style={{ width: '8%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Other</span>
                      <span>2%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-gray-500 h-2 rounded-full" style={{ width: '2%' }}></div>
                    </div>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4">
                <h3 className="font-medium mb-4">Return Rate by Category</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Clothing</span>
                    <span className="text-sm font-medium">8.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Electronics</span>
                    <span className="text-sm font-medium">5.7%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Food</span>
                    <span className="text-sm font-medium">1.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Home Goods</span>
                    <span className="text-sm font-medium">3.8%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Books</span>
                    <span className="text-sm font-medium">2.1%</span>
                  </div>
                  <div className="flex justify-between font-medium mt-2">
                    <span className="text-sm">Overall Return Rate</span>
                    <span className="text-sm">4.3%</span>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="user" className="p-4 mt-0">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium">User Behavior Analysis</h3>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Filter size={14} className="mr-2" />
                  Filters
                </Button>
                <Button variant="outline" size="sm">
                  <Download size={14} className="mr-2" />
                  Export Data
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <StatisticsCard 
                title="Active Users" 
                value="8,712" 
                change={{ value: 12.3, isPositive: true }} 
                icon={<Users size={20} />}
              />
              <StatisticsCard 
                title="New Sign-ups" 
                value="547" 
                change={{ value: 8.7, isPositive: true }} 
                description="This month" 
              />
              <StatisticsCard 
                title="Avg. Session Duration" 
                value="8m 24s" 
                change={{ value: 1.2, isPositive: true }} 
              />
              <StatisticsCard 
                title="Bounce Rate" 
                value="32.4%" 
                change={{ value: 2.1, isPositive: true }} 
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Card className="p-4 h-80 flex items-center justify-center">
                <div className="text-center">
                  <LineChart size={36} className="mx-auto text-muted-foreground/50 mb-2" />
                  <h3 className="text-lg font-medium">User Growth Trends</h3>
                  <p className="text-sm text-muted-foreground">Monthly user acquisition</p>
                </div>
              </Card>
              
              <Card className="p-4 h-80 flex items-center justify-center">
                <div className="text-center">
                  <PieChart size={36} className="mx-auto text-muted-foreground/50 mb-2" />
                  <h3 className="text-lg font-medium">User Demographics</h3>
                  <p className="text-sm text-muted-foreground">Age and gender distribution</p>
                </div>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card className="p-4">
                <h3 className="font-medium mb-4">User Engagement</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Daily Active Users</span>
                      <span>3,241</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-halvi-accent h-2 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Weekly Active Users</span>
                      <span>5,872</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-halvi-accent h-2 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Monthly Active Users</span>
                      <span>8,712</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-halvi-accent h-2 rounded-full" style={{ width: '95%' }}></div>
                    </div>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4">
                <h3 className="font-medium mb-4">Device Usage</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Smartphone size={16} className="text-muted-foreground" />
                      <span className="text-sm">Mobile</span>
                    </div>
                    <span className="text-sm font-medium">68%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Laptop size={16} className="text-muted-foreground" />
                      <span className="text-sm">Desktop</span>
                    </div>
                    <span className="text-sm font-medium">28%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Tablet size={16} className="text-muted-foreground" />
                      <span className="text-sm">Tablet</span>
                    </div>
                    <span className="text-sm font-medium">4%</span>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4">
                <h3 className="font-medium mb-4">User Retention</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Day 1</span>
                    <span className="text-sm font-medium">94%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Day 7</span>
                    <span className="text-sm font-medium">72%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Day 30</span>
                    <span className="text-sm font-medium">48%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Day 90</span>
                    <span className="text-sm font-medium">32%</span>
                  </div>
                </div>
              </Card>
            </div>
            
            <Card className="p-4">
              <h3 className="font-medium mb-4">User Journey Flow</h3>
              <div className="relative">
                <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-0.5 bg-muted"></div>
                
                <div className="relative pl-10 pb-10">
                  <div className="absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-halvi-royal flex items-center justify-center">
                    <Users size={16} className="text-white" />
                  </div>
                  <div className="bg-card shadow rounded-md p-4 ml-6">
                    <h4 className="font-medium">User Registration</h4>
                    <p className="text-sm text-muted-foreground">Completion rate: 72%</p>
                  </div>
                </div>
                
                <div className="relative pl-10 pb-10">
                  <div className="absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-halvi-amber flex items-center justify-center">
                    <Search size={16} className="text-white" />
                  </div>
                  <div className="bg-card shadow rounded-md p-4 ml-6">
                    <h4 className="font-medium">Product Browsing</h4>
                    <p className="text-sm text-muted-foreground">Avg. products viewed: 8.3</p>
                  </div>
                </div>
                
                <div className="relative pl-10 pb-10">
                  <div className="absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-halvi-accent flex items-center justify-center">
                    <ShoppingCart size={16} className="text-white" />
                  </div>
                  <div className="bg-card shadow rounded-md p-4 ml-6">
                    <h4 className="font-medium">Cart Addition</h4>
                    <p className="text-sm text-muted-foreground">Conversion rate: 38%</p>
                  </div>
                </div>
                
                <div className="relative pl-10">
                  <div className="absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                    <CheckCircle2 size={16} className="text-white" />
                  </div>
                  <div className="bg-card shadow rounded-md p-4 ml-6">
                    <h4 className="font-medium">Checkout Completion</h4>
                    <p className="text-sm text-muted-foreground">Completion rate: 84%</p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="marketing" className="p-4 mt-0">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium">Marketing Performance Analytics</h3>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Filter size={14} className="mr-2" />
                  Filters
                </Button>
                <Button variant="outline" size="sm">
                  <Calendar size={14} className="mr-2" />
                  Date Range
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <StatisticsCard 
                title="Active Campaigns" 
                value="12" 
                icon={<Megaphone size={20} />}
              />
              <StatisticsCard 
                title="Marketing Spend" 
                value="$8,745" 
                change={{ value: 12.3, isPositive: false }} 
              />
              <StatisticsCard 
                title="Avg. CAC" 
                value="$22.45" 
                change={{ value: 8.7, isPositive: true }} 
              />
              <StatisticsCard 
                title="Marketing ROI" 
                value="324%" 
                change={{ value: 12.8, isPositive: true }} 
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Card className="p-4 h-80 flex items-center justify-center">
                <div className="text-center">
                  <BarChart2 size={36} className="mx-auto text-muted-foreground/50 mb-2" />
                  <h3 className="text-lg font-medium">Campaign Performance</h3>
                  <p className="text-sm text-muted-foreground">ROI by marketing campaign</p>
                </div>
              </Card>
              
              <Card className="p-4 h-80 flex items-center justify-center">
                <div className="text-center">
                  <LineChart size={36} className="mx-auto text-muted-foreground/50 mb-2" />
                  <h3 className="text-lg font-medium">Traffic Sources</h3>
                  <p className="text-sm text-muted-foreground">User acquisition channels</p>
                </div>
              </Card>
            </div>
            
            <Card className="p-4 mb-6">
              <h3 className="font-medium mb-4">Active Marketing Campaigns</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50 text-muted-foreground text-xs">
                    <tr>
                      <th className="px-4 py-3 text-left font-medium">Campaign</th>
                      <th className="px-4 py-3 text-left font-medium">Type</th>
                      <th className="px-4 py-3 text-left font-medium">Spend</th>
                      <th className="px-4 py-3 text-left font-medium">Reach</th>
                      <th className="px-4 py-3 text-left font-medium">Conversions</th>
                      <th className="px-4 py-3 text-left font-medium">ROI</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    <tr>
                      <td className="px-4 py-3">Ramadan Special</td>
                      <td className="px-4 py-3">Email</td>
                      <td className="px-4 py-3">$1,200</td>
                      <td className="px-4 py-3">24,512</td>
                      <td className="px-4 py-3">872</td>
                      <td className="px-4 py-3 text-green-500">485%</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">Summer Collection</td>
                      <td className="px-4 py-3">Social Media</td>
                      <td className="px-4 py-3">$2,500</td>
                      <td className="px-4 py-3">78,321</td>
                      <td className="px-4 py-3">1,254</td>
                      <td className="px-4 py-3 text-green-500">375%</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">New User Discount</td>
                      <td className="px-4 py-3">Paid Search</td>
                      <td className="px-4 py-3">$3,200</td>
                      <td className="px-4 py-3">45,678</td>
                      <td className="px-4 py-3">921</td>
                      <td className="px-4 py-3 text-green-500">287%</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">App Download</td>
                      <td className="px-4 py-3">Display Ads</td>
                      <td className="px-4 py-3">$1,845</td>
                      <td className="px-4 py-3">92,145</td>
                      <td className="px-4 py-3">478</td>
                      <td className="px-4 py-3 text-green-500">156%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-4">
                <h3 className="font-medium mb-4">Traffic Sources</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Organic Search</span>
                      <span>42%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-halvi-accent h-2 rounded-full" style={{ width: '42%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Social Media</span>
                      <span>28%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-halvi-amber h-2 rounded-full" style={{ width: '28%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Direct</span>
                      <span>15%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-halvi-royal h-2 rounded-full" style={{ width: '15%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Paid Search</span>
                      <span>10%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: '10%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Email</span>
                      <span>5%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '5%' }}></div>
                    </div>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4">
                <h3 className="font-medium mb-4">Promotion Performance</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">WELCOME10</span>
                    <span className="text-sm font-medium">487 uses</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">RAMADAN25</span>
                    <span className="text-sm font-medium">312 uses</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">FREESHIP</span>
                    <span className="text-sm font-medium">246 uses</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">SUMMER15</span>
                    <span className="text-sm font-medium">189 uses</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">NEWAPP</span>
                    <span className="text-sm font-medium">124 uses</span>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4">
                <h3 className="font-medium mb-4">Email Campaign Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Open Rate</span>
                    <span className="text-sm font-medium">28.4%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Click Rate</span>
                    <span className="text-sm font-medium">12.7%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Conversion Rate</span>
                    <span className="text-sm font-medium">3.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Unsubscribe Rate</span>
                    <span className="text-sm font-medium">0.8%</span>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="custom" className="p-4 mt-0">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium">Custom Report Builder</h3>
              <Button>
                <PlusCircle size={16} className="mr-2" />
                New Report
              </Button>
            </div>
            
            <Card className="p-4 mb-6">
              <h3 className="font-medium mb-4">Report Configuration</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Report Name</label>
                  <input 
                    type="text" 
                    className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-1 focus:ring-halvi-accent"
                    placeholder="My Custom Report"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">Report Type</label>
                  <select className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm">
                    <option>Sales Analysis</option>
                    <option>User Behavior</option>
                    <option>Marketing Performance</option>
                    <option>Shop Performance</option>
                    <option>Product Analysis</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">Date Range</label>
                  <div className="flex items-center gap-2">
                    <select className="flex-1 h-9 rounded-md border border-input bg-background px-3 text-sm">
                      <option>Last 7 Days</option>
                      <option>Last 30 Days</option>
                      <option>Last Quarter</option>
                      <option>Year to Date</option>
                      <option>Custom Range</option>
                    </select>
                    <Button variant="outline" size="sm">
                      <CalendarClock size={16} />
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Metrics to Include</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" defaultChecked />
                    Total Revenue
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" defaultChecked />
                    Order Count
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" defaultChecked />
                    Conversion Rate
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" />
                    New Users
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" defaultChecked />
                    Avg. Order Value
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" />
                    Return Rate
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" />
                    Cart Abandonment
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" />
                    Top Products
                  </label>
                </div>
              </div>
              
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Visualization Type</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                  <label className="flex items-center gap-2 text-sm">
                    <input type="radio" name="visualization" defaultChecked />
                    Bar Chart
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="radio" name="visualization" />
                    Line Chart
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="radio" name="visualization" />
                    Pie Chart
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="radio" name="visualization" />
                    Data Table
                  </label>
                </div>
              </div>
              
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Data Grouping</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <label className="flex items-center gap-2 text-sm">
                    <input type="radio" name="grouping" defaultChecked />
                    Daily
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="radio" name="grouping" />
                    Weekly
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="radio" name="grouping" />
                    Monthly
                  </label>
                </div>
              </div>
              
              <div className="flex items-center gap-2 mt-6">
                <Button>
                  <BarChart2 size={16} className="mr-2" />
                  Generate Report
                </Button>
                <Button variant="outline">
                  <Save size={16} className="mr-2" />
                  Save Configuration
                </Button>
                <Button variant="outline">
                  <Send size={16} className="mr-2" />
                  Schedule Report
                </Button>
              </div>
            </Card>
            
            <Card className="p-4">
              <h3 className="font-medium mb-4">Saved Reports</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BarChart2 size={16} className="text-muted-foreground" />
                    <span className="text-sm">Monthly Sales Analysis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Last run: Apr 1, 2023</span>
                    <Button size="sm" variant="ghost">
                      <MoreHorizontal size={14} />
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <LineChart size={16} className="text-muted-foreground" />
                    <span className="text-sm">User Growth Trends</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Last run: Mar 25, 2023</span>
                    <Button size="sm" variant="ghost">
                      <MoreHorizontal size={14} />
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <PieChart size={16} className="text-muted-foreground" />
                    <span className="text-sm">Product Category Performance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Last run: Mar 15, 2023</span>
                    <Button size="sm" variant="ghost">
                      <MoreHorizontal size={14} />
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BarChart2 size={16} className="text-muted-foreground" />
                    <span className="text-sm">Marketing Campaign ROI</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Last run: Mar 10, 2023</span>
                    <Button size="sm" variant="ghost">
                      <MoreHorizontal size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </Card>
    </DashboardLayout>
  );
};

export default AnalyticsPage;
