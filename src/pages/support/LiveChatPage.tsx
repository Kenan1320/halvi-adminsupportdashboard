
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
  Download as DownloadIcon,
  Send,
  Phone,
  Mail,
  Monitor
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import UserSelector, { UserItem } from '@/components/support/UserSelector';
import MessageComposer from '@/components/support/MessageComposer';

const LiveChatPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserSelector, setShowUserSelector] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserItem | null>(null);
  const [showComposeDialog, setShowComposeDialog] = useState(false);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleUserSelect = (user: UserItem) => {
    setSelectedUser(user);
    setShowUserSelector(false);
    setShowComposeDialog(true);
  };

  const handleSendMessage = (message: string, attachments: File[]) => {
    console.log('Sending message:', message);
    console.log('Attachments:', attachments);
    setShowComposeDialog(false);
    setSelectedUser(null);
    // Here you would typically handle the message sending logic
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
      <PageHeader 
        title="Live Chat" 
        description="Manage real-time customer communications"
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <Filter size={14} />
              Filters
            </Button>
            <Dialog open={showUserSelector} onOpenChange={setShowUserSelector}>
              <DialogTrigger asChild>
                <Button size="sm" className="h-8 gap-1">
                  <Plus size={14} />
                  New Message
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <UserSelector 
                  onSelect={handleUserSelect} 
                  onCancel={() => setShowUserSelector(false)} 
                />
              </DialogContent>
            </Dialog>
          </div>
        }
      />

      <Dialog open={showComposeDialog} onOpenChange={setShowComposeDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>New Message</DialogTitle>
            <DialogDescription>
              Compose a new message to the selected recipient
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <MessageComposer 
              recipient={selectedUser}
              onSend={handleSendMessage}
              onCancel={() => setShowComposeDialog(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search chats..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-10"
          />
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="urgent">Urgent</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="resolved">Resolved</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="outline-none">
          {filteredChats.map((chat) => (
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
                    <Badge 
                      variant={chat.status === 'urgent' ? 'destructive' : 'outline'} 
                      className={chat.status !== 'urgent' ? `text-${chat.status === 'in-progress' ? 'blue' : chat.status === 'pending' ? 'yellow' : 'green'}-500 border-${chat.status === 'in-progress' ? 'blue' : chat.status === 'pending' ? 'yellow' : 'green'}-500` : ''}
                    >
                      {chat.status}
                    </Badge>
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

          <Dialog>
            <DialogTrigger asChild>
              <Card className="mb-4 border-dashed border-2 hover:bg-accent/50 cursor-pointer transition-colors">
                <CardContent className="flex items-center justify-center py-10">
                  <div className="text-center">
                    <Plus className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                    <h3 className="font-medium">Start New Chat</h3>
                    <p className="text-sm text-muted-foreground">Begin a conversation with a customer or shop</p>
                  </div>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>New Chat</DialogTitle>
                <DialogDescription>
                  Select how you want to start a new conversation
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
                <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="bg-primary/10 p-3 rounded-full mb-3">
                      <MessageSquare className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-medium">Live Chat</h3>
                    <p className="text-sm text-muted-foreground mt-1">Start real-time text chat</p>
                  </CardContent>
                </Card>
                
                <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="bg-primary/10 p-3 rounded-full mb-3">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-medium">Voice Call</h3>
                    <p className="text-sm text-muted-foreground mt-1">Initiate a phone conversation</p>
                  </CardContent>
                </Card>
                
                <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="bg-primary/10 p-3 rounded-full mb-3">
                      <Monitor className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-medium">Video Call</h3>
                    <p className="text-sm text-muted-foreground mt-1">Start a video conference</p>
                  </CardContent>
                </Card>
              </div>
            </DialogContent>
          </Dialog>
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
                      <Badge variant="destructive">{chat.status}</Badge>
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
                      <Badge variant="outline" className="text-blue-500 border-blue-500">{chat.status}</Badge>
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
                      <Badge variant="outline" className="text-green-500 border-green-500">Resolved</Badge>
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
