
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import PageHeader from '@/components/admin/PageHeader';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import SmartTable from '@/components/admin/SmartTable';
import StatisticsCard from '@/components/admin/StatisticsCard';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  MessageCircle,
  Users,
  Store,
  User,
  Clock,
  CheckCircle2,
  Search,
  Send,
  PaperclipIcon,
  Plus,
  MessageSquare,
  ArrowUpRight,
  AlertTriangle,
  ChevronDown,
  Tag,
  Save
} from 'lucide-react';

// Mock data
const conversations = [
  { id: 'CONV001', with: 'Ahmed Khan', type: 'Customer', subject: 'Order Cancellation', lastMessage: '2023-04-02', status: 'Open' },
  { id: 'CONV002', with: 'Halal Delights', type: 'Shop', subject: 'Commission Rate Inquiry', lastMessage: '2023-04-02', status: 'Open' },
  { id: 'CONV003', with: 'Fatima Ali', type: 'Customer', subject: 'Refund Request #45321', lastMessage: '2023-04-01', status: 'Awaiting Customer' },
  { id: 'CONV004', with: 'Zabiha Meats', type: 'Shop', subject: 'Product Approval', lastMessage: '2023-04-01', status: 'Closed' },
  { id: 'CONV005', with: 'Leila Hassan', type: 'Support Agent', subject: 'Escalation Procedure', lastMessage: '2023-03-31', status: 'Closed' },
];

const templates = [
  { id: 'TEMP001', name: 'Order Refund Approved', category: 'Refunds', createdBy: 'Admin', lastUsed: '2023-04-02' },
  { id: 'TEMP002', name: 'Shop Verification Success', category: 'Onboarding', createdBy: 'Admin', lastUsed: '2023-04-01' },
  { id: 'TEMP003', name: 'Product Rejection', category: 'Moderation', createdBy: 'Admin', lastUsed: '2023-03-30' },
  { id: 'TEMP004', name: 'Account Suspension Warning', category: 'Compliance', createdBy: 'Admin', lastUsed: '2023-03-29' },
];

