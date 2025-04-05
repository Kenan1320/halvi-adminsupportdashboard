
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import PageHeader from '@/components/admin/PageHeader';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import SmartTable from '@/components/admin/SmartTable';
import StatisticsCard from '@/components/admin/StatisticsCard';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  AlertTriangle, 
  Users, 
  Clock, 
  CheckCircle2, 
  ShieldAlert, 
  AlertOctagon,
  BarChart,
  Flag,
  ArrowUpRight,
  MessageSquare,
  UserCog
} from 'lucide-react';

// Mock data
const escalatedCases = [
  { id: 'ESC001', subject: 'Fraudulent Activity - Order #45678', severity: 'High', source: 'Support Agent', submitted: '2023-04-02', status: 'Open', assignedTo: 'Admin' },
  { id: 'ESC002', subject: 'Payment Dispute - $1,245.50', severity: 'Medium', source: 'Customer', submitted: '2023-04-02', status: 'Under Review', assignedTo: 'Finance Team' },
  { id: 'ESC003', subject: 'Shop Compliance Violation', severity: 'High', source: 'System Alert', submitted: '2023-04-01', status: 'Pending Info', assignedTo: 'Compliance Team' },
  { id: 'ESC004', subject: 'Sensitive Data Breach Concern', severity: 'Critical', source: 'Security Team', submitted: '2023-04-01', status: 'In Progress', assignedTo: 'Security Team' },
  { id: 'ESC005', subject: 'Shop Certificate Forgery Suspicion', severity: 'Medium', source: 'Verification Team', submitted: '2023-03-31', status: 'On Hold', assignedTo: 'Compliance Team' },
];

const resolutionHistory = [
  { id: 'ESC006', subject: 'Multiple Refund Requests - Customer #12345', severity: 'Medium', source: 'Support Agent', resolved: '2023-03-30', resolution: 'Account Suspended', handledBy: 'Admin' },
  { id: 'ESC007', subject: 'Unauthorized Access Attempt', severity: 'Critical', source: 'Security Alert', resolved: '2023-03-28', resolution: 'Security Patch Applied', handledBy: 'Security Team' },
  { id: 'ESC008', subject: 'Payment Gateway Integration Issue', severity: 'High', source: 'Finance Team', resolved: '2023-03-25', resolution: 'Technical Fix', handledBy: 'Development Team' },
];

