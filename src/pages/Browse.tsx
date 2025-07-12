import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Search, 
  Filter, 
  Heart, 
  Star,
  Shirt,
  User,
  Grid,
  List
} from 'lucide-react';

// Mock data for items
const mockItems = [
  {
    id: '1',
    title: 'Vintage Denim Jacket',
    description: 'Classic blue denim jacket in excellent condition. Perfect for any casual outfit.',
    category: 'Outerwear',
    type: 'Casual',
    size: 'M',
    condition: 'Excellent',
    tags: ['vintage', 'denim', 'casual'],
    images: ['https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400'],
    uploader: { username: 'EcoFashionista', joinDate: '2024-01-15', rating: 4.8 },
    status: 'available',
    likedBy: ['user1', 'user2'],
    createdAt: '2024-01-20'
  },
  {
    id: '2',
    title: 'Summer Floral Dress',
    description: 'Beautiful floral midi dress, perfect for summer occasions. Lightweight and comfortable.',
    category: 'Dresses',
    type: 'Casual',
    size: 'S',
    condition: 'Like New',
    tags: ['floral', 'summer', 'midi'],
    images: ['https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400'],
    uploader: { username: 'GreenGal', joinDate: '2024-01-10', rating: 4.9 },
    status: 'available',
    likedBy: ['user3'],
    createdAt: '2024-01-19'
  },
  {
    id: '3',
    title: 'Cozy Knit Sweater',
    description: 'Warm and comfortable knit sweater in neutral beige. Perfect for autumn weather.',
    category: 'Tops',
    type: 'Casual',
    size: 'L',
    condition: 'Good',
    tags: ['knit', 'warm', 'neutral'],
    images: ['https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400'],
    uploader: { username: 'SustainableStyle', joinDate: '2024-01-05', rating: 4.7 },
    status: 'available',
    likedBy: [],
    createdAt: '2024-01-18'
  },
  {
    id: '4',
    title: 'Designer Handbag',
    description: 'Luxury leather handbag in pristine condition. Authentic designer piece.',
    category: 'Accessories',
    type: 'Formal',
    size: 'One Size',
    condition: 'Excellent',
    tags: ['designer', 'leather', 'luxury'],
    images: ['https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400'],
    uploader: { username: 'LuxuryLover', joinDate: '2024-01-12', rating: 4.6 },
    status: 'available',
    likedBy: ['user1', 'user4', 'user5'],
    createdAt: '2024-01-17'
  },
  {
    id: '5',
    title: 'Professional Blazer',
    description: 'Sharp black blazer perfect for business meetings and professional events.',
    category: 'Outerwear',
    type: 'Formal',
    size: 'M',
    condition: 'Like New',
    tags: ['professional', 'formal', 'business'],
    images: ['https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400'],
    uploader: { username: 'BusinessChic', joinDate: '2024-01-08', rating: 4.8 },
    status: 'available',
    likedBy: ['user2'],
    createdAt: '2024-01-16'
  },
  {
    id: '6',
    title: 'Bohemian Maxi Skirt',
    description: 'Flowing maxi skirt with beautiful bohemian patterns. Perfect for festivals.',
    category: 'Bottoms',
    type: 'Casual',
    size: 'M',
    condition: 'Good',
    tags: ['bohemian', 'maxi', 'patterns'],
    images: ['https://images.unsplash.com/photo-1583496661160-fb5886a13d56?w=400'],
    uploader: { username: 'BohoVibes', joinDate: '2024-01-03', rating: 4.5 },
    status: 'available',
    likedBy: ['user3', 'user6'],
    createdAt: '2024-01-15'
  }
];

const categories = ['All', 'Tops', 'Bottoms', 'Dresses', 'Outerwear', 'Accessories'];
const sizes = ['All', 'XS', 'S', 'M', 'L', 'XL', 'One Size'];
const conditions = ['All', 'Like New', 'Excellent', 'Good', 'Fair'];
const types = ['All', 'Casual', 'Formal', 'Sports', 'Party'];

