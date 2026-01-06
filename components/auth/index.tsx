'use client'

import useLoginModal from '@/hooks/useLoginModal'
import useRegisterModal from '@/hooks/useRegisterModal'
import X from '@/public/images/x.svg'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { useCallback } from 'react'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import LoginModal from '../modals/LoginModal'
import RegisterModal from '../modals/register-modal/RegisterModal'
import { Button } from '../ui/button'

export default function Auth() {
	const registerModal = useRegisterModal()
	const loginModal = useLoginModal()

	const onOpenRegisterModal = useCallback(() => {
		registerModal.onOpen()
	}, [registerModal])

	const onOpenLoginModal = useCallback(() => {
		loginModal.onOpen()
	}, [loginModal])

	return (
		<>
			{loginModal.isOpen && <LoginModal />}
			{registerModal.isOpen && <RegisterModal />}
			<section className="container mx-auto">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center h-screen">
					<Image
						src={X}
						alt="X"
						width={450}
						height={450}
						className="justify-self-center hidden md:block"
					/>

					<div className="flex flex-col justify-center max-md:gap-y-6 md:justify-between h-screen md:h-[60vh] max-md:px-5">
						<div className="block md:hidden">
							<Image
								src={X}
								alt="X"
								width={50}
								height={50}
							/>
						</div>
						<h1 className="text-2xl md:text-4xl lg:text-6xl font-extrabold">
							Happening Now
						</h1>
						<div className=" w-full md:w-3/5">
							<h2 className=" text-xl md:text-3xl font-bold mb-4">Join Now</h2>
							<div className="flex flex-col space-y-2">
								<Button
									size={'lg'}
									onClick={() => signIn('google')}
								>
									<FcGoogle />
									<span>Signin with Google</span>
								</Button>
								<Button
									size={'lg'}
									onClick={() => signIn('github')}
								>
									<AiFillGithub />
									<span>Signin with Github</span>
								</Button>
								<div className="flex items-center justify-center">
									<div className="h-px w-1/2 bg-neutral-700" />
									<span className="mx-4 font-semibold">OR</span>
									<div className="h-px w-1/2 bg-neutral-700" />
								</div>
								<Button
									size={'lg'}
									variant={'secondary'}
									onClick={onOpenRegisterModal}
								>
									Create Account
								</Button>
								<p className="text-xs text-neutral-400">
									By signing up, you agree to the{' '}
									<span className="text-blue-400">Terms of Service</span> and
									<span className="text-blue-400">Privacy Policy</span>,
									including <span className="text-blue-400">Cookie Use.</span>
								</p>
							</div>
						</div>
						<div className="w-full md:w-3/5">
							<h3 className="font-medium tex-xl mb-4">
								Already have an account?
							</h3>
							<Button
								size={'lg'}
								className="w-full"
								variant={'outline'}
								onClick={onOpenLoginModal}
							>
								Sign in
							</Button>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}
