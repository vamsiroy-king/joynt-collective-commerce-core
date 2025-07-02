'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Play, Users, TrendingUp, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'

const heroProducts = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    originalPrice: "₹1,59,900",
    groupPrice: "₹89,999",
    discount: "44%",
    participants: 847,
    timeLeft: "2h 15m",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop"
  },
  {
    id: 2,
    name: "MacBook Air M3",
    originalPrice: "₹1,14,900",
    groupPrice: "₹79,999",
    discount: "30%",
    participants: 623,
    timeLeft: "5h 42m",
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop"
  },
  {
    id: 3,
    name: "Sony WH-1000XM5",
    originalPrice: "₹29,990",
    groupPrice: "₹18,999",
    discount: "37%",
    participants: 1205,
    timeLeft: "1h 28m",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop"
  }
]

export function HeroSection() {
  const [currentProduct, setCurrentProduct] = useState(0)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProduct((prev) => (prev + 1) % heroProducts.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const product = heroProducts[currentProduct]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with parallax */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5"
      />
      
      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: i * 1.3,
            }}
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <Badge className="bg-luxury-gold text-black font-semibold px-4 py-2">
                <Zap className="w-4 h-4 mr-2" />
                India's #1 Group Buying Platform
              </Badge>
              
              <motion.h1
                className="text-5xl lg:text-7xl font-heading font-bold leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Shop Together,
                <br />
                <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                  Save More
                </span>
              </motion.h1>
              
              <motion.p
                className="text-xl text-muted-foreground leading-relaxed max-w-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Join millions of smart shoppers and unlock wholesale prices through 
                the power of group buying. Save up to 70% on premium products.
              </motion.p>
            </div>

            {/* Stats */}
            <motion.div
              className="flex items-center space-x-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">2M+</div>
                <div className="text-sm text-muted-foreground">Happy Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-success">₹50Cr+</div>
                <div className="text-sm text-muted-foreground">Saved</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-warning">99.9%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Button size="lg" className="text-lg px-8 py-4 h-14 luxury-gradient">
                Start Saving Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button variant="outline" size="lg" className="text-lg px-8 py-4 h-14">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Content - Product Showcase */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="luxury-card max-w-md mx-auto">
              <div className="relative overflow-hidden rounded-xl mb-6">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-red-500 text-white">
                    -{product.discount}
                  </Badge>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold">{product.name}</h3>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-success">
                      {product.groupPrice}
                    </div>
                    <div className="text-sm text-muted-foreground line-through">
                      {product.originalPrice}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="w-4 h-4 mr-1" />
                      {product.participants} joined
                    </div>
                    <div className="text-sm font-medium text-warning">
                      {product.timeLeft} left
                    </div>
                  </div>
                </div>
                
                <Button className="w-full" size="lg">
                  Join Group Buy
                </Button>
              </div>
            </div>

            {/* Product indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {heroProducts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentProduct(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentProduct 
                      ? 'bg-primary scale-125' 
                      : 'bg-muted hover:bg-muted-foreground/50'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}