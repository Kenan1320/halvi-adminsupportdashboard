
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Search, Users, Store, User, X, Check } from 'lucide-react';

interface UserSelectorProps {
  onSelect: (user: UserItem) => void;
  onCancel: () => void;
}

export type UserType = 'customer' | 'shop' | 'agent';

export interface UserItem {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
  type: UserType;
  metadata?: {
    lastContact?: string;
    orderCount?: number;
    status?: 'active' | 'inactive';
    role?: string;
  };
}

// Mock data
const mockUsers: UserItem[] = [
  { id: 'cust-1', name: 'Ahmed Al-Farsi', email: 'ahmed.alfarsi@example.com', type: 'customer', avatar: '/placeholder.svg', metadata: { lastContact: '2 days ago', orderCount: 24 } },
  { id: 'cust-2', name: 'Fatima Khan', email: 'fatima.khan@example.com', type: 'customer', avatar: '/placeholder.svg', metadata: { lastContact: '5 days ago', orderCount: 12 } },
  { id: 'cust-3', name: 'Mohammed Ali', email: 'mohammed.ali@example.com', type: 'customer', avatar: '/placeholder.svg', metadata: { lastContact: '1 day ago', orderCount: 8 } },
  { id: 'cust-4', name: 'Aisha Mohammad', email: 'aisha@example.com', type: 'customer', avatar: '/placeholder.svg', metadata: { lastContact: '3 days ago', orderCount: 16 } },
  { id: 'cust-5', name: 'Ibrahim Qadir', email: 'ibrahim@example.com', type: 'customer', avatar: '/placeholder.svg', metadata: { lastContact: 'Today', orderCount: 5 } },
  
  { id: 'shop-1', name: 'Baraka Halal Meats', email: 'contact@barakahalal.com', type: 'shop', avatar: '/placeholder.svg', metadata: { lastContact: '1 day ago', orderCount: 1245 } },
  { id: 'shop-2', name: 'Al-Madina Bakery', email: 'info@almadinabakery.com', type: 'shop', avatar: '/placeholder.svg', metadata: { lastContact: 'Today', orderCount: 876 } },
  { id: 'shop-3', name: 'Medina Grocers', email: 'support@medinagrocers.com', type: 'shop', avatar: '/placeholder.svg', metadata: { lastContact: '3 days ago', orderCount: 987 } },
  { id: 'shop-4', name: 'Halal Sweet Delights', email: 'sales@halalsweetsdelights.com', type: 'shop', avatar: '/placeholder.svg', metadata: { lastContact: '4 days ago', orderCount: 432 } },
  { id: 'shop-5', name: 'Al-Noor Market', email: 'contact@alnoormarket.com', type: 'shop', avatar: '/placeholder.svg', metadata: { lastContact: '1 week ago', orderCount: 765 } },
  
  { id: 'agent-1', name: 'Fatima K.', email: 'fatima.k@support.com', type: 'agent', avatar: '/placeholder.svg', metadata: { status: 'active', role: 'Senior Support Agent' } },
  { id: 'agent-2', name: 'Omar J.', email: 'omar.j@support.com', type: 'agent', avatar: '/placeholder.svg', metadata: { status: 'active', role: 'Support Agent' } },
  { id: 'agent-3', name: 'Zainab M.', email: 'zainab.m@support.com', type: 'agent', avatar: '/placeholder.svg', metadata: { status: 'inactive', role: 'Escalation Specialist' } },
  { id: 'agent-4', name: 'Hassan T.', email: 'hassan.t@support.com', type: 'agent', avatar: '/placeholder.svg', metadata: { status: 'active', role: 'Support Team Lead' } },
  { id: 'agent-5', name: 'Amina L.', email: 'amina.l@support.com', type: 'agent', avatar: '/placeholder.svg', metadata: { status: 'active', role: 'Financial Support Specialist' } },
];

