import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Leaf, Droplet, Recycle, TrendingUp } from 'lucide-react';

interface SustainabilityImpact {
  totalSwaps: number;
  co2Saved: number;
  waterSaved: number;
  textileWastePrevented: number;
}

interface SustainabilityTrackerProps {
  impact: SustainabilityImpact;
}

const SustainabilityTracker: React.FC<SustainabilityTrackerProps> = ({ impact }) => {
  // Calculate progress towards next milestones
  const nextCO2Milestone = 50; // Next goal: 50kg CO2
  const nextWaterMilestone = 50000; // Next goal: 50,000L
  const nextWasteMilestone = 30; // Next goal: 30kg textile waste

  const co2Progress = Math.min((impact.co2Saved / nextCO2Milestone) * 100, 100);
  const waterProgress = Math.min((impact.waterSaved / nextWaterMilestone) * 100, 100);
  const wasteProgress = Math.min((impact.textileWastePrevented / nextWasteMilestone) * 100, 100);

  const impactStats = [
    {
      icon: Leaf,
      label: 'CO₂ Prevented',
      value: impact.co2Saved.toFixed(1),
      unit: 'kg',
      progress: co2Progress,
      milestone: nextCO2Milestone,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      description: 'Equivalent to not driving 50km'
    },
    {
      icon: Droplet,
      label: 'Water Saved',
      value: (impact.waterSaved / 1000).toFixed(1),
      unit: 'k liters',
      progress: waterProgress,
      milestone: nextWaterMilestone / 1000,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      description: 'Enough for 200 showers'
    },
    {
      icon: Recycle,
      label: 'Textile Waste Prevented',
      value: impact.textileWastePrevented.toFixed(1),
      unit: 'kg',
      progress: wasteProgress,
      milestone: nextWasteMilestone,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      description: 'Kept from landfills'
    }
  ];

  return (
    <Card className="eco-card animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <span>Your Sustainability Impact</span>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Making a difference through {impact.totalSwaps} successful swaps
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {impactStats.map((stat, index) => (
          <div key={index} className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
                <div>
                  <p className="font-semibold text-foreground">
                    {stat.value} <span className="text-sm font-normal">{stat.unit}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">
                  Next: {stat.milestone}{stat.unit === 'k liters' ? 'k L' : stat.unit}
                </p>
              </div>
            </div>
            
            <div className="space-y-1">
              <Progress value={stat.progress} className="h-2" />
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </div>
          </div>
        ))}

        {/* Impact Summary */}
        <div className="pt-4 border-t border-border">
          <div className="text-center space-y-2">
            <p className="text-lg font-bold text-primary">
              🌍 Your Eco Score: {(impact.totalSwaps * 10 + impact.co2Saved * 2).toFixed(0)}
            </p>
            <p className="text-xs text-muted-foreground">
              Every swap makes our planet healthier!
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SustainabilityTracker;