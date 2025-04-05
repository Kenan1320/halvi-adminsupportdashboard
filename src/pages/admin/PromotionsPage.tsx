
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import PageHeader from '@/components/admin/PageHeader';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import SmartTable from '@/components/admin/SmartTable';
import StatisticsCard from '@/components/admin/StatisticsCard';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Tag, 
  Image, 
  Sparkles, 
  Star, 
  BarChart, 
  Calendar, 
  Code,
  PlusCircle,
  Percent,
  TrendingUp,
  CheckCircle2,
  XCircle,
  Filter,
  Download
} from 'lucide-react';

// Mock data
const banners = [
  { id: 'BNR001', title: 'Eid Special Sale', status: 'Active', startDate: '2023-04-05', endDate: '2023-04-15', clicks: 872 },
  { id: 'BNR002', title: 'Ramadan Collection', status: 'Scheduled', startDate: '2023-04-10', endDate: '2023-05-10', clicks: 0 },
  { id: 'BNR003', title: 'New Halal Restaurants', status: 'Expired', startDate: '2023-03-15', endDate: '2023-03-30', clicks: 1243 },
  { id: 'BNR004', title: 'Modest Fashion Week', status: 'Active', startDate: '2023-04-01', endDate: '2023-04-07', clicks: 645 },
];

const featuredListings = [
  { id: 'FEAT001', name: 'Halal Delights', type: 'Shop', position: 'Homepage Top', startDate: '2023-04-01', endDate: '2023-04-30', clicks: 324 },
  { id: 'FEAT002', name: 'Premium Prayer Mat', type: 'Product', position: 'Category Page', startDate: '2023-04-01', endDate: '2023-04-15', clicks: 187 },
  { id: 'FEAT003', name: 'Organic Meats Collection', type: 'Collection', position: 'Homepage Featured', startDate: '2023-04-05', endDate: '2023-04-20', clicks: 92 },
];

const promoCodes = [
  { id: 'PROMO001', code: 'WELCOME10', discount: '10%', usage: '247/500', startDate: '2023-04-01', endDate: '2023-04-30', status: 'Active' },
  { id: 'PROMO002', code: 'RAMADAN25', discount: '25%', usage: '89/200', startDate: '2023-04-01', endDate: '2023-05-01', status: 'Active' },
  { id: 'PROMO003', code: 'FREESHIP', discount: 'Free Shipping', usage: '312/1000', startDate: '2023-03-15', endDate: '2023-03-31', status: 'Expired' },
];

