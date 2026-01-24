import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function checkUser() {
  try {
    // Get all users to see what we have
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        emailVerified: true,
        createdAt: true,
        accounts: {
          select: {
            provider: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 5
    })
    
    console.log('\n📊 Recent Users in Database:\n')
    users.forEach((user, i) => {
      console.log(`${i + 1}. ID: ${user.id}`)
      console.log(`   Email: ${user.email || '❌ NO EMAIL'}`)
      console.log(`   Name: ${user.name || 'N/A'}`)
      console.log(`   Email Verified: ${user.emailVerified ? '✅' : '❌'}`)
      console.log(`   Auth: ${user.accounts.map(a => a.provider).join(', ') || 'credentials'}`)
      console.log(`   Created: ${user.createdAt}`)
      console.log('')
    })
    
    // Check for users without email
    const noEmailCount = await prisma.user.count({
      where: {
        email: null
      }
    })
    
    if (noEmailCount > 0) {
      console.log(`⚠️  WARNING: ${noEmailCount} users without email in database!`)
    }
    
  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkUser()