const CommunicationPage = () => {
  const [activeConversation, setActiveConversation] = useState<string | null>(null);
  
  const handleRowAction = (action: string, rowData: any) => {
    console.log(`Action ${action} on:`, rowData);
    if (action === 'Open') {
      setActiveConversation(rowData.id);
    }
  };

  return (
    <DashboardLayout title="Communication Hub">
      <PageHeader 
        title="Communication Hub" 
        description="Manage all communication with customers, shops, and support team"
        actions={
          <Button>
            <MessageCircle size={16} className="mr-2" />
            New Message
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatisticsCard 
          title="Total Conversations" 
          value="1,247" 
          icon={<MessageCircle size={20} />}
        />
        <StatisticsCard 
          title="Open Threads" 
          value="68" 
          change={{ value: 12, isPositive: false }} 
          icon={<MessageSquare size={20} />}
        />
        <StatisticsCard 
          title="Avg. Response Time" 
          value="1.2 hours" 
          change={{ value: 0.3, isPositive: true }} 
          icon={<Clock size={20} />}
        />
        <StatisticsCard 
          title="Resolved Issues" 
          value="958" 
          change={{ value: 8.7, isPositive: true }} 
          icon={<CheckCircle2 size={20} />}
        />
      </div>

      <div className="mb-6">
        <Card className="p-0 overflow-hidden">
          <Tabs defaultValue={activeConversation ? "conversation" : "inbox"} className="w-full">
            <TabsList className="w-full justify-start border-b rounded-none px-4 h-auto bg-transparent">
              <TabsTrigger value="inbox" className="py-3 px-4">Unified Inbox</TabsTrigger>
              <TabsTrigger value="conversation" className="py-3 px-4" disabled={!activeConversation}>
                Conversation
                {activeConversation && (
                  <span className="ml-2 bg-muted px-1.5 py-0.5 rounded text-xs">
                    {conversations.find(c => c.id === activeConversation)?.with}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="templates" className="py-3 px-4">Message Templates</TabsTrigger>
              <TabsTrigger value="analytics" className="py-3 px-4">Communication Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="inbox" className="p-0 mt-0">
              <div className="p-4 border-b flex items-center gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search conversations by name, subject, ID..."
                      className="h-10 w-full rounded-md border border-input bg-background px-10 text-sm focus:outline-none focus:ring-1 focus:ring-halvi-accent"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    Sort: Newest
                  </Button>
                </div>
              </div>
              
              <SmartTable
                columns={[
                  { key: 'id', title: 'Conversation ID', sortable: true },
                  { key: 'with', title: 'Contact', sortable: true },
                  { key: 'type', title: 'Type', sortable: true },
                  { key: 'subject', title: 'Subject', sortable: true },
                  { key: 'lastMessage', title: 'Last Message', sortable: true },
                  { key: 'status', title: 'Status', sortable: true },
                ]}
                data={conversations}
                filters={['All', 'Open', 'Awaiting Response', 'Closed']}
                rowActions={['Open', 'Mark as Resolved', 'Archive', 'Delete']}
                onRowAction={handleRowAction}
                pagination={{
                  page: 1,
                  pageSize: 10,
                  total: 1247,
                  onChange: (page) => console.log('Changed to page', page)
                }}
              />
            </TabsContent>

            <TabsContent value="conversation" className="p-0 mt-0">
              {activeConversation ? (
                <div className="grid grid-cols-1 md:grid-cols-3 h-[600px]">
                  <div className="col-span-2 flex flex-col border-r">
                    <div className="p-4 border-b flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{conversations.find(c => c.id === activeConversation)?.subject}</h3>
                        <p className="text-sm text-muted-foreground">With: {conversations.find(c => c.id === activeConversation)?.with} ({conversations.find(c => c.id === activeConversation)?.type})</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <CheckCircle2 size={16} className="mr-2" />
                          Mark Resolved
                        </Button>
                        <Button variant="outline" size="sm">
                          <ArrowUpRight size={16} className="mr-2" />
                          Escalate
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      <div className="flex gap-3">
                        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                          <Store size={16} className="text-muted-foreground" />
                        </div>
                        <div className="bg-muted p-3 rounded-md max-w-[80%]">
                          <p className="text-sm font-medium">{conversations.find(c => c.id === activeConversation)?.with}</p>
                          <p className="text-sm">I would like to inquire about our current commission rate. We've been operating for 6 months with excellent feedback.</p>
                          <p className="text-xs text-muted-foreground mt-1">Apr 2, 2023 - 10:32 AM</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-3 justify-end">
                        <div className="bg-halvi-royal/10 p-3 rounded-md max-w-[80%]">
                          <p className="text-sm font-medium">Admin</p>
                          <p className="text-sm">Thank you for reaching out. I can see your shop has maintained a 4.8 rating. Let me review your account.</p>
                          <p className="text-xs text-muted-foreground mt-1">Apr 2, 2023 - 11:05 AM</p>
                        </div>
                        <div className="h-8 w-8 rounded-full bg-gradient-halvi flex items-center justify-center">
                          <User size={16} className="text-white" />
                        </div>
                      </div>
                      
                      <div className="flex gap-3">
                        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                          <Store size={16} className="text-muted-foreground" />
                        </div>
                        <div className="bg-muted p-3 rounded-md max-w-[80%]">
                          <p className="text-sm font-medium">{conversations.find(c => c.id === activeConversation)?.with}</p>
                          <p className="text-sm">Great, thank you! Our orders have increased by 35% in the last month, and we're hoping to qualify for the reduced rate.</p>
                          <p className="text-xs text-muted-foreground mt-1">Apr 2, 2023 - 11:18 AM</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-3 justify-end">
                        <div className="bg-halvi-royal/10 p-3 rounded-md max-w-[80%]">
                          <p className="text-sm font-medium">Admin</p>
                          <p className="text-sm">I've reviewed your account and I'm pleased to inform you that you qualify for our high-volume discount. Your commission rate will be reduced from 12% to 10% effective immediately.</p>
                          <p className="text-xs text-muted-foreground mt-1">Apr 2, 2023 - 1:45 PM</p>
                        </div>
                        <div className="h-8 w-8 rounded-full bg-gradient-halvi flex items-center justify-center">
                          <User size={16} className="text-white" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 border-t">
                      <div className="bg-muted/50 rounded-md p-3 mb-3">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium flex items-center gap-1">
                            <Tag size={14} />
                            Internal Note
                          </p>
                          <button className="text-xs text-muted-foreground">Only visible to admins</button>
                        </div>
                        <p className="text-sm mt-1">This shop has consistently high performance metrics and deserves the reduced rate.</p>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-3">
                        <Button variant="outline" size="sm">
                          <PaperclipIcon size={16} className="mr-2" />
                          Attach
                        </Button>
                        <Button variant="outline" size="sm">
                          Templates
                          <ChevronDown size={16} className="ml-2" />
                        </Button>
                      </div>
                      
                      <div className="flex gap-2">
                        <textarea 
                          placeholder="Type your message here..." 
                          className="flex-1 h-24 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-halvi-accent"
                        ></textarea>
                        <Button className="self-end">
                          <Send size={16} className="mr-2" />
                          Send
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="hidden md:block p-4 border-l overflow-y-auto">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium mb-2">Contact Information</h3>
                        <Card className="p-3 space-y-2">
                          <div className="flex items-center gap-2">
                            <Store size={16} className="text-muted-foreground" />
                            <span className="text-sm">Halal Delights</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <User size={16} className="text-muted-foreground" />
                            <span className="text-sm">Ahmed Khan (Owner)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MessageCircle size={16} className="text-muted-foreground" />
                            <span className="text-sm">ahmed@halaldelights.com</span>
                          </div>
                          <Button size="sm" variant="outline" className="w-full mt-2">
                            View Full Profile
                          </Button>
                        </Card>
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-2">Conversation History</h3>
                        <Card className="p-3 space-y-2">
                          <div className="text-sm">
                            <span className="text-muted-foreground">Total Conversations:</span> 3
                          </div>
                          <div className="text-sm">
                            <span className="text-muted-foreground">Last Contact:</span> Apr 2, 2023
                          </div>
                          <div className="text-sm">
                            <span className="text-muted-foreground">Average Response Time:</span> 1.5 hours
                          </div>
                          <Button size="sm" variant="outline" className="w-full mt-2">
                            View All Conversations
                          </Button>
                        </Card>
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-2">Shop Quick Info</h3>
                        <Card className="p-3 space-y-2">
                          <div className="text-sm">
                            <span className="text-muted-foreground">Rating:</span> 4.8/5 (237 reviews)
                          </div>
                          <div className="text-sm">
                            <span className="text-muted-foreground">Products:</span> 32 active
                          </div>
                          <div className="text-sm">
                            <span className="text-muted-foreground">Commission Rate:</span> 12% → 10%
                          </div>
                          <div className="text-sm">
                            <span className="text-muted-foreground">Monthly Revenue:</span> $7,845.33
                          </div>
                          <Button size="sm" variant="outline" className="w-full mt-2">
                            View Shop Dashboard
                          </Button>
                        </Card>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center p-8 text-muted-foreground">
                  <div className="text-center">
                    <MessageCircle size={40} className="mx-auto text-muted-foreground/50 mb-2" />
                    <h3 className="text-lg font-medium">No conversation selected</h3>
                    <p className="text-sm text-muted-foreground">Select a conversation from the inbox to view</p>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="templates" className="p-0 mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 h-[600px]">
                <div className="col-span-1 border-r">
                  <div className="p-4 border-b">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium">Message Templates</h3>
                      <Button size="sm">
                        <Plus size={16} className="mr-2" />
                        New Template
                      </Button>
                    </div>
                    <div className="relative mb-3">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="Search templates..."
                        className="h-9 w-full rounded-md border border-input bg-background px-10 text-sm focus:outline-none focus:ring-1 focus:ring-halvi-accent"
                      />
                    </div>
                  </div>
                  
                  <div className="divide-y overflow-y-auto h-[calc(600px-93px)]">
                    {templates.map((template) => (
                      <div key={template.id} className="p-4 hover:bg-muted/50 cursor-pointer">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{template.name}</h4>
                          <span className="bg-muted text-xs px-2 py-0.5 rounded-full">{template.category}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Created by {template.createdBy}</p>
                        <p className="text-xs text-muted-foreground">Last used: {template.lastUsed}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="col-span-2 p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium">Edit Template</h3>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Check size={16} className="mr-2" />
                        Test
                      </Button>
                      <Button size="sm">
                        <Save size={16} className="mr-2" />
                        Save Template
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium block mb-1">Template Name</label>
                      <input 
                        type="text" 
                        className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm"
                        defaultValue="Order Refund Approved"
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium block mb-1">Category</label>
                      <select className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm">
                        <option>Refunds</option>
                        <option>Onboarding</option>
                        <option>Moderation</option>
                        <option>Compliance</option>
                        <option>General</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium block mb-1">Subject Line</label>
                      <input 
                        type="text" 
                        className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm"
                        defaultValue="Your Refund for Order #{{order_id}} has been Approved"
                      />
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-sm font-medium">Message Body</label>
                        <div className="text-xs text-muted-foreground">
                          Available variables: 
                          <Button variant="link" className="text-xs h-auto p-0 ml-1">{{customer_name}}</Button>
                          <Button variant="link" className="text-xs h-auto p-0 ml-1">{{order_id}}</Button>
                          <Button variant="link" className="text-xs h-auto p-0 ml-1">{{refund_amount}}</Button>
                        </div>
                      </div>
                      <textarea 
                        className="w-full h-64 rounded-md border border-input bg-background px-3 py-2 text-sm"
                        defaultValue={`Dear {{customer_name}},

We are writing to confirm that your refund request for Order #{{order_id}} has been approved.

The amount of {{refund_amount}} will be credited back to your original payment method within 3-5 business days.

If you have any questions about this refund, please don't hesitate to contact our support team.

Thank you for shopping with Halvi.

Best regards,
The Halvi Team`}
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="p-4 mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Card className="p-4 h-64 flex items-center justify-center">
                  <div className="text-center">
                    <BarChart size={36} className="mx-auto text-muted-foreground/50 mb-2" />
                    <h3 className="text-lg font-medium">Response Time Trends</h3>
                    <p className="text-sm text-muted-foreground">Average response time by message type</p>
                  </div>
                </Card>
                
                <Card className="p-4 h-64 flex items-center justify-center">
                  <div className="text-center">
                    <PieChart size={36} className="mx-auto text-muted-foreground/50 mb-2" />
                    <h3 className="text-lg font-medium">Message Volume</h3>
                    <p className="text-sm text-muted-foreground">Distribution by user type and category</p>
                  </div>
                </Card>
              </div>
              
              <Card className="p-4 mb-6 border-l-4 border-l-yellow-400">
                <div className="flex items-start gap-3">
                  <AlertTriangle size={20} className="text-yellow-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Communication Alert</h3>
                    <p className="text-sm text-muted-foreground mt-1">5 high-priority customer inquiries have not been responded to in over 24 hours. <Button variant="link" className="p-0 h-auto text-sm">View Urgent Queue</Button></p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4">
                <h3 className="text-lg font-medium mb-4">Communication Performance</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-muted/50 rounded-md p-3">
                    <h4 className="text-sm font-medium mb-2">Customer Satisfaction</h4>
                    <div className="flex items-center gap-2">
                      <div className="text-2xl font-bold">92%</div>
                      <div className="text-xs text-green-500 flex items-center">
                        <ArrowUpRight size={14} className="mr-1" />
                        +3%
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Based on post-conversation surveys</p>
                  </div>
                  
                  <div className="bg-muted/50 rounded-md p-3">
                    <h4 className="text-sm font-medium mb-2">First Response</h4>
                    <div className="flex items-center gap-2">
                      <div className="text-2xl font-bold">1.2h</div>
                      <div className="text-xs text-green-500 flex items-center">
                        <ArrowUpRight size={14} className="mr-1" />
                        +15%
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Average time to first response</p>
                  </div>
                  
                  <div className="bg-muted/50 rounded-md p-3">
                    <h4 className="text-sm font-medium mb-2">Resolution Rate</h4>
                    <div className="flex items-center gap-2">
                      <div className="text-2xl font-bold">87%</div>
                      <div className="text-xs text-green-500 flex items-center">
                        <ArrowUpRight size={14} className="mr-1" />
                        +5%
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Issues resolved on first contact</p>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CommunicationPage;
