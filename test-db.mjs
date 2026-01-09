// Quick test to verify users are being saved to database
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function testDatabase() {
  try {
    console.log('🔍 Checking database connection...')
    
    // Count users
    const userCount = await prisma.user.count()
    console.log(`✅ Total users in database: ${userCount}`)
    
    // Get recent users (last 5)
    const recentUsers = await prisma.user.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        subscribed: true,
        accounts: {
          select: {
            provider: true
          }
        }
      }
    })
    
    console.log('\n📋 Recent users:')
    recentUsers.forEach(user => {
      const authMethod = user.accounts.length > 0 
        ? user.accounts.map(a => a.provider).join(', ')
        : 'credentials'
      console.log(`  - ${user.email} (${user.name}) - ${authMethod} - ${user.createdAt.toISOString()}`)
    })
    
    // Check for users with passwords (email/password signup)
    const credentialUsers = await prisma.user.count({
      where: { password: { not: null } }
    })
    console.log(`\n🔐 Users with password auth: ${credentialUsers}`)
    
    // Check for OAuth users
    const oauthUsers = await prisma.user.count({
      where: { accounts: { some: {} } }
    })
    console.log(`🔗 Users with OAuth: ${oauthUsers}`)
    
    console.log('\n✅ Database verification complete!')
  } catch (error) {
    console.error('❌ Database test failed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testDatabase()
