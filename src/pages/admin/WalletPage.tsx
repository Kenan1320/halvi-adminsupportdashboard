
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import PageHeader from '@/components/admin/PageHeader';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Wallet, 
  Search, 
  Filter, 
  ArrowDown, 
  ArrowUp,
  Store, 
  User,
  CreditCard,
  DollarSign,
  ArrowUpRight,
  BarChart3, 
  Plus,
  Download
} from 'lucide-react';

// Mock data
const transactionsList = [
  { 
    id: 'TRX-20230615-001', 
    type: 'payout',
    direction: 'outgoing',
    amount: '$1,245.60',
    recipient: { name: 'Baraka Halal Meats', id: 'SHP-342', avatar: '/placeholder.svg', type: 'shop' },
    status: 'completed',
    date: 'June 15, 2023 - 14:32',
    description: 'Weekly payout for order fulfillments',
    reference: 'REF-P-20230615-342'
  },
  { 
    id: 'TRX-20230614-024', 
    type: 'commission',
    direction: 'incoming',
    amount: '$246.85',
    sender: { name: 'Medina Spices', id: 'SHP-287', avatar: '/placeholder.svg', type: 'shop' },
    status: 'completed',
    date: 'June 14, 2023 - 10:15',
    description: 'Platform commission for orders',
    reference: 'REF-C-20230614-287'
  },
  { 
    id: 'TRX-20230614-023', 
    type: 'refund',
    direction: 'outgoing',
    amount: '$85.40',
    recipient: { name: 'Ahmed Al-Farsi', id: 'USR-10492', avatar: '/placeholder.svg', type: 'customer' },
    status: 'completed',
    date: 'June 14, 2023 - 09:47',
    description: 'Refund for duplicate payment (Order #HD78294)',
    reference: 'REF-R-20230614-10492'
  },
  { 
    id: 'TRX-20230613-019', 
    type: 'payout',
    direction: 'outgoing',
    amount: '$875.20',
    recipient: { name: 'Al-Madina Bakery', id: 'SHP-176', avatar: '/placeholder.svg', type: 'shop' },
    status: 'completed',
    date: 'June 13, 2023 - 16:08',
    description: 'Weekly payout for order fulfillments',
    reference: 'REF-P-20230613-176'
  },
  { 
    id: 'TRX-20230613-018', 
    type: 'commission',
    direction: 'incoming',
    amount: '$192.60',
    sender: { name: 'Halal Sweet Delights', id: 'SHP-209', avatar: '/placeholder.svg', type: 'shop' },
    status: 'completed',
    date: 'June 13, 2023 - 14:22',
    description: 'Platform commission for orders',
    reference: 'REF-C-20230613-209'
  },
  { 
    id: 'TRX-20230612-015', 
    type: 'fee',
    direction: 'incoming',
    amount: '$25.00',
    sender: { name: 'Sunnah Foods', id: 'SHP-123', avatar: '/placeholder.svg', type: 'shop' },
    status: 'completed',
    date: 'June 12, 2023 - 11:30',
    description: 'Monthly subscription fee',
    reference: 'REF-F-20230612-123'
  },
  { 
    id: 'TRX-20230612-014', 
    type: 'adjustment',
    direction: 'outgoing',
    amount: '$50.00',
    recipient: { name: 'Layla Rahman', id: 'USR-10156', avatar: '/placeholder.svg', type: 'customer' },
    status: 'completed',
    date: 'June 12, 2023 - 10:15',
    description: 'Goodwill credit for delivery delay',
    reference: 'REF-A-20230612-10156'
  },
  { 
    id: 'TRX-20230611-010', 
    type: 'payout',
    direction: 'outgoing',
    amount: '$1,560.35',
    recipient: { name: 'Baraka Halal Meats', id: 'SHP-342', avatar: '/placeholder.svg', type: 'shop' },
    status: 'completed',
    date: 'June 11, 2023 - 16:45',
    description: 'Weekly payout for order fulfillments',
    reference: 'REF-P-20230611-342'
  },
];

