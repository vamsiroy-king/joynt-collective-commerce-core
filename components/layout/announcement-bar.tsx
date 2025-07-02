'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Sparkles, TrendingUp, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'

const announcements = [
  {
    id: 1,
    icon: Sparkles,
    text: "🎉 New Year Sale: Up to 70% off on electronics! Limited time offer.",
    cta: "Shop Now",
    urgent: true
  },
  {
    id: 2,
    icon: TrendingUp,
    text: "📱 iPhone 15 Pro group buy starting in 2 hours - 45% discount guaranteed!",
    cta: "Join Group",
    urgent: false
  },
  {
    id: 3,
    icon: Users,
    text: "🔥 10,000+ users saved ₹2.5 Crores this month through group buying!",
    cta: "Learn More",
    urgent: false
  }
]

export function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  if (!isVisible) return null

  const currentAnnouncement = announcements[currentIndex]
  const Icon = currentAnnouncement.icon

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`relative overflow-hidden ${
        currentAnnouncement.urgent 
          ? 'bg-gradient-to-r from-red-500 to-pink-500' 
          : 'bg-gradient-to-r from-primary to-blue-600'
      } text-white`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center space-x-3 flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentAnnouncement.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex items-center space-x-3"
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                <span className="text-sm font-medium">
                  {currentAnnouncement.text}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20 text-xs font-semibold"
            >
              {currentAnnouncement.cta}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsVisible(false)}
              className="text-white hover:bg-white/20 p-1"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Progress indicator */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-white/30"
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 4, ease: "linear" }}
        key={currentAnnouncement.id}
      />
    </motion.div>
  )
}