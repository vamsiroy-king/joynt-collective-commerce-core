/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'joynt.vercel.app']
    }
  },
  images: {
    domains: [
      'images.unsplash.com',
      'plus.unsplash.com',
      'img.clerk.com',
      'images.clerk.dev'
    ]
  },
  env: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    DATABASE_URL: process.env.DATABASE_URL,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    NEXT_PUBLIC_PUSHER_KEY: process.env.NEXT_PUBLIC_PUSHER_KEY,
    PUSHER_SECRET: process.env.PUSHER_SECRET,
    PUSHER_APP_ID: process.env.PUSHER_APP_ID,
    PUSHER_CLUSTER: process.env.PUSHER_CLUSTER
  }
}

module.exports = nextConfig