const EscalationsPage = () => {
  const handleRowAction = (action: string, rowData: any) => {
    console.log(`Action ${action} on:`, rowData);
    // Implementation for different actions
  };

  return (
    <DashboardLayout title="Escalations Center">
      <PageHeader 
        title="Escalations Center" 
        description="Manage and resolve critical platform issues and escalated cases"
        actions={
          <Button>
            <AlertTriangle size={16} className="mr-2" />
            New Escalation
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatisticsCard 
          title="Active Escalations" 
          value="18" 
          change={{ value: 3, isPositive: false }} 
          icon={<AlertTriangle size={20} />}
        />
        <StatisticsCard 
          title="Critical Issues" 
          value="2" 
          icon={<AlertOctagon size={20} />}
        />
        <StatisticsCard 
          title="Avg. Resolution Time" 
          value="14.2 hours" 
          change={{ value: 2.1, isPositive: true }} 
          icon={<Clock size={20} />}
        />
        <StatisticsCard 
          title="Resolved This Month" 
          value="47" 
          change={{ value: 12, isPositive: true }} 
          icon={<CheckCircle2 size={20} />}
        />
      </div>

      <Card className="mb-6">
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none px-4 h-auto bg-transparent">
            <TabsTrigger value="active" className="py-3 px-4">Active Escalations</TabsTrigger>
            <TabsTrigger value="monitoring" className="py-3 px-4">Monitoring Dashboard</TabsTrigger>
            <TabsTrigger value="resolution" className="py-3 px-4">Resolution History</TabsTrigger>
            <TabsTrigger value="reports" className="py-3 px-4">Escalation Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="p-0 mt-0">
            <div className="p-4 border-b bg-amber-50 dark:bg-amber-950/20 flex items-center gap-3">
              <AlertOctagon size={18} className="text-amber-500" />
              <p className="text-sm">Critical escalations require immediate attention and should be resolved within 4 hours.</p>
            </div>
            
            <SmartTable
              columns={[
                { key: 'id', title: 'Case ID', sortable: true },
                { key: 'subject', title: 'Subject', sortable: true },
                { key: 'severity', title: 'Severity', sortable: true },
                { key: 'source', title: 'Source', sortable: true },
                { key: 'submitted', title: 'Submitted', sortable: true },
                { key: 'status', title: 'Status', sortable: true },
                { key: 'assignedTo', title: 'Assigned To', sortable: true },
              ]}
              data={escalatedCases}
              filters={['All', 'Critical', 'High', 'Medium', 'Low']}
              rowActions={['View Details', 'Assign', 'Escalate Further', 'Resolve', 'Add Note']}
              onRowAction={handleRowAction}
              pagination={{
                page: 1,
                pageSize: 10,
                total: 18,
                onChange: (page) => console.log('Changed to page', page)
              }}
            />
          </TabsContent>

          <TabsContent value="monitoring" className="p-4 mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card className="p-4">
                <h3 className="font-medium mb-3">Escalation Sources</h3>
                <div className="space-y-3 mt-4">
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Support Agents</span>
                      <span>42%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-halvi-accent h-2 rounded-full" style={{ width: '42%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Customers</span>
                      <span>28%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-halvi-amber h-2 rounded-full" style={{ width: '28%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>System Alerts</span>
                      <span>18%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-halvi-royal h-2 rounded-full" style={{ width: '18%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Security Team</span>
                      <span>12%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: '12%' }}></div>
                    </div>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4">
                <h3 className="font-medium mb-3">Issue Categories</h3>
                <div className="space-y-3 mt-4">
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Fraud & Security</span>
                      <span>35%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: '35%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Payment Disputes</span>
                      <span>25%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-amber-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Compliance Issues</span>
                      <span>20%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '20%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Technical Problems</span>
                      <span>15%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Other</span>
                      <span>5%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-gray-500 h-2 rounded-full" style={{ width: '5%' }}></div>
                    </div>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4">
                <h3 className="font-medium mb-3">Real-time Monitoring</h3>
                <div className="space-y-4 mt-4">
                  <div className="bg-green-100 dark:bg-green-900/30 rounded-md p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      <span className="text-sm">Payment System</span>
                    </div>
                    <span className="text-xs font-medium text-green-700 dark:text-green-400">Operational</span>
                  </div>
                  
                  <div className="bg-green-100 dark:bg-green-900/30 rounded-md p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      <span className="text-sm">Product Database</span>
                    </div>
                    <span className="text-xs font-medium text-green-700 dark:text-green-400">Operational</span>
                  </div>
                  
                  <div className="bg-amber-100 dark:bg-amber-900/30 rounded-md p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                      <span className="text-sm">Search Functionality</span>
                    </div>
                    <span className="text-xs font-medium text-amber-700 dark:text-amber-400">Degraded Performance</span>
                  </div>
                  
                  <div className="bg-red-100 dark:bg-red-900/30 rounded-md p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-red-500"></div>
                      <span className="text-sm">Notification Service</span>
                    </div>
                    <span className="text-xs font-medium text-red-700 dark:text-red-400">Outage Detected</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  <ShieldAlert size={16} className="mr-2" />
                  System Status Dashboard
                </Button>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Card className="p-4 h-64 flex items-center justify-center">
                <div className="text-center">
                  <BarChart size={36} className="mx-auto text-muted-foreground/50 mb-2" />
                  <h3 className="text-lg font-medium">Escalation Trends</h3>
                  <p className="text-sm text-muted-foreground">Weekly escalation volume by category</p>
                </div>
              </Card>
              
              <Card className="p-4 h-64 flex items-center justify-center">
                <div className="text-center">
                  <Clock size={36} className="mx-auto text-muted-foreground/50 mb-2" />
                  <h3 className="text-lg font-medium">Resolution Time</h3>
                  <p className="text-sm text-muted-foreground">Average resolution time by severity level</p>
                </div>
              </Card>
            </div>
            
            <Card className="p-4 border-l-4 border-l-red-400">
              <div className="flex items-start gap-3">
                <AlertOctagon size={20} className="text-red-500 mt-0.5" />
                <div>
                  <h3 className="font-medium">Critical Alert</h3>
                  <p className="text-sm text-muted-foreground mt-1">Notification service outage detected 23 minutes ago. Engineering team has been notified and is investigating.</p>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="resolution" className="p-0 mt-0">
            <SmartTable
              title="Resolution History"
              subtitle="Previously resolved escalations"
              columns={[
                { key: 'id', title: 'Case ID', sortable: true },
                { key: 'subject', title: 'Subject', sortable: true },
                { key: 'severity', title: 'Severity', sortable: true },
                { key: 'source', title: 'Source', sortable: true },
                { key: 'resolved', title: 'Resolved Date', sortable: true },
                { key: 'resolution', title: 'Resolution', sortable: true },
                { key: 'handledBy', title: 'Handled By', sortable: true },
              ]}
              data={resolutionHistory}
              filters={['All', 'Last 7 Days', 'Last 30 Days', 'Last 90 Days']}
              rowActions={['View Details', 'Reopen Case', 'Create Similar Case']}
              onRowAction={handleRowAction}
              pagination={{
                page: 1,
                pageSize: 10,
                total: 47,
                onChange: (page) => console.log('Changed to page', page)
              }}
            />
            
            <div className="p-4">
              <Card className="p-4">
                <h3 className="text-lg font-medium mb-4">Resolution Success Metrics</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-muted/50 rounded-md p-3">
                    <h4 className="text-sm font-medium mb-2">First-Time Resolution</h4>
                    <div className="flex items-center gap-2">
                      <div className="text-2xl font-bold">78%</div>
                      <div className="text-xs text-green-500 flex items-center">
                        <ArrowUpRight size={14} className="mr-1" />
                        +5%
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Issues resolved without reopening</p>
                  </div>
                  
                  <div className="bg-muted/50 rounded-md p-3">
                    <h4 className="text-sm font-medium mb-2">Critical Issue SLA</h4>
                    <div className="flex items-center gap-2">
                      <div className="text-2xl font-bold">94%</div>
                      <div className="text-xs text-green-500 flex items-center">
                        <ArrowUpRight size={14} className="mr-1" />
                        +2%
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Critical issues resolved within SLA</p>
                  </div>
                  
                  <div className="bg-muted/50 rounded-md p-3">
                    <h4 className="text-sm font-medium mb-2">Customer Satisfaction</h4>
                    <div className="flex items-center gap-2">
                      <div className="text-2xl font-bold">4.2/5</div>
                      <div className="text-xs text-green-500 flex items-center">
                        <ArrowUpRight size={14} className="mr-1" />
                        +0.3
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Post-resolution feedback score</p>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="p-4 mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                    <Flag size={20} className="text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-medium">Escalation Summary</h3>
                    <p className="text-xs text-muted-foreground">Monthly overview report</p>
                  </div>
                </div>
                <Button size="sm" className="w-full mt-2" variant="outline">
                  Generate Report
                </Button>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                    <UserCog size={20} className="text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-medium">Team Performance</h3>
                    <p className="text-xs text-muted-foreground">Resolution efficiency by team</p>
                  </div>
                </div>
                <Button size="sm" className="w-full mt-2" variant="outline">
                  Generate Report
                </Button>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                    <BarChart size={20} className="text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-medium">Trend Analysis</h3>
                    <p className="text-xs text-muted-foreground">Recurring issue patterns</p>
                  </div>
                </div>
                <Button size="sm" className="w-full mt-2" variant="outline">
                  Generate Report
                </Button>
              </Card>
            </div>
            
            <Card className="p-4 mb-6">
              <h3 className="text-lg font-medium mb-4">Custom Report Builder</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Report Type</label>
                  <select className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm">
                    <option>Escalation Summary</option>
                    <option>Resolution Performance</option>
                    <option>Team Efficiency</option>
                    <option>Category Analysis</option>
                    <option>SLA Compliance</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">Time Period</label>
                  <select className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm">
                    <option>Last 7 Days</option>
                    <option>Last 30 Days</option>
                    <option>Last Quarter</option>
                    <option>Year to Date</option>
                    <option>Custom Range</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">Group By</label>
                  <select className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm">
                    <option>Severity</option>
                    <option>Category</option>
                    <option>Source</option>
                    <option>Team</option>
                    <option>Resolution Type</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">Format</label>
                  <select className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm">
                    <option>PDF Report</option>
                    <option>CSV Export</option>
                    <option>Excel Spreadsheet</option>
                    <option>Interactive Dashboard</option>
                  </select>
                </div>
              </div>
              <Button className="mt-4">
                Generate Custom Report
              </Button>
            </Card>
            
            <Card className="p-4">
              <h3 className="text-lg font-medium mb-4">Recently Generated Reports</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText size={16} className="text-muted-foreground" />
                    <span className="text-sm">March 2023 - Escalation Summary</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Generated: Apr 1, 2023</span>
                    <Button size="sm" variant="ghost">
                      <Download size={14} />
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText size={16} className="text-muted-foreground" />
                    <span className="text-sm">Q1 2023 - Team Performance Analysis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Generated: Mar 31, 2023</span>
                    <Button size="sm" variant="ghost">
                      <Download size={14} />
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText size={16} className="text-muted-foreground" />
                    <span className="text-sm">Critical Issues - YTD Analysis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Generated: Mar 28, 2023</span>
                    <Button size="sm" variant="ghost">
                      <Download size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </Card>
    </DashboardLayout>
  );
};

export default EscalationsPage;
