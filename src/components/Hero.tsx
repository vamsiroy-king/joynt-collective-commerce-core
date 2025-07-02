import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Users, DollarSign, Shield } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-primary/20" />
      
      {/* Hero Image Background */}
      <div 
        className="absolute inset-0 opacity-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Floating Gradient Orbs */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-bounce-subtle" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse-glow" />
      
      <div className="relative z-10 container mx-auto px-6 text-center max-w-6xl">
        {/* Trust Badge */}
        <div className="flex justify-center mb-6 animate-fade-in">
          <Badge variant="secondary" className="px-4 py-2 text-sm font-medium bg-glass border border-border/30 backdrop-blur-sm">
            <Shield className="w-4 h-4 mr-2" />
            Trusted by 1M+ Smart Shoppers
          </Badge>
        </div>
        
        {/* Main Headline */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-secondary bg-clip-text text-transparent animate-fade-in-up">
          Shop Together,
          <br />
          <span className="text-primary">Save More</span>
        </h1>
        
        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in-up">
          Join millions discovering the future of shopping. Create groups, unlock wholesale prices, 
          and turn every purchase into community savings with AI-powered deals.
        </p>
        
        {/* Stats Row */}
        <div className="flex flex-wrap justify-center gap-8 mb-12 animate-fade-in-up">
          <div className="flex items-center gap-2 text-foreground">
            <Users className="w-6 h-6 text-primary" />
            <span className="text-lg font-semibold">1M+ Users</span>
          </div>
          <div className="flex items-center gap-2 text-foreground">
            <DollarSign className="w-6 h-6 text-success" />
            <span className="text-lg font-semibold">$50M+ Saved</span>
          </div>
          <div className="flex items-center gap-2 text-foreground">
            <Shield className="w-6 h-6 text-secondary" />
            <span className="text-lg font-semibold">99.9% Secure</span>
          </div>
        </div>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up">
          <Button 
            variant="hero" 
            size="lg" 
            className="text-lg px-8 py-4 h-14 min-w-[200px]"
          >
            Start Saving Now
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          
          <Button 
            variant="glass" 
            size="lg" 
            className="text-lg px-8 py-4 h-14 min-w-[200px]"
          >
            See How It Works
          </Button>
        </div>
        
        {/* Social Proof */}
        <div className="mt-16 text-center animate-fade-in-up">
          <p className="text-sm text-muted-foreground mb-4">
            Trusted by leading brands and millions of shoppers worldwide
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {['Amazon', 'Best Buy', 'Nike', 'Apple', 'Samsung'].map((brand) => (
              <div key={brand} className="text-lg font-semibold text-muted-foreground">
                {brand}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;