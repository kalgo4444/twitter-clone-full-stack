import { compare, hash } from 'bcrypt'

export const hashPassword = (pass: string) => {
	const hashPass = hash(pass, 10)
	return hashPass
}

export const passValidate = ({
	resPass,
	dbPass
}: {
	resPass: string
	dbPass: string
}) => {
	const isValid = compare(resPass, dbPass)
	return isValid
}
