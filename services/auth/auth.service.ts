import axios from 'axios'

export const registerStep1Service = async (body: {
	name: string
	email: string
}) => {
	const { data } = await axios.post('/api/auth/register?step=1', body)
	return data
}

export const registerStep2Service = async (body: {
	name: string
	email: string
	username: string
	password: string
}) => {
	const { data } = await axios.post('/api/auth/register?step=2', body)
	return data
}

export const loginService = async (body: {
	email: string
	password: string
}) => {
	const { data } = await axios.post('/api/auth/login', body)
	return data
}
