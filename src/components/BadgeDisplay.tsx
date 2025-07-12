import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Lock } from 'lucide-react';

interface BadgeType {
  id: string;
  name: string;
  description: string;
  icon: string;
  criteria: string;
  earned: boolean;
  earnedAt?: string;
}

interface BadgeDisplayProps {
  badges: BadgeType[];
  className?: string;
}

const BadgeDisplay: React.FC<BadgeDisplayProps> = ({ badges, className = '' }) => {
  const earnedBadges = badges.filter(badge => badge.earned);
  const availableBadges = badges.filter(badge => !badge.earned);

  return (
    <Card className={`eco-card animate-fade-in ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Trophy className="h-5 w-5 text-primary" />
          <span>Achievement Badges</span>
          <Badge variant="outline" className="ml-auto">
            {earnedBadges.length}/{badges.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Earned Badges */}
        {earnedBadges.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground">Earned Badges</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {earnedBadges.map((badge) => (
                <div
                  key={badge.id}
                  className="flex flex-col items-center p-3 bg-primary-light rounded-lg border border-primary/20 animate-scale-in"
                >
                  <div className="text-2xl mb-1">{badge.icon}</div>
                  <p className="text-xs font-semibold text-center text-primary">
                    {badge.name}
                  </p>
                  <p className="text-xs text-center text-muted-foreground mt-1">
                    {badge.description}
                  </p>
                  {badge.earnedAt && (
                    <p className="text-xs text-center text-muted-foreground mt-1">
                      Earned {new Date(badge.earnedAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Available Badges */}
        {availableBadges.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground">Available Badges</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {availableBadges.map((badge) => (
                <div
                  key={badge.id}
                  className="flex flex-col items-center p-3 bg-muted/50 rounded-lg border border-border opacity-75 hover:opacity-100 transition-opacity"
                >
                  <div className="relative">
                    <div className="text-2xl mb-1 grayscale">{badge.icon}</div>
                    <Lock className="absolute -top-1 -right-1 h-3 w-3 text-muted-foreground" />
                  </div>
                  <p className="text-xs font-semibold text-center text-muted-foreground">
                    {badge.name}
                  </p>
                  <p className="text-xs text-center text-muted-foreground mt-1">
                    {badge.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {earnedBadges.length === 0 && (
          <div className="text-center py-6">
            <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">
              Complete your first swap to earn your first badge!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BadgeDisplay;