import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'

interface IProps {
	item: {
		label: string
		path: string
		icon: LucideIcon
	}
}

export default function SidebarItem({ item }: IProps) {
	const { label, path, icon: Icon } = item
	const pathname = usePathname()
	return (
		<div className="flex flex-row items-center">
			{/* MOBILE SIDEBAR ITEM */}
			<div
				className={cn(
					'relative rounded-full h-14 flex items-center w-full justify-center p-4 hover:bg-slate-300 hover:bg-opacity-10 lg:hidden',
					pathname === path && 'bg-opacity-10 bg-slate-300/10 '
				)}
			>
				<Icon
					size={28}
					color="white"
				/>
			</div>

			{/* DESKTOP SIDEBAR ITEM */}
			<div
				className={`relative hidden lg:flex gap-4 p-4 w-full rounded-full hover:bg-slate-300/10 hover:bg-opacity-10 cursor-pointer items-center ${pathname === path && 'bg-opacity-10 bg-slate-300/10 '}`}
			>
				<Icon
					size={24}
					color="white"
				/>
				<p className="hidden lg:block text-xl text-white">{label}</p>
				{/* {notification ? (
					<BsDot
						className={'text-sky-500 absolute -top-4 left-0'}
						size={70}
					/>
				) : null} */}
			</div>
		</div>
	)
}
