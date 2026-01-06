const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function checkDatabase() {
  try {
    console.log('\n📊 DATABASE STATUS:\n')
    
    // Count users
    const userCount = await prisma.user.count()
    console.log(`👥 Users: ${userCount}`)
    
    if (userCount > 0) {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          email: true,
          name: true,
          createdAt: true,
          subscribed: true,
          subscriptionStatus: true,
        }
      })
      console.log('   Details:', JSON.stringify(users, null, 2))
    }
    
    // Count accounts (OAuth)
    const accountCount = await prisma.account.count()
    console.log(`\n🔐 OAuth Accounts: ${accountCount}`)
    
    if (accountCount > 0) {
      const accounts = await prisma.account.findMany({
        select: {
          provider: true,
          userId: true,
        }
      })
      console.log('   Details:', JSON.stringify(accounts, null, 2))
    }
    
    // Count sessions
    const sessionCount = await prisma.session.count()
    console.log(`\n🔑 Active Sessions: ${sessionCount}`)
    
    // Count posts
    const postCount = await prisma.post.count()
    console.log(`\n📝 Generated Posts: ${postCount}`)
    
    if (postCount > 0) {
      const recentPosts = await prisma.post.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          type: true,
          content: true,
          createdAt: true,
          user: {
            select: { email: true }
          }
        }
      })
      console.log('   Recent 5 posts:', JSON.stringify(recentPosts, null, 2))
    }
    
    console.log('\n✅ Database check complete!\n')
  } catch (error) {
    console.error('❌ Database error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkDatabase()
