# EventHub - African Events & Creators Platform

EventHub is a modern, TikTok-style events platform designed specifically for African creators and event-goers. Discover vibrant events across Africa, support talented creators, and be part of the continent's growing creator economy.

## ✨ Features

### 🎬 TikTok-Style Event Discovery
- **Video Previews**: Watch engaging video previews before purchasing tickets
- **Vertical Feed**: Scroll through events in a familiar, mobile-first interface
- **Interactive Cards**: Like, share, and save events for later

### 👥 Creator Economy
- **Creator Profiles**: Verified creator accounts with bio and portfolio
- **Event Creation**: Easy-to-use event creation tools for creators
- **Revenue Sharing**: Support African creators through ticket sales

### 💳 Local Payment Integration
- **M-Pesa**: Kenya's leading mobile payment solution
- **MTN MoMo**: Mobile money across multiple African countries
- **Paystack**: Card payments and bank transfers
- **Multi-currency Support**: Local currency pricing

### 🌍 African-Focused
- **200+ Cities**: Coverage across major African cities
- **Local Events**: Community-driven event discovery
- **Cultural Celebration**: Showcase African culture and creativity

## 🚀 Technology Stack

### Frontend
- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible UI components
- **React Router** - Client-side routing
- **TanStack Query** - Server state management

### Backend & Database
- **Supabase** - Backend-as-a-Service platform
- **PostgreSQL** - Robust relational database
- **Row Level Security** - Fine-grained access control
- **Real-time Subscriptions** - Live updates and notifications

### Development Tools
- **ESLint** - Code linting and formatting
- **TypeScript ESLint** - TypeScript-specific linting rules
- **PostCSS** - CSS processing and optimization

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ and npm (install with [nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone <YOUR_GIT_URL>
   cd africa-stage-spark
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   - Copy `.env.example` to `.env` (if available)
   - Configure your Supabase credentials:
     ```env
     VITE_SUPABASE_URL=your_supabase_url
     VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
     ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` to see the application

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── EventCard.tsx   # Event display component
│   ├── EventFeed.tsx   # Event listing component
│   ├── Header.tsx      # Navigation header
│   └── Navigation.tsx  # Bottom navigation
├── pages/              # Route components
│   ├── Index.tsx       # Homepage
│   └── NotFound.tsx    # 404 page
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── integrations/       # External service integrations
└── App.tsx            # Main application component

supabase/
├── migrations/         # Database schema migrations
└── config.toml        # Supabase configuration
```

## 🗄️ Database Schema

The application uses Supabase with the following main tables:

- **profiles** - User profiles and creator information
- **Event** - Event details, media, and metadata
- **tickets** - Ticket purchases and attendee information
- **categories** - Event categorization
- **payments** - Payment processing records

## 🚀 Deployment

### Lovable Platform
1. Visit the [Lovable Project](https://lovable.dev/projects/99689e21-0d07-4f69-9060-2a9515e7bbdb)
2. Click Share → Publish
3. Your application will be automatically deployed

### Custom Domain
To connect a custom domain:
1. Navigate to Project > Settings > Domains
2. Click "Connect Domain"
3. Follow the DNS configuration instructions

For more details: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

## 🔧 Environment (Web)

Create a `.env` file in the project root for Supabase:

```
VITE_SUPABASE_URL="https://YOUR_PROJECT.supabase.co"
VITE_SUPABASE_PUBLISHABLE_KEY="YOUR_SUPABASE_ANON_KEY"
VITE_SUPABASE_PROJECT_ID="YOUR_PROJECT_ID"
```

Then run the app locally:

```
npm install
npm run dev
```

## 🤝 Contributing

We welcome contributions to EventHub! Please feel free to submit issues, feature requests, or pull requests.

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is part of the African creator economy initiative. Please respect local laws and creator rights when using this platform.

## 🌟 Stats

- **10K+** Active Creators
- **50K+** Events Hosted
- **200+** Cities Covered
- **1M+** Happy Guests

---

Built with ❤️ for African creators and communities.
