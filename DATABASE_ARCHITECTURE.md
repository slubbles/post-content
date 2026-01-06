# Database Architecture - PostContent.io

**Last Updated:** January 6, 2026

---

## 🗄️ Stack Overview

We use **Prisma ORM** + **Neon Serverless Postgres** together:

- **Neon** = Database hosting (serverless Postgres in the cloud)
- **Prisma** = ORM (Object-Relational Mapping) tool to interact with Neon database

Think of it like:
- **Neon** is your house (where data lives)
- **Prisma** is your remote control (how you access/manage data)

---

## 🔧 How It Works

### 1. Database Connection Flow

```
Your App Code
    ↓
Prisma Client (lib/db.ts)
    ↓
DATABASE_URL (environment variable)
    ↓
Neon Postgres Database (cloud)
```

### 2. Configuration Files

**`prisma/schema.prisma`**
```prisma
datasource db {
  provider = "postgresql"          // Type of database
  url      = env("DATABASE_URL")   // Connection string from Neon
}

generator client {
  provider = "prisma-client-js"    // Generates Prisma Client
}

// Your data models...
```

**`.env.local` / Vercel Environment Variables**
```bash
DATABASE_URL="postgresql://username:password@ep-xyz-123.us-east-1.aws.neon.tech/neondb"
#              ↑           ↑         ↑                ↑                              ↑
#           protocol    username  password        Neon hostname                  database
```

---

## 📊 Current Schema

### User Model
```prisma
model User {
  id                 String    @id @default(cuid())
  name               String?
  email              String?   @unique
  emailVerified      DateTime?
  image              String?
  password           String?                    // Hashed with bcrypt
  preferences        String?                    // JSON string for settings
  subscribed         Boolean   @default(false)  // Pro subscription status
  subscriptionStatus String?                    // 'active', 'canceled', etc.
  subscriptionId     String?                    // Polar.sh subscription ID
  subscriptionEndsAt DateTime?                  // Expiration date
  accounts           Account[]                  // OAuth accounts (Google, etc.)
  sessions           Session[]                  // NextAuth sessions
  posts              Post[]                     // Generated posts
  createdAt          DateTime  @default(now())
  updatedAt          DateTime  @updatedAt
}
```

### Post Model
```prisma
model Post {
  id        String   @id @default(cuid())
  content   String                          // The generated post text
  type      String                          // 'generate', 'reply', 'thread'
  userId    String                          // Reference to User
  user      User     @relation(fields: [userId], references: [id])
  createdAt DateTime @default(now())
  
  @@index([userId])                         // Fast lookups by user
  @@index([createdAt])                      // Fast date-based queries
}
```

### Account Model (NextAuth)
```prisma
model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String                   // 'oauth', 'credentials'
  provider          String                   // 'google', 'credentials'
  providerAccountId String                   // Google ID, etc.
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?
  user              User    @relation(fields: [userId], references: [id])
  
  @@unique([provider, providerAccountId])
}
```

### Session Model (NextAuth)
```prisma
model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id])
}
```

---

## 🔄 Migrations Applied

**Migration History:**
1. `20260105084956_init` - Initial schema (User, Post, Account, Session)
2. `20260105111801_add_subscription_fields` - Added subscription tracking
3. `20260105165505_add_password_field` - Added password for credentials auth
4. `20260105170338_add_preferences_field` - Added user preferences JSON

**How Migrations Work:**
- Migrations are version-controlled changes to your database schema
- Each migration has SQL commands to update the database structure
- Prisma generates migrations when you change `schema.prisma`
- Run `npx prisma migrate dev` locally, `npx prisma migrate deploy` in production

---

## 💻 Usage Examples

### Creating a User (Signup)
```typescript
import { prisma } from "@/lib/db"
import bcrypt from "bcryptjs"

const hashedPassword = await bcrypt.hash(password, 10)

const user = await prisma.user.create({
  data: {
    name: "John Doe",
    email: "john@example.com",
    password: hashedPassword,
  },
})
```

### Finding a User (Login)
```typescript
const user = await prisma.user.findUnique({
  where: { email: "john@example.com" },
})

const isValid = await bcrypt.compare(password, user.password)
```

### Tracking Usage (Posts Count)
```typescript
import { prisma } from "@/lib/db"

const count = await prisma.post.count({
  where: {
    userId: "user_id_here",
    createdAt: {
      gte: new Date(2026, 0, 1), // January 1st, 2026
    },
  },
})
```

### Saving Generated Posts
```typescript
await prisma.post.create({
  data: {
    userId: session.user.id,
    content: "Generated post text here",
    type: "generate", // or 'reply', 'thread'
  },
})
```

### Getting User History
```typescript
const posts = await prisma.post.findMany({
  where: { userId: session.user.id },
  orderBy: { createdAt: "desc" },
  take: 50, // Limit to 50 most recent
})
```

---

## 🚀 Common Commands

### Development
```bash
# Generate Prisma Client (after schema changes)
npx prisma generate

# Create new migration (when you edit schema.prisma)
npx prisma migrate dev --name add_new_field

# Open Prisma Studio (database GUI)
npx prisma studio

# Reset database (CAUTION: deletes all data)
npx prisma migrate reset
```

### Production
```bash
# Apply pending migrations (on Vercel)
npx prisma migrate deploy

# View database in Neon dashboard
# Go to https://console.neon.tech
```

---

## 🔐 Security Best Practices

1. **Never expose DATABASE_URL** - It's in `.env.local` (gitignored)
2. **Connection pooling** - Neon handles this automatically
3. **Prisma Client caching** - Use singleton pattern in `lib/db.ts`
4. **SQL injection protection** - Prisma prevents this automatically
5. **Password hashing** - Always use bcrypt (never store plaintext)

---

## 🛠️ Troubleshooting

### "Prisma Client not found"
```bash
npx prisma generate
```

### "Database connection failed"
- Check DATABASE_URL is set correctly in Vercel environment variables
- Verify Neon database is not paused (free tier auto-pauses)
- Test connection: `npx prisma db pull`

### "Migration failed"
- Check if production schema matches local
- Reset and re-apply: `npx prisma migrate reset` (dev only)
- In production: Never reset, only `npx prisma migrate deploy`

### "Types are outdated"
```bash
rm -rf node_modules/.prisma node_modules/@prisma
npm install
npx prisma generate
```

---

## 📈 Scaling Considerations

**Current Setup (Free/Pro tiers):**
- Neon free tier: 0.5 GB storage, 3 GiB transfer
- Prisma Client: Efficient queries, connection pooling
- Indexes: Set on `userId` and `createdAt` for fast lookups

**Future Scaling (Enterprise):**
- Move to Neon Pro ($19/month) for better performance
- Add database read replicas for analytics
- Implement caching layer (Redis) for frequently accessed data
- Consider database sharding if user base grows significantly

---

## 🔗 Useful Links

- **Neon Dashboard**: https://console.neon.tech
- **Prisma Docs**: https://www.prisma.io/docs
- **Prisma Studio**: `npx prisma studio` (local database GUI)
- **NextAuth + Prisma**: https://authjs.dev/reference/adapter/prisma
