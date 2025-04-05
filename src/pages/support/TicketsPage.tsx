
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
  Search, 
  Filter, 
  Plus,
  Store, 
  User, 
  TicketCheck,
  Clock,
  CheckCircle2,
  AlertCircle,
  Send,
  Tag,
  Paperclip,
  ChevronDown,
  MessageSquare
} from 'lucide-react';

// Mock data
const ticketsList = [
  { 
    id: 'TKT-2023-1045', 
    subject: 'Order not received but marked as delivered',
    customer: { name: 'Ahmed Al-Farsi', avatar: '/placeholder.svg' },
    shop: { name: 'Baraka Halal Meats', avatar: '/placeholder.svg' },
    status: 'open',
    priority: 'high',
    created: '2 hours ago',
    updated: '15 minutes ago',
    category: 'Order Issue',
    assignee: { name: 'Fatima K.', avatar: '/placeholder.svg' }
  },
  { 
    id: 'TKT-2023-1042', 
    subject: 'Refund request for damaged product',
    customer: { name: 'Layla Rahman', avatar: '/placeholder.svg' },
    shop: { name: 'Medina Grocers', avatar: '/placeholder.svg' },
    status: 'in-progress',
    priority: 'medium',
    created: '1 day ago',
    updated: '3 hours ago',
    category: 'Refund',
    assignee: { name: 'Omar J.', avatar: '/placeholder.svg' }
  },
  { 
    id: 'TKT-2023-1038', 
    subject: 'Question about halal certification of products',
    customer: { name: 'Mahmoud Abed', avatar: '/placeholder.svg' },
    shop: { name: 'Al-Noor Market', avatar: '/placeholder.svg' },
    status: 'pending',
    priority: 'medium',
    created: '2 days ago',
    updated: '1 day ago',
    category: 'Product Information',
    assignee: { name: 'Zainab M.', avatar: '/placeholder.svg' }
  },
  { 
    id: 'TKT-2023-1036', 
    subject: 'Multiple delayed deliveries from same shop',
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
    id: 'TKT-2023-1034', 
    subject: 'Need assistance with updating shop information',
    customer: null,
    shop: { name: 'Halal Sweet Delights', avatar: '/placeholder.svg' },
    status: 'closed',
    priority: 'low',
    created: '6 days ago',
    updated: '4 days ago',
    category: 'Shop Support',
    assignee: { name: 'Amina L.', avatar: '/placeholder.svg' }
  },
  { 
    id: 'TKT-2023-1033', 
    subject: 'Payment issue with order checkout',
    customer: { name: 'Ibrahim Qadir', avatar: '/placeholder.svg' },
    shop: null,
    status: 'open',
    priority: 'high',
    created: '1 day ago',
    updated: '10 hours ago',
    category: 'Payment',
    assignee: { name: 'Yusuf R.', avatar: '/placeholder.svg' }
  },
  { 
    id: 'TKT-2023-1032', 
    subject: 'Query about bulk order options',
    customer: { name: 'Aisha Mohammad', avatar: '/placeholder.svg' },
    shop: { name: 'Al-Madina Bakery', avatar: '/placeholder.svg' },
    status: 'in-progress',
    priority: 'low',
    created: '2 days ago',
    updated: '1 day ago',
    category: 'Order Information',
    assignee: { name: 'Omar J.', avatar: '/placeholder.svg' }
  },
];

