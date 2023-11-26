import { Router } from "express";
import { Container } from "typedi";
import config from "../../../config";
import IViagemController from "../../controllers/IControllers/IViagemController";

const route = Router();

export default (app: Router) => {
  app.use("/planeamento", route);

  const ctrl = Container.get(
    config.controllers.viagem.name
  ) as IViagemController;

  route.get("/listAllViagens", (req, res, next) => {
    ctrl.getAllViagens(req, res, next);
  });

  route.get("/listAllViagensPerPage", (req, res, next) => {
    ctrl.getAllViagensPerPage(req, res, next);
  });

  route.get("/:data", (req, res, next) => {
    ctrl.efetuarPlaneamento(req, res, next);
    req.params.data;
  });

  route.get("/menorDistancia/:data", (req, res, next) => {
    ctrl.efetuarPlaneamentoMenorDistancia(req, res, next);
    req.params.data;
  });

  route.get("/maiorMassa/:data", (req, res, next) => {
    ctrl.efetuarPlaneamentoMaiorMassa(req, res, next);
    req.params.data;
  });

  route.get("/melhorRelacao/:data", (req, res, next) => {
    ctrl.efetuarPlaneamentoMelhorRelacao(req, res, next);
    req.params.data;
  });

  route.get("/algoritmoGenetico/:data", (req, res, next) => {
    ctrl.efetuarPlaneamentoAlgoritmoGenetico(req, res, next);
    req.params.data;
  });
};