const Browse = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSize, setSelectedSize] = useState('All');
  const [selectedCondition, setSelectedCondition] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [likedItems, setLikedItems] = useState<string[]>([]);

  const filteredItems = useMemo(() => {
    return mockItems.filter(item => {
      const matchesSearch = 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSize = selectedSize === 'All' || item.size === selectedSize;
      const matchesCondition = selectedCondition === 'All' || item.condition === selectedCondition;
      const matchesType = selectedType === 'All' || item.type === selectedType;

      return matchesSearch && matchesCategory && matchesSize && matchesCondition && matchesType;
    });
  }, [searchTerm, selectedCategory, selectedSize, selectedCondition, selectedType]);

  const toggleLike = (itemId: string) => {
    setLikedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleItemClick = (itemId: string) => {
    navigate(`/item/${itemId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
            Browse Items
          </h1>
          <p className="text-lg text-muted-foreground">
            Discover amazing clothing pieces from our sustainable community
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-card rounded-xl border border-border p-6 mb-8 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search items, tags, or descriptions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Size Filter */}
            <Select value={selectedSize} onValueChange={setSelectedSize}>
              <SelectTrigger>
                <SelectValue placeholder="Size" />
              </SelectTrigger>
              <SelectContent>
                {sizes.map(size => (
                  <SelectItem key={size} value={size}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Condition Filter */}
            <Select value={selectedCondition} onValueChange={setSelectedCondition}>
              <SelectTrigger>
                <SelectValue placeholder="Condition" />
              </SelectTrigger>
              <SelectContent>
                {conditions.map(condition => (
                  <SelectItem key={condition} value={condition}>
                    {condition}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Type Filter */}
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                {types.map(type => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Results and View Toggle */}
          <div className="flex justify-between items-center mt-4 pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Showing {filteredItems.length} items
            </p>
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Items Grid/List */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16">
            <Shirt className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No items found</h3>
            <p className="text-muted-foreground">
              Try adjusting your filters or search terms
            </p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item, index) => (
              <Card 
                key={item.id} 
                className="eco-card group cursor-pointer animate-scale-in" 
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => handleItemClick(item.id)}
              >
                <CardContent className="p-0">
                  <div className="relative">
                    <img 
                      src={item.images[0]} 
                      alt={item.title}
                      className="w-full h-48 object-cover rounded-t-xl"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-white/90 text-primary">
                        {item.condition}
                      </Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-3 right-3 bg-white/80 hover:bg-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(item.id);
                      }}
                    >
                      <Heart 
                        className={`h-4 w-4 ${
                          likedItems.includes(item.id) || item.likedBy.length > 0
                            ? 'fill-red-500 text-red-500' 
                            : 'text-muted-foreground'
                        }`} 
                      />
                    </Button>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {item.description}
                    </p>
                    
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                        <User className="h-3 w-3" />
                        <span>{item.uploader.username}</span>
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 ml-1" />
                        <span>{item.uploader.rating}</span>
                      </div>
                      {item.likedBy.length > 0 && (
                        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                          <Heart className="h-3 w-3 fill-red-500 text-red-500" />
                          <span>{item.likedBy.length}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      <Badge variant="secondary" className="text-xs">
                        {item.category}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        Size {item.size}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {item.type}
                      </Badge>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {item.tags.slice(0, 2).map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs bg-primary-light text-primary">
                          #{tag}
                        </Badge>
                      ))}
                      {item.tags.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{item.tags.length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredItems.map((item, index) => (
              <Card 
                key={item.id} 
                className="eco-card cursor-pointer animate-fade-in" 
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={() => handleItemClick(item.id)}
              >
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    <img 
                      src={item.images[0]} 
                      alt={item.title}
                      className="w-32 h-32 object-cover rounded-lg flex-shrink-0"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-semibold text-foreground hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleLike(item.id);
                          }}
                        >
                          <Heart 
                            className={`h-4 w-4 ${
                              likedItems.includes(item.id) || item.likedBy.length > 0
                                ? 'fill-red-500 text-red-500' 
                                : 'text-muted-foreground'
                            }`} 
                          />
                        </Button>
                      </div>
                      
                      <p className="text-muted-foreground mb-4">
                        {item.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                          <Badge className="bg-white text-primary border border-primary">
                            {item.condition}
                          </Badge>
                          <Badge variant="secondary">
                            {item.category}
                          </Badge>
                          <Badge variant="outline">
                            Size {item.size}
                          </Badge>
                          <Badge variant="outline">
                            {item.type}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <User className="h-4 w-4" />
                            <span>{item.uploader.username}</span>
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 ml-1" />
                            <span>{item.uploader.rating}</span>
                          </div>
                          {item.likedBy.length > 0 && (
                            <div className="flex items-center space-x-1">
                              <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                              <span>{item.likedBy.length}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;