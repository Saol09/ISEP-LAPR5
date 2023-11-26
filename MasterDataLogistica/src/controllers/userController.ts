import { Response, Request } from 'express';

import { Container, Inject, Service } from 'typedi';

import config from '../../config';

import IUserRepo from '../services/IRepos/IUserRepo';

import { UserMap } from '../mappers/UserMap';
import { IUserDTO } from '../dto/IUserDTO';
import { Result } from '../core/logic/Result';
import IUserController from './IControllers/IUserController';
import { NextFunction } from 'express';
import UserService from '../services/userService';
import IUserService from '../services/IServices/IUserService';

// exports.getMe = async function (req, res: Response) {

//     // NB: a arquitetura ONION não está a ser seguida aqui

//     const userRepo = Container.get(config.repos.user.name) as IUserRepo

//     if (!req.token || req.token == undefined)
//         return res.json(new Error("Token inexistente ou inválido")).status(401);

//     const user = await userRepo.findById(req.token.id);
//     if (!user)
//         return res.json(new Error("Utilizador não registado")).status(401);

//     const userDTO = UserMap.toDTO(user) as IUserDTO;
//     return res.json(userDTO).status(200);
// }

@Service()
export default class UserController implements IUserController {
	constructor(@Inject(config.services.user.name) private userService: IUserService) {}

	public async getUserByEmail(req: Request, res: Response, next: NextFunction) {
		try {
			let email = req.url.substring(7, req.url.length);

			const utilizadorOuErro = (await this.userService.getUserByEmail(email)) as Result<
				IUserDTO
			>;

			if (utilizadorOuErro.isFailure) {
				res.status(404).send();
			}

			const utilizadorDTO = utilizadorOuErro.getValue();

			return res.status(201).json(utilizadorDTO);
		} catch (e) {
			return next(e);
		}
	}

	public async listUsers(req: Request, res: Response, next: NextFunction) {
		try {
			const usersOrError = (await this.userService.listUsers()) as Array<IUserDTO>;

			/* if (usersOrError.isFailure) {
				return res.status(402).json(usersOrError.error);
			} */

			/* const usersDTO = usersOrError.getValue(); */
			return res.status(201).json(usersOrError);
		} catch (e) {
			return next(e);
		}
	}

	/* public async listUsers(req: Request, res: Response, next: NextFunction) {
		try {
			
		} catch (e) {
			return next(e);
		}
	} */
}
