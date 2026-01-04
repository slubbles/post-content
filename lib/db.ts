import { neon } from '@neondatabase/serverless';

// Optional database connection (not required for Week 3)
export const sql = process.env.DATABASE_URL 
  ? neon(process.env.DATABASE_URL)
  : null;

// Test connection
export async function testConnection() {
  if (!sql) {
    console.log('Database not configured');
    return false;
  }
  
  try {
    const result = await sql`SELECT NOW()`;
    console.log('✓ Database connected:', result[0].now);
    return true;
  } catch (error) {
    console.error('✗ Database connection failed:', error);
    return false;
  }
}