const PromotionsPage = () => {
  const [activeTab, setActiveTab] = useState('banners');

  const handleRowAction = (action: string, rowData: any) => {
    console.log(`Action ${action} on:`, rowData);
    // Implementation for different actions
  };

  return (
    <DashboardLayout title="Promotions Management">
      <PageHeader 
        title="Promotions Management" 
        description="Create and manage promotional content and campaigns"
        actions={
          <Button>
            <PlusCircle size={16} className="mr-2" />
            Create Promotion
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatisticsCard 
          title="Active Promotions" 
          value="12" 
          icon={<Tag size={20} />}
        />
        <StatisticsCard 
          title="Total Impressions" 
          value="24,872" 
          change={{ value: 18, isPositive: true }} 
          icon={<Image size={20} />}
        />
        <StatisticsCard 
          title="Conversion Rate" 
          value="3.8%" 
          change={{ value: 0.5, isPositive: true }} 
          icon={<TrendingUp size={20} />}
        />
        <StatisticsCard 
          title="Promo Code Usage" 
          value="648" 
          change={{ value: 12, isPositive: true }} 
          icon={<Percent size={20} />}
        />
      </div>

      <Card className="mb-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none px-4 h-auto bg-transparent">
            <TabsTrigger value="banners" className="py-3 px-4">Homepage Banners</TabsTrigger>
            <TabsTrigger value="featured" className="py-3 px-4">Featured Listings</TabsTrigger>
            <TabsTrigger value="promocodes" className="py-3 px-4">Promo Codes</TabsTrigger>
            <TabsTrigger value="analytics" className="py-3 px-4">Performance Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="banners" className="p-0 mt-0">
            <div className="p-4 flex justify-between items-center border-b">
              <h3 className="font-medium">Banner Management</h3>
              <Button size="sm">
                <Image size={16} className="mr-2" />
                Add New Banner
              </Button>
            </div>
            
            <SmartTable
              columns={[
                { key: 'id', title: 'Banner ID', sortable: true },
                { key: 'title', title: 'Title', sortable: true },
                { key: 'status', title: 'Status', sortable: true },
                { key: 'startDate', title: 'Start Date', sortable: true },
                { key: 'endDate', title: 'End Date', sortable: true },
                { key: 'clicks', title: 'Clicks', sortable: true },
              ]}
              data={banners}
              filters={['All', 'Active', 'Scheduled', 'Expired']}
              rowActions={['Edit', 'Preview', 'Deactivate', 'Delete']}
              onRowAction={handleRowAction}
              pagination={{
                page: 1,
                pageSize: 10,
                total: 7,
                onChange: (page) => console.log('Changed to page', page)
              }}
            />
            
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-4 border-dashed flex flex-col items-center justify-center h-32">
                <Image size={28} className="text-muted-foreground mb-2" />
                <p className="text-sm text-center text-muted-foreground">Banner Preview Area</p>
                <p className="text-xs text-center text-muted-foreground">Select a banner to preview here</p>
              </Card>
              
              <Card className="p-4">
                <h3 className="font-medium mb-2">Banner Scheduling</h3>
                <div className="flex items-center gap-3 mt-4">
                  <Calendar size={22} className="text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Next Banner Change</p>
                    <p className="text-xs text-muted-foreground">Ramadan Collection (April 10)</p>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="mt-4 w-full">
                  View Schedule
                </Button>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="featured" className="p-0 mt-0">
            <SmartTable
              title="Featured Listings"
              subtitle="Highlighted shops and products"
              columns={[
                { key: 'id', title: 'Listing ID', sortable: true },
                { key: 'name', title: 'Name', sortable: true },
                { key: 'type', title: 'Type', sortable: true },
                { key: 'position', title: 'Position', sortable: true },
                { key: 'startDate', title: 'Start Date', sortable: true },
                { key: 'endDate', title: 'End Date', sortable: true },
                { key: 'clicks', title: 'Clicks', sortable: true },
              ]}
              data={featuredListings}
              rowActions={['Edit', 'Remove', 'Extend']}
              onRowAction={handleRowAction}
              actions={
                <Button size="sm">
                  <Star size={16} className="mr-2" />
                  Add Featured Listing
                </Button>
              }
              pagination={{
                page: 1,
                pageSize: 10,
                total: 5,
                onChange: (page) => console.log('Changed to page', page)
              }}
            />
            
            <div className="p-4">
              <Card className="p-4 border-l-4 border-l-amber-400">
                <div className="flex items-start gap-3">
                  <Star size={20} className="text-amber-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Featured Listing Tips</h3>
                    <p className="text-sm text-muted-foreground mt-1">Featured listings get 3.5x more visibility and 2.2x more sales on average than regular listings.</p>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="promocodes" className="p-0 mt-0">
            <SmartTable
              title="Promo Codes"
              subtitle="Discount codes and special offers"
              columns={[
                { key: 'id', title: 'Promo ID', sortable: true },
                { key: 'code', title: 'Code', sortable: true },
                { key: 'discount', title: 'Discount', sortable: true },
                { key: 'usage', title: 'Usage', sortable: true },
                { key: 'startDate', title: 'Start Date', sortable: true },
                { key: 'endDate', title: 'End Date', sortable: true },
                { key: 'status', title: 'Status', sortable: true },
              ]}
              data={promoCodes}
              filters={['All', 'Active', 'Scheduled', 'Expired']}
              rowActions={['Edit', 'Disable', 'Delete', 'View Analytics']}
              onRowAction={handleRowAction}
              actions={
                <Button size="sm">
                  <Code size={16} className="mr-2" />
                  Generate Promo Code
                </Button>
              }
              pagination={{
                page: 1,
                pageSize: 10,
                total: 8,
                onChange: (page) => console.log('Changed to page', page)
              }}
            />
            
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-4">
                <h3 className="font-medium mb-3">Quick Code Generator</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Discount Type</label>
                    <select className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm">
                      <option>Percentage Discount</option>
                      <option>Fixed Amount Discount</option>
                      <option>Free Shipping</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Discount Value</label>
                    <div className="flex items-center gap-2">
                      <input 
                        type="number" 
                        className="flex-1 h-9 rounded-md border border-input bg-background px-3 text-sm" 
                        defaultValue="10" 
                      />
                      <span className="text-sm">%</span>
                    </div>
                  </div>
                  <Button size="sm" className="w-full">Generate Code</Button>
                </div>
              </Card>
              
              <Card className="p-4">
                <h3 className="font-medium mb-3">Promo Code Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Most Used Code</span>
                    <span className="text-sm font-medium">WELCOME10</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Avg. Discount Value</span>
                    <span className="text-sm font-medium">15.8%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Redemption Rate</span>
                    <span className="text-sm font-medium">36.4%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Revenue Impact</span>
                    <span className="text-sm font-medium text-green-500">+$12,587</span>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="p-4 mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Card className="p-4 h-64 flex items-center justify-center">
                <div className="text-center">
                  <BarChart size={36} className="mx-auto text-muted-foreground/50 mb-2" />
                  <h3 className="text-lg font-medium">Promotion Performance</h3>
                  <p className="text-sm text-muted-foreground">Conversion rates by promotion type</p>
                </div>
              </Card>
              
              <Card className="p-4 h-64 flex items-center justify-center">
                <div className="text-center">
                  <BarChart size={36} className="mx-auto text-muted-foreground/50 mb-2" />
                  <h3 className="text-lg font-medium">Revenue Impact</h3>
                  <p className="text-sm text-muted-foreground">Revenue generated from promotional campaigns</p>
                </div>
              </Card>
            </div>
            
            <Card className="p-4 mb-6 border-l-4 border-l-purple-400">
              <div className="flex items-start gap-3">
                <Sparkles size={20} className="text-purple-500 mt-0.5" />
                <div>
                  <h3 className="font-medium">AI-Driven Recommendations</h3>
                  <p className="text-sm text-muted-foreground mt-1">Based on analytics, the system recommends featuring "Modest Fashion Co" and "Zabiha Meats" in your next promotion.</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-4">
              <h3 className="text-lg font-medium mb-4">Top Performing Promotions</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                      <Tag size={18} className="text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Ramadan Sale Banner</p>
                      <p className="text-xs text-muted-foreground">Homepage Banner</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">5.7% CTR</p>
                    <p className="text-xs text-green-500">+2.3% conversion</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                      <Code size={18} className="text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">WELCOME10 Code</p>
                      <p className="text-xs text-muted-foreground">New User Discount</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">49.2% Usage</p>
                    <p className="text-xs text-green-500">+$5,218 revenue</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                      <Star size={18} className="text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Halal Delights Featured</p>
                      <p className="text-xs text-muted-foreground">Featured Shop</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">324 Clicks</p>
                    <p className="text-xs text-green-500">+168% shop views</p>
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

export default PromotionsPage;
