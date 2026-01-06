import * as z from 'zod'

export const registerStep1Schema = z.object({
	email: z.string().nonempty('Email is required').email('Invalid email'),
	name: z.string().min(3, 'Name must be at least 3 characters')
})

export const registerStep2Schema = z.object({
	username: z.string().min(3, 'Username must be at least 3 characters'),
	password: z.string().min(6, 'Password must be at least 6 characters')
})

export const loginSchema = z.object({
	email: z.string().nonempty('Email is required').email('Invalid email'),
	password: z.string().min(6, 'Password must be at least 6 characters')
})
