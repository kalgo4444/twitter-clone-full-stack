import * as z from 'zod'

export const registerStep1Schema = z.object({
	email: z.string().email().min(1),
	name: z.string().min(3)
})

export const registerStep2Schema = z.object({
	username: z.string().min(3),
	password: z.string().min(6)
})

export const loginSchema = z.object({
	email: z.string().email().min(1),
	password: z.string().min(6)
})
