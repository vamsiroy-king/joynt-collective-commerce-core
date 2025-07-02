import { AnnouncementBar } from '@/components/layout/announcement-bar'
import { Header } from '@/components/layout/header'
import { HeroSection } from '@/components/sections/hero-section'
import { LiveMarquee } from '@/components/sections/live-marquee'
import { FeaturedProducts } from '@/components/sections/featured-products'
import { HowItWorks } from '@/components/sections/how-it-works'
import { TrustSection } from '@/components/sections/trust-section'
import { Footer } from '@/components/layout/footer'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <AnnouncementBar />
      <Header />
      <HeroSection />
      <LiveMarquee />
      <FeaturedProducts />
      <HowItWorks />
      <TrustSection />
      <Footer />
    </main>
  )
}