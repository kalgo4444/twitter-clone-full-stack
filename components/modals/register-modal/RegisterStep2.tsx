'use client'

import useRegisterModal from '@/hooks/useRegisterModal'
import { registerStep2Schema } from '@/lib/validation'
import { registerStep2Service } from '@/services/auth/auth.service'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '../../ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage
} from '../../ui/form'
import { Input } from '../../ui/input'

type RegisterStep2Values = z.infer<typeof registerStep2Schema>

export default function RegisterStep2({
	data
}: {
	data: { name: string; email: string }
}) {
	const registerModal = useRegisterModal()
	const form = useForm<RegisterStep2Values>({
		resolver: zodResolver(registerStep2Schema),
		defaultValues: {
			password: '',
			username: ''
		}
	})

	async function onSubmit(values: RegisterStep2Values) {
		try {
			const res = await registerStep2Service({ ...data, ...values })
			if (res.success) {
				await signIn('credentials', {
					email: data.email,
					password: values.password
				})
				registerModal.onClose()
				form.reset()
			}
		} catch (err: unknown) {
			if (err instanceof AxiosError) {
				form.setError('username', {
					type: 'manual',
					message: err.response?.data.error
				})
			}
		}
	}
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-4"
			>
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									placeholder="Username"
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
					Register
				</Button>
			</form>
		</Form>
	)
}
