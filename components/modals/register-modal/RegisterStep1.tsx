'use client'

import { registerStep1Schema } from '@/lib/validation'
import { registerStep1Service } from '@/services/auth/auth.service'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { Dispatch, SetStateAction } from 'react'
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
import { RegisterStep } from './RegisterModal'

type RegisterStep1Values = z.infer<typeof registerStep1Schema>

export default function RegisterStep1({
	setData,
	setStep
}: {
	setData: Dispatch<SetStateAction<{ email: string; name: string }>>
	setStep: Dispatch<SetStateAction<number>>
}) {
	const form = useForm<RegisterStep1Values>({
		resolver: zodResolver(registerStep1Schema),
		defaultValues: {
			name: '',
			email: ''
		}
	})

	async function onSubmit(values: RegisterStep1Values) {
		try {
			const res: { success: boolean } = await registerStep1Service(values)
			if (res.success) {
				setData(values)
				setStep(RegisterStep.STEP_2)
				form.reset()
			}
		} catch (err) {
			if (axios.isAxiosError(err)) {
				form.setError('email', {
					type: 'manual',
					message: err.response?.data.error
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
