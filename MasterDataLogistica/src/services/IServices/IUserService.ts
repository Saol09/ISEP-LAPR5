import { Result } from '../../core/logic/Result';
import { IUserDTO } from '../../dto/IUserDTO';

export default interface IUserService {
	SignUp(userDTO: IUserDTO): Promise<Result<{ userDTO: IUserDTO; token: string }>>;
	SignIn(
		email: string,
		password: string
	): Promise<Result<{ userDTO: IUserDTO; token: string }>>;
	getUserByEmail(email: string): Promise<Result<IUserDTO>>;
	listUsers(): Promise<Array<IUserDTO>>;
}
