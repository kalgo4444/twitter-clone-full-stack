import { authOption } from '@/lib/auth-options'
import NextAuth from 'next-auth'

const handle = NextAuth(authOption)
export { handle as GET, handle as POST }
