import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  ArrowLeft, 
  Heart, 
  RefreshCw, 
  Star,
  User,
  Leaf,
  Calendar,
  Tag,
  Share2,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../hooks/use-toast';
import VirtualTryOn from '../components/VirtualTryOn';

// Mock item data
const mockItem = {
  id: '1',
  title: 'Vintage Denim Jacket',
  description: 'This beautiful vintage denim jacket is in excellent condition. It features classic styling with a modern fit. Perfect for layering over any outfit. The jacket has been gently worn and well-maintained. It comes from a smoke-free home and has been freshly cleaned.',
  category: 'jacket',
  type: 'Casual',
  size: 'M',
  condition: 'Excellent',
  brand: 'Levi\'s',
  material: '100% Cotton Denim',
  tags: ['vintage', 'denim', 'casual', 'blue', 'classic'],
  images: [
    'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800',
    'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=800',
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800'
  ],
  uploader: { 
    username: 'EcoFashionista', 
    joinDate: '2024-01-15', 
    rating: 4.8,
    totalSwaps: 24,
    id: 'user123'
  },
  status: 'available',
  likedBy: ['user1', 'user2', 'user3'],
  createdAt: '2024-01-20',
  views: 47
};

const ItemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [showSwapDialog, setShowSwapDialog] = useState(false);

  // In a real app, you would fetch the item data based on the ID
  const item = mockItem;

  if (!item) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">Item not found</h2>
          <p className="text-muted-foreground mb-4">The item you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/browse')}>
            Browse Items
          </Button>
        </div>
      </div>
    );
  }

  const isOwner = user?.id === item.uploader.id;
  const canSwap = user && !isOwner && item.status === 'available';
  const canRedeem = user && user.points >= 50 && !isOwner && item.status === 'available';

  const handleSwapRequest = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    setShowSwapDialog(true);
  };

  const handleRedeemWithPoints = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    if (user.points < 50) {
      toast({
        title: 'Insufficient points',
        description: 'You need at least 50 points to redeem this item.',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Item redeemed!',
      description: 'You have successfully redeemed this item for 50 points.',
    });
  };

  const handleLike = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    setIsLiked(!isLiked);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === item.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? item.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate('/browse')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Browse
        </Button>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4 animate-fade-in">
            <div className="relative aspect-square">
              <img 
                src={item.images[currentImageIndex]} 
                alt={item.title}
                className="w-full h-full object-cover rounded-xl"
              />
              
              {item.images.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {item.images.map((_, index) => (
                      <button
                        key={index}
                        className={`w-2 h-2 rounded-full ${
                          index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                        }`}
                        onClick={() => setCurrentImageIndex(index)}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Thumbnail Strip */}
            {item.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {item.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      index === currentImageIndex 
                        ? 'border-primary' 
                        : 'border-transparent'
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`${item.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Item Details */}
          <div className="space-y-6 animate-slide-up">
            {/* Title and Basic Info */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">
                    {item.title}
                  </h1>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>{item.views} views</span>
                    <span>•</span>
                    <span>Listed {new Date(item.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" onClick={handleLike}>
                    <Heart 
                      className={`h-5 w-5 ${
                        isLiked || item.likedBy.length > 0
                          ? 'fill-red-500 text-red-500' 
                          : 'text-muted-foreground'
                      }`} 
                    />
                    <span className="ml-1">{item.likedBy.length}</span>
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Status Badge */}
              <Badge 
                className={`${
                  item.status === 'available' 
                    ? 'bg-green-100 text-green-800 border-green-200' 
                    : 'bg-gray-100 text-gray-800 border-gray-200'
                }`}
              >
                {item.status === 'available' ? 'Available for Swap' : 'Not Available'}
              </Badge>
            </div>

            {/* Key Details */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Category</p>
                <p className="font-medium">{item.category}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Type</p>
                <p className="font-medium">{item.type}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Size</p>
                <p className="font-medium">{item.size}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Condition</p>
                <p className="font-medium">{item.condition}</p>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Tags */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {item.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="bg-primary-light text-primary">
                    <Tag className="mr-1 h-3 w-3" />
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            {!isOwner && (
              <div className="space-y-3">
                {canSwap && (
                  <Button 
                    className="w-full eco-button-primary" 
                    size="lg"
                    onClick={handleSwapRequest}
                  >
                    <RefreshCw className="mr-2 h-5 w-5" />
                    Request Swap
                  </Button>
                )}
                
                {canRedeem && (
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    size="lg"
                    onClick={handleRedeemWithPoints}
                  >
                    <Leaf className="mr-2 h-5 w-5 text-primary" />
                    Redeem for 50 Points
                  </Button>
                )}

                {!user && (
                  <div className="space-y-2">
                    <Button 
                      className="w-full eco-button-primary" 
                      size="lg"
                      onClick={() => navigate('/login')}
                    >
                      Sign In to Request Swap
                    </Button>
                    <p className="text-sm text-muted-foreground text-center">
                      New to ReWear? <button 
                        onClick={() => navigate('/signup')}
                        className="text-primary hover:underline"
                      >
                        Create an account
                      </button>
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Uploader Info */}
            <Card className="eco-card">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary text-white">
                      {item.uploader.username.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground">
                      {item.uploader.username}
                    </h4>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{item.uploader.rating}</span>
                      </div>
                      <span>•</span>
                      <span>{item.uploader.totalSwaps} swaps</span>
                      <span>•</span>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>Joined {new Date(item.uploader.joinDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm">
                    <User className="mr-2 h-4 w-4" />
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Enhanced Details Section with Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="tryon">
                <Sparkles className="mr-2 h-4 w-4" />
                Virtual Try-On
              </TabsTrigger>
              <TabsTrigger value="sustainability">Impact</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="mt-6">
              <Card className="eco-card">
                <CardHeader>
                  <CardTitle>Item Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-muted-foreground">Brand</p>
                        <p className="font-medium">{item.brand || 'Not specified'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Material</p>
                        <p className="font-medium">{item.material || 'Cotton blend'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Care Instructions</p>
                        <p className="font-medium">Machine wash cold, hang dry</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-muted-foreground">Original Price</p>
                        <p className="font-medium">$85 (estimated)</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Measurements</p>
                        <p className="font-medium">Length: 24", Chest: 18"</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Color</p>
                        <p className="font-medium">Classic Blue</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tryon" className="mt-6">
              <VirtualTryOn 
                itemImage={item.images[0]}
                itemName={item.title}
                itemType={item.category as any}
              />
            </TabsContent>

            <TabsContent value="sustainability" className="mt-6">
              <Card className="eco-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Leaf className="h-5 w-5 text-primary" />
                    <span>Environmental Impact</span>
                  </CardTitle>
                  <p className="text-muted-foreground">
                    By choosing to swap instead of buying new, you're making a positive environmental impact
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center space-y-2">
                      <div className="p-4 bg-green-100 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                        <span className="text-2xl">🌍</span>
                      </div>
                      <p className="font-semibold text-lg">2.7 kg</p>
                      <p className="text-xs text-muted-foreground">CO₂ emissions saved</p>
                    </div>
                    <div className="text-center space-y-2">
                      <div className="p-4 bg-blue-100 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                        <span className="text-2xl">💧</span>
                      </div>
                      <p className="font-semibold text-lg">2,700 L</p>
                      <p className="text-xs text-muted-foreground">Water conservation</p>
                    </div>
                    <div className="text-center space-y-2">
                      <div className="p-4 bg-purple-100 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                        <span className="text-2xl">♻️</span>
                      </div>
                      <p className="font-semibold text-lg">0.6 kg</p>
                      <p className="text-xs text-muted-foreground">Textile waste prevented</p>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-200">
                    <div className="text-center space-y-2">
                      <Sparkles className="h-8 w-8 text-primary mx-auto" />
                      <p className="font-semibold text-primary">Sustainability Champion!</p>
                      <p className="text-sm text-muted-foreground">
                        This swap prevents the need for new textile production and reduces fashion industry waste
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <h4 className="font-semibold">Manufacturing Impact Avoided:</h4>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• No new cotton cultivation</li>
                        <li>• No dyeing chemicals used</li>
                        <li>• No transportation emissions</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold">Circular Economy Benefits:</h4>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Extends product lifecycle</li>
                        <li>• Reduces landfill waste</li>
                        <li>• Supports local community</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Swap Request Dialog */}
        <Dialog open={showSwapDialog} onOpenChange={setShowSwapDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Request Swap</DialogTitle>
              <DialogDescription>
                Send a swap request for "{item.title}" to {item.uploader.username}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                You can propose one of your items for a direct swap, or send a general request. 
                The owner will be notified and can accept or decline your request.
              </p>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setShowSwapDialog(false)}
                >
                  Cancel
                </Button>
                <Button 
                  className="flex-1 eco-button-primary"
                  onClick={() => {
                    setShowSwapDialog(false);
                    toast({
                      title: 'Swap request sent!',
                      description: `Your request has been sent to ${item.uploader.username}.`,
                    });
                  }}
                >
                  Send Request
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ItemDetail;