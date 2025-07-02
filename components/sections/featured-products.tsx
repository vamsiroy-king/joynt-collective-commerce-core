'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Heart, Users, Clock, TrendingUp, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'

const featuredProducts = [
  {
    id: 1,
    name: "iPhone 15 Pro Max 256GB",
    brand: "Apple",
    originalPrice: 159900,
    currentPrice: 89999,
    discount: 44,
    participants: 847,
    targetParticipants: 1000,
    timeLeft: "2h 15m",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop",
    category: "Electronics",
    isHot: true,
    progress: 85,
    savings: 69901
  },
  {
    id: 2,
    name: "MacBook Air M3 13-inch",
    brand: "Apple",
    originalPrice: 114900,
    currentPrice: 79999,
    discount: 30,
    participants: 623,
    targetParticipants: 800,
    timeLeft: "5h 42m",
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500&h=500&fit=crop",
    category: "Laptops",
    isHot: false,
    progress: 78,
    savings: 34901
  },
  {
    id: 3,
    name: "Sony WH-1000XM5",
    brand: "Sony",
    originalPrice: 29990,
    currentPrice: 18999,
    discount: 37,
    participants: 1205,
    targetParticipants: 1200,
    timeLeft: "1h 28m",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&h=500&fit=crop",
    category: "Audio",
    isHot: true,
    progress: 100,
    savings: 10991
  },
  {
    id: 4,
    name: "Samsung Galaxy S24 Ultra",
    brand: "Samsung",
    originalPrice: 129999,
    currentPrice: 77999,
    discount: 40,
    participants: 456,
    targetParticipants: 600,
    timeLeft: "3h 15m",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&h=500&fit=crop",
    category: "Smartphones",
    isHot: false,
    progress: 76,
    savings: 52000
  },
  {
    id: 5,
    name: "iPad Pro M4 11-inch",
    brand: "Apple",
    originalPrice: 99900,
    currentPrice: 69999,
    discount: 30,
    participants: 334,
    targetParticipants: 500,
    timeLeft: "6h 45m",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&h=500&fit=crop",
    category: "Tablets",
    isHot: false,
    progress: 67,
    savings: 29901
  },
  {
    id: 6,
    name: "Nintendo Switch OLED",
    brand: "Nintendo",
    originalPrice: 37980,
    currentPrice: 24999,
    discount: 34,
    participants: 789,
    targetParticipants: 800,
    timeLeft: "4h 20m",
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=500&h=500&fit=crop",
    category: "Gaming",
    isHot: true,
    progress: 99,
    savings: 12981
  }
]

export function FeaturedProducts() {
  const [likedProducts, setLikedProducts] = useState<Set<number>>(new Set())

  const toggleLike = (productId: number) => {
    setLikedProducts(prev => {
      const newSet = new Set(prev)
      if (newSet.has(productId)) {
        newSet.delete(productId)
      } else {
        newSet.add(productId)
      }
      return newSet
    })
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price)
  }

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/10">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            <TrendingUp className="w-4 h-4 mr-2" />
            Trending Now
          </Badge>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            Live Group Buys
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join active groups and unlock incredible savings on premium products. 
            The more people join, the bigger the discount!
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <Card className="luxury-card overflow-hidden h-full">
                <div className="relative overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={500}
                    height={300}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Overlay badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    {product.isHot && (
                      <Badge className="bg-red-500 text-white">
                        🔥 Hot Deal
                      </Badge>
                    )}
                    <Badge className="bg-success text-white">
                      -{product.discount}%
                    </Badge>
                  </div>
                  
                  {/* Like button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-4 right-4 h-8 w-8 p-0 bg-white/80 hover:bg-white"
                    onClick={() => toggleLike(product.id)}
                  >
                    <Heart 
                      className={`h-4 w-4 ${
                        likedProducts.has(product.id) 
                          ? 'fill-red-500 text-red-500' 
                          : 'text-gray-600'
                      }`} 
                    />
                  </Button>
                </div>

                <CardContent className="p-6">
                  {/* Product Info */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-xs">
                        {product.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {product.brand}
                      </span>
                    </div>
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                  </div>

                  {/* Pricing */}
                  <div className="mb-4">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl font-bold text-success">
                        {formatPrice(product.currentPrice)}
                      </span>
                      <span className="text-lg text-muted-foreground line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    </div>
                    <div className="text-sm text-success font-medium">
                      You save {formatPrice(product.savings)}
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Group Progress</span>
                      <span className="font-medium">
                        {product.participants}/{product.targetParticipants}
                      </span>
                    </div>
                    <Progress value={product.progress} className="h-2" />
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between mb-6 text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>{product.participants} joined</span>
                    </div>
                    <div className="flex items-center gap-1 text-warning font-medium">
                      <Clock className="w-4 h-4" />
                      <span>{product.timeLeft}</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button 
                    className={`w-full font-semibold ${
                      product.progress >= 100 
                        ? 'bg-success hover:bg-success/90' 
                        : ''
                    }`}
                    size="lg"
                  >
                    {product.progress >= 100 ? (
                      <>
                        <Zap className="w-4 h-4 mr-2" />
                        Deal Unlocked!
                      </>
                    ) : (
                      'Join Group Buy'
                    )}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Load More */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button variant="outline" size="lg" className="px-8">
            Load More Products
          </Button>
        </motion.div>
      </div>
    </section>
  )
}