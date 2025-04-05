
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import PageHeader from '@/components/admin/PageHeader';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import SmartTable from '@/components/admin/SmartTable';
import StatisticsCard from '@/components/admin/StatisticsCard';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sparkles, ShoppingBag, CheckCircle2, AlertTriangle, Ban, BadgeAlert, Search } from 'lucide-react';

// Mock data
const mockProducts = [
  { id: 'P001', name: 'Chicken Biryani Mix', shop: 'Halal Delights', category: 'Food', price: '$12.99', status: 'Active', stock: 145, approval: 'Approved' },
  { id: 'P002', name: 'Modest Hijab - Blue', shop: 'Modest Fashion Co', category: 'Clothing', price: '$24.99', status: 'Active', stock: 78, approval: 'Approved' },
  { id: 'P003', name: 'Zabiha Lamb - 1kg', shop: 'Zabiha Meats', category: 'Meat', price: '$18.50', status: 'Active', stock: 32, approval: 'Approved' },
  { id: 'P004', name: 'Quran with Translation', shop: 'Islamic Books Store', category: 'Books', price: '$35.00', status: 'Flagged', stock: 12, approval: 'Under Review' },
  { id: 'P005', name: 'Baklava Assortment', shop: 'Salam Bakery', category: 'Desserts', price: '$15.99', status: 'Suspended', stock: 0, approval: 'Rejected' },
];

const pendingProducts = [
  { id: 'P006', name: 'Halal Vitamins Pack', shop: 'Healthy Halal', category: 'Supplements', price: '$29.99', submitted: '2023-04-01', issue: 'Ingredient Verification' },
  { id: 'P007', name: 'Prayer Digital Assistant', shop: 'Tech Halal', category: 'Electronics', price: '$79.99', submitted: '2023-04-02', issue: 'Description Review' },
  { id: 'P008', name: 'Non-Alcoholic Beverage', shop: 'Barakah Foods', category: 'Drinks', price: '$3.99', submitted: '2023-04-03', issue: 'Certification Check' },
];

