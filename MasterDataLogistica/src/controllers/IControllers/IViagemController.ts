import { Request, Response, NextFunction } from "express";

export default interface IViagemController {
  efetuarPlaneamento(req: Request, res: Response, next: NextFunction);
  efetuarPlaneamentoMenorDistancia(
    req: Request,
    res: Response,
    next: NextFunction
  );
  efetuarPlaneamentoMaiorMassa(req: Request, res: Response, next: NextFunction);
  efetuarPlaneamentoMelhorRelacao(
    req: Request,
    res: Response,
    next: NextFunction
  );
  getAllViagens(req: Request, res: Response, next: NextFunction);
  getAllViagensPerPage(req: Request, res: Response, next: NextFunction);
  efetuarPlaneamentoAlgoritmoGenetico(
    req: Request,
    res: Response,
    next: NextFunction
  );
}
