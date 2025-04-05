
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StatsCard from '@/components/dashboard/StatsCard';
import Chart from '@/components/dashboard/Chart';
import PulseFeed from '@/components/dashboard/PulseFeed';
import { ShoppingCart, DollarSign, Store, Users } from 'lucide-react';

const Dashboard = () => {
  // Sample data for charts
  const revenueData = [
    { name: 'Sun', value: 12000 },
    { name: 'Mon', value: 19000 },
    { name: 'Tue', value: 15000 },
    { name: 'Wed', value: 22000 },
    { name: 'Thu', value: 18000 },
    { name: 'Fri', value: 27000 },
    { name: 'Sat', value: 23000 },
  ];

  const ordersByCategory = [
    { name: 'Food', value: 35 },
    { name: 'Grocery', value: 25 },
    { name: 'Clothing', value: 20 },
    { name: 'Electronics', value: 15 },
    { name: 'Other', value: 5 },
  ];

  const shopApplications = [
    { name: 'Week 1', value: 12 },
    { name: 'Week 2', value: 19 },
    { name: 'Week 3', value: 15 },
    { name: 'Week 4', value: 22 },
  ];

  // Sample data for pulse feed
  const feedItems = [
    { 
      id: '1', 
      type: 'shop', 
      message: 'New business "Spice Haven" has applied for approval', 
      time: '10 min ago',
      status: 'pending'
    },
    { 
      id: '2', 
      type: 'order', 
      message: 'Order #12345 has been flagged for review', 
      time: '25 min ago',
      status: 'flagged'
    },
    { 
      id: '3', 
      type: 'product', 
      message: '5 new products have been uploaded by "Halal Meats Inc."', 
      time: '1 hour ago'
    },
    { 
      id: '4', 
      type: 'user', 
      message: 'Customer reported issue with payment processing', 
      time: '2 hours ago',
      status: 'rejected'
    },
    { 
      id: '5', 
      type: 'shop', 
      message: '"Modest Fashion Co." shop has been approved', 
      time: '3 hours ago',
      status: 'approved'
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gradient">Dashboard Overview</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard 
            title="Total Revenue" 
            value={156789} 
            icon={<DollarSign size={20} className="text-white" />} 
            percentChange={12.5} 
            trend="up" 
            prefix="$" 
            color="bg-halvi-accent/80"
          />
          <StatsCard 
            title="New Businesses" 
            value={45} 
            icon={<Store size={20} className="text-white" />} 
            percentChange={8.2} 
            trend="up" 
            color="bg-halvi-success/80"
          />
          <StatsCard 
            title="Orders" 
            value={1234} 
            icon={<ShoppingCart size={20} className="text-white" />} 
            percentChange={3.7} 
            trend="down" 
            color="bg-halvi-amber/80"
          />
          <StatsCard 
            title="Active Users" 
            value={8562} 
            icon={<Users size={20} className="text-white" />} 
            percentChange={15.3} 
            trend="up" 
            color="bg-halvi-warning/80"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Chart 
              title="Revenue Overview" 
              type="line" 
              data={revenueData} 
              categories={['Revenue']} 
              dataKey="value" 
              nameKey="name" 
            />
          </div>
          <div>
            <Chart 
              title="Orders by Category" 
              type="pie" 
              data={ordersByCategory} 
              dataKey="value" 
              nameKey="name" 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div>
            <Chart 
              title="Shop Applications" 
              type="bar" 
              data={shopApplications}
              categories={['Applications']} 
              dataKey="value" 
              nameKey="name" 
            />
          </div>
          <div className="lg:col-span-2">
            <PulseFeed items={feedItems} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
