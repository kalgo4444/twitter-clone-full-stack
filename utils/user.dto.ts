export class UserDto {
	id
	name
	email
	username
	coverImage
	profileImage
	createdAt
	updatedAt

	constructor(user: any) {
		this.id = user.id
		this.name = user.name
		this.email = user.email
		this.username = user.username
		this.coverImage = user.coverImage
		this.profileImage = user.profileImage
		this.createdAt = user.createdAt
		this.updatedAt = user.updatedAt
	}
}
