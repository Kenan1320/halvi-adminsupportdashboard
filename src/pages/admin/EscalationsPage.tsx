
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import PageHeader from '@/components/admin/PageHeader';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { 
  AlertTriangle, 
  Filter, 
  Plus, 
  Store, 
  User, 
  Clock, 
  Search,
  ArrowUpRight,
  ShoppingCart,
  Shield,
  CheckCircle2,
  XCircle,
  MessageSquare,
  ArrowRight,
  FileText as FileTextIcon,
  Download as DownloadIcon
} from 'lucide-react';

// Mock data
const escalationsList = [
  { 
    id: 'ESC-2023-001', 
    title: 'Payment dispute for halal meat delivery', 
    customer: { name: 'Ahmed Al-Farsi', avatar: '/placeholder.svg' },
    shop: { name: 'Baraka Halal Meats', avatar: '/placeholder.svg' },
    status: 'urgent',
    priority: 'high',
    created: '2 hours ago',
    updated: '15 minutes ago',
    category: 'Payment',
    assignee: { name: 'Fatima K.', avatar: '/placeholder.svg' }
  },
  { 
    id: 'ESC-2023-002', 
    title: 'Order received damaged and incomplete', 
    customer: { name: 'Layla Rahman', avatar: '/placeholder.svg' },
    shop: { name: 'Medina Grocers', avatar: '/placeholder.svg' },
    status: 'in-progress',
    priority: 'medium',
    created: '1 day ago',
    updated: '3 hours ago',
    category: 'Product Quality',
    assignee: { name: 'Omar J.', avatar: '/placeholder.svg' }
  },
  { 
    id: 'ESC-2023-003', 
    title: 'Shop listed non-halal products', 
    customer: { name: 'Mahmoud Abed', avatar: '/placeholder.svg' },
    shop: { name: 'Al-Noor Market', avatar: '/placeholder.svg' },
    status: 'pending',
    priority: 'high',
    created: '2 days ago',
    updated: '1 day ago',
    category: 'Compliance',
    assignee: { name: 'Zainab M.', avatar: '/placeholder.svg' }
  },
  { 
    id: 'ESC-2023-004', 
    title: 'Multiple delayed deliveries from same shop', 
    customer: { name: 'Sara Malik', avatar: '/placeholder.svg' },
    shop: { name: 'Baraka Express Delivery', avatar: '/placeholder.svg' },
    status: 'resolved',
    priority: 'medium',
    created: '5 days ago',
    updated: '1 day ago',
    category: 'Delivery',
    assignee: { name: 'Hassan T.', avatar: '/placeholder.svg' }
  },
  { 
    id: 'ESC-2023-005', 
    title: 'Incorrect fees charged to shop owner', 
    customer: null,
    shop: { name: 'Halal Sweet Delights', avatar: '/placeholder.svg' },
    status: 'pending',
    priority: 'low',
    created: '6 days ago',
    updated: '4 days ago',
    category: 'Billing',
    assignee: { name: 'Amina L.', avatar: '/placeholder.svg' }
  },
];

