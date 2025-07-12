import React, { useState, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Camera, Upload, Sparkles, RotateCcw } from 'lucide-react';

interface VirtualTryOnProps {
  itemImage: string;
  itemName: string;
  itemType: 'top' | 'dress' | 'jacket' | 'pants' | 'accessories';
}

const VirtualTryOn: React.FC<VirtualTryOnProps> = ({ 
  itemImage, 
  itemName, 
  itemType 
}) => {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [showTryOn, setShowTryOn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsLoading(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        setUserImage(e.target?.result as string);
        setIsLoading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateTryOnPreview = () => {
    if (!userImage || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsLoading(true);
    
    // Simple overlay simulation - in real app would use proper AR/ML
    const userImg = new Image();
    const itemImg = new Image();
    
    userImg.onload = () => {
      canvas.width = 400;
      canvas.height = 500;
      
      // Draw user image
      ctx.drawImage(userImg, 0, 0, 400, 500);
      
      itemImg.onload = () => {
        // Overlay item based on type
        let x = 50, y = 100, width = 300, height = 200;
        
        switch (itemType) {
          case 'top':
            y = 120; height = 180;
            break;
          case 'dress':
            y = 120; height = 300;
            break;
          case 'jacket':
            y = 100; height = 220;
            break;
          case 'pants':
            y = 250; height = 200;
            break;
          case 'accessories':
            y = 80; height = 100; width = 200; x = 100;
            break;
        }
        
        // Apply some transparency for realistic overlay
        ctx.globalAlpha = 0.7;
        ctx.drawImage(itemImg, x, y, width, height);
        ctx.globalAlpha = 1.0;
        
        setShowTryOn(true);
        setIsLoading(false);
      };
      
      itemImg.src = itemImage;
    };
    
    userImg.src = userImage;
  };

  const resetTryOn = () => {
    setShowTryOn(false);
    setUserImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Card className="eco-card">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <span>Virtual Try-On</span>
          <Badge variant="outline" className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700">
            Beta
          </Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          See how {itemName} looks on you with our AI preview
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {!userImage && (
          <div className="text-center space-y-4">
            <div className="border-2 border-dashed border-border rounded-lg p-8">
              <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-sm text-muted-foreground mb-4">
                Upload a photo to try on this item
              </p>
              <Button 
                variant="outline" 
                onClick={() => fileInputRef.current?.click()}
                disabled={isLoading}
              >
                <Upload className="mr-2 h-4 w-4" />
                {isLoading ? 'Processing...' : 'Upload Photo'}
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              For best results, use a clear front-facing photo
            </p>
          </div>
        )}

        {userImage && !showTryOn && (
          <div className="space-y-4">
            <div className="relative">
              <img 
                src={userImage} 
                alt="Your photo" 
                className="w-full max-w-xs mx-auto rounded-lg"
              />
            </div>
            <div className="flex space-x-2 justify-center">
              <Button 
                onClick={generateTryOnPreview}
                disabled={isLoading}
                className="eco-button-primary"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                {isLoading ? 'Generating...' : 'Try It On!'}
              </Button>
              <Button variant="outline" onClick={resetTryOn}>
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset
              </Button>
            </div>
          </div>
        )}

        {showTryOn && (
          <div className="space-y-4">
            <div className="text-center">
              <canvas 
                ref={canvasRef}
                className="border border-border rounded-lg max-w-full"
                style={{ maxHeight: '400px' }}
              />
            </div>
            <div className="text-center space-x-2">
              <Button 
                onClick={generateTryOnPreview}
                variant="outline"
                size="sm"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Regenerate
              </Button>
              <Button variant="outline" size="sm" onClick={resetTryOn}>
                Try Different Photo
              </Button>
            </div>
            <div className="bg-accent-light p-3 rounded-lg">
              <p className="text-xs text-center text-accent-foreground">
                ✨ This is a preview! Actual fit may vary. Always check size details.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VirtualTryOn;