const ticketDetails = {
  id: 'TKT-2023-1045',
  subject: 'Order not received but marked as delivered',
  description: 'I placed an order (#ORD-45982) for halal meat 3 days ago. The app shows it was delivered yesterday, but I never received it. I've checked with neighbors and there was no delivery attempt. I need help resolving this as I've already been charged.',
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
    orderCount: 1245,
    avatar: '/placeholder.svg' 
  },
  order: {
    id: 'ORD-45982',
    date: 'June 15, 2023',
    amount: '£85.40',
    items: [
      { name: 'Premium Halal Lamb', quantity: 2, price: '£32.50' },
      { name: 'Halal Chicken Breast', quantity: 1, price: '£12.40' },
      { name: 'Halal Beef Mince', quantity: 1, price: '£8.00' }
    ],
    delivery: {
      address: '45 Crescent Road, Birmingham, B15 2JT',
      status: 'Marked as Delivered',
      date: 'June 16, 2023'
    }
  },
  timeline: [
    { date: 'June 15, 2023 - 14:32', event: 'Ticket created by Ahmed Al-Farsi', user: 'Ahmed Al-Farsi' },
    { date: 'June 15, 2023 - 14:45', event: 'Ticket assigned to Fatima K.', user: 'System' },
    { date: 'June 15, 2023 - 15:10', event: 'Fatima K. contacted the shop for order status', user: 'Fatima K.' },
    { date: 'June 15, 2023 - 16:20', event: 'Shop confirmed order was dispatched', user: 'Baraka Halal Meats' },
    { date: 'June 15, 2023 - 16:35', event: 'Ticket updated with delivery information', user: 'Fatima K.' },
    { date: 'June 17, 2023 - 09:12', event: 'Customer reported still not receiving order', user: 'Ahmed Al-Farsi' }
  ],
  messages: [
    { 
      id: 1,
      sender: 'customer',
      senderName: 'Ahmed Al-Farsi',
      content: 'I\'ve been waiting for my order for 3 days now, but it\'s marked as delivered in the app. I never received anything and I\'ve checked with my neighbors. Can you help me locate my order or get a refund?',
      time: 'June 15, 2023 - 14:32',
      attachment: null
    },
    { 
      id: 2,
      sender: 'agent',
      senderName: 'Fatima K.',
      content: 'I\'m sorry to hear about this issue, Ahmed. I understand how frustrating it must be. I\'ll contact the shop immediately to check on your order status. Could you please confirm your delivery address for me?',
      time: 'June 15, 2023 - 15:00',
      attachment: null
    },
    { 
      id: 3,
      sender: 'customer',
      senderName: 'Ahmed Al-Farsi',
      content: 'Thank you for your quick response. My address is 45 Crescent Road, Birmingham, B15 2JT.',
      time: 'June 15, 2023 - 15:05',
      attachment: null
    },
    { 
      id: 4,
      sender: 'agent',
      senderName: 'Fatima K.',
      content: 'Thank you for confirming. I\'ve just spoken with Baraka Halal Meats, and they confirmed your order was dispatched yesterday for delivery. According to the delivery service, it was marked as delivered at 14:15 yesterday. They'll check with the driver for more information. In the meantime, I\'ve added a note to your order about this issue.',
      time: 'June 15, 2023 - 16:35',
      attachment: null
    },
    { 
      id: 5,
      sender: 'customer',
      senderName: 'Ahmed Al-Farsi',
      content: 'It\'s now two days since my order was supposedly delivered, and I still haven\'t received anything. I\'ve checked everywhere around my building. Could we please proceed with a refund or replacement? I really needed these items.',
      time: 'June 17, 2023 - 09:12',
      attachment: null
    }
  ],
  notes: [
    { date: 'June 15, 2023 - 15:10', content: 'Contacted Baraka Halal Meats. Spoke with Mohammad who confirmed the order was prepared and dispatched yesterday. Delivery service shows it was delivered at 14:15 on June 16. Requested they check with the driver for more details.', author: 'Fatima K.' },
    { date: 'June 15, 2023 - 16:40', content: 'Delivery service is investigating the discrepancy. They will contact the driver who made the delivery and get back to us by end of day. We should prepare for possible refund or reshipment if package cannot be located.', author: 'Fatima K.' }
  ],
  status: 'open',
  priority: 'high',
  created: 'June 15, 2023 - 14:32',
  updated: 'June 17, 2023 - 09:12',
  category: 'Order Issue',
  assignee: { name: 'Fatima K.', avatar: '/placeholder.svg' }
};

const TicketsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedTicket, setSelectedTicket] = useState(ticketDetails);
  const [replyText, setReplyText] = useState('');
  const [noteText, setNoteText] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'destructive';
      case 'in-progress':
        return 'blue';
      case 'pending':
        return 'yellow';
      case 'resolved':
        return 'green';
      case 'closed':
        return 'default';
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

  const filteredTickets = ticketsList.filter(ticket => 
    (statusFilter === 'all' || ticket.status === statusFilter) &&
    (ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (ticket.customer?.name.toLowerCase().includes(searchQuery.toLowerCase()) || false) ||
    (ticket.shop?.name.toLowerCase().includes(searchQuery.toLowerCase()) || false))
  );

  return (
    <DashboardLayout title="Support Tickets">
      <PageHeader 
        title="Support Tickets" 
        description="Manage and resolve customer and merchant support tickets"
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <Filter size={14} />
              Filters
            </Button>
            <Button size="sm" className="h-8 gap-1">
              <Plus size={14} />
              New Ticket
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Open Tickets</p>
                <p className="text-2xl font-bold mt-1">24</p>
              </div>
              <div className="rounded-lg p-2 bg-destructive/10">
                <TicketCheck className="h-5 w-5 text-destructive" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs">
              <span className="text-muted-foreground">12 high priority</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Resolution Time</p>
                <p className="text-2xl font-bold mt-1">14m</p>
              </div>
              <div className="rounded-lg p-2 bg-blue-500/10">
                <Clock className="h-5 w-5 text-blue-500" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs">
              <span className="text-muted-foreground">-2m from target time</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Resolution Rate</p>
                <p className="text-2xl font-bold mt-1">92%</p>
              </div>
              <div className="rounded-lg p-2 bg-green-500/10">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs">
              <span className="text-muted-foreground">+2% from last week</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Your Assigned</p>
                <p className="text-2xl font-bold mt-1">8</p>
              </div>
              <div className="rounded-lg p-2 bg-amber-500/10">
                <User className="h-5 w-5 text-amber-500" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs">
              <span className="text-muted-foreground">3 need immediate attention</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all-tickets" className="w-full mb-8">
        <TabsList className="w-full md:w-auto mb-4">
          <TabsTrigger value="all-tickets" className="flex-1 md:flex-none">
            <TicketCheck className="h-4 w-4 mr-2" />
            All Tickets
          </TabsTrigger>
          <TabsTrigger value="assigned" className="flex-1 md:flex-none">
            <User className="h-4 w-4 mr-2" />
            Assigned to Me
          </TabsTrigger>
          <TabsTrigger value="high-priority" className="flex-1 md:flex-none">
            <AlertCircle className="h-4 w-4 mr-2" />
            High Priority
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all-tickets" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Card className="mb-6">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Ticket Queue</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="relative">
                    <Search className="absolute top-1/2 transform -translate-y-1/2 left-3 h-4 w-4 text-muted-foreground pointer-events-none" />
                    <Input 
                      placeholder="Search tickets..." 
                      className="pl-9" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex items-center gap-2 overflow-x-auto pb-2">
                    <Button variant={statusFilter === 'all' ? 'default' : 'outline'} size="sm" onClick={() => setStatusFilter('all')}>All</Button>
                    <Button variant={statusFilter === 'open' ? 'default' : 'outline'} size="sm" onClick={() => setStatusFilter('open')}>Open</Button>
                    <Button variant={statusFilter === 'in-progress' ? 'default' : 'outline'} size="sm" onClick={() => setStatusFilter('in-progress')}>In Progress</Button>
                    <Button variant={statusFilter === 'pending' ? 'default' : 'outline'} size="sm" onClick={() => setStatusFilter('pending')}>Pending</Button>
                    <Button variant={statusFilter === 'resolved' ? 'default' : 'outline'} size="sm" onClick={() => setStatusFilter('resolved')}>Resolved</Button>
                    <Button variant={statusFilter === 'closed' ? 'default' : 'outline'} size="sm" onClick={() => setStatusFilter('closed')}>Closed</Button>
                  </div>
                </CardContent>
              </Card>
              
              <div className="overflow-y-auto max-h-[calc(100vh-350px)]">
                {filteredTickets.length === 0 ? (
                  <div className="text-center p-8 bg-muted/50 rounded-lg">
                    <TicketCheck className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                    <p className="font-medium">No tickets found</p>
                    <p className="text-sm text-muted-foreground">Try adjusting your filters</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredTickets.map((ticket) => (
                      <Card 
                        key={ticket.id}
                        className={`cursor-pointer hover:bg-muted/50 transition-colors ${selectedTicket.id === ticket.id ? 'border-primary' : ''}`}
                        onClick={() => setSelectedTicket(ticketDetails)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <Badge variant={getStatusColor(ticket.status)} className="mt-0.5">
                              {ticket.status}
                            </Badge>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between">
                                <div>
                                  <p className="font-medium truncate">{ticket.subject}</p>
                                  <p className="text-xs text-muted-foreground mt-1">{ticket.id} • {ticket.created}</p>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-4 mt-3">
                                {ticket.customer && (
                                  <div className="flex items-center gap-1.5">
                                    <Avatar className="h-5 w-5">
                                      <AvatarImage src={ticket.customer.avatar} alt={ticket.customer.name} />
                                      <AvatarFallback className="bg-blue-100 text-blue-500">
                                        <User className="h-3 w-3" />
                                      </AvatarFallback>
                                    </Avatar>
                                    <span className="text-xs truncate">{ticket.customer.name}</span>
                                  </div>
                                )}
                                
                                {ticket.shop && (
                                  <div className="flex items-center gap-1.5">
                                    <Avatar className="h-5 w-5">
                                      <AvatarImage src={ticket.shop.avatar} alt={ticket.shop.name} />
                                      <AvatarFallback className="bg-amber-100 text-amber-500">
                                        <Store className="h-3 w-3" />
                                      </AvatarFallback>
                                    </Avatar>
                                    <span className="text-xs truncate">{ticket.shop.name}</span>
                                  </div>
                                )}
                              </div>
                              
                              <div className="flex items-center justify-between mt-3 pt-3 border-t">
                                <Badge variant="outline" className={`text-${getPriorityColor(ticket.priority)}-500`}>
                                  {ticket.priority} priority
                                </Badge>
                                <div className="flex items-center gap-1">
                                  <Avatar className="h-5 w-5">
                                    <AvatarImage src={ticket.assignee.avatar} alt={ticket.assignee.name} />
                                    <AvatarFallback className="bg-primary/10 text-primary text-[10px]">
                                      {ticket.assignee.name.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span className="text-xs">{ticket.assignee.name}</span>
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
            
            {/* Ticket Detail View */}
            <div className="md:col-span-2">
              <Tabs defaultValue="details">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-semibold">{selectedTicket.id}</h2>
                    <p className="text-muted-foreground">{selectedTicket.subject}</p>
                  </div>
                  <TabsList className="mt-2 sm:mt-0">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="messages">Messages</TabsTrigger>
                    <TabsTrigger value="notes">Internal Notes</TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="details" className="mt-0 space-y-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-medium">Ticket Details</CardTitle>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Reassign
                          </Button>
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <h3 className="font-medium mb-4">Ticket Information</h3>
                          <div className="space-y-3">
                            <div>
                              <p className="text-sm text-muted-foreground">Status</p>
                              <Badge variant={getStatusColor(selectedTicket.status)} className="mt-1">
                                {selectedTicket.status}
                              </Badge>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Priority</p>
                              <Badge variant="outline" className={`mt-1 text-${getPriorityColor(selectedTicket.priority)}-500`}>
                                {selectedTicket.priority} priority
                              </Badge>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Category</p>
                              <p className="font-medium">{selectedTicket.category}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Created</p>
                              <p className="font-medium">{selectedTicket.created}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Last Updated</p>
                              <p className="font-medium">{selectedTicket.updated}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Assigned To</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src={selectedTicket.assignee.avatar} alt={selectedTicket.assignee.name} />
                                  <AvatarFallback className="bg-primary/10 text-primary text-[10px]">
                                    {selectedTicket.assignee.name.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="font-medium">{selectedTicket.assignee.name}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-2 mt-6">
                            <Button className="w-full gap-1 mb-2">
                              <CheckCircle2 className="h-4 w-4" />
                              Resolve Ticket
                            </Button>
                            <Button variant="outline" className="w-full gap-1 mb-2">
                              <AlertCircle className="h-4 w-4" />
                              Escalate Ticket
                            </Button>
                            <Button variant="outline" className="w-full gap-1 mb-2">
                              <MessageSquare className="h-4 w-4" />
                              Message Customer
                            </Button>
                          </div>
                        </div>
                        
                        <div className="md:col-span-2 space-y-6">
                          <div>
                            <h3 className="font-medium mb-4">Description</h3>
                            <Card className="bg-muted/50">
                              <CardContent className="p-4">
                                <p className="text-sm">{selectedTicket.description}</p>
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
                                      <AvatarImage src={selectedTicket.customer.avatar} alt={selectedTicket.customer.name} />
                                      <AvatarFallback className="bg-blue-100 text-blue-500">
                                        <User className="h-5 w-5" />
                                      </AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <p className="font-medium">{selectedTicket.customer.name}</p>
                                      <p className="text-sm text-muted-foreground">ID: {selectedTicket.customer.id}</p>
                                    </div>
                                  </div>
                                  <div className="mt-4 space-y-2 text-sm">
                                    <div>
                                      <p className="text-muted-foreground">Email:</p>
                                      <p>{selectedTicket.customer.email}</p>
                                    </div>
                                    <div>
                                      <p className="text-muted-foreground">Phone:</p>
                                      <p>{selectedTicket.customer.phone}</p>
                                    </div>
                                    <div>
                                      <p className="text-muted-foreground">Member Since:</p>
                                      <p>{selectedTicket.customer.joinDate}</p>
                                    </div>
                                    <div>
                                      <p className="text-muted-foreground">Total Orders:</p>
                                      <p>{selectedTicket.customer.orderCount}</p>
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
                                      <AvatarImage src={selectedTicket.shop.avatar} alt={selectedTicket.shop.name} />
                                      <AvatarFallback className="bg-amber-100 text-amber-500">
                                        <Store className="h-5 w-5" />
                                      </AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <p className="font-medium">{selectedTicket.shop.name}</p>
                                      <p className="text-sm text-muted-foreground">ID: {selectedTicket.shop.id}</p>
                                    </div>
                                  </div>
                                  <div className="mt-4 space-y-2 text-sm">
                                    <div>
                                      <p className="text-muted-foreground">Email:</p>
                                      <p>{selectedTicket.shop.email}</p>
                                    </div>
                                    <div>
                                      <p className="text-muted-foreground">Phone:</p>
                                      <p>{selectedTicket.shop.phone}</p>
                                    </div>
                                    <div>
                                      <p className="text-muted-foreground">Total Orders:</p>
                                      <p>{selectedTicket.shop.orderCount}</p>
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
                                    <p className="font-medium">Order #{selectedTicket.order.id}</p>
                                    <p className="text-sm text-muted-foreground">Placed on {selectedTicket.order.date}</p>
                                  </div>
                                  <Badge variant="destructive">
                                    {selectedTicket.order.delivery.status}
                                  </Badge>
                                </div>
                                
                                <div className="border-t pt-4 mb-4">
                                  <p className="font-medium mb-2">Ordered Items</p>
                                  <div className="space-y-2">
                                    {selectedTicket.order.items.map((item, index) => (
                                      <div key={index} className="flex items-center justify-between">
                                        <div>
                                          <p className="text-sm">{item.name}</p>
                                          <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                                        </div>
                                        <p className="font-medium">{item.price}</p>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                                
                                <div className="border-t pt-4 mb-4">
                                  <p className="font-medium mb-2">Delivery Information</p>
                                  <p className="text-sm">{selectedTicket.order.delivery.address}</p>
                                  <p className="text-sm text-muted-foreground">Status: {selectedTicket.order.delivery.status}</p>
                                  <p className="text-sm text-muted-foreground">Expected: {selectedTicket.order.delivery.date}</p>
                                </div>
                                
                                <div className="border-t pt-4 flex items-center justify-between">
                                  <p className="font-medium">Total</p>
                                  <p className="font-bold">{selectedTicket.order.amount}</p>
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                          
                          <div>
                            <h3 className="font-medium mb-4">Ticket Timeline</h3>
                            <div className="relative pl-6 border-l space-y-4">
                              {selectedTicket.timeline.map((event, index) => (
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
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="messages" className="mt-0 space-y-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-medium">Conversation History</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4 mb-6">
                        {selectedTicket.messages.map((message) => (
                          <div key={message.id} className={`p-4 rounded-lg ${message.sender === 'agent' ? 'bg-primary/10 ml-8' : 'bg-muted mr-8'}`}>
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarFallback className={message.sender === 'agent' ? 'bg-primary/20 text-primary' : 'bg-blue-100 text-blue-500'}>
                                    {message.sender === 'agent' ? 'A' : 'C'}
                                  </AvatarFallback>
                                </Avatar>
                                <p className="font-medium">{message.senderName}</p>
                              </div>
                              <p className="text-xs text-muted-foreground">{message.time}</p>
                            </div>
                            <p className="text-sm">{message.content}</p>
                            {message.attachment && (
                              <div className="mt-2 p-2 bg-background rounded border flex items-center gap-2">
                                <Paperclip className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">{message.attachment}</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                      
                      <div className="pt-4 border-t">
                        <h3 className="font-medium mb-3">Reply to Ticket</h3>
                        <div className="space-y-4">
                          <div className="flex gap-2 mb-2">
                            <Button variant="outline" size="sm">
                              <Tag className="h-4 w-4 mr-1" />
                              Templates
                            </Button>
                            <Button variant="outline" size="sm">
                              <Paperclip className="h-4 w-4 mr-1" />
                              Attach
                            </Button>
                          </div>
                          <Textarea 
                            placeholder="Type your reply..." 
                            className="min-h-[120px]" 
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                          />
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm">
                                Preview
                              </Button>
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground">Status:</span>
                                <Button variant="outline" size="sm" className="h-8 gap-1">
                                  Keep as Open
                                  <ChevronDown className="h-3 w-3 ml-1" />
                                </Button>
                              </div>
                            </div>
                            <Button className="gap-1">
                              <Send className="h-4 w-4" />
                              Send Reply
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="notes" className="mt-0 space-y-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-medium">Internal Notes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4 mb-6">
                        {selectedTicket.notes.map((note, index) => (
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
                      
                      <div className="pt-4 border-t">
                        <h3 className="font-medium mb-3">Add Internal Note</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          Notes are only visible to support agents and not to customers or merchants.
                        </p>
                        <div className="space-y-4">
                          <Textarea 
                            placeholder="Type your internal note..." 
                            className="min-h-[120px]" 
                            value={noteText}
                            onChange={(e) => setNoteText(e.target.value)}
                          />
                          <Button className="gap-1">
                            <Plus className="h-4 w-4" />
                            Add Note
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="assigned" className="mt-0">
          <Card>
            <CardContent className="py-12 text-center">
              <div className="max-w-md mx-auto">
                <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">No tickets assigned</h3>
                <p className="text-muted-foreground mb-4">There are currently no tickets assigned to you.</p>
                <Button>Assign Me Tickets</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="high-priority" className="mt-0">
          <Card>
            <CardContent className="py-12 text-center">
              <div className="max-w-md mx-auto">
                <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">High Priority Tickets</h3>
                <p className="text-muted-foreground mb-4">
                  There are 12 high priority tickets that need attention. Please check the "All Tickets" tab and filter by priority.
                </p>
                <Button variant="destructive">View High Priority</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default TicketsPage;
