'use client'

import useUsers from '@/hooks/useUsers'
import { IUser } from '@/types'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../ui/button'
import User from './user'

export default function FollowBar() {
	const { data: users, isLoading } = useUsers(5)
	console.log(users)
	return (
		<section className="py-4 hidden lg:block w-[266px]">
			<div className="bg-neutral-800 rounded-xl p-4">
				<div className="flex items-center justify-between">
					<h2 className="text-white text font-semibold">Who to follow</h2>
					<Button
						variant={'outline'}
						className="h-7 w-fit px-3 text-sm"
					>
						See all
					</Button>
				</div>
			</div>
			{isLoading ? (
				<div className="flex justify-center items-center h-24">
					<Loader2 className="animate-spin text-sky-500" />
				</div>
			) : (
				<div className="flex flex-col mt-4">
					{users?.map((user: IUser) => (
						<Link
							key={user._id}
							href={`/profile/${user._id}`}
						>
							<User
								key={user._id}
								user={user}
							/>
						</Link>
					))}
				</div>
			)}
		</section>
	)
}
