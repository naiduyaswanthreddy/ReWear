import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  Users, 
  RefreshCw, 
  Package
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../hooks/use-toast';

// Mock data for admin panel
const mockUsers = [
  {
    id: '1',
    username: 'EcoFashionista',
    email: 'eco@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=64',
    status: 'active',
    joinDate: '2024-01-15',
    totalItems: 12,
    totalSwaps: 8
  },
  {
    id: '2',
    username: 'GreenGal',
    email: 'green@example.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64',
    status: 'active',
    joinDate: '2024-01-10',
    totalItems: 8,
    totalSwaps: 5
  },
  {
    id: '3',
    username: 'VintageCollector',
    email: 'vintage@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64',
    status: 'suspended',
    joinDate: '2024-01-08',
    totalItems: 25,
    totalSwaps: 15
  },
  {
    id: '4',
    username: 'NewUser123',
    email: 'newuser@example.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64',
    status: 'active',
    joinDate: '2024-01-22',
    totalItems: 3,
    totalSwaps: 1
  }
];

const mockOrders = [
  {
    id: '1',
    userFrom: 'EcoFashionista',
    userTo: 'GreenGal',
    item: 'Vintage Denim Jacket',
    status: 'pending',
    date: '2024-01-22',
    avatar: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=64'
  },
  {
    id: '2',
    userFrom: 'VintageCollector',
    userTo: 'NewUser123',
    item: 'Band T-Shirt',
    status: 'completed',
    date: '2024-01-21',
    avatar: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=64'
  },
  {
    id: '3',
    userFrom: 'GreenGal',
    userTo: 'EcoFashionista',
    item: 'Summer Dress',
    status: 'shipping',
    date: '2024-01-20',
    avatar: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=64'
  },
  {
    id: '4',
    userFrom: 'NewUser123',
    userTo: 'VintageCollector',
    item: 'Designer Sneakers',
    status: 'cancelled',
    date: '2024-01-19',
    avatar: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=64'
  }
];

const mockListings = [
  {
    id: '1',
    title: 'Vintage Denim Jacket',
    user: 'EcoFashionista',
    category: 'Outerwear',
    status: 'active',
    date: '2024-01-20',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=64'
  },
  {
    id: '2',
    title: 'Summer Floral Dress',
    user: 'GreenGal',
    category: 'Dresses',
    status: 'pending',
    date: '2024-01-19',
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=64'
  },
  {
    id: '3',
    title: 'Designer Sneakers',
    user: 'NewUser123',
    category: 'Shoes',
    status: 'active',
    date: '2024-01-22',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=64'
  },
  {
    id: '4',
    title: 'Vintage Band T-Shirt',
    user: 'VintageCollector',
    category: 'Tops',
    status: 'suspended',
    date: '2024-01-18',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=64'
  }
];

const AdminPanel = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check if user is admin - return early if not
  if (!user || !user.isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Access Denied</h1>
          <p className="text-muted-foreground mb-4">You don't have permission to access this page.</p>
          <Button onClick={() => navigate('/')}>Go Home</Button>
        </div>
      </div>
    );
  }

  const handleAction = async (action: string, itemId: string, type: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast({
        title: `${type} ${action}`,
        description: `${type} has been ${action} successfully.`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: `Failed to ${action} ${type.toLowerCase()}.`,
        variant: 'destructive',
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      active: 'default',
      suspended: 'destructive',
      pending: 'secondary',
      completed: 'default',
      shipping: 'secondary',
      cancelled: 'destructive'
    };
    
    return <Badge variant={variants[status] || 'default'}>{status}</Badge>;
  };

  const getActionButtons = (item: any, type: string) => {
    if (type === 'user') {
      return {
        primary: item.status === 'suspended' ? 'Activate' : 'Suspend',
        secondary: 'Delete'
      };
    } else if (type === 'order') {
      if (item.status === 'pending') {
        return { primary: 'Approve', secondary: 'Reject' };
      } else if (item.status === 'shipping') {
        return { primary: 'Complete', secondary: 'Cancel' };
      } else {
        return { primary: 'View', secondary: 'Edit' };
      }
    } else if (type === 'listing') {
      return {
        primary: item.status === 'suspended' ? 'Approve' : 'Suspend',
        secondary: 'Remove'
      };
    }
    return { primary: 'Action', secondary: 'Action' };
  };

  const renderItemRow = (item: any, type: string) => {
    const actions = getActionButtons(item, type);
    
    return (
      <div key={item.id} className="flex items-center gap-4 p-4 border border-border rounded-lg bg-card">
        {/* Avatar/Image */}
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-border flex-shrink-0">
          <img 
            src={item.avatar || item.image} 
            alt={item.username || item.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Details */}
        <div className="flex-1 bg-muted/50 border border-border rounded-lg p-4 min-h-[80px] flex flex-col justify-center">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-medium text-foreground">
                {type === 'user' ? item.username : 
                 type === 'order' ? item.item : 
                 item.title}
              </span>
              {getStatusBadge(item.status)}
            </div>
            <div className="text-sm text-muted-foreground">
              {type === 'user' ? item.email :
               type === 'order' ? `${item.userFrom} → ${item.userTo}` :
               `By: ${item.user}`}
            </div>
            <div className="text-sm text-muted-foreground">
              {type === 'user' ? `Joined: ${item.joinDate} • Items: ${item.totalItems} • Swaps: ${item.totalSwaps}` :
               type === 'order' ? `Order Date: ${item.date}` :
               `Category: ${item.category} • Listed: ${item.date}`}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 flex-shrink-0">
          <Button 
            variant="outline" 
            size="sm"
            className="w-24"
            onClick={() => handleAction(actions.primary.toLowerCase(), item.id, type)}
          >
            {actions.primary}
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="w-24"
            onClick={() => handleAction(actions.secondary.toLowerCase(), item.id, type)}
          >
            {actions.secondary}
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-primary" />
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
                Admin Panel
              </h1>
            </div>
            <div className="w-12 h-8 bg-muted rounded-full flex items-center justify-end pr-1">
              <div className="w-6 h-6 bg-primary rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <Tabs defaultValue="users" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full max-w-2xl grid-cols-3 bg-muted">
              <TabsTrigger 
                value="users" 
                className="data-[state=active]:bg-background data-[state=active]:text-foreground"
              >
                Manage User
              </TabsTrigger>
              <TabsTrigger 
                value="orders" 
                className="data-[state=active]:bg-background data-[state=active]:text-foreground"
              >
                Manage Orders
              </TabsTrigger>
              <TabsTrigger 
                value="listings" 
                className="data-[state=active]:bg-background data-[state=active]:text-foreground"
              >
                Manage Listings
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Manage Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <div className="border-t border-border pt-6">
              <h2 className="text-xl font-semibold text-foreground mb-6 text-center">Manage Users</h2>
              <div className="space-y-4">
                {mockUsers.map((user) => renderItemRow(user, 'user'))}
              </div>
            </div>
          </TabsContent>

          {/* Manage Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <div className="border-t border-border pt-6">
              <h2 className="text-xl font-semibold text-foreground mb-6 text-center">Manage Orders</h2>
              <div className="space-y-4">
                {mockOrders.map((order) => renderItemRow(order, 'order'))}
              </div>
            </div>
          </TabsContent>

          {/* Manage Listings Tab */}
          <TabsContent value="listings" className="space-y-6">
            <div className="border-t border-border pt-6">
              <h2 className="text-xl font-semibold text-foreground mb-6 text-center">Manage Listings</h2>
              <div className="space-y-4">
                {mockListings.map((listing) => renderItemRow(listing, 'listing'))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;
