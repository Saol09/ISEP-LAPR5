import { Request, Response, NextFunction } from 'express';

export default interface ICamiaoController {
	editarCamiao(req: Request, res: Response, next: NextFunction);
	criarCamiao(req: Request, res: Response, next: NextFunction);
	listarCamioesExistentes(req: Request, res: Response, next: NextFunction);
	listarCamioesAtivos(req: Request, res: Response, next: NextFunction);
	listarCamioesInativos(req: Request, res: Response, next: NextFunction);
}
