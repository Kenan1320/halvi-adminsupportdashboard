
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import PageHeader from '@/components/admin/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import {
  Search,
  Filter,
  Zap,
  Settings,
  Clipboard,
  MessageSquare,
  Phone,
  RefreshCw,
  PenLine,
  Mail,
  Headphones,
  BookOpen,
  FileText,
  HelpCircle,
  ChevronRight,
  Send,
  Clipboard as ClipboardIcon
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Mock data for agent tools
const quickResponses = [
  {
    id: 1,
    title: "Order Status Update",
    content: "Thank you for your inquiry about your order status. I can confirm that your order #[ORDER_NUMBER] has been processed and is currently [STATUS]. The estimated delivery date is [DELIVERY_DATE]. Please let me know if you have any other questions.",
    tags: ["order", "status", "delivery"]
  },
  {
    id: 2,
    title: "Payment Issue Resolution",
    content: "I understand you're experiencing an issue with your payment. I apologize for the inconvenience. I'll help you resolve this right away. Could you please provide me with your order number and the specific payment issue you're facing? This will help me assist you more effectively.",
    tags: ["payment", "issue", "resolution"]
  },
  {
    id: 3,
    title: "Refund Request Acknowledgment",
    content: "Thank you for your refund request. I've reviewed your order #[ORDER_NUMBER] and have initiated a refund for [AMOUNT]. The refund should be processed within 5-7 business days, depending on your payment method and financial institution. You will receive an email confirmation once the refund is processed.",
    tags: ["refund", "acknowledgment", "payment"]
  },
  {
    id: 4,
    title: "Product Information",
    content: "Thank you for your interest in our [PRODUCT_NAME]. This product is [DESCRIPTION]. It's currently [IN_STOCK/OUT_OF_STOCK] and priced at [PRICE]. If you have any specific questions about the product features or specifications, I'd be happy to provide more details.",
    tags: ["product", "information", "details"]
  },
  {
    id: 5,
    title: "Delivery Delay Apology",
    content: "I sincerely apologize for the delay with your order delivery. We understand this is inconvenient. Your order has been delayed due to [REASON]. We expect it to be delivered by [NEW_DATE]. As a token of our apology, we'd like to offer you [COMPENSATION]. Thank you for your patience and understanding.",
    tags: ["delivery", "delay", "apology"]
  },
  {
    id: 6,
    title: "Account Issue Resolution",
    content: "I understand you're having trouble with your account. I'm here to help. Based on the information you've provided, I recommend [SOLUTION]. If you continue to experience issues, please don't hesitate to reach out again. We're committed to ensuring your experience with our platform is smooth and enjoyable.",
    tags: ["account", "issue", "resolution"]
  },
  {
    id: 7,
    title: "General Thank You",
    content: "Thank you for contacting our support team. It was a pleasure assisting you today. If you have any other questions or concerns in the future, please don't hesitate to reach out. We're always here to help. Have a wonderful day!",
    tags: ["thank you", "closing", "general"]
  }
];

const knowledgeBaseArticles = [
  {
    id: 1,
    title: "Payment Processing Guidelines",
    description: "Complete guide to understanding payment processing, common issues, and resolution steps",
    category: "Payments",
    lastUpdated: "2023-05-15"
  },
  {
    id: 2,
    title: "Order Management Framework",
    description: "Comprehensive overview of order lifecycle, statuses, and support procedures",
    category: "Orders",
    lastUpdated: "2023-06-01"
  },
  {
    id: 3,
    title: "Refund and Return Policy",
    description: "Detailed explanation of refund processes, timelines, and exception handling",
    category: "Refunds",
    lastUpdated: "2023-05-20"
  },
  {
    id: 4,
    title: "Customer Communication Best Practices",
    description: "Guidelines for effective communication with different customer types",
    category: "Communication",
    lastUpdated: "2023-04-12"
  },
  {
    id: 5,
    title: "Halal Certification Standards",
    description: "Overview of halal certification processes, requirements, and verification",
    category: "Compliance",
    lastUpdated: "2023-06-10"
  },
  {
    id: 6,
    title: "Escalation Procedures",
    description: "Step-by-step guide for when and how to escalate customer issues",
    category: "Escalations",
    lastUpdated: "2023-05-28"
  },
  {
    id: 7,
    title: "Delivery Partner Coordination",
    description: "Protocols for working with delivery partners and resolving delivery issues",
    category: "Delivery",
    lastUpdated: "2023-06-05"
  },
  {
    id: 8,
    title: "Shop Onboarding Process",
    description: "Complete guide to the shop verification and onboarding workflow",
    category: "Merchants",
    lastUpdated: "2023-04-30"
  }
];

