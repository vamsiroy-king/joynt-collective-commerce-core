'use client'

import { motion } from 'framer-motion'
import { Users, ShoppingCart, Zap, Gift } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

const steps = [
  {
    id: 1,
    icon: Users,
    title: "Join a Group",
    description: "Browse active group buys or create your own. The more people join, the better the price gets.",
    color: "from-blue-500 to-blue-600"
  },
  {
    id: 2,
    icon: ShoppingCart,
    title: "Secure Your Spot",
    description: "Reserve your product with a small deposit. No payment until the group reaches its target.",
    color: "from-purple-500 to-purple-600"
  },
  {
    id: 3,
    icon: Zap,
    title: "Unlock Savings",
    description: "When the group fills up, everyone gets the wholesale price. Automatic discounts applied.",
    color: "from-orange-500 to-orange-600"
  },
  {
    id: 4,
    icon: Gift,
    title: "Receive & Enjoy",
    description: "Products are shipped directly to you. Enjoy premium quality at unbeatable prices.",
    color: "from-green-500 to-green-600"
  }
]

export function HowItWorks() {
  return (
    <section className="py-24 bg-gradient-to-b from-muted/10 to-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            <Zap className="w-4 h-4 mr-2" />
            Simple Process
          </Badge>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            How Group Buying Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join the revolution of collaborative shopping. Four simple steps to unlock 
            wholesale prices on premium products.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative"
              >
                <Card className="luxury-card text-center h-full">
                  <CardContent className="p-8">
                    {/* Step Number */}
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                        {step.id}
                      </div>
                    </div>

                    {/* Icon */}
                    <motion.div
                      className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </motion.div>

                    {/* Content */}
                    <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          <div>
            <div className="text-3xl font-bold text-primary mb-2">2M+</div>
            <div className="text-sm text-muted-foreground">Active Users</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-success mb-2">₹50Cr+</div>
            <div className="text-sm text-muted-foreground">Total Savings</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-warning mb-2">10K+</div>
            <div className="text-sm text-muted-foreground">Products</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-600 mb-2">99.9%</div>
            <div className="text-sm text-muted-foreground">Success Rate</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}