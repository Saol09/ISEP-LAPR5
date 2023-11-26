import { Request, Response, NextFunction } from 'express';

export default interface IUserController {
	getUserByEmail(req: Request, res: Response, next: NextFunction);
	listUsers(req: Request, res: Response, next: NextFunction);
}
