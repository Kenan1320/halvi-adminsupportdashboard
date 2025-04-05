import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import MessageComposer from '@/components/support/MessageComposer';
import { 
  Phone, 
  Monitor, 
  Info, 
  ShoppingCart, 
  Clock, 
  ArrowLeft,
  FileText,
  User,
  CheckCircle2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export type User = {
  id: string;
  name: string;
  avatar?: string;
  type: "customer" | "shop" | "agent";
};

const chatData = {
  id: 1,
  customer: {
    id: 'cust-1',
    name: 'John Doe',
    avatar: 'https://i.pravatar.cc/48?img=1',
    email: 'john.doe@example.com',
    phone: '+44 7700 900123',
    joinDate: 'May 12, 2022',
    orderCount: 24,
    type: 'customer' as const
  },
  agent: {
    id: 'agent-1',
    name: 'Agent Smith',
    avatar: '/placeholder.svg',
    type: 'agent' as const
  },
  startTime: '09:00 AM',
  duration: '25 minutes',
  status: 'urgent',
  messages: [
    {
      id: 1,
      sender: 'customer',
      senderName: 'John Doe',
      content: "Hello, I'm having an issue with my recent order. It was marked as delivered but I never received it. Can you help?",
      time: '09:00 AM',
      timestamp: new Date('2023-07-15T09:00:00')
    },
    {
      id: 2,
      sender: 'agent',
      senderName: 'Agent Smith',
      content: "I'm sorry to hear that. I'd be happy to help you with this issue. Could you please provide me with your order number?",
      time: '09:02 AM',
      timestamp: new Date('2023-07-15T09:02:00')
    },
    {
      id: 3,
      sender: 'customer',
      senderName: 'John Doe',
      content: "Thank you. My order number is ORD-45982.",
      time: '09:05 AM',
      timestamp: new Date('2023-07-15T09:05:00')
    },
    {
      id: 4,
      sender: 'agent',
      senderName: 'Agent Smith',
      content: "Thank you for providing that information. I can see that your order was marked as delivered yesterday at 2:15 PM. Let me check with the delivery service to find out what happened.",
      time: '09:08 AM',
      timestamp: new Date('2023-07-15T09:08:00')
    },
    {
      id: 5,
      sender: 'agent',
      senderName: 'Agent Smith',
      content: "I've contacted the delivery service. They're checking with the driver now. Can you confirm that no one else at your address might have received the package?",
      time: '09:15 AM',
      timestamp: new Date('2023-07-15T09:15:00')
    },
    {
      id: 6,
      sender: 'customer',
      senderName: 'John Doe',
      content: "I've checked with everyone in my household and also with neighbors. No one received the package.",
      time: '09:20 AM',
      timestamp: new Date('2023-07-15T09:20:00')
    }
  ],
  relatedOrders: [
    {
      id: 'ORD-45982',
      date: '2023-07-13',
      status: 'Delivered',
      items: 3,
      total: '$58.75'
    },
    {
      id: 'ORD-43217',
      date: '2023-06-29',
      status: 'Completed',
      items: 2,
      total: '$32.50'
    }
  ]
};

const ChatPage = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState(chatData.messages);
  const [message, setMessage] = useState('');
  
  const handleSendMessage = (message: string, attachments: File[]) => {
    const newMessage = {
      id: messages.length + 1,
      sender: 'agent',
      senderName: chatData.agent.name,
      content: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      timestamp: new Date()
    };
    
    setMessages([...messages, newMessage]);
  };
  
  const handleGoBack = () => {
    navigate('/support/live-chat');
  };
  
  useEffect(() => {
    const messageContainer = document.getElementById('message-container');
    if (messageContainer) {
      messageContainer.scrollTop = messageContainer.scrollHeight;
    }
  }, [messages]);
  
  return (
    <DashboardLayout title="Live Chat">
      <div className="mb-4 flex items-center justify-between">
        <Button variant="outline" className="gap-2" onClick={handleGoBack}>
          <ArrowLeft size={16} />
          Back to Chats
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Phone size={16} />
            Call
          </Button>
          <Button variant="outline" className="gap-2">
            <Monitor size={16} />
            Video
          </Button>
          <Button variant="outline" className="gap-2">
            <Info size={16} />
            Details
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-3 flex flex-col h-[calc(100vh-220px)]">
          <Card className="mb-4">
            <CardContent className="py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={chatData.customer.avatar} alt={chatData.customer.name} />
                    <AvatarFallback>{chatData.customer.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{chatData.customer.name}</p>
                      <Badge 
                        variant="outline" 
                        className="text-blue-500 border-blue-500"
                      >
                        Customer
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{chatData.customer.email}</p>
                  </div>
                </div>
                
                <Badge 
                  variant={chatData.status === 'urgent' ? 'destructive' : 'outline'} 
                  className={chatData.status !== 'urgent' ? `text-${chatData.status === 'in-progress' ? 'blue' : chatData.status === 'pending' ? 'yellow' : 'green'}-500 border-${chatData.status === 'in-progress' ? 'blue' : chatData.status === 'pending' ? 'yellow' : 'green'}-500` : ''}
                >
                  {chatData.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
          
          <Card className="flex-1 flex flex-col">
            <div 
              id="message-container"
              className="flex-1 p-4 overflow-y-auto"
            >
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`mb-4 flex ${msg.sender === 'agent' ? 'justify-end' : ''}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-lg p-3 ${
                      msg.sender === 'agent' 
                        ? 'bg-primary text-primary-foreground ml-auto' 
                        : 'bg-muted'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium">{msg.senderName}</p>
                      <p className="text-xs text-opacity-80">{msg.time}</p>
                    </div>
                    <p className="text-sm">{msg.content}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t">
              <MessageComposer
                recipient={chatData.customer}
                onSend={handleSendMessage}
                showRecipient={false}
              />
            </div>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-3">Customer Information</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Email:</span>
                  <span className="text-sm">{chatData.customer.email}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Phone:</span>
                  <span className="text-sm">{chatData.customer.phone}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Member Since:</span>
                  <span className="text-sm">{chatData.customer.joinDate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Orders:</span>
                  <span className="text-sm">{chatData.customer.orderCount}</span>
                </div>
                <Separator className="my-2" />
                <Button variant="outline" size="sm" className="w-full gap-1">
                  <User size={14} />
                  View Full Profile
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-3">Related Orders</h3>
              <div className="space-y-3">
                {chatData.relatedOrders.map((order) => (
                  <div key={order.id} className="border rounded-md p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">{order.id}</span>
                      <Badge 
                        variant={order.status === 'Delivered' ? 'outline' : 'default'}
                        className={order.status === 'Delivered' ? 'text-yellow-500 border-yellow-500' : ''}
                      >
                        {order.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{order.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ShoppingCart className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{order.items} items</span>
                      </div>
                    </div>
                    <div className="mt-2 pt-2 border-t flex items-center justify-between">
                      <span className="text-sm font-medium">Total:</span>
                      <span className="text-sm font-medium">{order.total}</span>
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full gap-1">
                  <FileText size={14} />
                  View All Orders
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-3">Chat Information</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Started:</span>
                  <span className="text-sm">{chatData.startTime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Duration:</span>
                  <span className="text-sm">{chatData.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Status:</span>
                  <Badge 
                    variant={chatData.status === 'urgent' ? 'destructive' : 'outline'} 
                    className={chatData.status !== 'urgent' ? `text-${chatData.status === 'in-progress' ? 'blue' : chatData.status === 'pending' ? 'yellow' : 'green'}-500 border-${chatData.status === 'in-progress' ? 'blue' : chatData.status === 'pending' ? 'yellow' : 'green'}-500` : ''}
                  >
                    {chatData.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Agent:</span>
                  <span className="text-sm">{chatData.agent.name}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 gap-1">
                    <FileText size={14} />
                    Export Chat
                  </Button>
                  <Button variant="default" size="sm" className="flex-1 gap-1">
                    <CheckCircle2 size={14} />
                    Resolve
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ChatPage;
