import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  Shirt, 
  RefreshCw, 
  CheckCircle, 
  Plus,
  Eye,
  Leaf,
  TrendingUp,
  Calendar,
  Edit,
  Award,
  Target
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import SustainabilityTracker from '../components/SustainabilityTracker';
import BadgeDisplay from '../components/BadgeDisplay';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  // Mock data for user's items and swaps
  const userItems = [
    {
      id: '1',
      title: 'Vintage Denim Jacket',
      status: 'available',
      views: 24,
      likes: 5,
      image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=200',
      createdAt: '2024-01-20'
    },
    {
      id: '2',
      title: 'Summer Dress',
      status: 'pending',
      views: 0,
      likes: 0,
      image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=200',
      createdAt: '2024-01-22'
    }
  ];

  const activeSwaps = [
    {
      id: '1',
      type: 'outgoing',
      itemTitle: 'Designer Handbag',
      otherUser: 'EcoFashionista',
      status: 'pending',
      createdAt: '2024-01-21'
    },
    {
      id: '2',
      type: 'incoming',
      itemTitle: 'Vintage Denim Jacket',
      otherUser: 'GreenGal',
      status: 'pending',
      createdAt: '2024-01-20'
    }
  ];

  const completedSwaps = [
    {
      id: '1',
      itemGiven: 'Knit Sweater',
      itemReceived: 'Floral Blouse',
      otherUser: 'SustainableStyle',
      completedAt: '2024-01-15',
      rating: 5
    },
    {
      id: '2',
      itemGiven: 'Professional Blazer',
      itemReceived: 'Casual Pants',
      otherUser: 'BusinessChic',
      completedAt: '2024-01-10',
      rating: 4
    }
  ];

  const stats = [
    { label: 'Items Listed', value: userItems.length, icon: Shirt },
    { label: 'Active Swaps', value: activeSwaps.length, icon: RefreshCw },
    { label: 'Completed Swaps', value: completedSwaps.length, icon: CheckCircle },
    { label: 'EcoPoints', value: user.points, icon: Leaf }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
                Welcome back, {user.username}!
              </h1>
              <p className="text-lg text-muted-foreground mt-1">
                Manage your sustainable fashion journey
              </p>
            </div>
            <div className="mt-4 sm:mt-0 flex gap-2">
              <Button className="eco-button-primary" onClick={() => navigate('/add-item')}>
                <Plus className="mr-2 h-4 w-4" />
                List New Item
              </Button>
              {user.isAdmin && (
                <Button variant="outline" onClick={() => navigate('/admin')}>
                  Admin Panel
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="eco-card animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  </div>
                  <div className="p-3 bg-primary-light rounded-full">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Profile Info */}
        <Card className="eco-card mb-8 animate-fade-in">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Profile Information</span>
              </CardTitle>
              <Button variant="outline" onClick={() => navigate('/profile')}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Member Since</p>
                <p className="font-medium">{new Date(user.joinDate).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">EcoPoints Balance</p>
                <div className="flex items-center space-x-2">
                  <Leaf className="h-4 w-4 text-primary" />
                  <p className="font-medium text-primary">{user.points} points</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sustainability & Badges Section */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <SustainabilityTracker impact={user.sustainabilityImpact} />
          <BadgeDisplay badges={user.badges} />
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="items" className="animate-slide-up">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="items">My Items</TabsTrigger>
            <TabsTrigger value="swaps">Active Swaps</TabsTrigger>
            <TabsTrigger value="history">Swap History</TabsTrigger>
          </TabsList>

          {/* My Items */}
          <TabsContent value="items" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Your Listed Items</h3>
              <Button variant="outline" onClick={() => navigate('/add-item')}>
                <Plus className="mr-2 h-4 w-4" />
                Add Item
              </Button>
            </div>

            {userItems.length === 0 ? (
              <Card className="eco-card">
                <CardContent className="p-8 text-center">
                  <Shirt className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No items listed yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Start by listing your first item to join the community exchange
                  </p>
                  <Button className="eco-button-primary" onClick={() => navigate('/add-item')}>
                    List Your First Item
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userItems.map((item) => (
                  <Card key={item.id} className="eco-card group">
                    <CardContent className="p-0">
                      <div className="relative">
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="w-full h-48 object-cover rounded-t-xl"
                        />
                        <Badge 
                          className={`absolute top-3 right-3 ${
                            item.status === 'available' 
                              ? 'bg-green-500 text-white' 
                              : 'bg-yellow-500 text-white'
                          }`}
                        >
                          {item.status === 'available' ? 'Available' : 'Pending Approval'}
                        </Badge>
                      </div>
                      
                      <div className="p-4">
                        <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                        
                        <div className="flex justify-between items-center mb-3 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Eye className="h-4 w-4" />
                            <span>{item.views} views</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <TrendingUp className="h-4 w-4" />
                            <span>{item.likes} likes</span>
                          </div>
                        </div>

                        <div className="flex items-center text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3 mr-1" />
                          Listed {new Date(item.createdAt).toLocaleDateString()}
                        </div>

                        <div className="mt-4 space-y-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full"
                            onClick={() => navigate(`/item/${item.id}`)}
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Active Swaps */}
          <TabsContent value="swaps" className="space-y-4">
            <h3 className="text-xl font-semibold">Ongoing Swap Requests</h3>
            
            {activeSwaps.length === 0 ? (
              <Card className="eco-card">
                <CardContent className="p-8 text-center">
                  <RefreshCw className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No active swaps</h3>
                  <p className="text-muted-foreground mb-4">
                    Browse items and send swap requests to get started
                  </p>
                  <Button variant="outline" onClick={() => navigate('/browse')}>
                    Browse Items
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {activeSwaps.map((swap) => (
                  <Card key={swap.id} className="eco-card">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge variant={swap.type === 'outgoing' ? 'default' : 'secondary'}>
                              {swap.type === 'outgoing' ? 'Sent Request' : 'Received Request'}
                            </Badge>
                            <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                              Pending
                            </Badge>
                          </div>
                          <h4 className="font-semibold text-foreground">{swap.itemTitle}</h4>
                          <p className="text-sm text-muted-foreground">
                            {swap.type === 'outgoing' ? 'Requested from' : 'Requested by'} {swap.otherUser}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(swap.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          {swap.type === 'outgoing' && (
                            <Button size="sm" variant="outline">
                              Cancel Request
                            </Button>
                          )}
                          {swap.type === 'incoming' && (
                            <p className="text-sm text-muted-foreground">Waiting for admin approval</p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Swap History */}
          <TabsContent value="history" className="space-y-4">
            <h3 className="text-xl font-semibold">Completed Swaps</h3>
            
            {completedSwaps.length === 0 ? (
              <Card className="eco-card">
                <CardContent className="p-8 text-center">
                  <CheckCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No completed swaps yet</h3>
                  <p className="text-muted-foreground">
                    Your swap history will appear here once you complete exchanges
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {completedSwaps.map((swap) => (
                  <Card key={swap.id} className="eco-card">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge className="bg-green-100 text-green-800">
                              <CheckCircle className="mr-1 h-3 w-3" />
                              Completed
                            </Badge>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm">
                              <span className="font-medium">You gave:</span> {swap.itemGiven}
                            </p>
                            <p className="text-sm">
                              <span className="font-medium">You received:</span> {swap.itemReceived}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Swapped with {swap.otherUser}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Completed {new Date(swap.completedAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={`text-sm ${
                                i < swap.rating ? 'text-yellow-400' : 'text-gray-300'
                              }`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
