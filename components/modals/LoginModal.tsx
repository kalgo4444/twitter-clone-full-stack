'use client'

import useLoginModal from '@/hooks/useLoginModal'
import useRegisterModal from '@/hooks/useRegisterModal'
import { loginSchema } from '@/lib/validation'
import { loginService } from '@/services/auth/auth.service'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { signIn } from 'next-auth/react'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import Modal from '../ui/modal'

export default function LoginModal() {
	const loginModal = useLoginModal()
	const registerModal = useRegisterModal()

	const onToggle = useCallback(() => {
		loginModal.onClose()
		registerModal.onOpen()
	}, [loginModal, registerModal])

	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: ''
		}
	})

	async function onSubmit(values: z.infer<typeof loginSchema>) {
		try {
			console.log(values)
			const res = await loginService(values)
			if (res.success) {
				await signIn('credentials', {
					email: values.email,
					password: values.password
				})
				loginModal.onClose()
				form.reset()
			}
		} catch (err) {
			if (err instanceof AxiosError) {
				const error = err.response?.data
				if (error.type === 'email') {
					form.setError('email', {
						type: 'manual',
						message: error.error
					})
				} else if (error.type === 'password') {
					form.setError('password', {
						type: 'manual',
						message: error.error
					})
				}
			}
		}
	}

	const bodyContent = (
		<div>
			<Form {...form}>
				<h3 className="text-center text-2xl font-bold mb-4">Login</h3>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-4"
				>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										placeholder="Email"
										{...field}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										type="password"
										placeholder="Password"
										{...field}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						className="w-full"
						variant={'secondary'}
						size={'lg'}
						disabled={form.formState.isSubmitting}
					>
						Login
					</Button>
				</form>
			</Form>
		</div>
	)

	const footer = (
		<div className="text-neutral-400 text-center">
			<p>
				First time using X?{' '}
				<span
					onClick={onToggle}
					className="text-white cursor-pointer underline"
				>
					Create Account
				</span>
			</p>
		</div>
	)

	return (
		<Modal
			isOpen={loginModal.isOpen}
			onClose={loginModal.onClose}
			body={bodyContent}
			footer={footer}
		/>
	)
}
