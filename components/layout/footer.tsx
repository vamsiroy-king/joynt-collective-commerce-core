'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

const footerSections = [
  {
    title: "Platform",
    links: [
      "How It Works",
      "Group Buying Guide", 
      "Success Stories",
      "Mobile App",
      "Pricing"
    ]
  },
  {
    title: "Categories",
    links: [
      "Electronics",
      "Fashion",
      "Home & Kitchen",
      "Sports & Fitness",
      "Books & Media"
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
]

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" }
]

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-background to-muted/20 border-t">
      {/* Newsletter Section */}
      <div className="border-b bg-muted/10">
        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <h3 className="text-2xl font-heading font-bold mb-4">
              Stay Updated with Latest Deals
            </h3>
            <p className="text-muted-foreground mb-6">
              Get notified about new group buys, exclusive offers, and money-saving tips.
            </p>
            <div className="flex gap-3 max-w-md mx-auto">
              <Input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1"
              />
              <Button className="px-6">
                Subscribe
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-6 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-primary to-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">J</span>
                  </div>
                  <span className="text-2xl font-heading font-bold">Joynt</span>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  India's most advanced group buying platform. Join millions of smart shoppers 
                  and unlock wholesale prices through the power of community.
                </p>
              </div>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-primary" />
                  <span>support@joynt.com</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-primary" />
                  <span>1800-JOYNT-24 (Toll Free)</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>Mumbai, Maharashtra, India</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <Button
                      key={social.label}
                      variant="outline"
                      size="sm"
                      className="h-9 w-9 p-0"
                      asChild
                    >
                      <a href={social.href} aria-label={social.label}>
                        <Icon className="w-4 h-4" />
                      </a>
                    </Button>
                  )
                })}
              </div>
            </motion.div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="space-y-4"
            >
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
            </motion.div>
          ))}
        </div>

        <Separator className="my-12" />

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <div className="flex flex-col sm:flex-row gap-6 text-sm text-muted-foreground">
            <span>© 2024 Joynt Technologies Pvt. Ltd. All rights reserved.</span>
            <div className="flex gap-6">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-primary transition-colors">Cookie Policy</a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Available on:</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="h-8 px-3 text-xs">
                iOS App
              </Button>
              <Button variant="outline" size="sm" className="h-8 px-3 text-xs">
                Android
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}