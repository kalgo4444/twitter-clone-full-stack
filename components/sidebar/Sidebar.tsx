'use client'

import Logo from '@/public/images/logo.svg'
import { Bell, Home, Search, UserIcon } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import SidebarAccount from './sidebar-account'
import SidebarItem from './sidebar-item'
import SideBarPostBtn from './sidebar-post-btn'

export default function Sidebar() {
	const { data: session, status }: any = useSession()

	const sidebarItems = [
		{
			label: 'Home',
			path: '/',
			icon: Home
		},
		{
			label: 'Notification',
			path: `/notification/${status === 'authenticated' && String(session?.currentUser?._id)}`,
			icon: Bell
		},
		{
			label: 'Profile',
			path: `/profile/${status === 'authenticated' && String(session?.currentUser?._id)}`,
			icon: UserIcon
		},
		{ label: 'Explore', path: '/explore', icon: Search }
	]

	return (
		<section className="sticky left-0 top-0 h-screen lg:w-[266px] w-fit flex flex-col justify-between py-4 px-2">
			<div className="flex flex-col space-y-2">
				<div className="rounded-full h-14 w-14 p-4 flex items-center justify-center hover:bg-sky-300 hover:bg-opacity-10 cursor-pointer transition">
					<Image
						width={56}
						height={56}
						src={Logo}
						alt="logo"
					/>
				</div>

				{sidebarItems.map((item, inx) => (
					<Link
						key={inx}
						href={item.path}
					>
						<SidebarItem item={item} />
					</Link>
				))}

				<SideBarPostBtn />
			</div>
			<SidebarAccount user={session?.currentUser} />
		</section>
	)
}
