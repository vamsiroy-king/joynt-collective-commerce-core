import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from 'sonner'
import { QueryProvider } from '@/components/providers/query-provider'
import { CustomCursor } from '@/components/ui/custom-cursor'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Joynt - Premium Group Buying Platform',
  description: 'Join millions of smart shoppers on Joynt, India\'s most advanced group buying platform. Shop together, save more with AI-powered deals.',
  keywords: 'group buying, e-commerce, shopping, deals, India, premium',
  authors: [{ name: 'Joynt Team' }],
  openGraph: {
    title: 'Joynt - Premium Group Buying Platform',
    description: 'Join millions of smart shoppers on Joynt, India\'s most advanced group buying platform.',
    url: 'https://joynt.com',
    siteName: 'Joynt',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Joynt - Premium Group Buying Platform',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Joynt - Premium Group Buying Platform',
    description: 'Join millions of smart shoppers on Joynt, India\'s most advanced group buying platform.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <QueryProvider>
            <CustomCursor />
            {children}
            <Toaster 
              position="top-right" 
              richColors 
              closeButton
              toastOptions={{
                duration: 4000,
                style: {
                  background: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  color: 'hsl(var(--card-foreground))',
                },
              }}
            />
          </QueryProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}