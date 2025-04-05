
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import PageHeader from '@/components/admin/PageHeader';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import SmartTable from '@/components/admin/SmartTable';
import { Button } from '@/components/ui/button';
import { Card } from "@/components/ui/card";
import { 
  Settings, 
  Globe,
  TruckIcon, 
  CreditCard, 
  Percent, 
  Shield, 
  Bell, 
  Users,
  Key,
  Save,
  Clock,
  MessageSquare,
  RefreshCw,
  PlusCircle,
  CheckCircle2,
  XCircle,
  Filter,
  Download,
  Search
} from 'lucide-react';

// Mock data
const auditLogs = [
  { id: 'LOG001', user: 'Admin', action: 'Changed commission rate', details: 'Global rate: 12% → 10%', timestamp: '2023-04-02 15:23:45', ip: '192.168.1.1' },
  { id: 'LOG002', user: 'Admin', action: 'Added new admin user', details: 'User: sarah@example.com', timestamp: '2023-04-02 14:15:32', ip: '192.168.1.1' },
  { id: 'LOG003', user: 'Admin', action: 'Updated delivery fees', details: 'Standard shipping: $5.99 → $4.99', timestamp: '2023-04-01 10:22:18', ip: '192.168.1.1' },
  { id: 'LOG004', user: 'Admin', action: 'System maintenance', details: 'Scheduled: Apr 5, 2023', timestamp: '2023-04-01 09:45:12', ip: '192.168.1.1' },
  { id: 'LOG005', user: 'Admin', action: 'Approved shop application', details: 'Shop: Organic Halal Foods', timestamp: '2023-03-31 16:37:29', ip: '192.168.1.1' },
];

const admins = [
  { id: 'ADM001', name: 'John Doe', email: 'john@halvi.com', role: 'Super Admin', status: 'Active', lastActive: '2023-04-02 15:45:22' },
  { id: 'ADM002', name: 'Sarah Ahmed', email: 'sarah@halvi.com', role: 'Admin', status: 'Active', lastActive: '2023-04-02 14:22:10' },
  { id: 'ADM003', name: 'Mohammed Khan', email: 'mohammed@halvi.com', role: 'Finance Admin', status: 'Active', lastActive: '2023-04-01 11:08:45' },
  { id: 'ADM004', name: 'Aisha Patel', email: 'aisha@halvi.com', role: 'Support Admin', status: 'Inactive', lastActive: '2023-03-28 09:15:33' },
];

