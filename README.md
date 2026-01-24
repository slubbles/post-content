# PostContent

> AI-powered content generator that learns your unique voice and creates engaging social media posts in seconds.

[![Next.js](https://img.shields.io/badge/Next.js-16.1-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black)](https://vercel.com)

🔗 **Live Demo**: [postcontent.io](https://postcontent.io)

---

## ✨ Features

### 🎯 AI Content Generation
- **Smart Variations**: Generate 3 unique post variations instantly
- **Tone Presets**: Sarcastic, Raw Builder, Self-Roast, Professional, and more
- **Thread Creator**: Build compelling 5-7 tweet threads on any topic
- **Reply Generator**: Create context-aware replies to others' posts

### 🎨 Voice Training
- **Style Analysis**: Train the AI on your existing posts
- **Brand Voice**: Maintain consistency across all generated content
- **Example Learning**: AI learns from your best-performing content

### 📊 Content Management
- **Generation History**: Save and organize all generated content
- **Search & Filter**: Find past posts by keyword, tone, or platform
- **Export**: Download your content in multiple formats
- **Analytics**: Track generation patterns and usage

### 💳 Subscription Plans
- **Free**: 10 generations/month
- **Pro**: 200 generations/month + advanced features
- **Enterprise**: Unlimited + API access + custom training

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **PostgreSQL** database (we recommend [Neon](https://neon.tech))
- **npm/yarn/pnpm** package manager

### 1. Clone Repository

```bash
git clone https://github.com/slubbles/post-content.git
cd post-content/content-generator
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Copy the example environment file:

```bash
cp .env.example .env.local
```

Configure the following required variables in `.env.local`:

```bash
# Database
DATABASE_URL="postgresql://user:password@host/database"

# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"  # Generate: openssl rand -base64 32

# AI APIs
ANTHROPIC_API_KEY="sk-ant-..."  # https://console.anthropic.com
XAI_API_KEY="xai-..."           # https://console.x.ai

# OAuth (Optional - for Google Sign-In)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-secret"

# Payment (Polar.sh)
POLAR_ACCESS_TOKEN="polar_..."
POLAR_WEBHOOK_SECRET="whsec_..."
POLAR_PRO_MONTHLY_URL="https://polar.sh/..."
POLAR_PRO_ANNUAL_URL="https://polar.sh/..."
POLAR_ENTERPRISE_URL="https://polar.sh/..."

# Email (Resend)
RESEND_API_KEY="re_..."
DEVELOPER_EMAIL="your-email@example.com"

# Vercel Blob Storage
BLOB_READ_WRITE_TOKEN="vercel_blob_rw_..."
```

### 4. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# (Optional) Seed with sample data
npx prisma db seed
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📚 Tech Stack

### Core Framework
- **[Next.js 16.1](https://nextjs.org/)** - React framework with App Router
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type-safe development
- **[React 19.2](https://react.dev/)** - UI library

### Database & ORM
- **[PostgreSQL](https://www.postgresql.org/)** - Primary database
- **[Prisma 5.22](https://www.prisma.io/)** - Type-safe ORM
- **[Neon](https://neon.tech/)** - Serverless Postgres hosting

### Authentication
- **[NextAuth v5](https://authjs.dev/)** - Authentication framework
- **Google OAuth** - Social login
- **Credentials** - Email/password auth

### AI & APIs
- **[Anthropic Claude](https://www.anthropic.com/)** - Content generation (Claude Sonnet 4)
- **[XAI Grok](https://x.ai/)** - Alternative AI model
- **Streaming Responses** - Real-time generation

### Payments
- **[Polar.sh](https://polar.sh/)** - Subscription management
- **Webhook Integration** - Automated subscription sync
- **HMAC Verification** - Secure webhook handling

### UI & Styling
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Utility-first CSS
- **[Radix UI](https://www.radix-ui.com/)** - Accessible components
- **[Lucide Icons](https://lucide.dev/)** - Icon library
- **shadcn/ui** - Component library

### Email
- **[Resend](https://resend.com/)** - Transactional emails
- **[React Email](https://react.email/)** - Email templates

### Storage
- **[Vercel Blob](https://vercel.com/docs/storage/vercel-blob)** - File storage for avatars/photos

### Deployment
- **[Vercel](https://vercel.com/)** - Hosting & CI/CD
- **Edge Functions** - Global low-latency API routes

---

## 🏗️ Project Structure

```
content-generator/
├── app/                      # Next.js App Router
│   ├── api/                  # API routes
│   │   ├── auth/            # Authentication endpoints
│   │   ├── generate/        # Content generation
│   │   ├── subscription/    # Subscription management
│   │   ├── webhooks/        # Payment webhooks
│   │   └── upload/          # File uploads
│   ├── (auth)/              # Auth pages (login, signup)
│   ├── dashboard/           # User dashboard
│   ├── blog/                # Marketing blog
│   └── layout.tsx           # Root layout
├── components/              # React components
│   ├── ui/                  # shadcn/ui components
│   ├── *-section.tsx        # Feature sections
│   └── *.tsx                # Page-specific components
├── lib/                     # Utility functions
│   ├── auth.ts              # NextAuth configuration
│   ├── db.ts                # Prisma client
│   ├── rate-limit.ts        # Rate limiting logic
│   └── usage.ts             # Usage tracking
├── prisma/                  # Database
│   └── schema.prisma        # Database schema
├── public/                  # Static assets
├── styles/                  # Global styles
└── types/                   # TypeScript types
```

---

## 🔒 Security Features

- ✅ **Rate Limiting**: 60 req/min general, 10 req/min for AI generation
- ✅ **Webhook Verification**: HMAC-SHA256 signature validation
- ✅ **CSRF Protection**: Built into NextAuth
- ✅ **Input Sanitization**: XSS prevention on user inputs
- ✅ **Password Hashing**: bcrypt with salt rounds
- ✅ **Environment Variables**: Secrets never committed to git

---

## 🌐 API Routes

### Authentication
- `POST /api/auth/register` - Create new account
- `POST /api/auth/signin` - Email/password login
- `GET /api/auth/signout` - Logout
- `GET /api/auth/me` - Get current user

### Content Generation
- `POST /api/generate` - Generate post variations
- `POST /api/generate/thread` - Create thread
- `POST /api/generate/reply` - Generate reply

### History
- `GET /api/history` - Fetch generation history
- `DELETE /api/history/:id` - Delete post

### Subscription
- `POST /api/checkout` - Create Polar checkout session
- `POST /api/subscription/cancel` - Cancel subscription
- `POST /api/webhooks/polar` - Handle payment webhooks

### Upload
- `POST /api/upload/photo` - Upload avatar to Vercel Blob

### Admin
- `GET /api/usage` - Get usage stats
- `POST /api/affiliate/track` - Track referrals

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for full endpoint details.

---

## 🧪 Development

### Available Scripts

```bash
# Development
npm run dev          # Start dev server (localhost:3000)

# Build
npm run build        # Production build
npm run start        # Start production server

# Database
npx prisma studio    # Open Prisma Studio GUI
npx prisma migrate   # Create migration
npx prisma db push   # Push schema to database

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | ✅ | PostgreSQL connection string |
| `NEXTAUTH_SECRET` | ✅ | NextAuth encryption key |
| `ANTHROPIC_API_KEY` | ✅ | Claude AI API key |
| `XAI_API_KEY` | ✅ | Grok AI API key |
| `POLAR_ACCESS_TOKEN` | ✅ | Polar.sh API token |
| `POLAR_WEBHOOK_SECRET` | ✅ | Webhook signature secret |
| `BLOB_READ_WRITE_TOKEN` | ✅ | Vercel Blob storage token |
| `RESEND_API_KEY` | ✅ | Email sending API key |
| `GOOGLE_CLIENT_ID` | ❌ | Google OAuth (optional) |
| `GOOGLE_CLIENT_SECRET` | ❌ | Google OAuth (optional) |

---

## 🚢 Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/slubbles/post-content)

1. **Push to GitHub**
```bash
git push origin main
```

2. **Import to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your repository
   - Vercel auto-detects Next.js

3. **Add Environment Variables**
   - Settings → Environment Variables
   - Add all required variables from `.env.local`
   - Apply to: Production, Preview, Development

4. **Setup Vercel Blob**
   - Storage tab → Create Database → Blob
   - Token auto-added to environment variables

5. **Configure Polar Webhook**
   - Polar dashboard → Webhooks
   - URL: `https://your-domain.vercel.app/api/webhooks/polar`
   - Events: `subscription.*`

6. **Deploy!**
   - Vercel auto-deploys on every push to main
   - Preview deployments for PRs

---

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Test thoroughly
5. Commit: `git commit -m 'feat: add amazing feature'`
6. Push: `git push origin feature/amazing-feature`
7. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Anthropic](https://www.anthropic.com/) for Claude AI
- [Vercel](https://vercel.com/) for hosting & infrastructure
- [Polar.sh](https://polar.sh/) for payment processing
- [shadcn](https://ui.shadcn.com/) for UI components
- All our contributors and supporters

---

## 📞 Support

- **Documentation**: [postcontent.io/docs](https://postcontent.io/docs)
- **Email**: support@postcontent.io
- **GitHub Issues**: [Report a bug](https://github.com/slubbles/post-content/issues)
- **Twitter**: [@postcontent](https://twitter.com/postcontent)

---

Made with ❤️ by the PostContent team
