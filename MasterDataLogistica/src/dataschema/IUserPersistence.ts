export interface IUserPersistence {
	_id: string;
	domainId: string;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	telemovel: string;
	salt: string;
	role: string
}