import { Request, Response, NextFunction } from 'express';

export default interface IPercursoController  {
  getPercursosExistentes(req: Request, res: Response, next: NextFunction);
  criarPercurso(req: Request, res: Response, next: NextFunction);
  getPercursosByArmazemPartida(req: Request, res: Response, next: NextFunction);
  getPercursosByArmazemChegada(req: Request, res: Response, next: NextFunction);
  getPercursosByArmazens(req: Request, res: Response, next: NextFunction);
  editarPercurso(req: Request, res: Response, next: NextFunction);
  getAllPercursos(req: Request, res: Response, next: NextFunction);

}