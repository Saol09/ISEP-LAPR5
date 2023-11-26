import expressLoader from "./express";
import dependencyInjectorLoader from "./dependencyInjector";
import mongooseLoader from "./mongoose";
import Logger from "./logger";

import config from "../../config";
import UserService from "../services/userService";

export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  Logger.info("✌️ DB loaded and connected!");

  const userSchema = {
    // compare with the approach followed in repos and services
    name: "userSchema",
    schema: "../persistence/schemas/userSchema",
  };

  const roleSchema = {
    // compare with the approach followed in repos and services
    name: "roleSchema",
    schema: "../persistence/schemas/roleSchema",
  };

  const percursoSchema = {
    // compare with the approach followed in repos and services
    name: "percursoSchema",
    schema: "../persistence/schemas/percursoSchema",
  };

  const camiaoSchema = {
    // compare with the approach followed in repos and services
    name: "camiaoSchema",
    schema: "../persistence/schemas/camiaoSchema",
  };

  const viagemSchema = {
    // compare with the approach followed in repos and services
    name: "viagemSchema",
    schema: "../persistence/schemas/viagemSchema",
  };

  const roleController = {
    name: config.controllers.role.name,
    path: config.controllers.role.path,
  };

  const percursoController = {
    name: config.controllers.percurso.name,
    path: config.controllers.percurso.path,
  };

  const viagemController = {
    name: config.controllers.viagem.name,
    path: config.controllers.viagem.path,
  };

  const camiaoController = {
    name: config.controllers.camiao.name,
    path: config.controllers.camiao.path,
  };

  const userController = {
    name: config.controllers.user.name,
    path: config.controllers.user.path,
  };

  const roleRepo = {
    name: config.repos.role.name,
    path: config.repos.role.path,
  };

  const userRepo = {
    name: config.repos.user.name,
    path: config.repos.user.path,
  };

  const percursoRepo = {
    name: config.repos.percurso.name,
    path: config.repos.percurso.path,
  };

  const viagemRepo = {
    name: config.repos.viagem.name,
    path: config.repos.viagem.path,
  };

  const camiaoRepo = {
    name: config.repos.camiao.name,
    path: config.repos.camiao.path,
  };

  const armazemRepo = {
    name: config.repos.armazem.name,
    path: config.repos.armazem.path,
  };

  const roleService = {
    name: config.services.role.name,
    path: config.services.role.path,
  };

  const percursoService = {
    name: config.services.percurso.name,
    path: config.services.percurso.path,
  };

  const viagemService = {
    name: config.services.viagem.name,
    path: config.services.viagem.path,
  };

  const camiaoService = {
    name: config.services.camiao.name,
    path: config.services.camiao.path,
  };

  const userService = {
    name: config.services.user.name,
    path: config.services.user.path,
  };

  await dependencyInjectorLoader({
    mongoConnection,
    schemas: [
      userSchema,
      roleSchema,
      percursoSchema,
      camiaoSchema,
      viagemSchema,
    ],
    controllers: [
      roleController,
      percursoController,
      camiaoController,
      viagemController,
      userController,
    ],
    repos: [
      roleRepo,
      userRepo,
      percursoRepo,
      camiaoRepo,
      armazemRepo,
      viagemRepo,
    ],
    services: [roleService, percursoService, camiaoService, viagemService, userService],
  });
  Logger.info("✌️ Schemas, Controllers, Repositories, Services, etc. loaded");

  await expressLoader({ app: expressApp });
  Logger.info("✌️ Express loaded");
};
