'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Users, Clock, Zap } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

const liveUpdates = [
  {
    id: 1,
    type: 'group_formed',
    icon: Users,
    text: 'iPhone 15 Pro group just reached 50 members!',
    time: '2m ago',
    urgent: true
  },
  {
    id: 2,
    type: 'deal_unlocked',
    icon: TrendingUp,
    text: 'MacBook Air M3 - 35% discount unlocked!',
    time: '5m ago',
    urgent: false
  },
  {
    id: 3,
    type: 'time_sensitive',
    icon: Clock,
    text: 'Sony WH-1000XM5 group closing in 30 minutes',
    time: '1m ago',
    urgent: true
  },
  {
    id: 4,
    type: 'flash_deal',
    icon: Zap,
    text: 'Flash Deal: Samsung Galaxy S24 - 40% off!',
    time: 'Just now',
    urgent: true
  },
  {
    id: 5,
    type: 'milestone',
    icon: TrendingUp,
    text: '₹10 Lakhs saved by our community today!',
    time: '10m ago',
    urgent: false
  },
  {
    id: 6,
    type: 'new_group',
    icon: Users,
    text: 'New group starting: iPad Pro M4 - Join now!',
    time: '3m ago',
    urgent: false
  }
]

export function LiveMarquee() {
  return (
    <section className="py-4 bg-gradient-to-r from-primary/5 to-secondary/5 border-y">
      <div className="relative overflow-hidden">
        <div className="flex items-center space-x-8">
          <Badge className="bg-red-500 text-white font-semibold px-3 py-1 whitespace-nowrap">
            🔴 LIVE
          </Badge>
          
          <div className="flex animate-marquee space-x-12">
            {[...liveUpdates, ...liveUpdates].map((update, index) => {
              const Icon = update.icon
              return (
                <motion.div
                  key={`${update.id}-${index}`}
                  className="flex items-center space-x-3 whitespace-nowrap"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={`p-1.5 rounded-full ${
                    update.urgent 
                      ? 'bg-red-100 text-red-600' 
                      : 'bg-primary/10 text-primary'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {update.text}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {update.time}
                  </span>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}