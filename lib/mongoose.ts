import mongoose, { ConnectOptions } from 'mongoose'

let isConnected: boolean = false

export const connectToDatabase = async () => {
	mongoose.set('strictQuery', true)

	if (!process.env.DB_URL) {
		console.error('DB_URL is not found')
	}

	if (isConnected) return

	try {
		const option: ConnectOptions = {
			dbName: 'twitter-clone',
			autoCreate: true
		}

		await mongoose.connect(process.env.DB_URL as string, option)
		isConnected = true
		console.log('DB is run')
	} catch (error) {
		console.log('Error to connecting Database')
	}
}
