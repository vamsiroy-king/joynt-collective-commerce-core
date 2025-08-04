# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/5d086ea8-7f7a-4cfa-aaf5-d4171579cceb

## Google API Integration

This project now includes comprehensive Google API integration designed for use with Google for Education (Students Pro) accounts. 

### 🎓 Students Pro Benefits
- **$300 in Google Cloud credits** (12 months)
- Access to premium Google APIs
- Free tier allowances for most services
- Educational support and resources

### 🚀 Available Integrations
- **Google Maps** - Location services and delivery zones
- **Google Translate** - Multi-language support for global reach
- **Google AI (Gemini)** - AI-powered content generation
- **Google Analytics** - User behavior and conversion tracking
- **Google Cloud Vision** - Image analysis and processing

### 📖 Quick Start

1. **Set up your Google Cloud project** using your student account
2. **Enable required APIs** in Google Cloud Console
3. **Configure environment variables** (see `.env.example`)
4. **Visit `/google-api-demo`** to test the integration
5. **Read the full guide** at `docs/GOOGLE_API_SETUP.md`

### 🔧 Configuration

Copy `.env.example` to `.env.local` and add your API keys:

```env
# Google APIs (get these from Google Cloud Console)
GOOGLE_API_KEY=your_google_api_key
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
GOOGLE_ANALYTICS_ID=your_google_analytics_id
GOOGLE_AI_API_KEY=your_google_ai_api_key
```

### 🌐 Using with External AI Applications

Your Google API keys can be used in other AI applications like "trae":

1. **Get your Gemini API key** from Google Cloud Console
2. **Use the endpoint**: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent`
3. **Follow the authentication format** in the documentation

See `docs/GOOGLE_API_SETUP.md` for detailed instructions.

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/5d086ea8-7f7a-4cfa-aaf5-d4171579cceb) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Next.js
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Google APIs Integration
- Clerk Authentication
- Stripe Payments
- Pusher Real-time

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/5d086ea8-7f7a-4cfa-aaf5-d4171579cceb) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
