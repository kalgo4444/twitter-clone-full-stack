import Auth from '@/components/auth'
import { authOption } from '@/lib/auth-options'
import { getServerSession } from 'next-auth'

export default async function AppLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	const session = await getServerSession(authOption)

	if (!session) {
		return <Auth />
	}

	return <>{children}</>
}
