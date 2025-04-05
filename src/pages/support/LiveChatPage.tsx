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

const LiveChatPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const liveChats = [
    {
      id: 1,
      customerName: 'John Doe',
      agentName: 'Agent Smith',
      startTime: '09:00 AM',
      duration: '25 minutes',
      status: 'urgent',
      messages: 12,
    },
    {
      id: 2,
      customerName: 'Alice Johnson',
      agentName: 'Agent Brown',
      startTime: '10:15 AM',
      duration: '18 minutes',
      status: 'in-progress',
      messages: 8,
    },
    {
      id: 3,
      customerName: 'Bob Williams',
      agentName: 'Agent Davis',
      startTime: '11:30 AM',
      duration: '32 minutes',
      status: 'pending',
      messages: 20,
    },
    {
      id: 4,
      customerName: 'Emily Clark',
      agentName: 'Agent Wilson',
      startTime: '12:45 PM',
      duration: '15 minutes',
      status: 'resolved',
      messages: 5,
    },
  ];

  const filteredChats = liveChats.filter(chat =>
    chat.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.agentName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <PageHeader title="Live Chat">
        <Input
          type="search"
          placeholder="Search chats..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <Button><Filter size={16} className="mr-2" />Filter</Button>
      </PageHeader>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="urgent">Urgent</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="resolved">Resolved</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="outline-none">
          {filteredChats.map(chat => (
            <Card key={chat.id} className="mb-4">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Avatar className="mr-2 h-8 w-8">
                    <AvatarImage src={`https://i.pravatar.cc/48?img=${chat.id}`} alt={chat.customerName} />
                    <AvatarFallback>{chat.customerName.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  {chat.customerName}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Agent</p>
                    <p>{chat.agentName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Start Time</p>
                    <p>{chat.startTime}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p>{chat.duration}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <Badge variant="outline" className={`text-yellow-500 border-yellow-500`}>{chat.status}</Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Messages</p>
                    <p>{chat.messages}</p>
                  </div>
                  <div className="flex justify-end items-center">
                    <Button variant="outline" size="sm">
                      <MessageSquare size={16} className="mr-2" />
                      View Chat
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="urgent" className="outline-none">
          {filteredChats
            .filter(chat => chat.status === 'urgent')
            .map(chat => (
              <Card key={chat.id} className="mb-4">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Avatar className="mr-2 h-8 w-8">
                      <AvatarImage src={`https://i.pravatar.cc/48?img=${chat.id}`} alt={chat.customerName} />
                      <AvatarFallback>{chat.customerName.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    {chat.customerName}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Agent</p>
                      <p>{chat.agentName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Start Time</p>
                      <p>{chat.startTime}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Duration</p>
                      <p>{chat.duration}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <Badge variant="outline" className="text-yellow-500 border-yellow-500">{chat.status}</Badge>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Messages</p>
                      <p>{chat.messages}</p>
                    </div>
                    <div className="flex justify-end items-center">
                      <Button variant="outline" size="sm">
                        <MessageSquare size={16} className="mr-2" />
                        View Chat
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>
        <TabsContent value="in-progress" className="outline-none">
          {filteredChats
            .filter(chat => chat.status === 'in-progress')
            .map(chat => (
              <Card key={chat.id} className="mb-4">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Avatar className="mr-2 h-8 w-8">
                      <AvatarImage src={`https://i.pravatar.cc/48?img=${chat.id}`} alt={chat.customerName} />
                      <AvatarFallback>{chat.customerName.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    {chat.customerName}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Agent</p>
                      <p>{chat.agentName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Start Time</p>
                      <p>{chat.startTime}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Duration</p>
                      <p>{chat.duration}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <Badge variant="outline" className="text-green-500 border-green-500">{chat.status}</Badge>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Messages</p>
                      <p>{chat.messages}</p>
                    </div>
                    <div className="flex justify-end items-center">
                      <Button variant="outline" size="sm">
                        <MessageSquare size={16} className="mr-2" />
                        View Chat
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>
        <TabsContent value="pending" className="outline-none">
          {filteredChats
            .filter(chat => chat.status === 'pending')
            .map(chat => (
              <Card key={chat.id} className="mb-4">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Avatar className="mr-2 h-8 w-8">
                      <AvatarImage src={`https://i.pravatar.cc/48?img=${chat.id}`} alt={chat.customerName} />
                      <AvatarFallback>{chat.customerName.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    {chat.customerName}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Agent</p>
                      <p>{chat.agentName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Start Time</p>
                      <p>{chat.startTime}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Duration</p>
                      <p>{chat.duration}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <Badge variant="outline" className="text-yellow-500 border-yellow-500">{chat.status}</Badge>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Messages</p>
                      <p>{chat.messages}</p>
                    </div>
                    <div className="flex justify-end items-center">
                      <Button variant="outline" size="sm">
                        <MessageSquare size={16} className="mr-2" />
                        View Chat
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>
        <TabsContent value="resolved" className="outline-none">
          {filteredChats
            .filter(chat => chat.status === 'resolved')
            .map(chat => (
              <Card key={chat.id} className="mb-4">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Avatar className="mr-2 h-8 w-8">
                      <AvatarImage src={`https://i.pravatar.cc/48?img=${chat.id}`} alt={chat.customerName} />
                      <AvatarFallback>{chat.customerName.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    {chat.customerName}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Agent</p>
                      <p>{chat.agentName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Start Time</p>
                      <p>{chat.startTime}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Duration</p>
                      <p>{chat.duration}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <Badge variant="default" className="bg-green-500 hover:bg-green-600">Resolved</Badge>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Messages</p>
                      <p>{chat.messages}</p>
                    </div>
                    <div className="flex justify-end items-center">
                      <Button variant="outline" size="sm">
                        <MessageSquare size={16} className="mr-2" />
                        View Chat
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default LiveChatPage;
