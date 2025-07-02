import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Brain, 
  Users, 
  DollarSign, 
  Shield, 
  Truck, 
  Gamepad2,
  TrendingUp,
  Globe,
  ArrowRight
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Matching",
      description: "Advanced algorithms match you with the perfect groups and deals",
      badge: "Smart",
      color: "primary"
    },
    {
      icon: Users,
      title: "Social Commerce",
      description: "Shop with friends, share savings, and build shopping communities",
      badge: "Social",
      color: "secondary"
    },
    {
      icon: Shield,
      title: "Blockchain Security",
      description: "Smart contracts ensure transparent, secure, and automated transactions",
      badge: "Secure",
      color: "success"
    },
    {
      icon: TrendingUp,
      title: "Dynamic Pricing",
      description: "Real-time price optimization based on demand and group size",
      badge: "Live",
      color: "warning"
    },
    {
      icon: Truck,
      title: "Smart Logistics",
      description: "AI-optimized delivery routes and flexible pickup options",
      badge: "Fast",
      color: "primary"
    },
    {
      icon: Gamepad2,
      title: "Gamified Rewards",
      description: "Earn points, unlock tiers, and get exclusive access to deals",
      badge: "Fun",
      color: "secondary"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <Badge variant="outline" className="mb-4">
            <Globe className="w-4 h-4 mr-2" />
            Advanced Technology
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            The Future of 
            <span className="text-primary"> Collaborative Commerce</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Powered by cutting-edge AI, blockchain technology, and social commerce innovations 
            to revolutionize how you shop and save.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={feature.title}
                className="group bg-card/80 backdrop-blur-sm border-border/50 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-gradient-primary">
                      <Icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {feature.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="inline-flex flex-col sm:flex-row gap-4 items-center justify-center p-8 rounded-2xl bg-gradient-card border border-border/50 backdrop-blur-sm">
            <div className="text-center sm:text-left">
              <h3 className="text-2xl font-semibold mb-2">Ready to Experience the Future?</h3>
              <p className="text-muted-foreground">Join thousands of smart shoppers already saving with Joynt</p>
            </div>
            <Button variant="hero" size="lg" className="min-w-[180px]">
              Get Early Access
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;