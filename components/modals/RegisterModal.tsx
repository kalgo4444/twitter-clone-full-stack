'use client'

import useLoginModal from '@/hooks/useLoginModal'
import useRegisterModal from '@/hooks/useRegisterModal'
import { registerStep1Schema, registerStep2Schema } from '@/lib/validation'
import {
	registerStep1Service,
	registerStep2Service
} from '@/services/auth/auth.service'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { signIn } from 'next-auth/react'
import { Dispatch, SetStateAction, useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import Modal from '../ui/modal'

export default function RegisterModal() {
	const loginModal = useLoginModal()
	const registerModal = useRegisterModal()

	const onToggle = useCallback(() => {
		loginModal.onOpen()
		registerModal.onClose()
	}, [loginModal, registerModal])

	const [step, setStep] = useState(1)
	const [data, setData] = useState({
		email: '',
		name: ''
	})

	const bodyContent =
		step === 1 ? (
			<RegisterStep1
				setData={setData}
				setStep={setStep}
			/>
		) : (
			<RegisterStep2 data={data} />
		)

	const footer = (
		<div className="text-neutral-400 text-center">
			<p>
				Already have an account?{' '}
				<span
					onClick={onToggle}
					className="text-white cursor-pointer underline"
				>
					Sign in
				</span>
			</p>
		</div>
	)

	return (
		<Modal
			body={bodyContent}
			footer={footer}
			isOpen={registerModal.isOpen}
			onClose={registerModal.onClose}
			step={step}
			totalSteps={2}
		/>
	)
}

function RegisterStep1({
	setData,
	setStep
}: {
	setData: Dispatch<SetStateAction<{ email: string; name: string }>>
	setStep: Dispatch<SetStateAction<number>>
}) {
	const form = useForm<z.infer<typeof registerStep1Schema>>({
		resolver: zodResolver(registerStep1Schema),
		defaultValues: {
			name: '',
			email: ''
		}
	})

	async function onSubmit(values: z.infer<typeof registerStep1Schema>) {
		try {
			const res = await registerStep1Service(values)
			if (res.success) {
				setData(values)
				setStep(2)
				form.reset()
			}
		} catch (err: unknown) {
			if (err instanceof AxiosError) {
				form.setError('root', {
					type: 'manual',
					message: err.response?.data?.error
				})
			}
		}
	}
	return (
		<Form {...form}>
			<h3 className="text-center text-2xl font-bold mb-4">Register</h3>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-4"
			>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									placeholder="Name"
									{...field}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

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
				<Button
					className="w-full"
					variant={'secondary'}
					size={'lg'}
					disabled={form.formState.isSubmitting}
				>
					Next
				</Button>
			</form>
		</Form>
	)
}

function RegisterStep2({ data }: { data: { name: string; email: string } }) {
	const registerModal = useRegisterModal()
	const form = useForm<z.infer<typeof registerStep2Schema>>({
		resolver: zodResolver(registerStep2Schema),
		defaultValues: {
			password: '',
			username: ''
		}
	})

	async function onSubmit(values: z.infer<typeof registerStep2Schema>) {
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
