import User from '@/database/models/user.model'
import { connectToDatabase } from '@/lib/mongoose'
import { passValidate } from '@/lib/password'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
	try {
		await connectToDatabase()

		const { email, password } = await req.json()
		//validate email from db
		const isExistingUser = await User.findOne({ email })
		if (!isExistingUser) {
			return NextResponse.json(
				{
					type: 'email',
					error: 'Email does not exists'
				},
				{ status: 400 }
			)
		}

		//compare password
		const isPassValid = await passValidate({
			resPass: password,
			dbPass: isExistingUser.password
		})
		if (!isPassValid) {
			return NextResponse.json(
				{
					type: 'password',
					error: 'Password is incorrect'
				},
				{ status: 400 }
			)
		}

		//user dto
		const user = isExistingUser

		return NextResponse.json({ success: true, user }, { status: 200 })
	} catch (error) {
		const result = error as Error
		return NextResponse.json({ error: result.message }, { status: 400 })
	}
}
