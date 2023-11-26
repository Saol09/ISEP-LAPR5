import { Request, Response, NextFunction } from "express";
import { Inject, Service } from "typedi";
import config from "../../config";
import { Result } from "../core/logic/Result";
import IViagemDTO from "../dto/IViagemDTO";
import IViagemService from "../services/IServices/IViagemService";
import IViagemController from "./IControllers/IViagemController";

@Service()
export default class ViagemController implements IViagemController {
  constructor(
    @Inject(config.services.viagem.name)
    private viagemServiceInstance: IViagemService
  ) {}

  public async getAllViagens(req: Request, res: Response, next: NextFunction) {
    try {
      const viagemOrError = (await this.viagemServiceInstance.listAllViagens()) as Result<
        IViagemDTO[]
      >;

      if (viagemOrError.isFailure) {
        return res.status(402).send();
      }

      const viagemDTO = viagemOrError.getValue();
      return res.json(viagemDTO).status(201);
    } catch (e) {
      return next(e);
    }
  }

  public async getAllViagensPerPage(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const page = Number(req.query.page.toString());
      const perPage = Number(req.query.perPage.toString());

      const viagensOrError = await this.viagemServiceInstance.listAllViagensPerPage(
        page,
        perPage
      );

      const viagensDTO = viagensOrError.getValue();
      return res.json(viagensDTO).status(201);
    } catch (e) {
      return next(e);
    }
  }

  public async efetuarPlaneamento(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const data = req.params.data;

      const viagemOrError = (await this.viagemServiceInstance.efetuarPlaneamento(
        data
      )) as Result<IViagemDTO[]>;

      if (viagemOrError.isFailure) {
        return res.status(402).send();
      }

      const viagemDTO = viagemOrError.getValue();
      return res.json(viagemDTO).status(201);
    } catch (e) {
      return next(e);
    }
  }

  public async efetuarPlaneamentoMenorDistancia(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const data = req.params.data;

      const planeamentoOrError = await this.viagemServiceInstance.efetuarPlaneamentoMenorDistancia(
        data
      );

      const planeamentoDTO = planeamentoOrError;
      return res.json(planeamentoDTO.getValue()).status(201);
    } catch (e) {
      return next(e);
    }
  }

  public async efetuarPlaneamentoMaiorMassa(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const data = req.params.data;

      const planeamentoOrError = await this.viagemServiceInstance.efetuarPlaneamentoMaiorMassa(
        data
      );

      const planeamentoDTO = planeamentoOrError;
      return res.json(planeamentoDTO.getValue()).status(201);
    } catch (e) {
      return next(e);
    }
  }

  public async efetuarPlaneamentoMelhorRelacao(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const data = req.params.data;

      const planeamentoOrError = await this.viagemServiceInstance.efetuarPlaneamentoMelhorRelacao(
        data
      );

      const planeamentoDTO = planeamentoOrError;
      return res.json(planeamentoDTO.getValue()).status(201);
    } catch (e) {
      return next(e);
    }
  }

  public async efetuarPlaneamentoAlgoritmoGenetico(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const data = req.params.data;

      const planeamentoOrError = await this.viagemServiceInstance.efetuarPlaneamentoAlgoritmoGenetico(
        data
      );

      console.log(planeamentoOrError.getValue());

      const planeamentoDTO = planeamentoOrError;
      return res.json(planeamentoDTO.getValue()).status(201);
    } catch (e) {
      return next(e);
    }
  }
}
