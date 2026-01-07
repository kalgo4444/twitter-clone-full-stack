import User from '@/database/models/user.model'
import { connectToDatabase } from '@/lib/mongoose'
import { hashPassword } from '@/lib/password'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
	try {
		await connectToDatabase()

		const { searchParams } = new URL(req.url)
		const step = searchParams.get('step')

		// step 1 to validate user email
		if (step === '1') {
			const { email } = await req.json()

			//validate with email
			const isExistingUser = await User.findOne({ email })
			if (isExistingUser) {
				return NextResponse.json(
					{ error: 'Email already exists' },
					{ status: 400 }
				)
			}

			return NextResponse.json({ success: true }, { status: 200 })
		} else if (step === '2') {
			// step 2 if email is validate success
			const { name, email, username, password } = await req.json()

			//validation username
			const isExistingUser = await User.findOne({ username })
			if (isExistingUser) {
				return NextResponse.json(
					{ error: 'Username already exists' },
					{ status: 400 }
				)
			}

			const hashPass = await hashPassword(password)
			const newUser = await User.create({
				name,
				email,
				username,
				password: hashPass
			})

			const user = newUser
			return NextResponse.json({ success: true, user }, { status: 201 })
		}
		return NextResponse.json({ success: true }, { status: 200 })
	} catch (error) {
		const results = error as Error
		return NextResponse.json({ error: results.message }, { status: 400 })
	}
}
