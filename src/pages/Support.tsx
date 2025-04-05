
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTheme } from '@/hooks/use-theme';
import { useDevice } from '@/hooks/use-device';
import { Badge } from '@/components/ui/badge';
import { BarChart, LineChart, Smartphone, Monitor, MessageSquare, TicketCheck, RefreshCcw, User, Search, AlertCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FeedItem } from '@/types/dashboard';

const Support = () => {
  const { theme, toggleTheme } = useTheme();
  const { view, toggleView } = useDevice();

  const supportFeedItems: FeedItem[] = [
    {
      id: "ticket-1",
      type: "user",
      message: "New refund request for Order #13832",
      time: "2 minutes ago",
      status: "urgent"
    },
    {
      id: "ticket-2",
      type: "shop",
      message: "Shop 'Baraka Bites' requested verification",
      time: "15 minutes ago"
    },
    {
      id: "ticket-3",
      type: "order",
      message: "Order #12984 marked as not received",
      time: "32 minutes ago",
      status: "open"
    },
    {
      id: "ticket-4",
      type: "product",
      message: "Product flagged for review in 'Al-Madina Spices'",
      time: "1 hour ago"
    },
    {
      id: "ticket-5",
      type: "user",
      message: "Customer chat waiting for response",
      time: "1 hour ago",
      status: "waiting"
    },
  ];

  return (
    <DashboardLayout title="Support Agent Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard 
          title="Active Tickets"
          value="24"
          icon={TicketCheck}
          description="+3 from yesterday"
          trend="up"
        />
        <StatsCard 
          title="Avg. Resolution Time"
          value="14m"
          icon={RefreshCcw}
          description="2m faster than target"
          trend="down"
        />
        <StatsCard 
          title="Unread Conversations"
          value="7"
          icon={MessageSquare}
          description="3 are high priority"
          trend="neutral"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="all" className="w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
              <h2 className="text-xl font-semibold">Support Overview</h2>
              <TabsList className="mt-2 sm:mt-0">
                <TabsTrigger value="all">All Tickets</TabsTrigger>
                <TabsTrigger value="urgent">Urgent</TabsTrigger>
                <TabsTrigger value="assigned">Assigned to Me</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="all" className="mt-0">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">Recent Activity</CardTitle>
                    <Button variant="ghost" size="sm" className="h-8 gap-1">
                      <RefreshCcw className="h-4 w-4" />
                      Refresh
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {supportFeedItems.map((item) => (
                      <div key={item.id} className="flex items-start gap-4 p-3 rounded-lg hover:bg-accent/10 transition-colors">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback className="bg-muted">
                            {getIconForFeedItem(item.type)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <p className="font-medium text-sm">{item.message}</p>
                            {item.status && (
                              <Badge variant={getBadgeVariant(item.status)} className="ml-2">
                                {item.status}
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">{item.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="urgent" className="mt-0">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {supportFeedItems
                      .filter(item => item.status === "urgent")
                      .map((item) => (
                        <div key={item.id} className="flex items-start gap-4 p-3 rounded-lg bg-destructive/10 hover:bg-destructive/20 transition-colors">
                          <Avatar className="h-9 w-9">
                            <AvatarFallback className="bg-destructive/20">
                              <AlertCircle className="h-5 w-5 text-destructive" />
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <p className="font-medium text-sm">{item.message}</p>
                              <Badge variant="destructive" className="ml-2">
                                {item.status}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">{item.time}</p>
                          </div>
                        </div>
                    ))}
                    
                    {supportFeedItems.filter(item => item.status === "urgent").length === 0 && (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
                          <TicketCheck className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-medium">No urgent tickets</h3>
                        <p className="text-muted-foreground mt-1">Alhamdulillah! All urgent issues are resolved.</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="assigned" className="mt-0">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
                      <User className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium">No assigned tickets</h3>
                    <p className="text-muted-foreground mt-1">You currently have no tickets assigned to you.</p>
                    <Button variant="outline" className="mt-4">Assign me tickets</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-3">
                <Button className="justify-start gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Start New Chat
                </Button>
                <Button variant="outline" className="justify-start gap-2">
                  <Search className="h-4 w-4" />
                  Lookup Order
                </Button>
                <Button variant="outline" className="justify-start gap-2">
                  <User className="h-4 w-4" />
                  Search User Profile
                </Button>
                <Button variant="outline" className="justify-start gap-2">
                  <AlertCircle className="h-4 w-4" />
                  Escalate Issue
                </Button>
              </div>
              
              <div className="mt-6 pt-6 border-t">
                <h3 className="font-medium mb-3">Today's Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Resolved Tickets</span>
                    <Badge variant="outline">12</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Avg Response Time</span>
                    <Badge variant="outline">3m 24s</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Customer Satisfaction</span>
                    <Badge variant="outline" className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                      96%
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

// Helper function to get the badge variant based on status
const getBadgeVariant = (status: string) => {
  switch (status) {
    case 'urgent':
      return 'destructive';
    case 'open':
      return 'default';
    case 'waiting':
      return 'secondary';
    default:
      return 'outline';
  }
};

// Helper function to get the icon for feed item type
const getIconForFeedItem = (type: string) => {
  switch (type) {
    case 'order':
      return <BarChart className="h-4 w-4" />;
    case 'shop':
      return <LineChart className="h-4 w-4" />;
    case 'product':
      return <Search className="h-4 w-4" />;
    case 'user':
      return <User className="h-4 w-4" />;
    default:
      return <MessageSquare className="h-4 w-4" />;
  }
};

// Stats Card Component
interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ElementType;
  description: string;
  trend: 'up' | 'down' | 'neutral';
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon: Icon,
  description,
  trend
}) => {
  return (
    <Card className="glass-card">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium">{title}</p>
            <p className="text-3xl font-bold mt-1">{value}</p>
          </div>
          <div className="rounded-lg p-2 bg-muted/50">
            <Icon className="h-6 w-6 text-muted-foreground" />
          </div>
        </div>
        <div className="mt-4 flex items-center text-xs">
          {trend === 'up' && <div className="text-green-500">▲</div>}
          {trend === 'down' && <div className="text-blue-500">▼</div>}
          {trend === 'neutral' && <div className="text-yellow-500">■</div>}
          <span className="ml-1 text-muted-foreground">
            {description}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default Support;
