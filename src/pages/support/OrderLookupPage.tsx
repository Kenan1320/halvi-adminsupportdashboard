
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import PageHeader from '@/components/admin/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  Search, 
  Package,
  PackageCheck,
  AlertTriangle,
  Store,
  User,
  MapPin,
  Clock,
  CreditCard,
  FileText,
  Download,
  Printer,
  MessageSquare,
  RefreshCw,
  Truck,
  ShoppingCart
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

const orderStatuses = {
  processing: { label: "Processing", color: "blue" },
  shipped: { label: "Shipped", color: "yellow" },
  delivered: { label: "Delivered", color: "green" },
  cancelled: { label: "Cancelled", color: "destructive" },
  returned: { label: "Returned", color: "destructive" },
  pending: { label: "Pending", color: "blue" },
};

// Mock data
const orders = [
  {
    id: "ORD-48293",
    date: "2023-06-15",
    customer: { name: "Ahmed Al-Farsi", id: "CUST-7892", avatar: "/placeholder.svg" },
    shop: { name: "Baraka Halal Meats", id: "SHOP-342", avatar: "/placeholder.svg" },
    amount: "£85.40",
    status: "delivered",
    items: [
      { name: "Premium Halal Lamb", quantity: 2, price: "£32.50" },
      { name: "Halal Chicken Breast", quantity: 1, price: "£12.40" },
      { name: "Halal Beef Mince", quantity: 1, price: "£8.00" }
    ],
    delivery: {
      address: "45 Crescent Road, Birmingham, B15 2JT",
      status: "Delivered",
      date: "2023-06-16"
    },
    payment: {
      method: "Credit Card",
      card: "**** **** **** 4382",
      status: "Paid"
    }
  },
  {
    id: "ORD-48294",
    date: "2023-06-16",
    customer: { name: "Fatima Khan", id: "CUST-7893", avatar: "/placeholder.svg" },
    shop: { name: "Al-Madina Bakery", id: "SHOP-355", avatar: "/placeholder.svg" },
    amount: "£32.75",
    status: "processing",
    items: [
      { name: "Baklava Assortment", quantity: 1, price: "£18.50" },
      { name: "Arabic Bread", quantity: 2, price: "£4.75" },
      { name: "Kunafa", quantity: 1, price: "£9.50" }
    ],
    delivery: {
      address: "12 Park Lane, London, SW1A 1AA",
      status: "Processing",
      date: "2023-06-18"
    },
    payment: {
      method: "PayPal",
      card: "fatima.khan@example.com",
      status: "Paid"
    }
  },
  {
    id: "ORD-48295",
    date: "2023-06-16",
    customer: { name: "Mohammed Ali", id: "CUST-7894", avatar: "/placeholder.svg" },
    shop: { name: "Medina Grocers", id: "SHOP-367", avatar: "/placeholder.svg" },
    amount: "£45.20",
    status: "shipped",
    items: [
      { name: "Dates (Premium)", quantity: 1, price: "£12.99" },
      { name: "Olive Oil", quantity: 1, price: "£15.50" },
      { name: "Rice (5kg)", quantity: 1, price: "£16.75" }
    ],
    delivery: {
      address: "8 Queens Road, Manchester, M8 7DJ",
      status: "Out for Delivery",
      date: "2023-06-18"
    },
    payment: {
      method: "Debit Card",
      card: "**** **** **** 1234",
      status: "Paid"
    }
  },
  {
    id: "ORD-48296",
    date: "2023-06-17",
    customer: { name: "Aisha Mohammad", id: "CUST-7895", avatar: "/placeholder.svg" },
    shop: { name: "Halal Sweet Delights", id: "SHOP-389", avatar: "/placeholder.svg" },
    amount: "£28.50",
    status: "cancelled",
    items: [
      { name: "Assorted Sweets", quantity: 1, price: "£22.50" },
      { name: "Rose Water", quantity: 1, price: "£6.00" }
    ],
    delivery: {
      address: "23 Brick Lane, London, E1 6QR",
      status: "Cancelled",
      date: "2023-06-19"
    },
    payment: {
      method: "Credit Card",
      card: "**** **** **** 7890",
      status: "Refunded"
    }
  },
  {
    id: "ORD-48297",
    date: "2023-06-17",
    customer: { name: "Ibrahim Qadir", id: "CUST-7896", avatar: "/placeholder.svg" },
    shop: { name: "Al-Noor Market", id: "SHOP-412", avatar: "/placeholder.svg" },
    amount: "£67.80",
    status: "pending",
    items: [
      { name: "Halal Lamb Chops", quantity: 1, price: "£28.50" },
      { name: "Spice Mix", quantity: 2, price: "£8.75" },
      { name: "Frozen Samosas", quantity: 2, price: "£10.90" }
    ],
    delivery: {
      address: "17 Green Street, Birmingham, B18 4DP",
      status: "Pending",
      date: "2023-06-20"
    },
    payment: {
      method: "Cash on Delivery",
      card: "N/A",
      status: "Pending"
    }
  }
];

const OrderLookupPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(orders[0]);
  const [showDetails, setShowDetails] = useState(false);
  
  const filteredOrders = orders.filter(order => 
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.shop.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status) => {
    const statusInfo = orderStatuses[status] || { label: status, color: "default" };
    
    return (
      <Badge 
        variant={statusInfo.color === "blue" || statusInfo.color === "yellow" || statusInfo.color === "green" ? "outline" : statusInfo.color} 
        className={statusInfo.color !== "destructive" && statusInfo.color !== "default" ? `text-${statusInfo.color}-500 border-${statusInfo.color}-500` : ""}
      >
        {statusInfo.label}
      </Badge>
    );
  };
  
  return (
    <DashboardLayout title="Order Lookup">
      <PageHeader 
        title="Order Lookup" 
        description="Search and manage customer orders"
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <Package size={14} />
              Recent Orders
            </Button>
            <Button size="sm" className="h-8 gap-1">
              <Download size={14} />
              Export Orders
            </Button>
          </div>
        }
      />

      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Search Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-3 md:col-span-2">
              <div className="relative">
                <Search className="absolute top-1/2 transform -translate-y-1/2 left-3 h-4 w-4 text-muted-foreground pointer-events-none" />
                <Input 
                  placeholder="Search by order ID, customer, or shop name..." 
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="w-full gap-1">
                <RefreshCw size={16} />
                Reset
              </Button>
              <Button className="w-full gap-1">
                <Search size={16} />
                Search
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Order Results</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredOrders.length === 0 ? (
            <div className="text-center py-10">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <h3 className="text-lg font-medium">No orders found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your search criteria</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">Order ID</th>
                    <th className="text-left py-3 px-4 font-medium">Date</th>
                    <th className="text-left py-3 px-4 font-medium">Customer</th>
                    <th className="text-left py-3 px-4 font-medium">Shop</th>
                    <th className="text-left py-3 px-4 font-medium">Amount</th>
                    <th className="text-left py-3 px-4 font-medium">Status</th>
                    <th className="text-right py-3 px-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="border-b hover:bg-muted/50 transition-colors">
                      <td className="py-3 px-4">{order.id}</td>
                      <td className="py-3 px-4">{new Date(order.date).toLocaleDateString()}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={order.customer.avatar} alt={order.customer.name} />
                            <AvatarFallback className="bg-blue-100 text-blue-500 text-xs">
                              {order.customer.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span>{order.customer.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={order.shop.avatar} alt={order.shop.name} />
                            <AvatarFallback className="bg-amber-100 text-amber-500 text-xs">
                              {order.shop.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span>{order.shop.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-medium">{order.amount}</td>
                      <td className="py-3 px-4">{getStatusBadge(order.status)}</td>
                      <td className="py-3 px-4 text-right">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setSelectedOrder(order)}
                            >
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle className="flex items-center justify-between">
                                <span>Order Details - {selectedOrder.id}</span>
                                {getStatusBadge(selectedOrder.status)}
                              </DialogTitle>
                              <DialogDescription>
                                Placed on {new Date(selectedOrder.date).toLocaleDateString()}
                              </DialogDescription>
                            </DialogHeader>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                              <div className="space-y-6">
                                <div>
                                  <h3 className="font-medium mb-2">Customer Information</h3>
                                  <Card className="bg-muted/50">
                                    <CardContent className="p-4">
                                      <div className="flex items-center gap-3">
                                        <Avatar className="h-10 w-10">
                                          <AvatarImage src={selectedOrder.customer.avatar} alt={selectedOrder.customer.name} />
                                          <AvatarFallback className="bg-blue-100 text-blue-500">
                                            {selectedOrder.customer.name.split(' ').map(n => n[0]).join('')}
                                          </AvatarFallback>
                                        </Avatar>
                                        <div>
                                          <p className="font-medium">{selectedOrder.customer.name}</p>
                                          <p className="text-sm text-muted-foreground">ID: {selectedOrder.customer.id}</p>
                                        </div>
                                      </div>
                                      <div className="mt-4">
                                        <Button variant="outline" size="sm" className="w-full gap-1">
                                          <User size={14} />
                                          View Customer Profile
                                        </Button>
                                      </div>
                                    </CardContent>
                                  </Card>
                                </div>
                                
                                <div>
                                  <h3 className="font-medium mb-2">Shop Information</h3>
                                  <Card className="bg-muted/50">
                                    <CardContent className="p-4">
                                      <div className="flex items-center gap-3">
                                        <Avatar className="h-10 w-10">
                                          <AvatarImage src={selectedOrder.shop.avatar} alt={selectedOrder.shop.name} />
                                          <AvatarFallback className="bg-amber-100 text-amber-500">
                                            {selectedOrder.shop.name.split(' ').map(n => n[0]).join('')}
                                          </AvatarFallback>
                                        </Avatar>
                                        <div>
                                          <p className="font-medium">{selectedOrder.shop.name}</p>
                                          <p className="text-sm text-muted-foreground">ID: {selectedOrder.shop.id}</p>
                                        </div>
                                      </div>
                                      <div className="mt-4">
                                        <Button variant="outline" size="sm" className="w-full gap-1">
                                          <Store size={14} />
                                          View Shop Profile
                                        </Button>
                                      </div>
                                    </CardContent>
                                  </Card>
                                </div>
                                
                                <div>
                                  <h3 className="font-medium mb-2">Actions</h3>
                                  <div className="space-y-2">
                                    <Button className="w-full gap-1">
                                      <MessageSquare size={14} />
                                      Contact Customer
                                    </Button>
                                    <Button variant="outline" className="w-full gap-1">
                                      <Printer size={14} />
                                      Print Order
                                    </Button>
                                    <Button variant="outline" className="w-full gap-1">
                                      <FileText size={14} />
                                      Generate Invoice
                                    </Button>
                                    {selectedOrder.status === "delivered" && (
                                      <Button variant="outline" className="w-full gap-1">
                                        <RefreshCw size={14} />
                                        Process Return
                                      </Button>
                                    )}
                                    {selectedOrder.status === "cancelled" && (
                                      <Button variant="outline" className="w-full gap-1">
                                        <RefreshCw size={14} />
                                        Reorder
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              </div>
                              
                              <div className="md:col-span-2 space-y-6">
                                <div>
                                  <h3 className="font-medium mb-2">Order Items</h3>
                                  <Card>
                                    <CardContent className="p-4">
                                      {selectedOrder.items.map((item, index) => (
                                        <div key={index} className="flex items-center justify-between py-3 border-b last:border-0">
                                          <div className="flex items-center gap-3">
                                            <div className="bg-primary/10 p-2 rounded-full">
                                              <ShoppingCart size={18} className="text-primary" />
                                            </div>
                                            <div>
                                              <p className="font-medium">{item.name}</p>
                                              <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                                            </div>
                                          </div>
                                          <p className="font-medium">{item.price}</p>
                                        </div>
                                      ))}
                                      <div className="flex items-center justify-between pt-3 mt-3 border-t">
                                        <p className="font-semibold">Total</p>
                                        <p className="font-bold text-lg">{selectedOrder.amount}</p>
                                      </div>
                                    </CardContent>
                                  </Card>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <h3 className="font-medium mb-2">Delivery Information</h3>
                                    <Card className="bg-muted/50">
                                      <CardContent className="p-4">
                                        <div className="space-y-3">
                                          <div className="flex items-start gap-3">
                                            <MapPin size={18} className="text-muted-foreground shrink-0 mt-0.5" />
                                            <div>
                                              <p className="font-medium">Delivery Address</p>
                                              <p className="text-sm">{selectedOrder.delivery.address}</p>
                                            </div>
                                          </div>
                                          <div className="flex items-start gap-3">
                                            <Clock size={18} className="text-muted-foreground shrink-0 mt-0.5" />
                                            <div>
                                              <p className="font-medium">Delivery Date</p>
                                              <p className="text-sm">{selectedOrder.delivery.date}</p>
                                            </div>
                                          </div>
                                          <div className="flex items-start gap-3">
                                            <Truck size={18} className="text-muted-foreground shrink-0 mt-0.5" />
                                            <div>
                                              <p className="font-medium">Delivery Status</p>
                                              <p className="text-sm">{selectedOrder.delivery.status}</p>
                                            </div>
                                          </div>
                                        </div>
                                      </CardContent>
                                    </Card>
                                  </div>
                                  
                                  <div>
                                    <h3 className="font-medium mb-2">Payment Information</h3>
                                    <Card className="bg-muted/50">
                                      <CardContent className="p-4">
                                        <div className="space-y-3">
                                          <div className="flex items-start gap-3">
                                            <CreditCard size={18} className="text-muted-foreground shrink-0 mt-0.5" />
                                            <div>
                                              <p className="font-medium">Payment Method</p>
                                              <p className="text-sm">{selectedOrder.payment.method}</p>
                                            </div>
                                          </div>
                                          {selectedOrder.payment.card && (
                                            <div className="flex items-start gap-3">
                                              <CreditCard size={18} className="text-muted-foreground shrink-0 mt-0.5" />
                                              <div>
                                                <p className="font-medium">Payment Details</p>
                                                <p className="text-sm">{selectedOrder.payment.card}</p>
                                              </div>
                                            </div>
                                          )}
                                          <div className="flex items-start gap-3">
                                            <AlertTriangle size={18} className="text-muted-foreground shrink-0 mt-0.5" />
                                            <div>
                                              <p className="font-medium">Payment Status</p>
                                              <p className="text-sm">{selectedOrder.payment.status}</p>
                                            </div>
                                          </div>
                                        </div>
                                      </CardContent>
                                    </Card>
                                  </div>
                                </div>
                                
                                <div>
                                  <h3 className="font-medium mb-2">Order Timeline</h3>
                                  <Card>
                                    <CardContent className="p-4">
                                      <div className="space-y-4">
                                        <div className="flex items-center gap-4">
                                          <div className="bg-primary/10 p-2 rounded-full">
                                            <ShoppingCart size={18} className="text-primary" />
                                          </div>
                                          <div className="flex-1">
                                            <p className="font-medium">Order Placed</p>
                                            <p className="text-sm text-muted-foreground">{selectedOrder.date}</p>
                                          </div>
                                        </div>
                                        
                                        <Separator />
                                        
                                        <div className="flex items-center gap-4">
                                          <div className="bg-blue-500/10 p-2 rounded-full">
                                            <PackageCheck size={18} className="text-blue-500" />
                                          </div>
                                          <div className="flex-1">
                                            <p className="font-medium">Order Processed</p>
                                            <p className="text-sm text-muted-foreground">{selectedOrder.date}</p>
                                          </div>
                                        </div>
                                        
                                        {selectedOrder.status !== "cancelled" && selectedOrder.status !== "pending" && (
                                          <>
                                            <Separator />
                                            
                                            <div className="flex items-center gap-4">
                                              <div className="bg-yellow-500/10 p-2 rounded-full">
                                                <Truck size={18} className="text-yellow-500" />
                                              </div>
                                              <div className="flex-1">
                                                <p className="font-medium">Order Shipped</p>
                                                <p className="text-sm text-muted-foreground">{selectedOrder.delivery.date}</p>
                                              </div>
                                            </div>
                                          </>
                                        )}
                                        
                                        {selectedOrder.status === "delivered" && (
                                          <>
                                            <Separator />
                                            
                                            <div className="flex items-center gap-4">
                                              <div className="bg-green-500/10 p-2 rounded-full">
                                                <Package size={18} className="text-green-500" />
                                              </div>
                                              <div className="flex-1">
                                                <p className="font-medium">Order Delivered</p>
                                                <p className="text-sm text-muted-foreground">{selectedOrder.delivery.date}</p>
                                              </div>
                                            </div>
                                          </>
                                        )}
                                        
                                        {selectedOrder.status === "cancelled" && (
                                          <>
                                            <Separator />
                                            
                                            <div className="flex items-center gap-4">
                                              <div className="bg-red-500/10 p-2 rounded-full">
                                                <AlertTriangle size={18} className="text-red-500" />
                                              </div>
                                              <div className="flex-1">
                                                <p className="font-medium">Order Cancelled</p>
                                                <p className="text-sm text-muted-foreground">{selectedOrder.delivery.date}</p>
                                              </div>
                                            </div>
                                          </>
                                        )}
                                      </div>
                                    </CardContent>
                                  </Card>
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default OrderLookupPage;