const escalationDetails = {
  id: 'ESC-2023-001',
  title: 'Payment dispute for halal meat delivery',
  description: 'Customer claims they were charged twice for their order of halal meat. The payment gateway shows two separate transactions of $85.40 each. Customer is requesting a refund for the duplicate charge.',
  customer: { 
    id: 'CUST-7892',
    name: 'Ahmed Al-Farsi', 
    email: 'ahmed.alfarsi@example.com',
    phone: '+44 7700 900123',
    joinDate: 'May 12, 2022',
    orderCount: 24,
    avatar: '/placeholder.svg' 
  },
  shop: { 
    id: 'SHOP-342',
    name: 'Baraka Halal Meats', 
    email: 'contact@barakahalal.com',
    phone: '+44 7700 900456',
    joinDate: 'Jan 5, 2021',
    orderCount: 1245,
    avatar: '/placeholder.svg' 
  },
  order: {
    id: 'ORD-45982',
    date: 'June 15, 2023',
    amount: '$85.40',
    items: [
      { name: 'Premium Halal Lamb', quantity: 2, price: '$32.50' },
      { name: 'Halal Chicken Breast', quantity: 1, price: '$12.40' },
      { name: 'Halal Beef Mince', quantity: 1, price: '$8.00' }
    ],
    delivery: {
      address: '45 Crescent Road, Birmingham, B15 2JT',
      status: 'Delivered',
      date: 'June 16, 2023'
    }
  },
  timeline: [
    { date: 'June 15, 2023 - 14:32', event: 'Order placed and payment processed', user: 'Ahmed Al-Farsi' },
    { date: 'June 15, 2023 - 14:33', event: 'Duplicate payment processed', user: 'System' },
    { date: 'June 16, 2023 - 11:45', event: 'Order delivered to customer', user: 'Delivery Partner' },
    { date: 'June 17, 2023 - 09:12', event: 'Customer contacted support about duplicate charge', user: 'Ahmed Al-Farsi' },
    { date: 'June 17, 2023 - 10:05', event: 'Support agent escalated to financial team', user: 'Fatima K.' },
    { date: 'June 17, 2023 - 14:30', event: 'Financial team verified duplicate charge', user: 'Amina L.' }
  ],
  notes: [
    { date: 'June 17, 2023 - 10:05', content: 'Customer was very polite but frustrated about the double charge. I've verified in our payment system that there were indeed two charges processed within 1 minute of each other. This appears to be a system error rather than customer error.', author: 'Fatima K.' },
    { date: 'June 17, 2023 - 14:30', content: 'Confirmed duplicate charge in payment gateway logs. This appears to be related to the intermittent gateway timeout issues we experienced on June 15. Recommending immediate refund of the duplicate charge.', author: 'Amina L.' }
  ],
  actions: [
    { type: 'Refund', description: 'Process refund for duplicate payment', amount: '$85.40' },
    { type: 'Credit', description: 'Goodwill account credit', amount: '$10.00' },
    { type: 'Notification', description: 'Send apology email to customer', template: 'Payment Error Apology' }
  ],
  status: 'urgent',
  priority: 'high',
  created: 'June 17, 2023 - 09:12',
  updated: 'June 17, 2023 - 14:30',
  category: 'Payment',
  assignee: { name: 'Fatima K.', avatar: '/placeholder.svg' }
};

const EscalationsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedEscalation, setSelectedEscalation] = useState(escalationDetails);
  const [note, setNote] = useState('');
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'urgent':
        return 'destructive';
      case 'in-progress':
        return 'blue';
      case 'pending':
        return 'yellow';
      case 'resolved':
        return 'green';
      default:
        return 'default';
    }
  };
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'yellow';
      case 'low':
        return 'blue';
      default:
        return 'default';
    }
  };

  const filteredEscalations = escalationsList.filter(escalation => 
    (statusFilter === 'all' || escalation.status === statusFilter) &&
    (escalation.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    escalation.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (escalation.customer?.name.toLowerCase().includes(searchQuery.toLowerCase()) || false) ||
    escalation.shop.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <DashboardLayout title="Escalations Center">
      <PageHeader 
        title="Escalations Center" 
        description="Manage and resolve high-priority issues"
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <Filter size={14} />
              Filters
            </Button>
            <Button size="sm" className="h-8 gap-1">
              <Plus size={14} />
              New Escalation
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Open Escalations</p>
                <p className="text-2xl font-bold mt-1">26</p>
              </div>
              <div className="rounded-lg p-2 bg-destructive/10">
                <AlertTriangle className="h-5 w-5 text-destructive" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs">
              <div className="text-destructive flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                15%
              </div>
              <span className="ml-1 text-muted-foreground">from last week</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Resolution Time</p>
                <p className="text-2xl font-bold mt-1">28h</p>
              </div>
              <div className="rounded-lg p-2 bg-blue-500/10">
                <Clock className="h-5 w-5 text-blue-500" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs">
              <div className="text-green-500 flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                12%
              </div>
              <span className="ml-1 text-muted-foreground">faster resolution</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Customer Satisfaction</p>
                <p className="text-2xl font-bold mt-1">87%</p>
              </div>
              <div className="rounded-lg p-2 bg-green-500/10">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs">
              <div className="text-green-500 flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                4%
              </div>
              <span className="ml-1 text-muted-foreground">improvement</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <Card className="mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Escalation Queue</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute top-1/2 transform -translate-y-1/2 left-3 h-4 w-4 text-muted-foreground pointer-events-none" />
                <Input 
                  placeholder="Search escalations..." 
                  className="pl-9" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                <Button variant={statusFilter === 'all' ? 'default' : 'outline'} size="sm" onClick={() => setStatusFilter('all')}>All</Button>
                <Button variant={statusFilter === 'urgent' ? 'default' : 'outline'} size="sm" onClick={() => setStatusFilter('urgent')}>Urgent</Button>
                <Button variant={statusFilter === 'in-progress' ? 'default' : 'outline'} size="sm" onClick={() => setStatusFilter('in-progress')}>In Progress</Button>
                <Button variant={statusFilter === 'pending' ? 'default' : 'outline'} size="sm" onClick={() => setStatusFilter('pending')}>Pending</Button>
                <Button variant={statusFilter === 'resolved' ? 'default' : 'outline'} size="sm" onClick={() => setStatusFilter('resolved')}>Resolved</Button>
              </div>
            </CardContent>
          </Card>
          
          <div className="overflow-y-auto max-h-[calc(100vh-360px)]">
            {filteredEscalations.length === 0 ? (
              <div className="text-center p-8 bg-muted/50 rounded-lg">
                <AlertTriangle className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                <p className="font-medium">No escalations found</p>
                <p className="text-sm text-muted-foreground">Try adjusting your filters</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredEscalations.map((escalation) => (
                  <Card 
                    key={escalation.id}
                    className={`cursor-pointer hover:bg-muted/50 transition-colors ${selectedEscalation.id === escalation.id ? 'border-primary' : ''}`}
                    onClick={() => setSelectedEscalation(escalationDetails)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Badge variant={getStatusColor(escalation.status)} className="mt-0.5">
                          {escalation.status}
                        </Badge>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-medium">{escalation.title}</p>
                              <p className="text-xs text-muted-foreground mt-1">{escalation.id} • {escalation.created}</p>
                            </div>
                            <Badge variant="outline" className={`text-${getPriorityColor(escalation.priority)}-500`}>
                              {escalation.priority} priority
                            </Badge>
                          </div>
                          
                          <div className="flex items-center gap-4 mt-3">
                            {escalation.customer && (
                              <div className="flex items-center gap-1.5">
                                <Avatar className="h-5 w-5">
                                  <AvatarImage src={escalation.customer.avatar} alt={escalation.customer.name} />
                                  <AvatarFallback className="bg-blue-100 text-blue-500">
                                    <User className="h-3 w-3" />
                                  </AvatarFallback>
                                </Avatar>
                                <span className="text-xs truncate">{escalation.customer.name}</span>
                              </div>
                            )}
                            
                            <div className="flex items-center gap-1.5">
                              <Avatar className="h-5 w-5">
                                <AvatarImage src={escalation.shop.avatar} alt={escalation.shop.name} />
                                <AvatarFallback className="bg-amber-100 text-amber-500">
                                  <Store className="h-3 w-3" />
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-xs truncate">{escalation.shop.name}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between mt-3 pt-3 border-t">
                            <Badge variant="outline">{escalation.category}</Badge>
                            <div className="flex items-center gap-1">
                              <Avatar className="h-5 w-5">
                                <AvatarImage src={escalation.assignee.avatar} alt={escalation.assignee.name} />
                                <AvatarFallback className="bg-primary/10 text-primary text-[10px]">
                                  {escalation.assignee.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-xs">{escalation.assignee.name}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Escalation Detail View */}
        <div className="md:col-span-2">
          <Tabs defaultValue="details">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold">{selectedEscalation.id}</h2>
                <p className="text-muted-foreground">{selectedEscalation.title}</p>
              </div>
              <TabsList className="mt-2 sm:mt-0">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
                <TabsTrigger value="actions">Actions</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="details" className="mt-0 space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Escalation Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h3 className="font-medium mb-4">Issue Information</h3>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-muted-foreground">Status</p>
                          <Badge variant={getStatusColor(selectedEscalation.status)} className="mt-1">
                            {selectedEscalation.status}
                          </Badge>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Priority</p>
                          <Badge variant="outline" className={`mt-1 text-${getPriorityColor(selectedEscalation.priority)}-500`}>
                            {selectedEscalation.priority} priority
                          </Badge>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Category</p>
                          <p className="font-medium">{selectedEscalation.category}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Created</p>
                          <p className="font-medium">{selectedEscalation.created}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Last Updated</p>
                          <p className="font-medium">{selectedEscalation.updated}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Assigned To</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={selectedEscalation.assignee.avatar} alt={selectedEscalation.assignee.name} />
                              <AvatarFallback className="bg-primary/10 text-primary text-[10px]">
                                {selectedEscalation.assignee.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{selectedEscalation.assignee.name}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2 mt-6">
                        <Button className="w-full gap-1 mb-2">
                          <Shield className="h-4 w-4" />
                          Resolve Escalation
                        </Button>
                        <Button variant="outline" className="w-full gap-1 mb-2">
                          <MessageSquare className="h-4 w-4" />
                          Message Parties
                        </Button>
                        <Button variant="outline" className="w-full gap-1 mb-2">
                          <User className="h-4 w-4" />
                          Reassign
                        </Button>
                      </div>
                    </div>
                    
                    <div className="md:col-span-2 space-y-6">
                      <div>
                        <h3 className="font-medium mb-4">Description</h3>
                        <Card className="bg-muted/50">
                          <CardContent className="p-4">
                            <p className="text-sm">{selectedEscalation.description}</p>
                          </CardContent>
                        </Card>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h3 className="font-medium mb-4">Customer Information</h3>
                          <Card className="bg-muted/50">
                            <CardContent className="p-4">
                              <div className="flex items-start gap-3">
                                <Avatar className="h-10 w-10">
                                  <AvatarImage src={selectedEscalation.customer.avatar} alt={selectedEscalation.customer.name} />
                                  <AvatarFallback className="bg-blue-100 text-blue-500">
                                    <User className="h-5 w-5" />
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">{selectedEscalation.customer.name}</p>
                                  <p className="text-sm text-muted-foreground">ID: {selectedEscalation.customer.id}</p>
                                </div>
                              </div>
                              <div className="mt-4 space-y-2 text-sm">
                                <div>
                                  <p className="text-muted-foreground">Email:</p>
                                  <p>{selectedEscalation.customer.email}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Phone:</p>
                                  <p>{selectedEscalation.customer.phone}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Member Since:</p>
                                  <p>{selectedEscalation.customer.joinDate}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Total Orders:</p>
                                  <p>{selectedEscalation.customer.orderCount}</p>
                                </div>
                              </div>
                              <Button variant="outline" size="sm" className="mt-4 w-full gap-1">
                                <User className="h-4 w-4" />
                                View Full Profile
                              </Button>
                            </CardContent>
                          </Card>
                        </div>
                        
                        <div>
                          <h3 className="font-medium mb-4">Shop Information</h3>
                          <Card className="bg-muted/50">
                            <CardContent className="p-4">
                              <div className="flex items-start gap-3">
                                <Avatar className="h-10 w-10">
                                  <AvatarImage src={selectedEscalation.shop.avatar} alt={selectedEscalation.shop.name} />
                                  <AvatarFallback className="bg-amber-100 text-amber-500">
                                    <Store className="h-5 w-5" />
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">{selectedEscalation.shop.name}</p>
                                  <p className="text-sm text-muted-foreground">ID: {selectedEscalation.shop.id}</p>
                                </div>
                              </div>
                              <div className="mt-4 space-y-2 text-sm">
                                <div>
                                  <p className="text-muted-foreground">Email:</p>
                                  <p>{selectedEscalation.shop.email}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Phone:</p>
                                  <p>{selectedEscalation.shop.phone}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Member Since:</p>
                                  <p>{selectedEscalation.shop.joinDate}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Total Orders:</p>
                                  <p>{selectedEscalation.shop.orderCount}</p>
                                </div>
                              </div>
                              <Button variant="outline" size="sm" className="mt-4 w-full gap-1">
                                <Store className="h-4 w-4" />
                                View Shop Profile
                              </Button>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-4">Order Details</h3>
                        <Card className="bg-muted/50">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-4">
                              <div>
                                <p className="font-medium">Order #{selectedEscalation.order.id}</p>
                                <p className="text-sm text-muted-foreground">Placed on {selectedEscalation.order.date}</p>
                              </div>
                              <Badge variant="outline">{selectedEscalation.order.delivery.status}</Badge>
                            </div>
                            
                            <div className="border-t pt-4 mb-4">
                              <p className="font-medium mb-2">Items</p>
                              <div className="space-y-3">
                                {selectedEscalation.order.items.map((item, index) => (
                                  <div key={index} className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                                        <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                                      </div>
                                      <div>
                                        <p className="text-sm">{item.name}</p>
                                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                                      </div>
                                    </div>
                                    <p className="font-medium">{item.price}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            <div className="border-t pt-4 mb-4">
                              <p className="font-medium mb-2">Delivery Information</p>
                              <p className="text-sm">{selectedEscalation.order.delivery.address}</p>
                              <p className="text-sm text-muted-foreground">Delivered on: {selectedEscalation.order.delivery.date}</p>
                            </div>
                            
                            <div className="border-t pt-4 flex items-center justify-between">
                              <p className="font-medium">Total</p>
                              <p className="font-bold">{selectedEscalation.order.amount}</p>
                            </div>
                            
                            <div className="mt-4">
                              <Button variant="outline" size="sm" className="w-full gap-1">
                                <ShoppingCart className="h-4 w-4" />
                                View Complete Order
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-4">Support Notes</h3>
                        <div className="space-y-3">
                          {selectedEscalation.notes.map((note, index) => (
                            <Card key={index} className="bg-muted/50">
                              <CardContent className="p-4">
                                <div className="flex items-start justify-between mb-2">
                                  <p className="font-medium">{note.author}</p>
                                  <p className="text-xs text-muted-foreground">{note.date}</p>
                                </div>
                                <p className="text-sm">{note.content}</p>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                        
                        <div className="mt-4">
                          <Textarea 
                            placeholder="Add a note..." 
                            className="min-h-[100px]" 
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                          />
                          <Button className="mt-2 gap-1">
                            <Plus className="h-4 w-4" />
                            Add Note
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="timeline" className="mt-0 space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Escalation Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative pl-6 border-l space-y-6">
                    {selectedEscalation.timeline.map((event, index) => (
                      <div key={index} className="relative">
                        <div className="absolute -left-[25px] h-4 w-4 rounded-full bg-primary"></div>
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">{event.date}</p>
                          <p className="font-medium">{event.event}</p>
                          <p className="text-sm">By: {event.user}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 flex justify-between">
                    <Button variant="outline" className="gap-1">
                      <FileTextIcon className="h-4 w-4" />
                      Export Timeline
                    </Button>
                    <Button variant="outline" className="gap-1">
                      <DownloadIcon className="h-4 w-4" />
                      Download Logs
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">Customer Communication</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-3 rounded-lg bg-muted/50">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="bg-blue-100 text-blue-500">
                                <User className="h-3 w-3" />
                              </AvatarFallback>
                            </Avatar>
                            <p className="font-medium">Ahmed Al-Farsi</p>
                          </div>
                          <p className="text-xs text-muted-foreground">June 17, 2023 - 09:12</p>
                        </div>
                        <p className="text-sm">I've been charged twice for my order. Please help!</p>
                      </div>
                      
                      <div className="p-3 rounded-lg bg-primary text-primary-foreground">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="bg-primary-foreground/20 text-primary-foreground">
                                FK
                              </AvatarFallback>
                            </Avatar>
                            <p className="font-medium">Fatima K.</p>
                          </div>
                          <p className="text-xs opacity-80">June 17, 2023 - 10:15</p>
                        </div>
                        <p className="text-sm">I'm sorry to hear about the double charge, Ahmed. I can confirm I see two charges in our system. I've escalated this to our financial team for an immediate refund.</p>
                      </div>
                      
                      <div className="p-3 rounded-lg bg-muted/50">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="bg-blue-100 text-blue-500">
                                <User className="h-3 w-3" />
                              </AvatarFallback>
                            </Avatar>
                            <p className="font-medium">Ahmed Al-Farsi</p>
                          </div>
                          <p className="text-xs text-muted-foreground">June 17, 2023 - 11:30</p>
                        </div>
                        <p className="text-sm">Thank you for looking into this. How long will the refund take to process?</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex items-end gap-2">
                      <Textarea placeholder="Type your message..." className="min-h-[80px]" />
                      <Button size="icon" className="h-10 w-10">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">Related Documents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                            <FileTextIcon className="h-5 w-5 text-blue-500" />
                          </div>
                          <div>
                            <p className="font-medium">Payment Receipt 1</p>
                            <p className="text-xs text-muted-foreground">PDF • 156 KB</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <DownloadIcon className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                            <FileTextIcon className="h-5 w-5 text-blue-500" />
                          </div>
                          <div>
                            <p className="font-medium">Payment Receipt 2</p>
                            <p className="text-xs text-muted-foreground">PDF • 156 KB</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <DownloadIcon className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                            <FileTextIcon className="h-5 w-5 text-blue-500" />
                          </div>
                          <div>
                            <p className="font-medium">System Error Log</p>
                            <p className="text-xs text-muted-foreground">TXT • 24 KB</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <DownloadIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="mt-4 w-full gap-1">
                      <Plus className="h-4 w-4" />
                      Upload Document
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="actions" className="mt-0 space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Recommended Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedEscalation.actions.map((action, index) => (
                      <Card key={index} className="bg-muted/50">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3">
                              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                {action.type === 'Refund' && <ArrowUpRight className="h-5 w-5 text-primary" />}
                                {action.type === 'Credit' && <ShoppingCart className="h-5 w-5 text-green-500" />}
                                {action.type === 'Notification' && <MessageSquare className="h-5 w-5 text-blue-500" />}
                              </div>
                              <div>
                                <p className="font-medium">{action.type}</p>
                                <p className="text-sm text-muted-foreground">{action.description}</p>
                                {action.amount && <p className="text-sm font-medium mt-1">{action.amount}</p>}
                                {action.template && <p className="text-sm mt-1">Template: {action.template}</p>}
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                <XCircle className="h-5 w-5 text-muted-foreground" />
                              </Button>
                              <Button size="sm" className="h-8 px-3">Apply</Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
                    <Button variant="outline" className="gap-1 w-full">
                      <Plus className="h-4 w-4" />
                      Custom Action
                    </Button>
                    <Button variant="outline" className="gap-1 w-full">
                      <Clock className="h-4 w-4" />
                      Schedule Follow-up
                    </Button>
                    <Button variant="outline" className="gap-1 w-full">
                      <Shield className="h-4 w-4" />
                      Flag for Review
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Resolution Options</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className="bg-green-500/5 hover:bg-green-500/10 cursor-pointer transition-colors">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                              <CheckCircle2 className="h-5 w-5 text-green-500" />
                            </div>
                            <div>
                              <p className="font-medium">Approve & Refund</p>
                              <p className="text-sm text-muted-foreground">Process refund of $85.40 and resolve escalation</p>
                              <Button className="mt-3 gap-1" size="sm">
                                <ArrowRight className="h-4 w-4" />
                                Proceed
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-red-500/5 hover:bg-red-500/10 cursor-pointer transition-colors">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="h-10 w-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                              <XCircle className="h-5 w-5 text-red-500" />
                            </div>
                            <div>
                              <p className="font-medium">Deny Refund</p>
                              <p className="text-sm text-muted-foreground">Decline customer request and close escalation</p>
                              <Button variant="outline" className="mt-3 gap-1" size="sm">
                                <ArrowRight className="h-4 w-4" />
                                Proceed
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <Card className="bg-blue-500/5 hover:bg-blue-500/10 cursor-pointer transition-colors">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                            <Shield className="h-5 w-5 text-blue-500" />
                          </div>
                          <div>
                            <p className="font-medium">Partial Refund & Compensation</p>
                            <p className="text-sm text-muted-foreground">Process partial refund and provide account credit as compensation</p>
                            <div className="grid grid-cols-2 gap-3 mt-3">
                              <div>
                                <p className="text-xs text-muted-foreground mb-1">Refund Amount</p>
                                <Input placeholder="$85.40" />
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground mb-1">Account Credit</p>
                                <Input placeholder="$10.00" />
                              </div>
                            </div>
                            <Button className="mt-3 gap-1" size="sm">
                              <ArrowRight className="h-4 w-4" />
                              Proceed
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EscalationsPage;