const ProductsPage = () => {
  const [activeTab, setActiveTab] = useState('database');

  const handleRowAction = (action: string, rowData: any) => {
    console.log(`Action ${action} on:`, rowData);
    // Implementation for different actions
  };

  return (
    <DashboardLayout title="Products Management">
      <PageHeader 
        title="Products Management" 
        description="Moderate and manage products across all shops"
        actions={
          <Button>
            <ShoppingBag size={16} className="mr-2" />
            Add Product
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatisticsCard 
          title="Total Products" 
          value="3,241" 
          change={{ value: 8, isPositive: true }} 
          icon={<ShoppingBag size={20} />}
        />
        <StatisticsCard 
          title="Active Products" 
          value="2,897" 
          icon={<CheckCircle2 size={20} />}
        />
        <StatisticsCard 
          title="Pending Approval" 
          value="56" 
          change={{ value: 12, isPositive: false }} 
          icon={<AlertTriangle size={20} />}
        />
        <StatisticsCard 
          title="Flagged Products" 
          value="23" 
          icon={<BadgeAlert size={20} />}
        />
      </div>

      <Card className="mb-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none px-4 h-auto bg-transparent">
            <TabsTrigger value="database" className="py-3 px-4">Product Database</TabsTrigger>
            <TabsTrigger value="moderation" className="py-3 px-4">Moderation Panel</TabsTrigger>
            <TabsTrigger value="detailed" className="py-3 px-4">Detailed Product View</TabsTrigger>
            <TabsTrigger value="bulk" className="py-3 px-4">Bulk Actions</TabsTrigger>
          </TabsList>

          <TabsContent value="database" className="p-0 mt-0">
            <div className="p-4 border-b flex items-center gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search products by name, category, shop..."
                    className="h-10 w-full rounded-md border border-input bg-background px-10 text-sm focus:outline-none focus:ring-1 focus:ring-halvi-accent"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  Categories
                </Button>
              </div>
            </div>
            <SmartTable
              columns={[
                { key: 'id', title: 'Product ID', sortable: true },
                { key: 'name', title: 'Product Name', sortable: true },
                { key: 'shop', title: 'Shop', sortable: true },
                { key: 'category', title: 'Category', sortable: true },
                { key: 'price', title: 'Price', sortable: true },
                { key: 'status', title: 'Status', sortable: true },
                { key: 'stock', title: 'Stock', sortable: true },
                { key: 'approval', title: 'Approval', sortable: true },
              ]}
              data={mockProducts}
              filters={['Active', 'Flagged', 'Suspended']}
              rowActions={['View Details', 'Edit', 'Flag', 'Suspend']}
              onRowAction={handleRowAction}
              pagination={{
                page: 1,
                pageSize: 10,
                total: 3241,
                onChange: (page) => console.log('Changed to page', page)
              }}
            />
          </TabsContent>

          <TabsContent value="moderation" className="p-0 mt-0">
            <div className="p-4 border-b bg-amber-50 dark:bg-amber-950/20 flex items-center gap-3">
              <AlertTriangle size={18} className="text-amber-500" />
              <p className="text-sm">Products require approval before they become visible on the platform.</p>
            </div>
            <SmartTable
              columns={[
                { key: 'id', title: 'Product ID', sortable: true },
                { key: 'name', title: 'Product Name', sortable: true },
                { key: 'shop', title: 'Shop', sortable: true },
                { key: 'category', title: 'Category', sortable: true },
                { key: 'price', title: 'Price', sortable: true },
                { key: 'submitted', title: 'Submitted', sortable: true },
                { key: 'issue', title: 'Issue', sortable: true },
              ]}
              data={pendingProducts}
              rowActions={['Review Details', 'Approve', 'Reject', 'Request Changes']}
              onRowAction={handleRowAction}
              pagination={{
                page: 1,
                pageSize: 10,
                total: 56,
                onChange: (page) => console.log('Changed to page', page)
              }}
            />
          </TabsContent>

          <TabsContent value="detailed" className="p-4 mt-0">
            <div className="flex items-center justify-center p-8 text-muted-foreground">
              <div className="text-center">
                <Search size={40} className="mx-auto text-muted-foreground/50 mb-2" />
                <h3 className="text-lg font-medium">Select a product to view details</h3>
                <p className="text-sm text-muted-foreground">Detailed product information will appear here</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="bulk" className="p-4 mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card className="p-4">
                <h3 className="font-medium mb-2">Bulk Approval</h3>
                <p className="text-sm text-muted-foreground mb-4">Approve multiple products that meet halal standards</p>
                <Button size="sm" className="w-full">Bulk Approve</Button>
              </Card>
              
              <Card className="p-4">
                <h3 className="font-medium mb-2">Bulk Suspension</h3>
                <p className="text-sm text-muted-foreground mb-4">Suspend products that violate platform policies</p>
                <Button size="sm" variant="destructive" className="w-full">Bulk Suspend</Button>
              </Card>
              
              <Card className="p-4">
                <h3 className="font-medium mb-2">Bulk Category Assignment</h3>
                <p className="text-sm text-muted-foreground mb-4">Assign categories to multiple products</p>
                <Button size="sm" variant="outline" className="w-full">Assign Categories</Button>
              </Card>
            </div>
            
            <div className="text-center p-8 text-muted-foreground">
              Select products from the database to perform bulk actions
            </div>
          </TabsContent>
        </Tabs>
      </Card>

      <Card className="p-4 mb-6 border-l-4 border-l-purple-400">
        <div className="flex items-start gap-3">
          <Sparkles size={20} className="text-purple-500 mt-0.5" />
          <div>
            <h3 className="font-medium">AI Moderation Assistance</h3>
            <p className="text-sm text-muted-foreground mt-1">AI has identified 7 products with potentially inappropriate descriptions. <Button variant="link" className="p-0 h-auto text-sm">Review Flagged Items</Button></p>
          </div>
        </div>
      </Card>
    </DashboardLayout>
  );
};

export default ProductsPage;