const SettingsPage = () => {
  const handleRowAction = (action: string, rowData: any) => {
    console.log(`Action ${action} on:`, rowData);
    // Implementation for different actions
  };

  return (
    <DashboardLayout title="Platform Settings">
      <PageHeader 
        title="Platform Settings" 
        description="Configure and manage global platform settings"
      />

      <Card className="mb-6">
        <Tabs defaultValue="global" className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none px-4 h-auto bg-transparent">
            <TabsTrigger value="global" className="py-3 px-4">Global Configuration</TabsTrigger>
            <TabsTrigger value="maintenance" className="py-3 px-4">System Maintenance</TabsTrigger>
            <TabsTrigger value="roles" className="py-3 px-4">Role Management</TabsTrigger>
            <TabsTrigger value="audit" className="py-3 px-4">Audit Logs</TabsTrigger>
            <TabsTrigger value="compliance" className="py-3 px-4">Compliance Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="global" className="p-4 mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Regional Settings</h3>
                <Card className="p-4">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Default Language</label>
                      <select className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm">
                        <option>English</option>
                        <option>Arabic</option>
                        <option>Urdu</option>
                        <option>French</option>
                        <option>Spanish</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-1 block">Default Currency</label>
                      <select className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm">
                        <option>USD ($)</option>
                        <option>EUR (€)</option>
                        <option>GBP (£)</option>
                        <option>AED (د.إ)</option>
                        <option>SAR (ر.س)</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-1 block">Timezone</label>
                      <select className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm">
                        <option>UTC (Coordinated Universal Time)</option>
                        <option>EST (Eastern Standard Time)</option>
                        <option>PST (Pacific Standard Time)</option>
                        <option>GST (Gulf Standard Time)</option>
                        <option>BST (British Summer Time)</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" defaultChecked />
                        Enable automatic currency conversion
                      </label>
                    </div>
                    
                    <div>
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" defaultChecked />
                        Enable automatic language detection
                      </label>
                    </div>
                  </div>
                </Card>
                
                <h3 className="text-lg font-medium mt-6 mb-4">Delivery Settings</h3>
                <Card className="p-4">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Standard Shipping Fee</label>
                      <div className="flex">
                        <div className="flex items-center h-9 rounded-l-md border border-r-0 border-input bg-muted px-3">
                          <span className="text-sm text-muted-foreground">$</span>
                        </div>
                        <input 
                          type="number" 
                          className="flex-1 h-9 rounded-r-md border border-input bg-background px-3 text-sm"
                          defaultValue="4.99"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-1 block">Express Shipping Fee</label>
                      <div className="flex">
                        <div className="flex items-center h-9 rounded-l-md border border-r-0 border-input bg-muted px-3">
                          <span className="text-sm text-muted-foreground">$</span>
                        </div>
                        <input 
                          type="number" 
                          className="flex-1 h-9 rounded-r-md border border-input bg-background px-3 text-sm"
                          defaultValue="9.99"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-1 block">Free Shipping Threshold</label>
                      <div className="flex">
                        <div className="flex items-center h-9 rounded-l-md border border-r-0 border-input bg-muted px-3">
                          <span className="text-sm text-muted-foreground">$</span>
                        </div>
                        <input 
                          type="number" 
                          className="flex-1 h-9 rounded-r-md border border-input bg-background px-3 text-sm"
                          defaultValue="50.00"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" defaultChecked />
                        Allow shops to set custom shipping rates
                      </label>
                    </div>
                  </div>
                </Card>
                
                <h3 className="text-lg font-medium mt-6 mb-4">Payment Settings</h3>
                <Card className="p-4">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Payment Processors</label>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm">
                          <input type="checkbox" defaultChecked />
                          Credit Card / Debit Card
                        </label>
                        <label className="flex items-center gap-2 text-sm">
                          <input type="checkbox" defaultChecked />
                          PayPal
                        </label>
                        <label className="flex items-center gap-2 text-sm">
                          <input type="checkbox" defaultChecked />
                          Apple Pay
                        </label>
                        <label className="flex items-center gap-2 text-sm">
                          <input type="checkbox" />
                          Google Pay
                        </label>
                        <label className="flex items-center gap-2 text-sm">
                          <input type="checkbox" />
                          Bank Transfer
                        </label>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-1 block">Transaction Fee</label>
                      <div className="flex">
                        <input 
                          type="number" 
                          className="flex-1 h-9 rounded-l-md border border-input bg-background px-3 text-sm"
                          defaultValue="2.9"
                        />
                        <div className="flex items-center h-9 rounded-r-md border border-l-0 border-input bg-muted px-3">
                          <span className="text-sm text-muted-foreground">%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-1 block">Payout Schedule</label>
                      <select className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm">
                        <option>Weekly (Every Friday)</option>
                        <option>Bi-weekly (Every other Friday)</option>
                        <option>Monthly (1st of each month)</option>
                        <option>On demand (Manual)</option>
                      </select>
                    </div>
                  </div>
                </Card>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Commission Settings</h3>
                <Card className="p-4">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Default Commission Rate</label>
                      <div className="flex">
                        <input 
                          type="number" 
                          className="flex-1 h-9 rounded-l-md border border-input bg-background px-3 text-sm"
                          defaultValue="10"
                        />
                        <div className="flex items-center h-9 rounded-r-md border border-l-0 border-input bg-muted px-3">
                          <span className="text-sm text-muted-foreground">%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-1 block">Minimum Commission</label>
                      <div className="flex">
                        <input 
                          type="number" 
                          className="flex-1 h-9 rounded-l-md border border-input bg-background px-3 text-sm"
                          defaultValue="5"
                        />
                        <div className="flex items-center h-9 rounded-r-md border border-l-0 border-input bg-muted px-3">
                          <span className="text-sm text-muted-foreground">%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-1 block">New Shop Promotional Rate</label>
                      <div className="flex">
                        <input 
                          type="number" 
                          className="flex-1 h-9 rounded-l-md border border-input bg-background px-3 text-sm"
                          defaultValue="8"
                        />
                        <div className="flex items-center h-9 rounded-r-md border border-l-0 border-input bg-muted px-3">
                          <span className="text-sm text-muted-foreground">%</span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">For first 30 days after shop approval</p>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-1 block">High Volume Discount</label>
                      <div className="flex">
                        <input 
                          type="number" 
                          className="flex-1 h-9 rounded-l-md border border-input bg-background px-3 text-sm"
                          defaultValue="2"
                        />
                        <div className="flex items-center h-9 rounded-r-md border border-l-0 border-input bg-muted px-3">
                          <span className="text-sm text-muted-foreground">%</span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">For shops with monthly sales {'>'} $10,000</p>
                    </div>
                  </div>
                </Card>
                
                <h3 className="text-lg font-medium mt-6 mb-4">Notification Settings</h3>
                <Card className="p-4">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Admin Notifications</label>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm">
                          <input type="checkbox" defaultChecked />
                          New shop applications
                        </label>
                        <label className="flex items-center gap-2 text-sm">
                          <input type="checkbox" defaultChecked />
                          Refund requests
                        </label>
                        <label className="flex items-center gap-2 text-sm">
                          <input type="checkbox" defaultChecked />
                          System alerts
                        </label>
                        <label className="flex items-center gap-2 text-sm">
                          <input type="checkbox" defaultChecked />
                          Customer complaints
                        </label>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-1 block">Email Templates</label>
                      <select className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm">
                        <option>Default Template</option>
                        <option>Minimalist Template</option>
                        <option>Branded Template</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-1 block">Alert Thresholds</label>
                      <div>
                        <div className="mb-2">
                          <label className="text-xs text-muted-foreground">High volume alert (Orders/hour)</label>
                          <input 
                            type="number" 
                            className="w-full h-8 rounded-md border border-input bg-background px-3 text-sm"
                            defaultValue="100"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-muted-foreground">Suspicious activity alert (Refunds/day)</label>
                          <input 
                            type="number" 
                            className="w-full h-8 rounded-md border border-input bg-background px-3 text-sm"
                            defaultValue="10"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
                
                <h3 className="text-lg font-medium mt-6 mb-4">Platform Tax Settings</h3>
                <Card className="p-4">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Default Tax Rate</label>
                      <div className="flex">
                        <input 
                          type="number" 
                          className="flex-1 h-9 rounded-l-md border border-input bg-background px-3 text-sm"
                          defaultValue="7.5"
                        />
                        <div className="flex items-center h-9 rounded-r-md border border-l-0 border-input bg-muted px-3">
                          <span className="text-sm text-muted-foreground">%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" defaultChecked />
                        Enable automatic tax calculation
                      </label>
                    </div>
                    
                    <div>
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" defaultChecked />
                        Allow tax exemptions for eligible businesses
                      </label>
                    </div>
                    
                    <div>
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" defaultChecked />
                        Create monthly tax reports automatically
                      </label>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
            
            <div className="flex justify-end mt-6">
              <Button className="gap-2">
                <Save size={16} />
                Save Global Settings
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="maintenance" className="p-4 mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Maintenance Mode</h3>
                <Card className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Maintenance Mode</h4>
                        <p className="text-sm text-muted-foreground mt-1">Put the platform in maintenance mode</p>
                      </div>
                      <div className="flex items-center h-6">
                        <label className="inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-halvi-accent/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-halvi-accent"></div>
                        </label>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-1 block">Maintenance Message</label>
                      <textarea 
                        className="w-full h-24 rounded-md border border-input bg-background px-3 py-2 text-sm"
                        defaultValue="We're currently performing scheduled maintenance to improve your experience. We'll be back online shortly. Thank you for your patience."
                      ></textarea>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-1 block">Scheduled Maintenance</label>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-xs text-muted-foreground">Start Date & Time</label>
                          <input 
                            type="datetime-local" 
                            className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-muted-foreground">End Date & Time</label>
                          <input 
                            type="datetime-local" 
                            className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" defaultChecked />
                        Allow admin access during maintenance
                      </label>
                    </div>
                    
                    <div>
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" />
                        Show countdown timer to users
                      </label>
                    </div>
                  </div>
                </Card>
                
                <h3 className="text-lg font-medium mt-6 mb-4">System Announcements</h3>
                <Card className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Global Banner</h4>
                        <p className="text-sm text-muted-foreground mt-1">Display an announcement banner</p>
                      </div>
                      <div className="flex items-center h-6">
                        <label className="inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-halvi-accent/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-halvi-accent"></div>
                        </label>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-1 block">Announcement Text</label>
                      <input 
                        type="text" 
                        className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm"
                        defaultValue="🎉 Ramadan Promotion: Use code RAMADAN25 for 25% off your order!"
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-1 block">Banner Color</label>
                      <select className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm">
                        <option>Amber (Information)</option>
                        <option>Green (Success)</option>
                        <option>Red (Important)</option>
                        <option>Blue (Neutral)</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-1 block">Display Duration</label>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-xs text-muted-foreground">Start Date</label>
                          <input 
                            type="date" 
                            className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-muted-foreground">End Date</label>
                          <input 
                            type="date" 
                            className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">System Updates</h3>
                <Card className="p-4">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium">Current System Version</h4>
                      <p className="text-sm mt-1">Platform Version: 2.4.5</p>
                      <p className="text-sm">Last Updated: March 28, 2023</p>
                    </div>
                    
                    <div className="border-t pt-4">
                      <h4 className="font-medium">Available Updates</h4>
                      <div className="mt-2 p-3 bg-amber-50 dark:bg-amber-950/20 rounded-md">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium">Version 2.5.0 Available</p>
                            <p className="text-xs text-muted-foreground mt-1">New features, performance improvements, and bug fixes</p>
                          </div>
                          <Button size="sm">
                            <RefreshCw size={14} className="mr-2" />
                            Update Now
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t pt-4">
                      <h4 className="font-medium">Automatic Updates</h4>
                      <div className="flex items-center mt-2">
                        <label className="inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-halvi-accent/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-halvi-accent"></div>
                          <span className="ml-3 text-sm font-medium">Enable automatic updates</span>
                        </label>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-1 block">Preferred Update Time</label>
                      <select className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm">
                        <option>Off-peak hours (2:00 AM - 4:00 AM)</option>
                        <option>Weekend only (Saturday, 3:00 AM)</option>
                        <option>Manually scheduled</option>
                      </select>
                    </div>
                  </div>
                </Card>
                
                <h3 className="text-lg font-medium mt-6 mb-4">Database Maintenance</h3>
                <Card className="p-4">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium">Automated Backups</h4>
                      <div className="flex items-center mt-2">
                        <label className="inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-halvi-accent/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-halvi-accent"></div>
                          <span className="ml-3 text-sm font-medium">Enable daily backups</span>
                        </label>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-1 block">Backup Retention</label>
                      <select className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm">
                        <option>7 days</option>
                        <option>14 days</option>
                        <option>30 days</option>
                        <option>90 days</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Button variant="outline" size="sm">
                        <Clock size={14} className="mr-2" />
                        Schedule Maintenance
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download size={14} className="mr-2" />
                        Manual Backup
                      </Button>
                    </div>
                  </div>
                </Card>
                
                <h3 className="text-lg font-medium mt-6 mb-4">API Settings</h3>
                <Card className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">API Access</h4>
                        <p className="text-sm text-muted-foreground mt-1">Enable API access for integrations</p>
                      </div>
                      <div className="flex items-center h-6">
                        <label className="inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-halvi-accent/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-halvi-accent"></div>
                        </label>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-1 block">Rate Limiting</label>
                      <select className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm">
                        <option>Standard (100 requests/minute)</option>
                        <option>Relaxed (500 requests/minute)</option>
                        <option>Strict (50 requests/minute)</option>
                        <option>Custom</option>
                      </select>
                    </div>
                    
                    <div>
                      <Button variant="outline" size="sm">
                        <Key size={14} className="mr-2" />
                        Manage API Keys
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
            
            <div className="flex justify-end mt-6">
              <Button className="gap-2">
                <Save size={16} />
                Save Maintenance Settings
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="roles" className="p-0 mt-0">
            <div className="p-4 flex items-center justify-between">
              <h3 className="text-lg font-medium">User Role Management</h3>
              <Button>
                <PlusCircle size={16} className="mr-2" />
                Add Admin User
              </Button>
            </div>
            
            <SmartTable
              columns={[
                { key: 'id', title: 'Admin ID', sortable: true },
                { key: 'name', title: 'Name', sortable: true },
                { key: 'email', title: 'Email', sortable: true },
                { key: 'role', title: 'Role', sortable: true },
                { key: 'status', title: 'Status', sortable: true },
                { key: 'lastActive', title: 'Last Active', sortable: true },
              ]}
              data={admins}
              filters={['All', 'Super Admin', 'Admin', 'Finance Admin', 'Support Admin']}
              rowActions={['Edit Permissions', 'Reset Password', 'Disable Account', 'Remove']}
              onRowAction={handleRowAction}
            />
            
            <div className="p-4">
              <h3 className="text-lg font-medium mb-4">Role Definitions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="h-8 w-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                      <Shield size={16} className="text-red-500" />
                    </div>
                    <div>
                      <h4 className="font-medium">Super Admin</h4>
                      <p className="text-sm text-muted-foreground">Complete access to all platform functions</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p className="flex items-center gap-2">
                      <CheckCircle2 size={14} />
                      Platform Configuration
                    </p>
                    <p className="flex items-center gap-2">
                      <CheckCircle2 size={14} />
                      User Management
                    </p>
                    <p className="flex items-center gap-2">
                      <CheckCircle2 size={14} />
                      Financial Operations
                    </p>
                    <p className="flex items-center gap-2">
                      <CheckCircle2 size={14} />
                      System Maintenance
                    </p>
                    <p className="flex items-center gap-2">
                      <CheckCircle2 size={14} />
                      All other permissions
                    </p>
                  </div>
                </Card>
                
                <Card className="p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <Users size={16} className="text-blue-500" />
                    </div>
                    <div>
                      <h4 className="font-medium">Admin</h4>
                      <p className="text-sm text-muted-foreground">Limited platform management access</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p className="flex items-center gap-2">
                      <CheckCircle2 size={14} />
                      Shop Management
                    </p>
                    <p className="flex items-center gap-2">
                      <CheckCircle2 size={14} />
                      Product Management
                    </p>
                    <p className="flex items-center gap-2">
                      <CheckCircle2 size={14} />
                      Order Management
                    </p>
                    <p className="flex items-center gap-2">
                      <CheckCircle2 size={14} />
                      User Management (limited)
                    </p>
                    <p className="flex items-center gap-2">
                      <XCircle size={14} className="text-red-500" />
                      Financial Operations
                    </p>
                  </div>
                </Card>
                
                <Card className="p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <CreditCard size={16} className="text-green-500" />
                    </div>
                    <div>
                      <h4 className="font-medium">Finance Admin</h4>
                      <p className="text-sm text-muted-foreground">Financial operations access only</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p className="flex items-center gap-2">
                      <CheckCircle2 size={14} />
                      Revenue Dashboard
                    </p>
                    <p className="flex items-center gap-2">
                      <CheckCircle2 size={14} />
                      Commission Management
                    </p>
                    <p className="flex items-center gap-2">
                      <CheckCircle2 size={14} />
                      Payouts
                    </p>
                    <p className="flex items-center gap-2">
                      <CheckCircle2 size={14} />
                      Refund Processing
                    </p>
                    <p className="flex items-center gap-2">
                      <XCircle size={14} className="text-red-500" />
                      User/Shop Management
                    </p>
                  </div>
                </Card>
                
                <Card className="p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                      <MessageSquare size={16} className="text-purple-500" />
                    </div>
                    <div>
                      <h4 className="font-medium">Support Admin</h4>
                      <p className="text-sm text-muted-foreground">Customer support operations access</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p className="flex items-center gap-2">
                      <CheckCircle2 size={14} />
                      Support Dashboard
                    </p>
                    <p className="flex items-center gap-2">
                      <CheckCircle2 size={14} />
                      Ticket Management
                    </p>
                    <p className="flex items-center gap-2">
                      <CheckCircle2 size={14} />
                      Customer Communication
                    </p>
                    <p className="flex items-center gap-2">
                      <CheckCircle2 size={14} />
                      Order Lookup
                    </p>
                    <p className="flex items-center gap-2">
                      <XCircle size={14} className="text-red-500" />
                      Settings Access
                    </p>
                  </div>
                </Card>
              </div>
              
              <div className="mt-6 flex justify-end">
                <Button variant="outline" className="gap-2">
                  <PlusCircle size={16} />
                  Create Custom Role
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="audit" className="p-0 mt-0">
            <div className="p-4 flex items-center justify-between">
              <h3 className="text-lg font-medium">Admin Action Audit Logs</h3>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Filter size={14} className="mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Download size={14} className="mr-2" />
                  Export
                </Button>
              </div>
            </div>
            
            <SmartTable
              columns={[
                { key: 'id', title: 'Log ID', sortable: true },
                { key: 'user', title: 'User', sortable: true },
                { key: 'action', title: 'Action', sortable: true },
                { key: 'details', title: 'Details', sortable: true },
                { key: 'timestamp', title: 'Timestamp', sortable: true },
                { key: 'ip', title: 'IP Address', sortable: true },
              ]}
              data={auditLogs}
              filters={['All', 'System Config', 'User Management', 'Financial', 'Security']}
              rowActions={['View Details', 'Flag for Review']}
              onRowAction={handleRowAction}
              pagination={{
                page: 1,
                pageSize: 10,
                total: 357,
                onChange: (page) => console.log('Changed to page', page)
              }}
            />
            
            <div className="p-4">
              <Card className="p-4">
                <h3 className="font-medium mb-4">Audit Log Retention Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Log Retention Period</label>
                    <select className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm">
                      <option>30 days</option>
                      <option>60 days</option>
                      <option>90 days</option>
                      <option>180 days</option>
                      <option>1 year</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-1 block">Log Detail Level</label>
                    <select className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm">
                      <option>Standard (Actions only)</option>
                      <option>Detailed (Actions + Data Changes)</option>
                      <option>Verbose (All System Activity)</option>
                    </select>
                  </div>
                </div>
                
                <div className="mt-4">
                  <label className="text-sm font-medium mb-1 block">Actions to Log</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" defaultChecked />
                      Config Changes
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" defaultChecked />
                      User Management
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" defaultChecked />
                      Financial Operations
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" defaultChecked />
                      Login/Logout
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" defaultChecked />
                      Shop Management
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" />
                      Data Exports
                    </label>
                  </div>
                </div>
                
                <div className="flex justify-end mt-4">
                  <Button>Save Audit Settings</Button>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="compliance" className="p-4 mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Halal Compliance Settings</h3>
                <Card className="p-4">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Certification Requirements</label>
                      <select className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm">
                        <option>Strict (Verified certification required)</option>
                        <option>Standard (Self-declaration with spot checks)</option>
                        <option>Basic (Self-declaration only)</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-1 block">Accepted Certification Bodies</label>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm">
                          <input type="checkbox" defaultChecked />
                          JAKIM (Malaysia)
                        </label>
                        <label className="flex items-center gap-2 text-sm">
                          <input type="checkbox" defaultChecked />
                          MUIS (Singapore)
                        </label>
                        <label className="flex items-center gap-2 text-sm">
                          <input type="checkbox" defaultChecked />
                          IFANCA (USA)
                        </label>
                        <label className="flex items-center gap-2 text-sm">
                          <input type="checkbox" defaultChecked />
                          HMC (UK)
                        </label>
                        <label className="flex items-center gap-2 text-sm">
                          <input type="checkbox" defaultChecked />
                          Other recognized bodies
                        </label>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-1 block">Certification Verification Process</label>
                      <select className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm">
                        <option>Manual review by compliance team</option>
                        <option>AI-assisted verification with human oversight</option>
                        <option>Third-party verification service</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-1 block">Compliance Monitoring Frequency</label>
                      <select className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm">
                        <option>Quarterly audits</option>
                        <option>Bi-annual audits</option>
                        <option>Annual audits</option>
                        <option>Random spot checks only</option>
                      </select>
                    </div>
                  </div>
                </Card>
                
                <h3 className="text-lg font-medium mt-6 mb-4">Data Protection Compliance</h3>
                <Card className="p-4">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Privacy Policy Version</label>
                      <div className="flex items-center gap-2">
                        <input 
                          type="text" 
                          className="flex-1 h-9 rounded-md border border-input bg-background px-3 text-sm"
                          defaultValue="3.2.1"
                          readOnly
                        />
                        <Button variant="outline" size="sm">
                          Update
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-1 block">Data Retention Policy</label>
                      <select className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm">
                        <option>Standard (2 years inactive data)</option>
                        <option>Extended (5 years all data)</option>
                        <option>Minimal (1 year inactive data)</option>
                        <option>Custom policy</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-1 block">Cookie Consent Requirements</label>
                      <select className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm">
                        <option>Strict (Explicit consent for all cookies)</option>
                        <option>Standard (Functional cookies allowed by default)</option>
                        <option>Basic (Notice only)</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" defaultChecked />
                        Enable user data export requests
                      </label>
                    </div>
                    
                    <div>
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" defaultChecked />
                        Enable right to be forgotten requests
                      </label>
                    </div>
                  </div>
                </Card>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Security Compliance</h3>
                <Card className="p-4">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Password Requirements</label>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm">
                          <input type="checkbox" defaultChecked />
                          Minimum 8 characters
                        </label>
                        <label className="flex items-center gap-2 text-sm">
                          <input type="checkbox" defaultChecked />
                          Require uppercase letters
                        </label>
                        <label className="flex items-center gap-2 text-sm">
                          <input type="checkbox" defaultChecked />
                          Require numbers
                        </label>
                        <label className="flex items-center gap-2 text-sm">
                          <input type="checkbox" defaultChecked />
                          Require special characters
                        </label>
                        <label className="flex items-center gap-2 text-sm">
                          <input type="checkbox" defaultChecked />
                          Password expiry (90 days)
                        </label>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-1 block">Two-Factor Authentication</label>
                      <select className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm">
                        <option>Required for all admins</option>
                        <option>Required for super admins only</option>
                        <option>Optional for all users</option>
                        <option>Disabled</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-1 block">Session Timeout</label>
                      <select className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm">
                        <option>15 minutes</option>
                        <option>30 minutes</option>
                        <option>1 hour</option>
                        <option>4 hours</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" defaultChecked />
                        Enable IP-based login restrictions
                      </label>
                    </div>
                    
                    <div>
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" defaultChecked />
                        Block after 5 failed login attempts
                      </label>
                    </div>
                  </div>
                </Card>
                
                <h3 className="text-lg font-medium mt-6 mb-4">Regulatory Compliance Monitoring</h3>
                <Card className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">GDPR Compliance</h4>
                        <p className="text-sm text-muted-foreground mt-1">European data protection regulation</p>
                      </div>
                      <div className="bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs px-2 py-1 rounded-full">
                        Compliant
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">CCPA Compliance</h4>
                        <p className="text-sm text-muted-foreground mt-1">California Consumer Privacy Act</p>
                      </div>
                      <div className="bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs px-2 py-1 rounded-full">
                        Compliant
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">PCI DSS Compliance</h4>
                        <p className="text-sm text-muted-foreground mt-1">Payment card industry data security</p>
                      </div>
                      <div className="bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 text-xs px-2 py-1 rounded-full">
                        Renewal Required
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">AML Compliance</h4>
                        <p className="text-sm text-muted-foreground mt-1">Anti-money laundering checks</p>
                      </div>
                      <div className="bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs px-2 py-1 rounded-full">
                        Compliant
                      </div>
                    </div>
                    
                    <Button variant="outline" size="sm" className="w-full">
                      <Search size={14} className="mr-2" />
                      Run Compliance Check
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
            
            <div className="flex justify-end mt-6">
              <Button className="gap-2">
                <Save size={16} />
                Save Compliance Settings
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </DashboardLayout>
  );
};

export default SettingsPage;
