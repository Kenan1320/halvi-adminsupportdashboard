
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
  MessageSquare, 
  Mail,
  Send,
  Phone,
  Clock,
  FileText,
  ChevronRight,
  ArrowUpRight,
  Download,
  CheckCircle,
  BarChart3,
  PieChart as PieChartIcon
} from 'lucide-react';

// Mock data
const contactsList = [
  { 
    id: 1, 
    name: 'Ahmed Al-Farsi', 
    type: 'user', 
    avatar: '/placeholder.svg', 
    lastMessage: 'I haven\'t received my order yet...', 
    time: '2m ago',
    unread: true,
    status: 'active'
  },
  { 
    id: 2, 
    name: 'Baraka Halal Meats', 
    type: 'shop', 
    avatar: '/placeholder.svg', 
    lastMessage: 'We need assistance with our latest invoice...', 
    time: '10m ago',
    unread: true,
    status: 'active'
  },
  { 
    id: 3, 
    name: 'Fatima Zahra', 
    type: 'user', 
    avatar: '/placeholder.svg', 
    lastMessage: 'Thank you for resolving my refund issue...', 
    time: '1h ago',
    unread: false,
    status: 'active'
  },
  { 
    id: 4, 
    name: 'Medina Spices', 
    type: 'shop', 
    avatar: '/placeholder.svg', 
    lastMessage: 'We\'ve updated our halal certification as requested...', 
    time: '3h ago',
    unread: false,
    status: 'active'
  },
  { 
    id: 5, 
    name: 'Mohammed Nur', 
    type: 'user', 
    avatar: '/placeholder.svg', 
    lastMessage: 'Is there a way to track my order in real-time?', 
    time: '5h ago',
    unread: false,
    status: 'active'
  },
];

const messageHistory = [
  {
    id: 1,
    sender: 'user',
    senderName: 'Ahmed Al-Farsi',
    content: 'I ordered Halal meat 3 days ago (Order #HD78294) but haven\'t received it yet. The app shows it\'s still "processing" but it should have been delivered by now.',
    time: 'Yesterday, 4:31 PM',
    isRead: true
  },
  {
    id: 2,
    sender: 'admin',
    senderName: 'Halvi Support',
    content: 'I understand your concern about your order, Ahmed. Let me check the status for you right away. Could you please confirm your delivery address?',
    time: 'Yesterday, 4:35 PM',
    isRead: true
  },
  {
    id: 3,
    sender: 'user',
    senderName: 'Ahmed Al-Farsi',
    content: 'Thank you for the quick response! My address is 45 Crescent Road, Birmingham, B15 2JT.',
    time: 'Yesterday, 4:38 PM',
    isRead: true
  },
  {
    id: 4,
    sender: 'admin',
    senderName: 'Halvi Support',
    content: 'Thank you for confirming. I\'ve checked your order and there seems to be a delay with the shop processing it. I\'ve contacted the shop directly and they\'ve promised to dispatch it today with priority delivery. You should receive it by tomorrow morning. I\'ve also added a £5 credit to your account for the inconvenience.',
    time: 'Yesterday, 4:45 PM',
    isRead: true
  },
  {
    id: 5,
    sender: 'user',
    senderName: 'Ahmed Al-Farsi',
    content: 'That\'s great news! Thank you so much for sorting this out quickly and for the credit. I appreciate it.',
    time: 'Yesterday, 4:47 PM',
    isRead: true
  },
  {
    id: 6,
    sender: 'admin',
    senderName: 'Halvi Support',
    content: 'You\'re most welcome, Ahmed. We\'re sorry for the delay with your order. I\'ve made a note to follow up on this tomorrow to ensure your delivery arrives as promised. Is there anything else I can help you with today?',
    time: 'Yesterday, 4:50 PM',
    isRead: true
  },
  {
    id: 7,
    sender: 'user',
    senderName: 'Ahmed Al-Farsi',
    content: 'No, that\'s all for now. Thanks again for your help!',
    time: 'Yesterday, 4:52 PM',
    isRead: true
  },
  {
    id: 8,
    sender: 'admin',
    senderName: 'Halvi Support',
    content: 'You\'re welcome! If you need anything else, feel free to message us anytime. We\'re here to help 24/7. Have a wonderful day!',
    time: 'Yesterday, 4:54 PM',
    isRead: true
  },
  {
    id: 9,
    sender: 'user',
    senderName: 'Ahmed Al-Farsi',
    content: 'I haven\'t received my order yet and it\'s already afternoon. Can you please check again?',
    time: '2 minutes ago',
    isRead: false
  }
];

