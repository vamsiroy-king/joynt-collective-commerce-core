import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { 
  Shield, 
  Lock, 
  CheckCircle, 
  Award, 
  Globe,
  Users,
  Zap,
  Star
} from "lucide-react";
import trustImage from "@/assets/trust-security.jpg";

const TrustSection = () => {
  const trustMetrics = [
    {
      icon: Shield,
      title: "Bank-Level Security",
      description: "256-bit SSL encryption and PCI DSS compliance",
      stat: "99.99%",
      label: "Uptime"
    },
    {
      icon: CheckCircle,
      title: "Verified Transactions",
      description: "Blockchain-verified smart contracts for transparency",
      stat: "100%",
      label: "Transparent"
    },
    {
      icon: Award,
      title: "Trusted Platform",
      description: "SOC 2 Type II certified with regular audits",
      stat: "1M+",
      label: "Trusted Users"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Sub-second response times globally",
      stat: "<100ms",
      label: "Response Time"
    }
  ];

  const certifications = [
    "PCI DSS Level 1",
    "SOC 2 Type II",
    "GDPR Compliant",
    "ISO 27001",
    "CCPA Compliant"
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background to-primary/5">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <Badge variant="outline" className="mb-4">
            <Lock className="w-4 h-4 mr-2" />
            Security & Trust
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Your Security is
            <span className="text-primary"> Our Priority</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Enterprise-grade security, blockchain transparency, and industry-leading compliance 
            ensure your data and transactions are always protected.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          {/* Trust Metrics */}
          <div className="space-y-6">
            {trustMetrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <Card 
                  key={metric.title}
                  className="group bg-card/60 backdrop-blur-sm border-border/50 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-xl bg-gradient-primary shrink-0">
                        <Icon className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                            {metric.title}
                          </h3>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-success">{metric.stat}</div>
                            <div className="text-xs text-muted-foreground">{metric.label}</div>
                          </div>
                        </div>
                        <p className="text-muted-foreground">
                          {metric.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Trust Image & Certifications */}
          <div className="space-y-8">
            <div className="relative">
              <Image 
                src={trustImage} 
                alt="Security and Trust" 
                width={600}
                height={400}
                className="w-full rounded-2xl shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent rounded-2xl" />
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  Military-Grade Protection
                </h3>
                <p className="text-foreground/80">
                  Your data is protected by the same security standards used by banks and government agencies.
                </p>
              </div>
            </div>

            {/* Certifications */}
            <Card className="bg-card/60 backdrop-blur-sm border-border/50">
              <CardContent className="p-6">
                <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-warning" />
                  Industry Certifications
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {certifications.map((cert) => (
                    <div key={cert} className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span className="text-sm font-medium">{cert}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Trust Indicators */}
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <div className="mb-4">
              <Users className="w-12 h-12 text-primary mx-auto mb-2" />
              <div className="text-3xl font-bold text-foreground">1M+</div>
            </div>
            <h4 className="font-semibold mb-2">Trusted Users</h4>
            <p className="text-muted-foreground text-sm">
              Join millions who trust Joynt for their group buying needs
            </p>
          </div>
          
          <div className="p-6">
            <div className="mb-4">
              <Globe className="w-12 h-12 text-success mx-auto mb-2" />
              <div className="text-3xl font-bold text-foreground">25+</div>
            </div>
            <h4 className="font-semibold mb-2">Countries</h4>
            <p className="text-muted-foreground text-sm">
              Trusted globally with local compliance in each market
            </p>
          </div>
          
          <div className="p-6">
            <div className="mb-4">
              <Star className="w-12 h-12 text-warning mx-auto mb-2" />
              <div className="text-3xl font-bold text-foreground">4.9</div>
            </div>
            <h4 className="font-semibold mb-2">Trust Score</h4>
            <p className="text-muted-foreground text-sm">
              Rated by independent security auditors and users
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex flex-col sm:flex-row gap-4 items-center justify-center p-8 rounded-2xl bg-gradient-card border border-border/50 backdrop-blur-sm">
            <div className="text-center sm:text-left">
              <h3 className="text-2xl font-semibold mb-2">Ready to Shop Securely?</h3>
              <p className="text-muted-foreground">Your security and privacy are guaranteed</p>
            </div>
            <Button variant="hero" size="lg" className="min-w-[180px]">
              Start Shopping Safely
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;