const UserSelector: React.FC<UserSelectorProps> = ({ onSelect, onCancel }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [userType, setUserType] = useState<'all' | UserType>('all');
  const [selectedUser, setSelectedUser] = useState<UserItem | null>(null);
  
  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase()));
      
    const matchesType = userType === 'all' || user.type === userType;
    
    return matchesSearch && matchesType;
  });
  
  const handleConfirmSelection = () => {
    if (selectedUser) {
      onSelect(selectedUser);
    }
  };
  
  const getAvatarFallbackColor = (type: UserType) => {
    switch (type) {
      case 'customer':
        return 'bg-blue-100 text-blue-500';
      case 'shop':
        return 'bg-amber-100 text-amber-500';
      case 'agent':
        return 'bg-primary/10 text-primary';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };
  
  const getUserIcon = (type: UserType) => {
    switch (type) {
      case 'customer':
        return <User className="h-4 w-4" />;
      case 'shop':
        return <Store className="h-4 w-4" />;
      case 'agent':
        return <Users className="h-4 w-4" />;
      default:
        return null;
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Select Recipient</h2>
        <Button variant="ghost" size="icon" onClick={onCancel}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search users by name or email..."
          className="pl-9"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <Tabs defaultValue="all" onValueChange={(value) => setUserType(value as 'all' | UserType)}>
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="all" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">All</span>
          </TabsTrigger>
          <TabsTrigger value="customer" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Customers</span>
          </TabsTrigger>
          <TabsTrigger value="shop" className="flex items-center gap-2">
            <Store className="h-4 w-4" />
            <span className="hidden sm:inline">Shops</span>
          </TabsTrigger>
          <TabsTrigger value="agent" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Agents</span>
          </TabsTrigger>
        </TabsList>
        
        <div className="max-h-[400px] overflow-y-auto border rounded-md">
          {filteredUsers.length === 0 ? (
            <div className="text-center py-12">
              <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No users found</h3>
              <p className="text-muted-foreground">Try a different search term</p>
            </div>
          ) : (
            <div className="space-y-1 p-1">
              {filteredUsers.map((user) => (
                <div 
                  key={user.id}
                  className={`flex items-center justify-between p-3 rounded-md cursor-pointer hover:bg-muted/50 transition-colors ${selectedUser?.id === user.id ? 'bg-muted' : ''}`}
                  onClick={() => setSelectedUser(user)}
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className={getAvatarFallbackColor(user.type)}>
                        {user.name.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{user.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {user.type === 'customer' ? 'Customer' : user.type === 'shop' ? 'Shop' : 'Agent'}
                        </Badge>
                      </div>
                      {user.email && <p className="text-sm text-muted-foreground">{user.email}</p>}
                      <div className="flex items-center gap-4 mt-1">
                        {user.type === 'customer' && user.metadata?.lastContact && (
                          <p className="text-xs text-muted-foreground">Last contact: {user.metadata.lastContact}</p>
                        )}
                        {user.type === 'customer' && user.metadata?.orderCount !== undefined && (
                          <p className="text-xs text-muted-foreground">Orders: {user.metadata.orderCount}</p>
                        )}
                        {user.type === 'shop' && user.metadata?.orderCount !== undefined && (
                          <p className="text-xs text-muted-foreground">Total orders: {user.metadata.orderCount}</p>
                        )}
                        {user.type === 'agent' && user.metadata?.role && (
                          <p className="text-xs text-muted-foreground">{user.metadata.role}</p>
                        )}
                        {user.type === 'agent' && user.metadata?.status && (
                          <Badge variant={user.metadata.status === 'active' ? 'outline' : 'secondary'} className="text-xs">
                            {user.metadata.status}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {selectedUser?.id === user.id && (
                    <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                      <Check className="h-4 w-4 text-primary-foreground" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </Tabs>
      
      <div className="flex items-center justify-end gap-2 pt-2">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button disabled={!selectedUser} onClick={handleConfirmSelection}>
          Select
        </Button>
      </div>
    </div>
  );
};

export default UserSelector;