const emailTemplates = [
  { id: 1, name: 'Welcome Email', subject: 'Welcome to Halvi - Your Halal Marketplace', updated: '2 days ago' },
  { id: 2, name: 'Order Confirmation', subject: 'Your Halvi Order #[OrderID] Confirmation', updated: '1 week ago' },
  { id: 3, name: 'Shipping Confirmation', subject: 'Your Halvi Order Has Shipped!', updated: '1 week ago' },
  { id: 4, name: 'Order Delivered', subject: 'How was your Halvi order?', updated: '2 weeks ago' },
  { id: 5, name: 'Refund Processed', subject: 'Your Refund for Halvi Order #[OrderID] Has Been Processed', updated: '1 month ago' },
  { id: 6, name: 'Account Verification', subject: 'Verify Your Halvi Account', updated: '1 month ago' },
  { id: 7, name: 'Password Reset', subject: 'Reset Your Halvi Password', updated: '1 month ago' },
  { id: 8, name: 'Abandoned Cart', subject: 'Complete Your Halvi Order', updated: '1 month ago' },
];

const CommunicationPage = () => {
  const [selectedContact, setSelectedContact] = useState(contactsList[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [messageText, setMessageText] = useState('');
  const [conversationsFilter, setConversationsFilter] = useState('all');

  const filteredContacts = contactsList.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getContactColor = (type: string) => {
    return type === 'user' ? 'blue' : 'amber';
  };

  return (
    <DashboardLayout title="Communication Hub">
      <PageHeader 
        title="Communication Hub" 
        description="Manage all communication with users and shops"
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <Filter size={14} />
              Filters
            </Button>
            <Button size="sm" className="h-8 gap-1">
              <Plus size={14} />
              New Message
            </Button>
          </div>
        }
      />

      <Tabs defaultValue="messages" className="w-full mb-8">
        <TabsList className="w-full md:w-auto mb-4">
          <TabsTrigger value="messages" className="flex-1 md:flex-none">
            <MessageSquare className="h-4 w-4 mr-2" />
            Messages
          </TabsTrigger>
          <TabsTrigger value="email-templates" className="flex-1 md:flex-none">
            <Mail className="h-4 w-4 mr-2" />
            Email Templates
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex-1 md:flex-none">
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="messages" className="mt-0">
          <Card className="overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 h-[75vh]">
              {/* Left Sidebar - Conversations */}
              <div className="border-r">
                <div className="p-4 border-b">
                  <div className="relative mb-4">
                    <Search className="absolute top-1/2 transform -translate-y-1/2 left-3 h-4 w-4 text-muted-foreground pointer-events-none" />
                    <Input 
                      placeholder="Search messages..." 
                      className="pl-9" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant={conversationsFilter === 'all' ? 'default' : 'outline'} size="sm" onClick={() => setConversationsFilter('all')}>All</Button>
                    <Button variant={conversationsFilter === 'unread' ? 'default' : 'outline'} size="sm" onClick={() => setConversationsFilter('unread')}>Unread</Button>
                    <Button variant={conversationsFilter === 'users' ? 'default' : 'outline'} size="sm" onClick={() => setConversationsFilter('users')}>Users</Button>
                    <Button variant={conversationsFilter === 'shops' ? 'default' : 'outline'} size="sm" onClick={() => setConversationsFilter('shops')}>Shops</Button>
                  </div>
                </div>

                <div className="overflow-y-auto h-[calc(75vh-88px)]">
                  {filteredContacts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                      <MessageSquare className="h-12 w-12 text-muted-foreground/50 mb-2" />
                      <h3 className="font-medium">No conversations found</h3>
                      <p className="text-sm text-muted-foreground">Try a different search or filter</p>
                    </div>
                  ) : (
                    filteredContacts.map(contact => (
                      <div 
                        key={contact.id}
                        className={`p-3 border-b hover:bg-muted/50 cursor-pointer transition-colors ${selectedContact.id === contact.id ? 'bg-muted/80' : ''}`}
                        onClick={() => setSelectedContact(contact)}
                      >
                        <div className="flex items-start gap-3">
                          <div className="relative">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={contact.avatar} alt={contact.name} />
                              <AvatarFallback className={`bg-${getContactColor(contact.type)}-100 text-${getContactColor(contact.type)}-500`}>
                                {contact.type === 'user' ? <User className="h-5 w-5" /> : <Store className="h-5 w-5" />}
                              </AvatarFallback>
                            </Avatar>
                            {contact.status === 'active' && (
                              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <p className="font-medium truncate">{contact.name}</p>
                              <p className="text-xs text-muted-foreground shrink-0">{contact.time}</p>
                            </div>
                            <div className="flex items-center justify-between mt-1">
                              <p className="text-sm text-muted-foreground truncate flex-1">{contact.lastMessage}</p>
                              {contact.unread && (
                                <Badge className="ml-2 h-5 w-5 p-0 flex items-center justify-center rounded-full">1</Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Main Chat Area */}
              <div className="md:col-span-2 flex flex-col h-full">
                <div className="p-4 border-b flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={selectedContact.avatar} alt={selectedContact.name} />
                      <AvatarFallback className={`bg-${getContactColor(selectedContact.type)}-100 text-${getContactColor(selectedContact.type)}-500`}>
                        {selectedContact.type === 'user' ? <User className="h-5 w-5" /> : <Store className="h-5 w-5" />}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{selectedContact.name}</p>
                        <Badge variant="outline" className="text-xs">
                          {selectedContact.type === 'user' ? 'Customer' : 'Merchant'}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 mt-0.5">
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Mail className="h-3 w-3 mr-1" />
                          Email
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Phone className="h-3 w-3 mr-1" />
                          Call
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <User className="h-3 w-3 mr-1" />
                          Profile
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      View History
                    </Button>
                    <Button variant="outline" size="sm">
                      Transfer
                    </Button>
                  </div>
                </div>

                <div className="p-4 overflow-y-auto flex-1 flex flex-col-reverse gap-3">
                  {messageHistory.slice().reverse().map((message) => (
                    <div key={message.id} className={`flex ${message.sender === 'admin' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`flex items-start gap-2 max-w-[80%] ${message.sender === 'admin' ? 'flex-row-reverse' : ''}`}>
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className={message.sender === 'admin' ? 'bg-primary/20 text-primary' : `bg-${getContactColor('user')}-100 text-${getContactColor('user')}-500`}>
                            {message.sender === 'admin' ? 'HS' : <User className="h-4 w-4" />}
                          </AvatarFallback>
                        </Avatar>
                        <div className={`${message.sender === 'admin' ? 'bg-primary text-primary-foreground' : 'bg-muted'} p-3 rounded-lg text-sm`}>
                          <p>{message.content}</p>
                          <div className="flex items-center justify-end mt-1">
                            <p className="text-xs opacity-70">{message.time}</p>
                            {message.sender === 'admin' && message.isRead && (
                              <CheckCircle className="h-3 w-3 ml-1 opacity-70" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 border-t">
                  <div className="flex gap-2 mb-2">
                    <Button variant="outline" size="sm">
                      Quick Replies
                    </Button>
                    <Button variant="outline" size="sm">
                      Attach
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Textarea 
                      placeholder="Type your message here..." 
                      className="min-h-[80px]" 
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                    />
                    <div className="flex flex-col justify-end">
                      <Button size="icon">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="email-templates" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-medium">Email Templates</CardTitle>
                    <Button className="gap-1" size="sm">
                      <Plus className="h-4 w-4" /> Create Template
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="relative mb-4">
                    <Search className="absolute top-1/2 transform -translate-y-1/2 left-3 h-4 w-4 text-muted-foreground pointer-events-none" />
                    <Input placeholder="Search templates..." className="pl-9" />
                  </div>
                  
                  <div className="space-y-2">
                    {emailTemplates.map(template => (
                      <div key={template.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                            <Mail className="h-5 w-5 text-blue-500" />
                          </div>
                          <div>
                            <p className="font-medium">{template.name}</p>
                            <p className="text-sm text-muted-foreground">{template.subject}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <p className="text-xs text-muted-foreground">Updated {template.updated}</p>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <ChevronRight className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Template Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                          <User className="h-4 w-4 text-blue-500" />
                        </div>
                        <span>User Onboarding</span>
                      </div>
                      <Badge>4</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                          <ShoppingCart className="h-4 w-4 text-green-500" />
                        </div>
                        <span>Order Updates</span>
                      </div>
                      <Badge>3</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                          <Store className="h-4 w-4 text-purple-500" />
                        </div>
                        <span>Merchant Communications</span>
                      </div>
                      <Badge>2</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                          <FileText className="h-4 w-4 text-amber-500" />
                        </div>
                        <span>Marketing</span>
                      </div>
                      <Badge>2</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                          <Clock className="h-4 w-4 text-red-500" />
                        </div>
                        <span>Reminders</span>
                      </div>
                      <Badge>1</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Email Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm">Open Rate</p>
                        <p className="text-sm font-medium">76.2%</p>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-green-500 rounded-full h-2" style={{ width: '76.2%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm">Click Rate</p>
                        <p className="text-sm font-medium">42.8%</p>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-blue-500 rounded-full h-2" style={{ width: '42.8%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm">Conversion Rate</p>
                        <p className="text-sm font-medium">12.4%</p>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-amber-500 rounded-full h-2" style={{ width: '12.4%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm">Bounce Rate</p>
                        <p className="text-sm font-medium">2.1%</p>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-red-500 rounded-full h-2" style={{ width: '2.1%' }}></div>
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm" className="w-full mt-4 gap-1">
                    <Download className="h-4 w-4" />
                    Download Report
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <Card className="mt-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="bg-primary/5">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                        <MessageSquare className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Send Custom Email</h3>
                        <p className="text-sm text-muted-foreground">One-time email to users</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-blue-500/5">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <Users className="h-6 w-6 text-blue-500" />
                      </div>
                      <div>
                        <h3 className="font-medium">Bulk Message</h3>
                        <p className="text-sm text-muted-foreground">Send to multiple users</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-green-500/5">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center">
                        <Store className="h-6 w-6 text-green-500" />
                      </div>
                      <div>
                        <h3 className="font-medium">Shop Broadcast</h3>
                        <p className="text-sm text-muted-foreground">Message all merchants</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-amber-500/5">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-amber-500/20 flex items-center justify-center">
                        <BarChart3 className="h-6 w-6 text-amber-500" />
                      </div>
                      <div>
                        <h3 className="font-medium">Email Analytics</h3>
                        <p className="text-sm text-muted-foreground">View detailed metrics</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Messages</p>
                    <p className="text-2xl font-bold mt-1">36,285</p>
                  </div>
                  <div className="rounded-lg p-2 bg-primary/10">
                    <MessageSquare className="h-5 w-5 text-primary" />
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
                    <p className="text-sm font-medium text-muted-foreground">Avg. Response Time</p>
                    <p className="text-2xl font-bold mt-1">14m</p>
                  </div>
                  <div className="rounded-lg p-2 bg-blue-500/10">
                    <Clock className="h-5 w-5 text-blue-500" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-xs">
                  <div className="text-green-500 flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    12.5%
                  </div>
                  <span className="ml-1 text-muted-foreground">faster than target</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Resolution Rate</p>
                    <p className="text-2xl font-bold mt-1">92.4%</p>
                  </div>
                  <div className="rounded-lg p-2 bg-green-500/10">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-xs">
                  <div className="text-green-500 flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    3.2%
                  </div>
                  <span className="ml-1 text-muted-foreground">from last month</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Customer Satisfaction</p>
                    <p className="text-2xl font-bold mt-1">4.8/5</p>
                  </div>
                  <div className="rounded-lg p-2 bg-amber-500/10">
                    <User className="h-5 w-5 text-amber-500" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-xs">
                  <div className="text-green-500 flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    0.2
                  </div>
                  <span className="ml-1 text-muted-foreground">from last month</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Message Volume</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <div className="h-full w-full flex items-center justify-center bg-muted/30 rounded-lg">
                  <div className="flex flex-col items-center">
                    <BarChart3 className="h-12 w-12 text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">Message Volume Chart</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Conversation Categories</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <div className="h-full w-full flex items-center justify-center bg-muted/30 rounded-lg">
                  <div className="flex flex-col items-center">
                    <PieChartIcon className="h-12 w-12 text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">Category Distribution</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mt-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Communication Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <Card className="not-prose">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                        <Mail className="h-6 w-6 text-blue-500" />
                      </div>
                      <div>
                        <h3 className="font-medium">Refund Confirmation</h3>
                        <p className="text-sm text-muted-foreground mt-1">Confirms refund processing for order #{"{order_id}"}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      <div className="text-xs text-muted-foreground">
                        <div>Open Rate:</div>
                        <div className="font-medium text-foreground">92%</div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        <div>Click Rate:</div>
                        <div className="font-medium text-foreground">34%</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="not-prose">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                        <Mail className="h-6 w-6 text-green-500" />
                      </div>
                      <div>
                        <h3 className="font-medium">Order Status Update</h3>
                        <p className="text-sm text-muted-foreground mt-1">Notifies customers of order status changes</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      <div className="text-xs text-muted-foreground">
                        <div>Open Rate:</div>
                        <div className="font-medium text-foreground">95%</div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        <div>Click Rate:</div>
                        <div className="font-medium text-foreground">42%</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="not-prose">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                        <Mail className="h-6 w-6 text-purple-500" />
                      </div>
                      <div>
                        <h3 className="font-medium">Welcome Message</h3>
                        <p className="text-sm text-muted-foreground mt-1">First message to new users after sign-up</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      <div className="text-xs text-muted-foreground">
                        <div>Open Rate:</div>
                        <div className="font-medium text-foreground">88%</div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        <div>Click Rate:</div>
                        <div className="font-medium text-foreground">56%</div>
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

export default CommunicationPage;
