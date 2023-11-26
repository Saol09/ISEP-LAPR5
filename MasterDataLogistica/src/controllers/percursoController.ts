import { Request, Response, NextFunction } from "express";
import config from "../../config";
import { Inject, Service } from "typedi";
import IPercursoService from "../services/IServices/IPercursoService";
import IPercursoController from "./IControllers/IPercursoController";
import IPercursoDTO from "../dto/IPercursoDTO";
import { Result } from "../core/logic/Result";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

@Service()
export default class PercursoController implements IPercursoController {
  constructor(
    @Inject(config.services.percurso.name)
    private percursoServiceInstance: IPercursoService
  ) {}

  public async getPercursosExistentes(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const page = Number(req.query.page.toString());
      const perPage = Number(req.query.perPage.toString());

      const percursosOrError = await this.percursoServiceInstance.listarPercursosExistente(
        page,
        perPage
      );

      const percursosDTO = percursosOrError.getValue();
      return res.json(percursosDTO).status(201);
    } catch (e) {
      return next(e);
    }
  }

  public async getAllPercursos(req: Request, res: Response, next: NextFunction) {
    try {
      const percursosOrError = (await this.percursoServiceInstance.listAllPercursos()) as Result<IPercursoDTO[]>;

      if (percursosOrError.isFailure) {
        return res.status(402).send();
      }

      const percursosDTO = percursosOrError.getValue();
      return res.json(percursosDTO).status(201);
    } catch (e) {
      return next(e);
    }
  }


  public async criarPercurso(req: Request, res: Response, next: NextFunction) {
    try {
      const percursoOrError = (await this.percursoServiceInstance.criarPercurso(
        req.body as IPercursoDTO
      )) as Result<IPercursoDTO>;

      if (percursoOrError.isFailure) {
        return res.status(402).send();
      }

      const percursoDTO = percursoOrError.getValue();
      return res.json(percursoDTO).status(201);
    } catch (e) {
      return next(e);
    }
  }

  public async getPercursosByArmazemPartida(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      let aux = req.url.substring(25, req.url.length);

      const percursosOrError = (await this.percursoServiceInstance.listarPercursosByArmazemPartida(
        aux
      )) as Result<IPercursoDTO[]>;

      if (percursosOrError.isFailure) {
        return res.status(402).send();
      }

      const percursosDTO = percursosOrError.getValue();
      return res.json(percursosDTO).status(201);
    } catch (e) {
      return next(e);
    }
  }

  public async getPercursosByArmazemChegada(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      let aux = req.url.substring(25, req.url.length);

      const percursosOrError = (await this.percursoServiceInstance.listarPercursosByArmazemChegada(
        aux
      )) as Result<IPercursoDTO[]>;

      if (percursosOrError.isFailure) {
        return res.status(402).send();
      }

      const percursosDTO = percursosOrError.getValue();
      return res.json(percursosDTO).status(201);
    } catch (e) {
      return next(e);
    }
  }

  public async getPercursosByArmazens(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const auxP = req.params.idArmazemP;
      const auxC = req.params.idArmazemC;

      const percursosOrError = (await this.percursoServiceInstance.listarPercursosByArmazens(
        auxP,
        auxC
      )) as Result<IPercursoDTO[]>;

      if (percursosOrError.isFailure) {
        return res.status(402).send();
      }

      const percursosDTO = percursosOrError.getValue();
      return res.json(percursosDTO).status(201);
    } catch (e) {
      return next(e);
    }
  }

  public async editarPercurso(req: Request, res: Response, next: NextFunction) {
    try {
      const percursoOrError = await this.percursoServiceInstance.editarPercurso(
        req.body["armazemPartida"],
        req.body["armazemChegada"],
        req.body["distancia"],
        req.body["tempoPercurso"],
        req.body["tempoExtra"],
        req.body["energiaGasta"]
      );

      if (percursoOrError.isFailure) {
        return res.status(402).send();
      }

      return res.json(percursoOrError.getValue()).status(200);
    } catch (e) {
      return next(e);
    }
  }
}
