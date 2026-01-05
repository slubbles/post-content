# OAuth & Database Setup Guide

## 🔑 Google OAuth Setup

### Step 1: Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API (or Google Identity)

### Step 2: Create OAuth Credentials
1. Go to **APIs & Services** → **Credentials**
2. Click **Create Credentials** → **OAuth client ID**
3. Choose **Web application**
4. Add authorized redirect URIs:
   ```
   http://localhost:3000/api/auth/callback/google
   https://postcontent.io/api/auth/callback/google
   https://your-vercel-url.vercel.app/api/auth/callback/google
   ```
5. Copy **Client ID** and **Client Secret**

### Step 3: Add to .env.local
```env
GOOGLE_CLIENT_ID=your-client-id-here.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret-here
```

---

## 🗄️ Database Setup (Vercel Postgres - FREE)

### Option 1: Vercel Postgres (Recommended)
**Why:** Free tier, automatic backups, easy integration

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project (postcontent)
3. Go to **Storage** tab → **Create Database**
4. Choose **Postgres** → **Continue**
5. Copy connection string from **`.env.local`** tab
6. Add to your local `.env.local`:
   ```env
   DATABASE_URL="postgres://username:password@host/database"
   ```

### Option 2: Supabase (Alternative)
**Why:** Includes auth + storage + realtime

1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Go to **Project Settings** → **Database**
4. Copy **Connection string** (URI mode)
5. Add to `.env.local`:
   ```env
   DATABASE_URL="postgresql://postgres:[password]@[host]:5432/postgres"
   ```

---

## 📦 Prisma Setup

### Step 1: Install Prisma
```bash
npm install @prisma/client
npm install -D prisma
```

### Step 2: Initialize Prisma
```bash
npx prisma init
```

### Step 3: Update `prisma/schema.prisma`
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id            String    @id @default(cuid())
  name          String?
  email         String?   @unique
  emailVerified DateTime?
  image         String?
  accounts      Account[]
  sessions      Session[]
  posts         Post[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?
  user              User    @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model Post {
  id        String   @id @default(cuid())
  content   String
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())
  
  @@index([userId])
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}
```

### Step 4: Run Migrations
```bash
npx prisma migrate dev --name init
npx prisma generate
```

### Step 5: Update NextAuth Config
Edit `lib/auth.ts`:
```typescript
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  // ... rest of config
});
```

---

## 🚀 Usage Tracking Setup

Once database is connected, you can track post generation:

```typescript
// lib/db.ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Track usage
export async function trackPostGeneration(userId: string) {
  const today = new Date();
  const month = today.getMonth();
  const year = today.getFullYear();
  
  const count = await prisma.post.count({
    where: {
      userId,
      createdAt: {
        gte: new Date(year, month, 1),
      },
    },
  });
  
  return {
    used: count,
    limit: 10, // Free tier
    remaining: Math.max(0, 10 - count),
  };
}
```

---

## ✅ Final Checklist

- [ ] Google OAuth credentials created
- [ ] `.env.local` updated with `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`
- [ ] Database created (Vercel Postgres or Supabase)
- [ ] `.env.local` updated with `DATABASE_URL`
- [ ] Prisma installed (`@prisma/client` + `prisma`)
- [ ] Prisma schema created
- [ ] Migrations run (`npx prisma migrate dev`)
- [ ] NextAuth updated with PrismaAdapter
- [ ] Test login flow works
- [ ] Usage tracking implemented

---

## 🆘 Troubleshooting

**"Invalid redirect URI"**
- Make sure you added all callback URLs to Google Console
- Format: `https://yourdomain.com/api/auth/callback/google`

**"Database connection failed"**
- Check DATABASE_URL format
- Ensure database is publicly accessible (if using external host)
- Verify username/password are correct

**"Prisma Client not generated"**
- Run `npx prisma generate`
- Restart your dev server

**"Session not persisting"**
- Clear browser cookies
- Check NEXTAUTH_SECRET is set
- Verify database migrations ran successfully
