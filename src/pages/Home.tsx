import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  Recycle, 
  Users, 
  Leaf, 
  Star,
  TrendingUp,
  Heart,
  Shirt,
  Award,
  CheckCircle,
  Sparkles
} from 'lucide-react';
import heroImage from '../assets/hero-image.jpg';
import clothingExchangeIcon from '../assets/clothing-exchange-icon.jpg';
import pointsSystemIcon from '../assets/points-system-icon.jpg';

const Home = () => {
  const navigate = useNavigate();

  const featuredItems = [
    {
      id: '1',
      title: 'Vintage Denim Jacket',
      category: 'Outerwear',
      condition: 'Excellent',
      size: 'M',
      image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400',
      uploader: 'EcoFashionista'
    },
    {
      id: '2',
      title: 'Summer Floral Dress',
      category: 'Dresses',
      condition: 'Like New',
      size: 'S',
      image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400',
      uploader: 'GreenGal'
    },
    {
      id: '3',
      title: 'Cozy Knit Sweater',
      category: 'Tops',
      condition: 'Good',
      size: 'L',
      image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400',
      uploader: 'SustainableStyle'
    },
    {
      id: '4',
      title: 'Designer Handbag',
      category: 'Accessories',
      condition: 'Excellent',
      size: 'One Size',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400',
      uploader: 'LuxuryLover'
    }
  ];

  const impactStats = [
    { label: 'Items Exchanged', value: '2,847', icon: Shirt },
    { label: 'CO2 Saved', value: '1.2 tons', icon: Leaf },
    { label: 'Community Members', value: '1,234', icon: Users },
    { label: 'Points Earned', value: '45,678', icon: Star }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-hero-gradient overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                  <Leaf className="mr-1 h-3 w-3" />
                  Sustainable Fashion Revolution
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
                  Transform Your 
                  <span className="block text-accent-light">Wardrobe</span>
                  <span className="block">Sustainably</span>
                </h1>
                <p className="text-xl text-white/90 max-w-lg">
                  Join our community of eco-conscious fashion lovers. Exchange unused clothing, 
                  earn points, and reduce textile waste together.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-white text-primary hover:bg-white/90 font-semibold px-8 py-4 text-lg"
                  onClick={() => navigate('/signup')}
                >
                  Start Swapping
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-primary font-semibold px-8 py-4 text-lg"
                  onClick={() => navigate('/browse')}
                >
                  Browse Items
                </Button>
              </div>

              <div className="flex items-center space-x-6 text-white/80">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-accent-light" />
                  <span>Free to join</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-accent-light" />
                  <span>Eco-friendly</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-accent-light" />
                  <span>Community-driven</span>
                </div>
              </div>
            </div>

            <div className="relative animate-slide-up">
              <div className="absolute -inset-4 bg-white/10 rounded-3xl blur-2xl"></div>
              <img 
                src={heroImage} 
                alt="Community clothing exchange" 
                className="relative rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Impact Stats */}
      <section className="py-16 bg-gradient-to-r from-primary-light/20 to-accent-light/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Our Community Impact
            </h2>
            <p className="text-lg text-muted-foreground">
              Together, we're making a difference for our planet
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: '10,247', label: 'Items Swapped', icon: '♻️', description: 'Clothes given new life' },
              { number: '27.6 tons', label: 'CO₂ Prevented', icon: '🌍', description: 'Equal to 120 trees planted' },
              { number: '2,847', label: 'Active Members', icon: '👥', description: 'Growing eco-community' },
              { number: '27.6M L', label: 'Water Saved', icon: '💧', description: 'Enough for 100k showers' }
            ].map((stat, index) => (
              <div key={index} className="text-center eco-card p-6 animate-scale-in hover-lift" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="text-4xl mb-3 animate-bounce-in" style={{ animationDelay: `${index * 0.2}s` }}>{stat.icon}</div>
                <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
                <div className="text-xs text-muted-foreground mt-1">{stat.description}</div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-100 to-blue-100 px-6 py-3 rounded-full animate-glow">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="text-primary font-semibold">Real-time impact growing every day!</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              How ReWear Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Three simple steps to transform your wardrobe sustainably
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'List Your Items',
                description: 'Upload photos and details of clothing you no longer wear. Our community moderators will review and approve your listings.',
                icon: clothingExchangeIcon,
                features: ['Multiple photos', 'Detailed descriptions', 'Category tagging']
              },
              {
                step: '02',
                title: 'Browse & Request',
                description: 'Discover amazing items from other members. Send swap requests or use your points to redeem items directly.',
                icon: pointsSystemIcon,
                features: ['Advanced filters', 'Swap requests', 'Points system']
              },
              {
                step: '03',
                title: 'Exchange & Earn',
                description: 'Complete swaps and earn points for every successful exchange. Build your sustainable wardrobe while helping others.',
                icon: clothingExchangeIcon,
                features: ['Earn 20 points', 'Build reputation', 'Reduce waste']
              }
            ].map((item, index) => (
              <Card key={index} className="eco-card group animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                <CardContent className="p-8">
                  <div className="relative mb-6">
                    <img 
                      src={item.icon} 
                      alt={item.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {item.step}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground mb-4">{item.description}</p>
                  
                  <ul className="space-y-2">
                    {item.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-primary mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
                Featured Items
              </h2>
              <p className="text-xl text-muted-foreground">
                Discover amazing pieces from our community
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/browse">
                View All Items
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredItems.map((item, index) => (
              <Card key={item.id} className="eco-card group animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-0">
                  <div className="relative">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-48 object-cover rounded-t-xl"
                    />
                    <Badge className="absolute top-3 right-3 bg-white/90 text-primary">
                      {item.condition}
                    </Badge>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">by {item.uploader}</p>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary" className="text-xs">
                          {item.category}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          Size {item.size}
                        </Badge>
                      </div>
                      <Heart className="h-4 w-4 text-muted-foreground hover:text-red-500 cursor-pointer transition-colors" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability Impact */}
      <section className="py-20 bg-eco-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="space-y-4">
              <Badge className="bg-white/20 text-white border-white/30">
                <Leaf className="mr-1 h-3 w-3" />
                Environmental Impact
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold">
                Together We're Making a Difference
              </h2>
              <p className="text-xl text-white/90">
                Every item exchanged on ReWear helps reduce textile waste and promotes 
                sustainable fashion choices in our community.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mt-12">
              {[
                {
                  icon: Recycle,
                  title: 'Waste Reduction',
                  description: 'Extending clothing lifecycle reduces landfill waste'
                },
                {
                  icon: TrendingUp,
                  title: 'Circular Economy',
                  description: 'Supporting sustainable consumption patterns'
                },
                {
                  icon: Users,
                  title: 'Community Impact',
                  description: 'Building connections through shared values'
                }
              ].map((impact, index) => (
                <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                    <impact.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{impact.title}</h3>
                  <p className="text-white/80">{impact.description}</p>
                </div>
              ))}
            </div>

            <div className="pt-8">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 font-semibold px-8 py-4"
                onClick={() => navigate('/signup')}
              >
                Join the Movement
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;