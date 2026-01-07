import Auth from '@/components/auth'
import FollowBar from '@/components/shared/FollowBar'
import Sidebar from '@/components/sidebar/Sidebar'
import { Toaster } from '@/components/ui/sonner'
import { authOption } from '@/lib/auth-options'
import { getServerSession } from 'next-auth'
import NextTopLoader from 'nextjs-toploader'

export default async function AppLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	const session = await getServerSession(authOption)

	if (!session) {
		return <Auth />
	}

	console.log(session)
	return (
		<div className="lg:container h-screen mx-auto lg:max-w-7xl">
			<div className="flex">
				<Sidebar />
				<div className="flex flex-1 border-x-2 border-neutral-800 lg:mx-4 ml-1">
					<div className="w-full">
						<NextTopLoader
							color="#2299DD"
							initialPosition={0.08}
							crawl={true}
							crawlSpeed={200}
							height={3}
							showSpinner={true}
							easing="easy"
							speed={200}
							shadow="0 0 10px #2299DD, 0 0 5px #2299DD"
						/>
						{children}
						<Toaster />
					</div>
				</div>
				<FollowBar />
			</div>
		</div>
	)
}
