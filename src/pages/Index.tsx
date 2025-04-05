
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Shield, Headset } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';

const Index = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-background">
      <div className="absolute top-4 right-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleTheme} 
          aria-label="Toggle theme"
        >
          {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </Button>
      </div>
      
      <div className="flex flex-col items-center mb-10">
        <div className="h-16 w-16 rounded-full bg-gradient-halvi flex items-center justify-center mb-4">
          <span className="font-bold text-white text-2xl">H</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gradient">Halvi Admin Portal</h1>
        <p className="text-muted-foreground mt-2">The Command Center of the Halal Economy</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
        <Card className="glass-card relative overflow-hidden group hover:shadow-glow-md transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-halvi-royal/20 to-halvi-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-halvi-accent" />
              Super Admin
            </CardTitle>
            <CardDescription>Complete control over all Halvi systems</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-sm space-y-2 text-left list-disc list-inside">
              <li>Manage businesses, products, and orders</li>
              <li>Configure platform settings and policies</li>
              <li>Monitor revenue and financial metrics</li>
              <li>Oversee all support operations</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full" 
              onClick={() => navigate('/dashboard')}
            >
              Login as Super Admin
            </Button>
          </CardFooter>
        </Card>

        <Card className="glass-card relative overflow-hidden group hover:shadow-glow-md transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-halvi-amber/20 to-halvi-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Headset className="h-6 w-6 text-halvi-amber" />
              Support Agent
            </CardTitle>
            <CardDescription>Manage customer support operations</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-sm space-y-2 text-left list-disc list-inside">
              <li>Respond to customer tickets and inquiries</li>
              <li>Manage order disputes and issue refunds</li>
              <li>Assist with business verification</li>
              <li>Access support resources and tools</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              variant="secondary"
              onClick={() => navigate('/support')}
            >
              Login as Support Agent
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="mt-10 text-center max-w-lg">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Halvi. The Command Center of the Halal Economy.
        </p>
      </div>
    </div>
  );
};

export default Index;