const AgentToolsPage = () => {
  const [searchQuickResponse, setSearchQuickResponse] = useState('');
  const [searchKnowledgeBase, setSearchKnowledgeBase] = useState('');
  const [selectedResponse, setSelectedResponse] = useState(null);
  const [customizedResponse, setCustomizedResponse] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(null);
  
  const filteredResponses = quickResponses.filter(response => 
    response.title.toLowerCase().includes(searchQuickResponse.toLowerCase()) ||
    response.tags.some(tag => tag.toLowerCase().includes(searchQuickResponse.toLowerCase()))
  );
  
  const filteredArticles = knowledgeBaseArticles.filter(article => 
    article.title.toLowerCase().includes(searchKnowledgeBase.toLowerCase()) ||
    article.category.toLowerCase().includes(searchKnowledgeBase.toLowerCase()) ||
    article.description.toLowerCase().includes(searchKnowledgeBase.toLowerCase())
  );
  
  const handleSelectResponse = (response) => {
    setSelectedResponse(response);
    setCustomizedResponse(response.content);
  };
  
  const handleCopyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // You would typically show a toast notification here
    console.log('Copied to clipboard!');
  };
  
  return (
    <DashboardLayout title="Agent Tools">
      <PageHeader 
        title="Agent Tools" 
        description="Access resources and tools to improve support efficiency"
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <Settings size={14} />
              Preferences
            </Button>
            <Button size="sm" className="h-8 gap-1">
              <Zap size={14} />
              AI Assist
            </Button>
          </div>
        }
      />

      <Tabs defaultValue="quick-responses" className="w-full mb-8">
        <TabsList className="w-full md:w-auto mb-4 grid grid-cols-3">
          <TabsTrigger value="quick-responses" className="flex items-center gap-2">
            <MessageSquare size={16} />
            <span className="hidden md:inline">Quick Responses</span>
          </TabsTrigger>
          <TabsTrigger value="knowledge-base" className="flex items-center gap-2">
            <BookOpen size={16} />
            <span className="hidden md:inline">Knowledge Base</span>
          </TabsTrigger>
          <TabsTrigger value="tools" className="flex items-center gap-2">
            <Zap size={16} />
            <span className="hidden md:inline">Support Tools</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="quick-responses" className="mt-0 space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Quick Response Templates</CardTitle>
              <CardDescription>
                Standardized responses for common customer inquiries
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <div className="space-y-4">
                    <div className="relative">
                      <Search className="absolute top-1/2 transform -translate-y-1/2 left-3 h-4 w-4 text-muted-foreground pointer-events-none" />
                      <Input 
                        placeholder="Search templates..." 
                        className="pl-9" 
                        value={searchQuickResponse}
                        onChange={(e) => setSearchQuickResponse(e.target.value)}
                      />
                    </div>
                    
                    <div className="bg-muted/50 rounded-lg p-2">
                      <p className="text-sm text-muted-foreground px-2 py-1">Popular tags:</p>
                      <div className="flex flex-wrap gap-1 p-2">
                        <Badge variant="outline" className="cursor-pointer hover:bg-muted transition-colors" onClick={() => setSearchQuickResponse('order')}>order</Badge>
                        <Badge variant="outline" className="cursor-pointer hover:bg-muted transition-colors" onClick={() => setSearchQuickResponse('payment')}>payment</Badge>
                        <Badge variant="outline" className="cursor-pointer hover:bg-muted transition-colors" onClick={() => setSearchQuickResponse('delivery')}>delivery</Badge>
                        <Badge variant="outline" className="cursor-pointer hover:bg-muted transition-colors" onClick={() => setSearchQuickResponse('refund')}>refund</Badge>
                      </div>
                    </div>
                    
                    <div className="overflow-y-auto max-h-[calc(100vh-360px)] space-y-2">
                      {filteredResponses.length === 0 ? (
                        <div className="text-center p-6 bg-muted/50 rounded-lg">
                          <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                          <p className="font-medium">No templates found</p>
                          <p className="text-sm text-muted-foreground">Try adjusting your search term</p>
                        </div>
                      ) : (
                        filteredResponses.map(response => (
                          <Card 
                            key={response.id} 
                            className={`cursor-pointer hover:bg-muted/50 transition-colors ${selectedResponse?.id === response.id ? 'border-primary' : ''}`}
                            onClick={() => handleSelectResponse(response)}
                          >
                            <CardContent className="p-4">
                              <h3 className="font-medium mb-1">{response.title}</h3>
                              <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                                {response.content.substring(0, 100)}...
                              </p>
                              <div className="flex flex-wrap gap-1">
                                {response.tags.map(tag => (
                                  <Badge key={tag} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        ))
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  {selectedResponse ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">{selectedResponse.title}</h3>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" className="gap-1" onClick={() => handleCopyToClipboard(customizedResponse)}>
                            <ClipboardIcon size={14} />
                            Copy
                          </Button>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="outline" size="sm" className="gap-1">
                                <PenLine size={14} />
                                Variables
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-80">
                              <div className="space-y-2">
                                <h4 className="font-medium">Template Variables</h4>
                                <p className="text-sm text-muted-foreground">Replace these placeholders with actual values:</p>
                                <div className="space-y-2 mt-2">
                                  <div className="flex items-center justify-between">
                                    <code className="bg-muted px-1 py-0.5 rounded">[ORDER_NUMBER]</code>
                                    <Button variant="ghost" size="sm" className="h-7" onClick={() => setCustomizedResponse(customizedResponse.replace('[ORDER_NUMBER]', 'ORD-48293'))}>
                                      Insert
                                    </Button>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <code className="bg-muted px-1 py-0.5 rounded">[STATUS]</code>
                                    <Button variant="ghost" size="sm" className="h-7" onClick={() => setCustomizedResponse(customizedResponse.replace('[STATUS]', 'shipped'))}>
                                      Insert
                                    </Button>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <code className="bg-muted px-1 py-0.5 rounded">[DELIVERY_DATE]</code>
                                    <Button variant="ghost" size="sm" className="h-7" onClick={() => setCustomizedResponse(customizedResponse.replace('[DELIVERY_DATE]', 'June 18, 2023'))}>
                                      Insert
                                    </Button>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <code className="bg-muted px-1 py-0.5 rounded">[AMOUNT]</code>
                                    <Button variant="ghost" size="sm" className="h-7" onClick={() => setCustomizedResponse(customizedResponse.replace('[AMOUNT]', '£85.40'))}>
                                      Insert
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                      
                      <Textarea 
                        value={customizedResponse} 
                        onChange={(e) => setCustomizedResponse(e.target.value)}
                        className="min-h-[200px]"
                      />
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" className="gap-1" onClick={() => setCustomizedResponse(selectedResponse.content)}>
                            <RefreshCw size={14} />
                            Reset
                          </Button>
                          <Button variant="outline" size="sm" className="gap-1">
                            <PenLine size={14} />
                            Save as New
                          </Button>
                        </div>
                        <Button className="gap-1">
                          <Send size={14} />
                          Use Response
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full min-h-[400px] bg-muted/50 rounded-lg">
                      <div className="text-center p-6">
                        <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                        <h3 className="text-lg font-medium mb-2">No template selected</h3>
                        <p className="text-muted-foreground">
                          Select a quick response template from the list to view and customize
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="knowledge-base" className="mt-0 space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Knowledge Base</CardTitle>
              <CardDescription>
                Access support articles, guides, and procedures
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <div className="space-y-4">
                    <div className="relative">
                      <Search className="absolute top-1/2 transform -translate-y-1/2 left-3 h-4 w-4 text-muted-foreground pointer-events-none" />
                      <Input 
                        placeholder="Search knowledge base..." 
                        className="pl-9" 
                        value={searchKnowledgeBase}
                        onChange={(e) => setSearchKnowledgeBase(e.target.value)}
                      />
                    </div>
                    
                    <div className="bg-muted/50 rounded-lg p-2">
                      <p className="text-sm text-muted-foreground px-2 py-1">Popular categories:</p>
                      <div className="flex flex-wrap gap-1 p-2">
                        <Badge variant="outline" className="cursor-pointer hover:bg-muted transition-colors" onClick={() => setSearchKnowledgeBase('Payments')}>Payments</Badge>
                        <Badge variant="outline" className="cursor-pointer hover:bg-muted transition-colors" onClick={() => setSearchKnowledgeBase('Orders')}>Orders</Badge>
                        <Badge variant="outline" className="cursor-pointer hover:bg-muted transition-colors" onClick={() => setSearchKnowledgeBase('Refunds')}>Refunds</Badge>
                        <Badge variant="outline" className="cursor-pointer hover:bg-muted transition-colors" onClick={() => setSearchKnowledgeBase('Compliance')}>Compliance</Badge>
                      </div>
                    </div>
                    
                    <div className="overflow-y-auto max-h-[calc(100vh-360px)] space-y-2">
                      {filteredArticles.length === 0 ? (
                        <div className="text-center p-6 bg-muted/50 rounded-lg">
                          <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                          <p className="font-medium">No articles found</p>
                          <p className="text-sm text-muted-foreground">Try adjusting your search term</p>
                        </div>
                      ) : (
                        filteredArticles.map(article => (
                          <Card 
                            key={article.id} 
                            className={`cursor-pointer hover:bg-muted/50 transition-colors ${selectedArticle?.id === article.id ? 'border-primary' : ''}`}
                            onClick={() => setSelectedArticle(article)}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h3 className="font-medium mb-1">{article.title}</h3>
                                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                                    {article.description}
                                  </p>
                                </div>
                                <Badge variant="outline">{article.category}</Badge>
                              </div>
                              <p className="text-xs text-muted-foreground">
                                Last updated: {article.lastUpdated}
                              </p>
                            </CardContent>
                          </Card>
                        ))
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  {selectedArticle ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Badge variant="outline" className="mb-2">{selectedArticle.category}</Badge>
                          <h3 className="text-lg font-medium">{selectedArticle.title}</h3>
                          <p className="text-sm text-muted-foreground">Last updated: {selectedArticle.lastUpdated}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" className="gap-1">
                            <ClipboardIcon size={14} />
                            Copy Link
                          </Button>
                          <Button variant="outline" size="sm" className="gap-1">
                            <FileText size={14} />
                            Print
                          </Button>
                        </div>
                      </div>
                      
                      <div className="p-6 border rounded-lg space-y-4">
                        <p>This is a sample article content for {selectedArticle.title}. In an actual implementation, this would contain the full detailed content of the knowledge base article.</p>
                        
                        <h4 className="text-lg font-medium mt-4">Overview</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac purus ac nulla faucibus consequat. Nullam eu felis in nulla facilisis venenatis vel eget est.</p>
                        
                        <h4 className="text-lg font-medium mt-4">Key Points</h4>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>Important point 1 regarding {selectedArticle.category.toLowerCase()} process</li>
                          <li>Critical information for agents handling {selectedArticle.category.toLowerCase()} issues</li>
                          <li>Step-by-step procedures for resolution</li>
                          <li>Exceptions and special cases to be aware of</li>
                        </ul>
                        
                        <h4 className="text-lg font-medium mt-4">Procedures</h4>
                        <ol className="list-decimal pl-6 space-y-2">
                          <li>First step in the process</li>
                          <li>Second step with detailed explanation</li>
                          <li>Final steps and verification</li>
                        </ol>
                        
                        <div className="bg-muted/50 rounded-lg p-4 mt-4">
                          <h5 className="font-medium flex items-center gap-2">
                            <HelpCircle size={16} className="text-blue-500" />
                            Agent Tips
                          </h5>
                          <p className="text-sm mt-2">Special tips for agents when handling these types of situations. This includes common pitfalls, best practices, and guidelines for ensuring customer satisfaction.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Button variant="outline" size="sm" className="gap-1">
                          <MessageSquare size={14} />
                          Was this helpful?
                        </Button>
                        <Button variant="outline" size="sm" className="gap-1">
                          <Send size={14} />
                          Share with Customer
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full min-h-[400px] bg-muted/50 rounded-lg">
                      <div className="text-center p-6">
                        <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                        <h3 className="text-lg font-medium mb-2">No article selected</h3>
                        <p className="text-muted-foreground">
                          Select an article from the knowledge base to view its content
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tools" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-3">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Support Tools</CardTitle>
                <CardDescription>
                  Access specialized tools to help resolve customer issues
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="bg-primary/10 p-3 rounded-full">
                          <Search className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-medium">Order Lookup</h3>
                          <p className="text-sm text-muted-foreground">Detailed order search and status verification</p>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="bg-primary/10 p-3 rounded-full">
                          <MessageSquare className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-medium">Customer Chat</h3>
                          <p className="text-sm text-muted-foreground">Direct messaging with customers</p>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="bg-primary/10 p-3 rounded-full">
                          <Mail className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-medium">Email Templates</h3>
                          <p className="text-sm text-muted-foreground">Standardized email communications</p>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="bg-primary/10 p-3 rounded-full">
                          <Phone className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-medium">Call Center</h3>
                          <p className="text-sm text-muted-foreground">Phone support management system</p>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="bg-primary/10 p-3 rounded-full">
                          <Clipboard className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-medium">Customer Notes</h3>
                          <p className="text-sm text-muted-foreground">History and interaction records</p>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="bg-primary/10 p-3 rounded-full">
                          <Headphones className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-medium">Agent Training</h3>
                          <p className="text-sm text-muted-foreground">Support skills and knowledge development</p>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 pb-3 border-b">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <MessageSquare size={16} className="text-blue-500" />
                    </div>
                    <div>
                      <p className="font-medium">Chat with Ahmed Al-Farsi</p>
                      <p className="text-sm text-muted-foreground">Regarding order delivery issue</p>
                      <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 pb-3 border-b">
                    <div className="bg-green-100 p-2 rounded-full">
                      <Phone size={16} className="text-green-500" />
                    </div>
                    <div>
                      <p className="font-medium">Call with Baraka Halal Meats</p>
                      <p className="text-sm text-muted-foreground">Discussion about order status</p>
                      <p className="text-xs text-muted-foreground mt-1">3 hours ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 pb-3 border-b">
                    <div className="bg-amber-100 p-2 rounded-full">
                      <Mail size={16} className="text-amber-500" />
                    </div>
                    <div>
                      <p className="font-medium">Email to Ibrahim Qadir</p>
                      <p className="text-sm text-muted-foreground">Payment resolution confirmation</p>
                      <p className="text-xs text-muted-foreground mt-1">5 hours ago</p>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full">View All Activity</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Performance Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-muted/50 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground">Tickets Resolved</p>
                    <p className="text-2xl font-bold mt-1">24</p>
                    <div className="mt-2 text-xs text-green-500 flex items-center">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                        <path d="M12 19V5M5 12l7-7 7 7"/>
                      </svg>
                      15% increase
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground">Avg. Response Time</p>
                    <p className="text-2xl font-bold mt-1">12m</p>
                    <div className="mt-2 text-xs text-green-500 flex items-center">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                        <path d="M12 19V5M5 12l7-7 7 7"/>
                      </svg>
                      8% faster
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground">Satisfaction Rate</p>
                    <p className="text-2xl font-bold mt-1">94%</p>
                    <div className="mt-2 text-xs text-green-500 flex items-center">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                        <path d="M12 19V5M5 12l7-7 7 7"/>
                      </svg>
                      2% increase
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium">Your Daily Schedule</h3>
                  <div className="space-y-2">
                    <div className="flex items-center p-2 rounded-lg hover:bg-muted/50">
                      <div className="w-16 text-sm text-muted-foreground">9:00 AM</div>
                      <div className="flex-1 flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span>Team Standup Meeting</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center p-2 rounded-lg hover:bg-muted/50">
                      <div className="w-16 text-sm text-muted-foreground">10:30 AM</div>
                      <div className="flex-1 flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span>Customer Support Queue</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center p-2 rounded-lg hover:bg-muted/50">
                      <div className="w-16 text-sm text-muted-foreground">1:00 PM</div>
                      <div className="flex-1 flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                        <span>Lunch Break</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center p-2 rounded-lg hover:bg-muted/50">
                      <div className="w-16 text-sm text-muted-foreground">2:00 PM</div>
                      <div className="flex-1 flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <span>Escalation Review</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center p-2 rounded-lg hover:bg-muted/50">
                      <div className="w-16 text-sm text-muted-foreground">4:00 PM</div>
                      <div className="flex-1 flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                        <span>Knowledge Base Training</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default AgentToolsPage;
