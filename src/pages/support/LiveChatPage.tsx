
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import PageHeader from '@/components/admin/PageHeader';
import { Card, CardContent } from "@/components/ui/card";
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
  MessageSquare, 
  Mail,
  Send,
  Phone,
  Clock,
  CheckCircle,
  Image,
  Paperclip,
  Smile
} from 'lucide-react';

// Mock data
const chatsList = [
  { 
    id: 1, 
    name: 'Ahmed Al-Farsi', 
    type: 'user', 
    avatar: '/placeholder.svg', 
    lastMessage: 'I haven\'t received my order yet...', 
    time: '2m ago',
    unread: true,
    status: 'active',
    priority: 'high'
  },
  { 
    id: 2, 
    name: 'Baraka Halal Meats', 
    type: 'shop', 
    avatar: '/placeholder.svg', 
    lastMessage: 'We need assistance with our latest invoice...', 
    time: '10m ago',
    unread: true,
    status: 'active',
    priority: 'medium'
  },
  { 
    id: 3, 
    name: 'Fatima Zahra', 
    type: 'user', 
    avatar: '/placeholder.svg', 
    lastMessage: 'Thank you for resolving my refund issue...', 
    time: '1h ago',
    unread: false,
    status: 'active',
    priority: 'low'
  },
  { 
    id: 4, 
    name: 'Medina Spices', 
    type: 'shop', 
    avatar: '/placeholder.svg', 
    lastMessage: 'We\'ve updated our halal certification as requested...', 
    time: '3h ago',
    unread: false,
    status: 'active',
    priority: 'medium'
  },
  { 
    id: 5, 
    name: 'Mohammed Nur', 
    type: 'user', 
    avatar: '/placeholder.svg', 
    lastMessage: 'Is there a way to track my order in real-time?', 
    time: '5h ago',
    unread: false,
    status: 'active',
    priority: 'low'
  },
  { 
    id: 6, 
    name: 'Layla Rahman', 
    type: 'user', 
    avatar: '/placeholder.svg', 
    lastMessage: 'My order arrived damaged. Can I get a refund?', 
    time: '30m ago',
    unread: true,
    status: 'active',
    priority: 'high'
  },
  { 
    id: 7, 
    name: 'Al-Madina Bakery', 
    type: 'shop', 
    avatar: '/placeholder.svg', 
    lastMessage: 'How do we process a refund for order #12984?', 
    time: '2h ago',
    unread: false,
    status: 'active',
    priority: 'medium'
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
    sender: 'agent',
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
    sender: 'agent',
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
    sender: 'agent',
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
    sender: 'agent',
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

const quickReplies = [
  { id: 1, title: 'Greeting', content: 'Thank you for contacting Halvi Support. My name is [Agent Name] and I\'ll be happy to assist you today.' },
  { id: 2, title: 'Order Status Check', content: 'I understand you\'re concerned about your order. Let me check the status for you right away.' },
  { id: 3, title: 'Refund Process', content: 'I\'ll help you process a refund for your order. Could you please confirm the order number and the reason for the refund?' },
  { id: 4, title: 'Delivery Delay', content: 'I apologize for the delay with your delivery. Let me contact the shop and delivery partner to expedite your order.' },
  { id: 5, title: 'Follow-up', content: 'I\'m following up on your previous inquiry. Has your issue been resolved or do you need further assistance?' },
  { id: 6, title: 'Closing', content: 'Is there anything else I can help you with today?' },
];

const customerInfo = {
  id: 'USR-10492',
  name: 'Ahmed Al-Farsi',
  email: 'ahmed.alfarsi@example.com',
  phone: '+44 7700 900123',
  joinDate: 'May 12, 2022',
  lastActive: 'Online now',
  orders: 24,
  totalSpent: '£1,245.60',
  status: 'active',
  avatar: '/placeholder.svg',
  recentOrders: [
    { id: 'ORD-78294', date: 'June 15, 2023', status: 'Processing', amount: '£85.40', shop: 'Baraka Halal Meats' },
    { id: 'ORD-76123', date: 'June 2, 2023', status: 'Delivered', amount: '£32.75', shop: 'Medina Spices' },
    { id: 'ORD-74856', date: 'May 24, 2023', status: 'Delivered', amount: '£56.20', shop: 'Al-Madina Bakery' },
  ]
};

const LiveChatPage = () => {
  const [selectedChat, setSelectedChat] = useState(chatsList[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [messageText, setMessageText] = useState('');
  const [chatsFilter, setChatsFilter] = useState('all');
  const [showCustomerInfo, setShowCustomerInfo] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(false);

  const filteredChats = chatsList.filter(chat => 
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getChatColor = (type: string) => {
    return type === 'user' ? 'blue' : 'amber';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'yellow';
      case 'low': return 'green';
      default: return 'secondary';
    }
  };

  const handleQuickReply = (content: string) => {
    setMessageText(content);
    setShowQuickReplies(false);
  };

  return (
    <DashboardLayout title="Live Chat">
      <PageHeader 
        title="Live Chat" 
        description="Real-time customer support conversations"
        actions={
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="gap-1">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <span>Online</span>
            </Badge>
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <Filter size={14} />
              Filters
            </Button>
          </div>
        }
      />

      <Card className="overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 h-[75vh]">
          {/* Left Sidebar - Conversations */}
          <div className="border-r">
            <div className="p-4 border-b">
              <div className="relative mb-4">
                <Search className="absolute top-1/2 transform -translate-y-1/2 left-3 h-4 w-4 text-muted-foreground pointer-events-none" />
                <Input 
                  placeholder="Search chats..." 
                  className="pl-9" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Button variant={chatsFilter === 'all' ? 'default' : 'outline'} size="sm" onClick={() => setChatsFilter('all')}>All</Button>
                <Button variant={chatsFilter === 'unread' ? 'default' : 'outline'} size="sm" onClick={() => setChatsFilter('unread')}>Unread</Button>
                <Button variant={chatsFilter === 'high' ? 'default' : 'outline'} size="sm" onClick={() => setChatsFilter('high')}>
                  <div className="h-2 w-2 rounded-full bg-destructive mr-1"></div>
                  High Priority
                </Button>
              </div>
            </div>

            <div className="overflow-y-auto h-[calc(75vh-88px)]">
              {filteredChats.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                  <MessageSquare className="h-12 w-12 text-muted-foreground/50 mb-2" />
                  <h3 className="font-medium">No conversations found</h3>
                  <p className="text-sm text-muted-foreground">Try a different search or filter</p>
                </div>
              ) : (
                filteredChats.map(chat => (
                  <div 
                    key={chat.id}
                    className={`p-3 border-b hover:bg-muted/50 cursor-pointer transition-colors ${selectedChat.id === chat.id ? 'bg-muted/80' : ''}`}
                    onClick={() => setSelectedChat(chat)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={chat.avatar} alt={chat.name} />
                          <AvatarFallback className={`bg-${getChatColor(chat.type)}-100 text-${getChatColor(chat.type)}-500`}>
                            {chat.type === 'user' ? <User className="h-5 w-5" /> : <Store className="h-5 w-5" />}
                          </AvatarFallback>
                        </Avatar>
                        {chat.status === 'active' && (
                          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-1">
                            <p className="font-medium truncate">{chat.name}</p>
                            <Badge variant={getPriorityColor(chat.priority)} className="ml-1 h-2 w-2 p-0 rounded-full"></Badge>
                          </div>
                          <p className="text-xs text-muted-foreground shrink-0">{chat.time}</p>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-sm text-muted-foreground truncate flex-1">{chat.lastMessage}</p>
                          {chat.unread && (
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
          <div className={`${showCustomerInfo ? 'hidden md:flex' : 'flex'} md:col-span-2 flex-col h-full`}>
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={selectedChat.avatar} alt={selectedChat.name} />
                  <AvatarFallback className={`bg-${getChatColor(selectedChat.type)}-100 text-${getChatColor(selectedChat.type)}-500`}>
                    {selectedChat.type === 'user' ? <User className="h-5 w-5" /> : <Store className="h-5 w-5" />}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{selectedChat.name}</p>
                    <Badge variant={getPriorityColor(selectedChat.priority)}>
                      {selectedChat.priority} priority
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 mt-0.5">
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      {selectedChat.time}
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Badge variant="outline" className="text-xs px-1 py-0 h-4">
                        {selectedChat.type === 'user' ? 'Customer' : 'Merchant'}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant={showCustomerInfo ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowCustomerInfo(!showCustomerInfo)}
                  className="hidden md:flex"
                >
                  Customer Info
                </Button>
                <Button variant="outline" size="sm" className="h-8 md:h-9">
                  <User className="h-4 w-4 md:mr-2" />
                  <span className="hidden md:inline">Profile</span>
                </Button>
              </div>
            </div>

            <div className="p-4 overflow-y-auto flex-1 flex flex-col-reverse gap-3">
              {messageHistory.slice().reverse().map((message) => (
                <div key={message.id} className={`flex ${message.sender === 'agent' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex items-start gap-2 max-w-[80%] ${message.sender === 'agent' ? 'flex-row-reverse' : ''}`}>
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className={message.sender === 'agent' ? 'bg-primary/20 text-primary' : `bg-${getChatColor('user')}-100 text-${getChatColor('user')}-500`}>
                        {message.sender === 'agent' ? 'HS' : <User className="h-4 w-4" />}
                      </AvatarFallback>
                    </Avatar>
                    <div className={`${message.sender === 'agent' ? 'bg-primary text-primary-foreground' : 'bg-muted'} p-3 rounded-lg text-sm`}>
                      <p>{message.content}</p>
                      <div className="flex items-center justify-end mt-1">
                        <p className="text-xs opacity-70">{message.time}</p>
                        {message.sender === 'agent' && message.isRead && (
                          <CheckCircle className="h-3 w-3 ml-1 opacity-70" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t relative">
              {showQuickReplies && (
                <Card className="absolute bottom-20 left-4 w-[calc(100%-2rem)] z-10 max-h-64 overflow-y-auto">
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">Quick Replies</h3>
                      <Button variant="ghost" size="sm" onClick={() => setShowQuickReplies(false)}>Close</Button>
                    </div>
                    <div className="space-y-2">
                      {quickReplies.map(reply => (
                        <div 
                          key={reply.id} 
                          className="p-2 border rounded-md hover:bg-muted/50 cursor-pointer transition-colors"
                          onClick={() => handleQuickReply(reply.content)}
                        >
                          <p className="font-medium text-sm">{reply.title}</p>
                          <p className="text-xs text-muted-foreground truncate">{reply.content}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
              <div className="flex gap-2 mb-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowQuickReplies(!showQuickReplies)}
                >
                  Quick Replies
                </Button>
                <Button variant="outline" size="sm">
                  Escalate
                </Button>
                <Button variant="outline" size="sm">
                  Transfer
                </Button>
              </div>
              <div className="flex gap-2">
                <Textarea 
                  placeholder="Type your message here..." 
                  className="min-h-[80px]" 
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                />
                <div className="flex flex-col justify-end gap-2">
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" className="h-9 w-9">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-9 w-9">
                      <Image className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-9 w-9">
                      <Smile className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button size="icon" className="h-9 w-9">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Info Sidebar - Shown/Hidden based on state */}
          {showCustomerInfo && (
            <div className="md:hidden absolute inset-0 z-20 bg-background md:static md:col-span-1 border-l">
              <div className="p-4 border-b flex items-center justify-between">
                <h3 className="font-medium">Customer Information</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowCustomerInfo(false)}
                >
                  Close
                </Button>
              </div>
              <div className="p-4 overflow-y-auto h-[calc(75vh-64px)]">
                <div className="flex items-center gap-3 mb-6">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={customerInfo.avatar} alt={customerInfo.name} />
                    <AvatarFallback className="bg-blue-100 text-blue-500">
                      <User className="h-6 w-6" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium text-lg">{customerInfo.name}</h3>
                    <p className="text-sm text-muted-foreground">{customerInfo.id}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
                        {customerInfo.status}
                      </Badge>
                      <Badge variant="outline" className="text-muted-foreground">
                        {customerInfo.lastActive}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <h4 className="font-medium text-muted-foreground text-sm">Contact Information</h4>
                    <div className="grid grid-cols-1 gap-2">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{customerInfo.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{customerInfo.phone}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium text-muted-foreground text-sm">Customer Details</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs text-muted-foreground">Member Since</p>
                        <p className="text-sm font-medium">{customerInfo.joinDate}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Total Orders</p>
                        <p className="text-sm font-medium">{customerInfo.orders}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Total Spent</p>
                        <p className="text-sm font-medium">{customerInfo.totalSpent}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium text-muted-foreground text-sm">Recent Orders</h4>
                    <div className="space-y-2">
                      {customerInfo.recentOrders.map((order, index) => (
                        <div key={index} className="border rounded-md p-3">
                          <div className="flex justify-between items-start mb-2">
                            <p className="font-medium text-sm">{order.id}</p>
                            <Badge variant={order.status === 'Processing' ? 'outline' : 'secondary'}>
                              {order.status}
                            </Badge>
                          </div>
                          <div className="text-xs text-muted-foreground mb-1">
                            {order.date} • {order.shop}
                          </div>
                          <div className="text-sm font-medium">
                            {order.amount}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium text-muted-foreground text-sm">Notes</h4>
                    <Textarea placeholder="Add customer notes..." className="min-h-[100px]" />
                    <Button className="w-full">Save Notes</Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </DashboardLayout>
  );
};

export default LiveChatPage;
