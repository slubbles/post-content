#!/usr/bin/env node
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function fixMissingEmails() {
  try {
    console.log('🔍 Finding users without emails...\n')
    
    // Find all users without emails who have OAuth accounts
    const usersWithoutEmail = await prisma.user.findMany({
      where: {
        email: null,
        accounts: {
          some: {}
        }
      },
      include: {
        accounts: {
          select: {
            provider: true,
            providerAccountId: true,
            id_token: true,
            access_token: true
          }
        }
      }
    })
    
    if (usersWithoutEmail.length === 0) {
      console.log('✅ No users with missing emails found!')
      return
    }
    
    console.log(`Found ${usersWithoutEmail.length} user(s) without email:\n`)
    
    for (const user of usersWithoutEmail) {
      console.log(`User ID: ${user.id}`)
      console.log(`Name: ${user.name || 'N/A'}`)
      console.log(`Provider: ${user.accounts[0]?.provider}`)
      console.log(`Provider Account ID: ${user.accounts[0]?.providerAccountId}`)
      
      // For Google OAuth, we can try to get email from the provider account ID
      if (user.accounts[0]?.provider === 'google') {
        const providerAccountId = user.accounts[0].providerAccountId
        
        // Google provider account ID is often the email or numeric ID
        // We need to prompt for manual entry or use API to fetch
        console.log('\n⚠️  Action needed:')
        console.log(`   This user logged in with Google but email wasn't saved.`)
        console.log(`   Provider Account ID: ${providerAccountId}`)
        console.log(`   Please manually update this user's email in the database.`)
        console.log(`   Or have them re-login and the new fix will capture it.\n`)
      }
    }
    
    console.log('\n📝 To fix manually:')
    console.log('   Run this SQL in your database:')
    console.log(`   UPDATE "User" SET email = 'their-email@example.com', "emailVerified" = NOW()`)
    console.log(`   WHERE id = 'user-id-here';`)
    
  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

fixMissingEmails()
