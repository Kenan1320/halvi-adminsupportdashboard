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
  Store, 
  User, 
  ArrowDown,
  CheckCircle2,
  XCircle,
  ArrowUpRight,
  ShoppingCart,
  Clock,
  AlertCircle,
  Download,
  Eye
} from 'lucide-react';

// Mock data
const refundsList = [
  { 
    id: 'REF-20230616-001', 
    customer: { name: 'Mohammed Nur', id: 'USR-10298', avatar: '/placeholder.svg' },
    shop: { name: 'Baraka Halal Meats', id: 'SHP-342', avatar: '/placeholder.svg' },
    amount: '$43.25',
    requestDate: 'June 16, 2023 - 09:15',
    order: { id: 'ORD-56732', total: '$86.50', date: 'June 14, 2023' },
    status: 'pending',
    reason: 'Product damaged during delivery',
    items: [
      { name: 'Premium Halal Lamb', quantity: 1, price: '$32.50', refundType: 'Full' },
      { name: 'Halal Chicken Breast', quantity: 1, price: '$10.75', refundType: 'Full' }
    ],
    evidence: 'damaged-package.jpg',
    timeline: [
      { date: 'June 16, 2023 - 09:15', event: 'Refund requested by customer', user: 'Mohammed Nur' },
      { date: 'June 16, 2023 - 09:30', event: 'Refund request received and under review', user: 'System' }
    ]
  },
  { 
    id: 'REF-20230615-007', 
    customer: { name: 'Fatima Zahra', id: 'USR-10387', avatar: '/placeholder.svg' },
    shop: { name: 'Medina Spices', id: 'SHP-287', avatar: '/placeholder.svg' },
    amount: '$16.50',
    requestDate: 'June 15, 2023 - 14:22',
    order: { id: 'ORD-56701', total: '$32.75', date: 'June 13, 2023' },
    status: 'investigating',
    reason: 'Wrong item delivered',
    items: [
      { name: 'Exotic Spice Mix', quantity: 1, price: '$16.50', refundType: 'Full' }
    ],
    evidence: 'wrong-item.jpg',
    timeline: [
      { date: 'June 15, 2023 - 14:22', event: 'Refund requested by customer', user: 'Fatima Zahra' },
      { date: 'June 15, 2023 - 14:30', event: 'Refund request received and under review', user: 'System' },
      { date: 'June 15, 2023 - 15:45', event: 'Shop contacted for verification', user: 'Omar J.' }
    ]
  },
  { 
    id: 'REF-20230615-006', 
    customer: { name: 'Aisha Mahmood', id: 'USR-6024', avatar: '/placeholder.svg' },
    shop: { name: 'Al-Madina Bakery', id: 'SHP-176', avatar: '/placeholder.svg' },
    amount: '$28.75',
    requestDate: 'June 15, 2023 - 11:08',
    order: { id: 'ORD-56698', total: '$28.75', date: 'June 12, 2023' },
    status: 'approved',
    reason: 'Quality issue with product',
    items: [
      { name: 'Assorted Baklava Box', quantity: 1, price: '$28.75', refundType: 'Full' }
    ],
    evidence: 'quality-issue.jpg',
    timeline: [
      { date: 'June 15, 2023 - 11:08', event: 'Refund requested by customer', user: 'Aisha Mahmood' },
      { date: 'June 15, 2023 - 11:15', event: 'Refund request received and under review', user: 'System' },
      { date: 'June 15, 2023 - 13:20', event: 'Shop confirmed quality issue', user: 'Al-Madina Bakery' },
      { date: 'June 15, 2023 - 13:35', event: 'Refund approved', user: 'Hassan T.' },
      { date: 'June 15, 2023 - 13:40', event: 'Refund initiated to customer payment method', user: 'System' }
    ]
  },
  { 
    id: 'REF-20230614-005', 
    customer: { name: 'Ahmed Al-Farsi', id: 'USR-10492', avatar: '/placeholder.svg' },
    shop: { name: 'Halal Sweet Delights', id: 'SHP-209', avatar: '/placeholder.svg' },
    amount: '$12.40',
    requestDate: 'June 14, 2023 - 16:55',
    order: { id: 'ORD-56685', total: '$37.20', date: 'June 11, 2023' },
    status: 'rejected',
    reason: 'Changed mind about product',
    items: [
      { name: 'Premium Dates Box', quantity: 1, price: '$12.40', refundType: 'Full' }
    ],
    evidence: null,
    timeline: [
      { date: 'June 14, 2023 - 16:55', event: 'Refund requested by customer', user: 'Ahmed Al-Farsi' },
      { date: 'June 14, 2023 - 17:00', event: 'Refund request received and under review', user: 'System' },
      { date: 'June 14, 2023 - 18:15', event: 'Shop reviewed request', user: 'Halal Sweet Delights' },
      { date: 'June 15, 2023 - 09:30', event: 'Refund rejected due to policy (taste preference not eligible)', user: 'Yusuf R.' }
    ]
  },
  { 
    id: 'REF-20230614-004', 
    customer: { name: 'Layla Rahman', id: 'USR-10156', avatar: '/placeholder.svg' },
    shop: { name: 'Sunnah Foods', id: 'SHP-123', avatar: '/placeholder.svg' },
    amount: '$85.60',
    requestDate: 'June 14, 2023 - 10:18',
    order: { id: 'ORD-56680', total: '$85.60', date: 'June 10, 2023' },
    status: 'completed',
    reason: 'Order never delivered',
    items: [
      { name: 'Family Meal Box', quantity: 1, price: '$85.60', refundType: 'Full' }
    ],
    evidence: null,
    timeline: [
      { date: 'June 14, 2023 - 10:18', event: 'Refund requested by customer', user: 'Layla Rahman' },
      { date: 'June 14, 2023 - 10:25', event: 'Refund request received and under review', user: 'System' },
      { date: 'June 14, 2023 - 11:40', event: 'Delivery service confirmed no delivery', user: 'Support' },
      { date: 'June 14, 2023 - 12:05', event: 'Refund approved', user: 'Omar J.' },
      { date: 'June 14, 2023 - 12:10', event: 'Refund initiated to customer payment method', user: 'System' },
      { date: 'June 15, 2023 - 09:15', event: 'Refund completed and credited to customer', user: 'System' }
    ]
  }
];

const RefundsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedRefund, setSelectedRefund] = useState(refundsList[0]);
  const [noteText, setNoteText] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'secondary';
      case 'investigating':
        return 'outline';
      case 'approved':
        return 'secondary';
      case 'rejected':
        return 'destructive';
      case 'completed':
        return 'default';
      default:
        return 'default';
    }
  };

  const filteredRefunds = refundsList.filter(refund => 
    (statusFilter === 'all' || refund.status === statusFilter) &&
    (refund.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    refund.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    refund.shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    refund.order.id.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <DashboardLayout title="Refund Management">
      <PageHeader 
        title="Refund Management" 
        description="Process and manage customer refund requests"
        actions={
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
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Refunds</p>
                <p className="text-2xl font-bold mt-1">8</p>
              </div>
              <div className="rounded-lg p-2 bg-yellow-500/10">
                <Clock className="h-5 w-5 text-yellow-500" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs">
              <div className="text-yellow-500 flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                3
              </div>
              <span className="ml-1 text-muted-foreground">need immediate attention</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Processing Time</p>
                <p className="text-2xl font-bold mt-1">6h 24m</p>
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
              <span className="ml-1 text-muted-foreground">faster than last week</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Approval Rate</p>
                <p className="text-2xl font-bold mt-1">82%</p>
              </div>
              <div className="rounded-lg p-2 bg-green-500/10">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs">
              <div className="text-green-500 flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                3%
              </div>
              <span className="ml-1 text-muted-foreground">higher than last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <Card className="mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Refund Requests</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute top-1/2 transform -translate-y-1/2 left-3 h-4 w-4 text-muted-foreground pointer-events-none" />
                <Input 
                  placeholder="Search refunds..." 
                  className="pl-9" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                <Button variant={statusFilter === 'all' ? 'default' : 'outline'} size="sm" onClick={() => setStatusFilter('all')}>All</Button>
                <Button variant={statusFilter === 'pending' ? 'default' : 'outline'} size="sm" onClick={() => setStatusFilter('pending')}>Pending</Button>
                <Button variant={statusFilter === 'investigating' ? 'default' : 'outline'} size="sm" onClick={() => setStatusFilter('investigating')}>Investigating</Button>
                <Button variant={statusFilter === 'approved' ? 'default' : 'outline'} size="sm" onClick={() => setStatusFilter('approved')}>Approved</Button>
                <Button variant={statusFilter === 'rejected' ? 'default' : 'outline'} size="sm" onClick={() => setStatusFilter('rejected')}>Rejected</Button>
                <Button variant={statusFilter === 'completed' ? 'default' : 'outline'} size="sm" onClick={() => setStatusFilter('completed')}>Completed</Button>
              </div>
            </CardContent>
          </Card>
          
          <div className="overflow-y-auto max-h-[calc(100vh-350px)]">
            {filteredRefunds.length === 0 ? (
              <div className="text-center p-8 bg-muted/50 rounded-lg">
                <ArrowDown className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                <p className="font-medium">No refunds found</p>
                <p className="text-sm text-muted-foreground">Try adjusting your filters</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredRefunds.map((refund) => (
                  <Card 
                    key={refund.id}
                    className={`cursor-pointer hover:bg-muted/50 transition-colors ${selectedRefund.id === refund.id ? 'border-primary' : ''}`}
                    onClick={() => setSelectedRefund(refund)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Badge variant="secondary" className="mt-0.5 text-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                          {refund.status}
                        </Badge>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-medium truncate">{refund.reason}</p>
                              <p className="text-xs text-muted-foreground mt-1">{refund.id} • {refund.requestDate}</p>
                            </div>
                            <p className="font-semibold text-red-500">{refund.amount}</p>
                          </div>
                          
                          <div className="flex items-center gap-4 mt-3">
                            <div className="flex items-center gap-1.5">
                              <Avatar className="h-5 w-5">
                                <AvatarImage src={refund.customer.avatar} alt={refund.customer.name} />
                                <AvatarFallback className="bg-blue-100 text-blue-500">
                                  <User className="h-3 w-3" />
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-xs truncate">{refund.customer.name}</span>
                            </div>
                            
                            <div className="flex items-center gap-1.5">
                              <Avatar className="h-5 w-5">
                                <AvatarImage src={refund.shop.avatar} alt={refund.shop.name} />
                                <AvatarFallback className="bg-amber-100 text-amber-500">
                                  <Store className="h-3 w-3" />
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-xs truncate">{refund.shop.name}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between mt-3 pt-3 border-t">
                            <div className="flex items-center gap-1.5">
                              <ShoppingCart className="h-3 w-3 text-muted-foreground" />
                              <span className="text-xs">{refund.order.id}</span>
                            </div>
                            <Badge variant="outline">
                              {refund.items.length} item{refund.items.length > 1 ? 's' : ''}
                            </Badge>
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
        
        <div className="md:col-span-2">
          <Tabs defaultValue="details">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold">{selectedRefund.id}</h2>
                <div className="flex items-center gap-2">
                  <Badge variant={getStatusColor(selectedRefund.status)}>
                    {selectedRefund.status}
                  </Badge>
                  <p className="text-sm text-muted-foreground">{selectedRefund.requestDate}</p>
                </div>
              </div>
              <TabsList className="mt-2 sm:mt-0">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
                <TabsTrigger value="evidence">Evidence</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="details" className="mt-0 space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-medium">Refund Details</CardTitle>
                    <div className="flex gap-2">
                      {(selectedRefund.status === 'pending' || selectedRefund.status === 'investigating') && (
                        <>
                          <Button variant="outline" size="sm" className="gap-1 text-destructive">
                            <XCircle className="h-4 w-4" />
                            Reject
                          </Button>
                          <Button size="sm" className="gap-1 bg-green-600 hover:bg-green-700">
                            <CheckCircle2 className="h-4 w-4" />
                            Approve
                          </Button>
                        </>
                      )}
                      {selectedRefund.status === 'approved' && (
                        <Button size="sm" className="gap-1">
                          <ArrowDown className="h-4 w-4" />
                          Process Refund
                        </Button>
                      )}
                      {selectedRefund.status !== 'pending' && selectedRefund.status !== 'investigating' && selectedRefund.status !== 'approved' && (
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h3 className="font-medium mb-4">Refund Information</h3>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-muted-foreground">Refund Amount</p>
                          <p className="font-bold text-xl text-red-500">{selectedRefund.amount}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Reason</p>
                          <p className="font-medium">{selectedRefund.reason}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Order ID</p>
                          <p className="font-medium">{selectedRefund.order.id}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Order Date</p>
                          <p className="font-medium">{selectedRefund.order.date}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Order Total</p>
                          <p className="font-medium">{selectedRefund.order.total}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Refund Requested</p>
                          <p className="font-medium">{selectedRefund.requestDate}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2 mt-6">
                        {selectedRefund.status === 'pending' && (
                          <>
                            <Button className="w-full gap-1 mb-2 bg-green-600 hover:bg-green-700">
                              <CheckCircle2 className="h-4 w-4" />
                              Approve Refund
                            </Button>
                            <Button variant="outline" className="w-full gap-1 mb-2 text-destructive">
                              <XCircle className="h-4 w-4" />
                              Reject Refund
                            </Button>
                            <Button variant="outline" className="w-full gap-1 mb-2">
                              <AlertCircle className="h-4 w-4" />
                              Request More Info
                            </Button>
                          </>
                        )}
                        {selectedRefund.status === 'investigating' && (
                          <>
                            <Button className="w-full gap-1 mb-2 bg-green-600 hover:bg-green-700">
                              <CheckCircle2 className="h-4 w-4" />
                              Approve Refund
                            </Button>
                            <Button variant="outline" className="w-full gap-1 mb-2 text-destructive">
                              <XCircle className="h-4 w-4" />
                              Reject Refund
                            </Button>
                            <Button variant="outline" className="w-full gap-1 mb-2">
                              <Store className="h-4 w-4" />
                              Contact Shop
                            </Button>
                          </>
                        )}
                        {selectedRefund.status === 'approved' && (
                          <Button className="w-full gap-1 mb-2">
                            <ArrowDown className="h-4 w-4" />
                            Process Refund Now
                          </Button>
                        )}
                        {selectedRefund.status === 'rejected' && (
                          <Button variant="outline" className="w-full gap-1 mb-2">
                            <Eye className="h-4 w-4" />
                            View Rejection Reason
                          </Button>
                        )}
                        {selectedRefund.status === 'completed' && (
                          <Button variant="outline" className="w-full gap-1 mb-2">
                            <Download className="h-4 w-4" />
                            Download Receipt
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    <div className="md:col-span-2 space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h3 className="font-medium mb-4">Customer Information</h3>
                          <Card className="bg-muted/50">
                            <CardContent className="p-4">
                              <div className="flex items-start gap-3">
                                <Avatar className="h-10 w-10">
                                  <AvatarImage src={selectedRefund.customer.avatar} alt={selectedRefund.customer.name} />
                                  <AvatarFallback className="bg-blue-100 text-blue-500">
                                    <User className="h-5 w-5" />
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">{selectedRefund.customer.name}</p>
                                  <p className="text-sm text-muted-foreground">ID: {selectedRefund.customer.id}</p>
                                </div>
                              </div>
                              <Button variant="outline" size="sm" className="mt-4 w-full gap-1">
                                <User className="h-4 w-4" />
                                View Customer Profile
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
                                  <AvatarImage src={selectedRefund.shop.avatar} alt={selectedRefund.shop.name} />
                                  <AvatarFallback className="bg-amber-100 text-amber-500">
                                    <Store className="h-5 w-5" />
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">{selectedRefund.shop.name}</p>
                                  <p className="text-sm text-muted-foreground">ID: {selectedRefund.shop.id}</p>
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
                        <h3 className="font-medium mb-4">Items for Refund</h3>
                        <Card className="bg-muted/50">
                          <CardContent className="p-4">
                            <div className="space-y-4">
                              {selectedRefund.items.map((item, index) => (
                                <div key={index} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                                  <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                                      <ShoppingCart className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                      <p className="font-medium">{item.name}</p>
                                      <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <p className="font-medium">{item.price}</p>
                                    <Badge variant="outline" className="mt-1">
                                      {item.refundType} Refund
                                    </Badge>
                                  </div>
                                </div>
                              ))}
                            </div>
                            
                            <div className="mt-4 pt-4 border-t flex items-center justify-between">
                              <p className="font-medium">Total Refund</p>
                              <p className="font-bold text-red-500">{selectedRefund.amount}</p>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-4">Internal Notes</h3>
                        <Textarea 
                          placeholder="Add internal notes about this refund..." 
                          className="min-h-[100px]" 
                          value={noteText}
                          onChange={(e) => setNoteText(e.target.value)}
                        />
                        <Button className="mt-2">Save Note</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="timeline" className="mt-0 space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Refund Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative pl-6 border-l space-y-6">
                    {selectedRefund.timeline.map((event, index) => (
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
                  
                  {selectedRefund.status === 'pending' && (
                    <div className="mt-6 pt-6 border-t flex gap-2">
                      <Button className="gap-1 bg-green-600 hover:bg-green-700">
                        <CheckCircle2 className="h-4 w-4" />
                        Approve Refund
                      </Button>
                      <Button variant="outline" className="gap-1 text-destructive">
                        <XCircle className="h-4 w-4" />
                        Reject Refund
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="evidence" className="mt-0 space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Refund Evidence</CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedRefund.evidence ? (
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4">
                        <img 
                          src="/placeholder.svg" 
                          alt="Evidence" 
                          className="w-full max-h-[400px] object-cover rounded-lg mb-4" 
                        />
                        <p className="text-sm text-muted-foreground">Filename: {selectedRefund.evidence}</p>
                        <p className="text-sm text-muted-foreground">Uploaded: {selectedRefund.requestDate}</p>
                        <div className="flex gap-2 mt-4">
                          <Button variant="outline" size="sm" className="gap-1">
                            <Download className="h-4 w-4" />
                            Download Evidence
                          </Button>
                          <Button variant="outline" size="sm" className="gap-1">
                            <Eye className="h-4 w-4" />
                            View Full Size
                          </Button>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-2">Customer Description</h3>
                        <Card className="bg-muted/50">
                          <CardContent className="p-4">
                            <p className="text-sm">{selectedRefund.reason}</p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">No Evidence Provided</h3>
                      <p className="text-muted-foreground mb-4">The customer did not upload any evidence with this refund request.</p>
                      <Button variant="outline" className="gap-1">
                        <User className="h-4 w-4" />
                        Request Evidence from Customer
                      </Button>
                    </div>
                  )}
                  
                  {selectedRefund.status === 'pending' && (
                    <div className="mt-6 pt-6 border-t flex gap-2">
                      <Button className="gap-1 bg-green-600 hover:bg-green-700">
                        <CheckCircle2 className="h-4 w-4" />
                        Approve Refund
                      </Button>
                      <Button variant="outline" className="gap-1 text-destructive">
                        <XCircle className="h-4 w-4" />
                        Reject Refund
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RefundsPage;