const scheduledPayoutsList = [
  { 
    id: 'SCH-20230618-001', 
    recipient: { name: 'Baraka Halal Meats', id: 'SHP-342', avatar: '/placeholder.svg', type: 'shop' },
    amount: '$1,345.25',
    scheduledDate: 'June 18, 2023 - 12:00',
    status: 'pending',
    description: 'Weekly payout for order fulfillments'
  },
  { 
    id: 'SCH-20230618-002', 
    recipient: { name: 'Al-Madina Bakery', id: 'SHP-176', avatar: '/placeholder.svg', type: 'shop' },
    amount: '$986.40',
    scheduledDate: 'June 18, 2023 - 12:00',
    status: 'pending',
    description: 'Weekly payout for order fulfillments'
  },
  { 
    id: 'SCH-20230618-003', 
    recipient: { name: 'Medina Spices', id: 'SHP-287', avatar: '/placeholder.svg', type: 'shop' },
    amount: '$728.90',
    scheduledDate: 'June 18, 2023 - 12:00',
    status: 'pending',
    description: 'Weekly payout for order fulfillments'
  }
];

const pendingRefundsList = [
  { 
    id: 'REF-20230616-001', 
    customer: { name: 'Mohammed Nur', id: 'USR-10298', avatar: '/placeholder.svg' },
    shop: { name: 'Baraka Halal Meats', id: 'SHP-342', avatar: '/placeholder.svg' },
    amount: '$43.25',
    requestDate: 'June 16, 2023 - 09:15',
    order: 'ORD-56732',
    status: 'pending review',
    reason: 'Product damaged during delivery'
  },
  { 
    id: 'REF-20230615-007', 
    customer: { name: 'Fatima Zahra', id: 'USR-10387', avatar: '/placeholder.svg' },
    shop: { name: 'Medina Spices', id: 'SHP-287', avatar: '/placeholder.svg' },
    amount: '$16.50',
    requestDate: 'June 15, 2023 - 14:22',
    order: 'ORD-56701',
    status: 'under investigation',
    reason: 'Wrong item delivered'
  },
  { 
    id: 'REF-20230615-006', 
    customer: { name: 'Aisha Mahmood', id: 'USR-6024', avatar: '/placeholder.svg' },
    shop: { name: 'Al-Madina Bakery', id: 'SHP-176', avatar: '/placeholder.svg' },
    amount: '$28.75',
    requestDate: 'June 15, 2023 - 11:08',
    order: 'ORD-56698',
    status: 'awaiting shop input',
    reason: 'Quality issue with product'
  }
];

const WalletPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [transactionTypeFilter, setTransactionTypeFilter] = useState('all');

  const filteredTransactions = transactionsList.filter(transaction => 
    (transactionTypeFilter === 'all' || transaction.type === transactionTypeFilter) &&
    (transaction.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
     transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
     (transaction.recipient && transaction.recipient.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
     (transaction.sender && transaction.sender.name.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  return (
    <DashboardLayout title="Admin Wallet">
      <PageHeader 
        title="Admin Wallet" 
        description="Manage platform funds, payments, and financial operations"
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <Download size={14} />
              Export
            </Button>
            <Button size="sm" className="h-8 gap-1">
              <Plus size={14} />
              New Transaction
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Available Balance</p>
                <p className="text-2xl font-bold mt-1">$72,568.42</p>
              </div>
              <div className="rounded-lg p-2 bg-primary/10">
                <Wallet className="h-5 w-5 text-primary" />
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
                <p className="text-sm font-medium text-muted-foreground">Revenue (MTD)</p>
                <p className="text-2xl font-bold mt-1">$24,685.30</p>
              </div>
              <div className="rounded-lg p-2 bg-green-500/10">
                <ArrowUp className="h-5 w-5 text-green-500" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs">
              <div className="text-green-500 flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                12.5%
              </div>
              <span className="ml-1 text-muted-foreground">vs last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Payouts</p>
                <p className="text-2xl font-bold mt-1">$15,640.75</p>
              </div>
              <div className="rounded-lg p-2 bg-amber-500/10">
                <CreditCard className="h-5 w-5 text-amber-500" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs">
              <span className="text-muted-foreground">Next payout: June 18, 2023</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Refunds</p>
                <p className="text-2xl font-bold mt-1">$1,286.50</p>
              </div>
              <div className="rounded-lg p-2 bg-blue-500/10">
                <ArrowDown className="h-5 w-5 text-blue-500" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs">
              <span className="text-muted-foreground">8 refunds awaiting processing</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="transactions" className="w-full mb-8">
        <TabsList className="w-full md:w-auto mb-4">
          <TabsTrigger value="transactions" className="flex-1 md:flex-none">
            <BarChart3 className="h-4 w-4 mr-2" />
            Transactions
          </TabsTrigger>
          <TabsTrigger value="scheduled" className="flex-1 md:flex-none">
            <CreditCard className="h-4 w-4 mr-2" />
            Scheduled Payouts
          </TabsTrigger>
          <TabsTrigger value="refunds" className="flex-1 md:flex-none">
            <ArrowDown className="h-4 w-4 mr-2" />
            Pending Refunds
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="transactions" className="mt-0">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Transaction History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div className="relative w-full sm:w-auto sm:min-w-[300px]">
                  <Search className="absolute top-1/2 transform -translate-y-1/2 left-3 h-4 w-4 text-muted-foreground pointer-events-none" />
                  <Input 
                    placeholder="Search transactions..." 
                    className="pl-9" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full sm:w-auto">
                  <Button variant={transactionTypeFilter === 'all' ? 'default' : 'outline'} size="sm" onClick={() => setTransactionTypeFilter('all')}>
                    All
                  </Button>
                  <Button variant={transactionTypeFilter === 'payout' ? 'default' : 'outline'} size="sm" onClick={() => setTransactionTypeFilter('payout')}>
                    Payouts
                  </Button>
                  <Button variant={transactionTypeFilter === 'commission' ? 'default' : 'outline'} size="sm" onClick={() => setTransactionTypeFilter('commission')}>
                    Commissions
                  </Button>
                  <Button variant={transactionTypeFilter === 'refund' ? 'default' : 'outline'} size="sm" onClick={() => setTransactionTypeFilter('refund')}>
                    Refunds
                  </Button>
                  <Button variant={transactionTypeFilter === 'fee' ? 'default' : 'outline'} size="sm" onClick={() => setTransactionTypeFilter('fee')}>
                    Fees
                  </Button>
                  <Button variant={transactionTypeFilter === 'adjustment' ? 'default' : 'outline'} size="sm" onClick={() => setTransactionTypeFilter('adjustment')}>
                    Adjustments
                  </Button>
                </div>
              </div>
              
              <div className="overflow-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Transaction ID</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Type</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">From/To</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Amount</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTransactions.map((transaction) => (
                      <tr key={transaction.id} className="border-b hover:bg-muted/50 transition-colors">
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium">{transaction.id}</p>
                            <p className="text-xs text-muted-foreground">{transaction.reference}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant="outline" className={`
                            ${transaction.type === 'payout' ? 'bg-blue-50 text-blue-600 border-blue-200' : ''}
                            ${transaction.type === 'commission' ? 'bg-green-50 text-green-600 border-green-200' : ''}
                            ${transaction.type === 'refund' ? 'bg-amber-50 text-amber-600 border-amber-200' : ''}
                            ${transaction.type === 'fee' ? 'bg-purple-50 text-purple-600 border-purple-200' : ''}
                            ${transaction.type === 'adjustment' ? 'bg-red-50 text-red-600 border-red-200' : ''}
                          `}>
                            {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          {transaction.direction === 'outgoing' ? (
                            <div className="flex items-center gap-2">
                              <ArrowUp className="h-4 w-4 text-red-500" />
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src={transaction.recipient.avatar} alt={transaction.recipient.name} />
                                  <AvatarFallback className={`
                                    ${transaction.recipient.type === 'customer' ? 'bg-blue-100 text-blue-500' : ''}
                                    ${transaction.recipient.type === 'shop' ? 'bg-amber-100 text-amber-500' : ''}
                                  `}>
                                    {transaction.recipient.type === 'customer' ? (
                                      <User className="h-3 w-3" />
                                    ) : (
                                      <Store className="h-3 w-3" />
                                    )}
                                  </AvatarFallback>
                                </Avatar>
                                <span>{transaction.recipient.name}</span>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <ArrowDown className="h-4 w-4 text-green-500" />
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src={transaction.sender.avatar} alt={transaction.sender.name} />
                                  <AvatarFallback className={`
                                    ${transaction.sender.type === 'customer' ? 'bg-blue-100 text-blue-500' : ''}
                                    ${transaction.sender.type === 'shop' ? 'bg-amber-100 text-amber-500' : ''}
                                  `}>
                                    {transaction.sender.type === 'customer' ? (
                                      <User className="h-3 w-3" />
                                    ) : (
                                      <Store className="h-3 w-3" />
                                    )}
                                  </AvatarFallback>
                                </Avatar>
                                <span>{transaction.sender.name}</span>
                              </div>
                            </div>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <div className={`font-semibold ${transaction.direction === 'outgoing' ? 'text-red-500' : 'text-green-500'}`}>
                            {transaction.direction === 'outgoing' ? '- ' : '+ '}{transaction.amount}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <p className="text-sm">{transaction.date}</p>
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant={transaction.status === 'completed' ? 'success' : 'outline'}>
                            {transaction.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                            <Button variant="outline" size="sm">
                              Receipt
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {filteredTransactions.length === 0 && (
                  <div className="text-center py-12">
                    <Wallet className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No transactions found</h3>
                    <p className="text-muted-foreground">Try adjusting your filters or search query</p>
                  </div>
                )}
              </div>
              
              <div className="flex items-center justify-between mt-4">
                <p className="text-sm text-muted-foreground">Showing {filteredTransactions.length} of {transactionsList.length} transactions</p>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled>Previous</Button>
                  <Button variant="outline" size="sm">Next</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="scheduled" className="mt-0">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <CardTitle className="text-lg font-medium">Scheduled Payouts</CardTitle>
                <Button size="sm" className="gap-1">
                  <Plus size={14} />
                  Schedule New Payout
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">ID</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Recipient</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Amount</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Scheduled Date</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scheduledPayoutsList.map((payout) => (
                      <tr key={payout.id} className="border-b hover:bg-muted/50 transition-colors">
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium">{payout.id}</p>
                            <p className="text-xs text-muted-foreground">{payout.description}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={payout.recipient.avatar} alt={payout.recipient.name} />
                              <AvatarFallback className="bg-amber-100 text-amber-500">
                                <Store className="h-3 w-3" />
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p>{payout.recipient.name}</p>
                              <p className="text-xs text-muted-foreground">{payout.recipient.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-semibold text-red-500">
                            - {payout.amount}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <p className="text-sm">{payout.scheduledDate}</p>
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">
                            {payout.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                            <Button variant="outline" size="sm">
                              Process Now
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-500 hover:text-red-500">
                              Cancel
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {scheduledPayoutsList.length === 0 && (
                  <div className="text-center py-12">
                    <CreditCard className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No scheduled payouts</h3>
                    <p className="text-muted-foreground">All payouts have been processed</p>
                  </div>
                )}
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-muted/50">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <DollarSign className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Total Scheduled</p>
                        <p className="text-sm text-muted-foreground mt-1">Amount to be paid out</p>
                        <p className="text-xl font-bold text-red-500 mt-1">- $3,060.55</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-muted/50">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                        <Store className="h-5 w-5 text-blue-500" />
                      </div>
                      <div>
                        <p className="font-medium">Recipients</p>
                        <p className="text-sm text-muted-foreground mt-1">Shops to be paid</p>
                        <p className="text-xl font-bold mt-1">3 shops</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-muted/50">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                        <CreditCard className="h-5 w-5 text-amber-500" />
                      </div>
                      <div>
                        <p className="font-medium">Next Payout</p>
                        <p className="text-sm text-muted-foreground mt-1">Scheduled time</p>
                        <p className="text-xl font-bold mt-1">In 2 days</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="refunds" className="mt-0">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <CardTitle className="text-lg font-medium">Pending Refunds</CardTitle>
                <Button variant="outline" size="sm" className="gap-1">
                  <ArrowDown size={14} />
                  Process All Refunds
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">ID</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Customer</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Shop</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Amount</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Request Date</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingRefundsList.map((refund) => (
                      <tr key={refund.id} className="border-b hover:bg-muted/50 transition-colors">
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium">{refund.id}</p>
                            <p className="text-xs text-muted-foreground">Order: {refund.order}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={refund.customer.avatar} alt={refund.customer.name} />
                              <AvatarFallback className="bg-blue-100 text-blue-500">
                                <User className="h-3 w-3" />
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p>{refund.customer.name}</p>
                              <p className="text-xs text-muted-foreground">{refund.customer.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={refund.shop.avatar} alt={refund.shop.name} />
                              <AvatarFallback className="bg-amber-100 text-amber-500">
                                <Store className="h-3 w-3" />
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p>{refund.shop.name}</p>
                              <p className="text-xs text-muted-foreground">{refund.shop.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-semibold text-red-500">
                            {refund.amount}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <p className="text-sm">{refund.requestDate}</p>
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant="outline" className={`
                            ${refund.status === 'pending review' ? 'bg-amber-50 text-amber-600 border-amber-200' : ''}
                            ${refund.status === 'under investigation' ? 'bg-blue-50 text-blue-600 border-blue-200' : ''}
                            ${refund.status === 'awaiting shop input' ? 'bg-purple-50 text-purple-600 border-purple-200' : ''}
                          `}>
                            {refund.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              Review
                            </Button>
                            <Button variant="outline" size="sm" className="text-green-500 hover:text-green-500">
                              Approve
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-500 hover:text-red-500">
                              Deny
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {pendingRefundsList.length === 0 && (
                  <div className="text-center py-12">
                    <ArrowDown className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No pending refunds</h3>
                    <p className="text-muted-foreground">All refunds have been processed</p>
                  </div>
                )}
              </div>
              
              <div className="mt-6">
                <Card className="bg-muted/50">
                  <CardContent className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                          <ArrowDown className="h-5 w-5 text-red-500" />
                        </div>
                        <div>
                          <p className="font-medium">Total Pending</p>
                          <p className="text-xl font-bold text-red-500 mt-1">{pendingRefundsList.length} refunds</p>
                          <p className="text-sm text-muted-foreground mt-1">$88.50 in total</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                          <User className="h-5 w-5 text-blue-500" />
                        </div>
                        <div>
                          <p className="font-medium">Customers Waiting</p>
                          <p className="text-xl font-bold mt-1">3 customers</p>
                          <p className="text-sm text-muted-foreground mt-1">Awaiting refunds</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                          <Wallet className="h-5 w-5 text-amber-500" />
                        </div>
                        <div>
                          <p className="font-medium">Average Time</p>
                          <p className="text-xl font-bold mt-1">24 hours</p>
                          <p className="text-sm text-muted-foreground mt-1">To process refunds</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default WalletPage;
