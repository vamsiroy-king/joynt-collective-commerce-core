import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { 
  Users, 
  Clock, 
  DollarSign, 
  TrendingDown,
  Heart,
  Share2,
  ShoppingCart
} from "lucide-react";
import productShowcase from "@/assets/product-showcase.jpg";

const GroupShowcase = () => {
  const activeGroups = [
    {
      id: 1,
      title: "iPhone 15 Pro Max 256GB",
      originalPrice: 1199,
      groupPrice: 899,
      savings: 300,
      progress: 85,
      currentMembers: 17,
      targetMembers: 20,
      timeLeft: "2h 15m",
      category: "Electronics",
      image: productShowcase,
      members: [
        { id: 1, name: "Sarah", avatar: "/api/placeholder/32/32" },
        { id: 2, name: "Mike", avatar: "/api/placeholder/32/32" },
        { id: 3, name: "Emma", avatar: "/api/placeholder/32/32" },
      ],
      isHot: true
    },
    {
      id: 2,
      title: "Nike Air Max 270 Sneakers",
      originalPrice: 150,
      groupPrice: 89,
      savings: 61,
      progress: 60,
      currentMembers: 12,
      targetMembers: 20,
      timeLeft: "1d 3h",
      category: "Fashion",
      image: productShowcase,
      members: [
        { id: 4, name: "Alex", avatar: "/api/placeholder/32/32" },
        { id: 5, name: "Lisa", avatar: "/api/placeholder/32/32" },
      ],
      isHot: false
    },
    {
      id: 3,
      title: "KitchenAid Stand Mixer",
      originalPrice: 399,
      groupPrice: 249,
      savings: 150,
      progress: 90,
      currentMembers: 18,
      targetMembers: 20,
      timeLeft: "45m",
      category: "Home & Kitchen",
      image: productShowcase,
      members: [
        { id: 6, name: "John", avatar: "/api/placeholder/32/32" },
        { id: 7, name: "Maria", avatar: "/api/placeholder/32/32" },
        { id: 8, name: "David", avatar: "/api/placeholder/32/32" },
      ],
      isHot: true
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <Badge variant="outline" className="mb-4">
            <Users className="w-4 h-4 mr-2" />
            Live Groups
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Join Active Groups &
            <span className="text-success"> Start Saving</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            See real groups forming right now. The more people join, the bigger the savings for everyone.
          </p>
        </div>

        {/* Groups Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {activeGroups.map((group, index) => (
            <Card 
              key={group.id}
              className="group bg-card/80 backdrop-blur-sm border-border/50 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] overflow-hidden animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Product Image */}
              <div className="relative overflow-hidden">
                <Image 
                  src={group.image} 
                  alt={group.title}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge variant={group.isHot ? "destructive" : "secondary"} className="text-xs">
                    {group.isHot ? "🔥 Hot Deal" : group.category}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button variant="glass" size="sm" className="h-8 w-8 p-0">
                    <Heart className="w-4 h-4" />
                  </Button>
                  <Button variant="glass" size="sm" className="h-8 w-8 p-0">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <CardContent className="p-6">
                {/* Product Title */}
                <h3 className="font-semibold text-lg mb-3 group-hover:text-primary transition-colors">
                  {group.title}
                </h3>

                {/* Pricing */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl font-bold text-success">${group.groupPrice}</span>
                  <span className="text-lg text-muted-foreground line-through">${group.originalPrice}</span>
                  <Badge variant="success" className="text-xs">
                    <TrendingDown className="w-3 h-3 mr-1" />
                    Save ${group.savings}
                  </Badge>
                </div>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Group Progress</span>
                    <span className="font-medium">{group.currentMembers}/{group.targetMembers} joined</span>
                  </div>
                  <Progress value={group.progress} className="h-2" />
                </div>

                {/* Members and Time */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {group.members.map((member) => (
                        <Avatar key={member.id} className="w-8 h-8 border-2 border-background">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback className="text-xs">{member.name[0]}</AvatarFallback>
                        </Avatar>
                      ))}
                      {group.currentMembers > group.members.length && (
                        <div className="w-8 h-8 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs font-medium">
                          +{group.currentMembers - group.members.length}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {group.timeLeft}
                  </div>
                </div>

                {/* Join Button */}
                <Button 
                  variant={group.progress > 80 ? "success" : "default"} 
                  className="w-full font-semibold"
                  size="lg"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  {group.progress > 80 ? "Almost Full - Join Now!" : "Join Group"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-6">
            <div className="text-3xl font-bold text-primary mb-2">247</div>
            <div className="text-sm text-muted-foreground">Active Groups</div>
          </div>
          <div className="p-6">
            <div className="text-3xl font-bold text-success mb-2">$2.3M</div>
            <div className="text-sm text-muted-foreground">Saved This Month</div>
          </div>
          <div className="p-6">
            <div className="text-3xl font-bold text-secondary mb-2">89%</div>
            <div className="text-sm text-muted-foreground">Success Rate</div>
          </div>
          <div className="p-6">
            <div className="text-3xl font-bold text-warning mb-2">15min</div>
            <div className="text-sm text-muted-foreground">Avg. Fill Time</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GroupShowcase;