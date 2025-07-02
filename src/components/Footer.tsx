import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Twitter, 
  Instagram, 
  Facebook, 
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Shield
} from "lucide-react";

const Footer = () => {
  const footerSections = [
    {
      title: "Platform",
      links: [
        "How It Works",
        "Group Buying Guide",
        "AI Recommendations",
        "Success Stories",
        "Mobile App"
      ]
    },
    {
      title: "For Business",
      links: [
        "Sell on Joynt",
        "Business Solutions",
        "Enterprise API",
        "Bulk Ordering",
        "Partner Program"
      ]
    },
    {
      title: "Support",
      links: [
        "Help Center",
        "Contact Us",
        "Safety Center",
        "Dispute Resolution",
        "Community Guidelines"
      ]
    },
    {
      title: "Company",
      links: [
        "About Us",
        "Careers",
        "Press",
        "Investor Relations",
        "Blog"
      ]
    }
  ];

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Linkedin, href: "#", label: "LinkedIn" }
  ];

  return (
    <footer className="bg-gradient-to-b from-background to-muted/20 border-t border-border/50">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-primary mb-2">Joynt</h3>
              <p className="text-muted-foreground leading-relaxed max-w-md">
                The world's most advanced group buying platform. Shop together, save more, 
                and experience the future of collaborative commerce.
              </p>
            </div>

            {/* Trust Badges */}
            <div className="space-y-3">
              <h4 className="font-semibold text-sm text-foreground">Security & Trust</h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-xs">
                  <Shield className="w-3 h-3 mr-1" />
                  PCI DSS Certified
                </Badge>
                <Badge variant="outline" className="text-xs">
                  SOC 2 Type II
                </Badge>
                <Badge variant="outline" className="text-xs">
                  GDPR Compliant
                </Badge>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>hello@joynt.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>1-800-JOYNT-24</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>San Francisco, CA</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Button
                    key={social.label}
                    variant="ghost"
                    size="sm"
                    className="h-9 w-9 p-0 hover:bg-primary/10 hover:text-primary"
                    asChild
                  >
                    <a href={social.href} aria-label={social.label}>
                      <Icon className="w-4 h-4" />
                    </a>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h4 className="font-semibold text-foreground">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link}>
                    <a 
                      href="#" 
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col sm:flex-row gap-6 text-sm text-muted-foreground">
            <span>© 2024 Joynt, Inc. All rights reserved.</span>
            <div className="flex gap-6">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-primary transition-colors">Cookie Policy</a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Available on:</span>
            <div className="flex gap-2">
              <Badge variant="outline" className="text-xs">iOS</Badge>
              <Badge variant="outline" className="text-xs">Android</Badge>
              <Badge variant="outline" className="text-xs">Web</Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="border-t border-border/50 bg-muted/20">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="font-semibold text-lg mb-2">Stay in the loop</h4>
              <p className="text-muted-foreground">Get notified about new deals and features</p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 md:w-80 px-4 py-2 rounded-lg bg-background border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
              />
              <Button variant="default" className="whitespace-nowrap">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;