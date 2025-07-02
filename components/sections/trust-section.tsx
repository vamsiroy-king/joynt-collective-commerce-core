'use client'

import { motion } from 'framer-motion'
import { Shield, Award, Users, Zap, Star, CheckCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'

const trustFeatures = [
  {
    icon: Shield,
    title: "Secure Payments",
    description: "Bank-level security with 256-bit SSL encryption. Your money is safe until the group is complete.",
    color: "text-blue-600"
  },
  {
    icon: Award,
    title: "Quality Guaranteed",
    description: "All products are sourced directly from authorized dealers. 100% authentic with full warranty.",
    color: "text-purple-600"
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Join 2M+ satisfied customers who have saved over ₹50 Crores through group buying.",
    color: "text-green-600"
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Quick group formation and instant notifications. Most groups fill within 24 hours.",
    color: "text-orange-600"
  }
]

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Mumbai",
    rating: 5,
    text: "Saved ₹45,000 on my iPhone 15 Pro! The group buying concept is brilliant and the process was seamless.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
  },
  {
    id: 2,
    name: "Rahul Gupta",
    location: "Delhi",
    rating: 5,
    text: "Got my MacBook Air at 30% off! Joynt has revolutionized how I shop for electronics.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
  },
  {
    id: 3,
    name: "Sneha Patel",
    location: "Bangalore",
    rating: 5,
    text: "Amazing platform! Saved thousands on home appliances. The community is very supportive.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
  }
]

export function TrustSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-success/10 text-success border-success/20">
            <Shield className="w-4 h-4 mr-2" />
            Trusted Platform
          </Badge>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            Why 2M+ Users Trust Joynt
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Built with security, transparency, and customer satisfaction at its core. 
            Your trust is our most valuable asset.
          </p>
        </motion.div>

        {/* Trust Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {trustFeatures.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="luxury-card text-center h-full">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-r from-current to-current/80 flex items-center justify-center ${feature.color}`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-heading font-bold text-center mb-12">
            What Our Customers Say
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="luxury-card h-full">
                  <CardContent className="p-6">
                    {/* Rating */}
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    
                    {/* Testimonial */}
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      "{testimonial.text}"
                    </p>
                    
                    {/* Author */}
                    <div className="flex items-center">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        width={40}
                        height={40}
                        className="rounded-full mr-3"
                      />
                      <div>
                        <div className="font-semibold text-sm">{testimonial.name}</div>
                        <div className="text-xs text-muted-foreground">{testimonial.location}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-success" />
              <span className="text-sm font-medium">SSL Secured</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-success" />
              <span className="text-sm font-medium">PCI Compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-success" />
              <span className="text-sm font-medium">ISO 27001</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-success" />
              <span className="text-sm font-medium">GDPR Compliant</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}