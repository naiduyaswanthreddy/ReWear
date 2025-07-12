import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  criteria: string;
  earned: boolean;
  earnedAt?: string;
}

interface SustainabilityImpact {
  totalSwaps: number;
  co2Saved: number; // in kg
  waterSaved: number; // in liters
  textileWastePrevented: number; // in kg
}

interface User {
  id: string;
  email: string;
  username: string;
  points: number;
  joinDate: string;
  isAdmin: boolean;
  badges: Badge[];
  sustainabilityImpact: SustainabilityImpact;
}

interface Notification {
  id: string;
  message: string;
  type: 'swap_request' | 'swap_accepted' | 'swap_rejected' | 'item_approved' | 'item_rejected';
  read: boolean;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, username: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  notifications: Notification[];
  markNotificationAsRead: (id: string) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Available badges in the system
const availableBadges: Badge[] = [
  {
    id: 'eco-warrior',
    name: 'Eco Warrior',
    description: 'Complete 5 swaps',
    icon: '🌱',
    criteria: 'swaps >= 5',
    earned: false
  },
  {
    id: 'trendsetter',
    name: 'Trendsetter',
    description: 'List 10 items',
    icon: '👗',
    criteria: 'items >= 10',
    earned: false
  },
  {
    id: 'green-pioneer',
    name: 'Green Pioneer',
    description: 'Save 20kg CO2',
    icon: '🌍',
    criteria: 'co2 >= 20',
    earned: false
  },
  {
    id: 'community-builder',
    name: 'Community Builder',
    description: 'Help 10 people swap',
    icon: '🤝',
    criteria: 'helped >= 10',
    earned: false
  },
  {
    id: 'water-saver',
    name: 'Water Saver',
    description: 'Save 5000L water',
    icon: '💧',
    criteria: 'water >= 5000',
    earned: false
  }
];

// Mock data for development
const mockUsers = [
  {
    id: '1',
    email: 'admin@rewear.com',
    password: 'SecurePass123!',
    username: 'Admin',
    points: 1000,
    joinDate: '2024-01-01',
    isAdmin: true,
    badges: [
      { ...availableBadges[0], earned: true, earnedAt: '2024-01-10' },
      { ...availableBadges[2], earned: true, earnedAt: '2024-01-15' },
      ...availableBadges.slice(2).map(b => ({ ...b, earned: false }))
    ],
    sustainabilityImpact: {
      totalSwaps: 8,
      co2Saved: 21.6,
      waterSaved: 21600,
      textileWastePrevented: 4.8
    }
  },
  {
    id: '2',
    email: 'user@example.com',
    password: 'password123',
    username: 'EcoFashionista',
    points: 150,
    joinDate: '2024-01-15',
    isAdmin: false,
    badges: [
      { ...availableBadges[0], earned: false },
      { ...availableBadges[1], earned: false },
      { ...availableBadges[2], earned: false },
      { ...availableBadges[3], earned: false },
      { ...availableBadges[4], earned: false }
    ],
    sustainabilityImpact: {
      totalSwaps: 2,
      co2Saved: 5.4,
      waterSaved: 5400,
      textileWastePrevented: 1.2
    }
  }
];

const mockNotifications: Notification[] = [
  {
    id: '1',
    message: 'Your item "Vintage Denim Jacket" has been approved!',
    type: 'item_approved',
    read: false,
    createdAt: '2024-01-20T10:00:00Z'
  },
  {
    id: '2',
    message: 'You have a new swap request for your "Summer Dress"',
    type: 'swap_request',
    read: false,
    createdAt: '2024-01-19T15:30:00Z'
  }
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth token on mount
    const checkAuth = () => {
      const token = localStorage.getItem('rewear_token');
      const userData = localStorage.getItem('rewear_user');
      
      if (token && userData) {
        try {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
        } catch (error) {
          console.error('Error parsing stored user data:', error);
          localStorage.removeItem('rewear_token');
          localStorage.removeItem('rewear_user');
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      
      // Store auth data
      localStorage.setItem('rewear_token', 'mock_jwt_token');
      localStorage.setItem('rewear_user', JSON.stringify(userWithoutPassword));
      
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const signup = async (email: string, password: string, username: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === email);
    if (existingUser) {
      setIsLoading(false);
      return false;
    }
    
    // Create new user
    const newUser = {
      id: Date.now().toString(),
      email,
      username,
      points: 100, // Welcome bonus
      joinDate: new Date().toISOString().split('T')[0],
      isAdmin: false,
      badges: availableBadges.map(b => ({ ...b, earned: false })),
      sustainabilityImpact: {
        totalSwaps: 0,
        co2Saved: 0,
        waterSaved: 0,
        textileWastePrevented: 0
      }
    };
    
    mockUsers.push({ ...newUser, password });
    setUser(newUser);
    
    // Store auth data
    localStorage.setItem('rewear_token', 'mock_jwt_token');
    localStorage.setItem('rewear_user', JSON.stringify(newUser));
    
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('rewear_token');
    localStorage.removeItem('rewear_user');
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('rewear_user', JSON.stringify(updatedUser));
    }
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const value: AuthContextType = {
    user,
    login,
    signup,
    logout,
    updateUser,
    notifications,
    markNotificationAsRead,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
