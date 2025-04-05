
import React from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, LineChart, ArrowUpRight, ArrowDownRight, ShoppingBag, Users, DollarSign, TrendingUp, Clock, Activity } from 'lucide-react';
import PulseFeed from '@/components/dashboard/PulseFeed';
import Chart from '@/components/dashboard/Chart';
import StatsCard from '@/components/dashboard/StatsCard';
import { FeedItem } from '@/types/dashboard';

const Dashboard = () => {
  return (
    <DashboardLayout title="Super Admin Dashboard">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
        <StatsCard
          title="Total Revenue"
          value="$24,532"
          icon={DollarSign}
          change="+12.5%"
          trend="up"
          description="from last month"
        />
        <StatsCard
          title="New Businesses"
          value="54"
          icon={ShoppingBag}
          change="+8.2%"
          trend="up"
          description="from last month"
        />
        <StatsCard
          title="Active Users"
          value="2,845"
          icon={Users}
          change="+18.7%"
          trend="up"
          description="from last month"
        />
        <StatsCard
          title="Completed Orders"
          value="1,257"
          icon={TrendingUp}
          change="-2.3%"
          trend="down"
          description="from last month"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="glass-card lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-normal">
              Revenue Overview
            </CardTitle>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span className="rounded-md px-2 py-1 bg-accent/50">Weekly</span>
              <span>Monthly</span>
              <span>Yearly</span>
            </div>
          </CardHeader>
          <CardContent>
            <Chart 
              type="line"
              data={[
                {
                  name: "Revenue",
                  data: [4500, 6000, 5500, 7200, 8000, 9000, 11000]
                }
              ]}
              categories={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"]}
              colors={["#4A80F0"]}
              height={300}
            />
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-normal">
              Sales Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Chart 
              type="pie"
              data={[44, 55, 13, 33]}
              labels={["Food", "Products", "Services", "Others"]}
              colors={["#4A80F0", "#FF994B", "#1AD598", "#FFC542"]}
              height={300}
            />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="glass-card lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-normal">
              Business Growth
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Chart 
              type="bar"
              data={[
                {
                  name: "New Businesses",
                  data: [40, 55, 42, 58, 72, 60, 65]
                },
                {
                  name: "Active Businesses",
                  data: [25, 38, 40, 42, 55, 58, 62]
                }
              ]}
              categories={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"]}
              colors={["#4A80F0", "#FF994B"]}
              height={300}
            />
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-normal">
              Recent Activity
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <PulseFeed items={feedItems} />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

const feedItems: FeedItem[] = [
  {
    id: "1",
    type: "order",
    message: "New order #12345 has been placed",
    time: "2 minutes ago",
    status: "pending"
  },
  {
    id: "2",
    type: "shop",
    message: "Store 'Medina Spices' applied for verification",
    time: "10 minutes ago"
  },
  {
    id: "3",
    type: "product",
    message: "New product added to 'Halal Delights' store",
    time: "25 minutes ago"
  },
  {
    id: "4",
    type: "user",
    message: "New user signed up from Dubai",
    time: "1 hour ago"
  },
  {
    id: "5",
    type: "order",
    message: "Order #10982 was successfully delivered",
    time: "2 hours ago",
    status: "completed"
  }
];

export default Dashboard;
