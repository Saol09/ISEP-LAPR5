import dotenv from "dotenv";

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config();
if (!envFound) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  /**
   * Your favorite port
   */
  port: parseInt(process.env.PORT, 10) || 3000,

  /**
   * That long string from mlab
   */

  databaseURL:
    process.env.MONGODB_URI ||
    "mongodb://mongoadmin:c871d50876a9326affb46471@vsgate-s1.dei.isep.ipp.pt:10659/?authMechanism=DEFAULT",

  /**
   * Your secret sauce
   */
  jwtSecret:
    process.env.JWT_SECRET || "my sakdfho2390asjod$%jl)!sdjas0i secret",

  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || "info",
  },

  /**
   * API configs
   */
  api: {
    prefix: "/api",
  },

  controllers: {
    role: {
      name: "RoleController",
      path: "../controllers/roleController",
    },
    percurso: {
      name: "PercursoController",
      path: "../controllers/percursoController",
    },
    camiao: {
      name: "CamiaoController",
      path: "../controllers/camiaoController",
    },
    viagem: {
      name: "ViagemController",
      path: "../controllers/viagemController",
    },
    user: {
      name: "UserController",
      path: "../controllers/userController",
    },
  },

  repos: {
    role: {
      name: "RoleRepo",
      path: "../repos/roleRepo",
    },
    user: {
      name: "UserRepo",
      path: "../repos/userRepo",
    },
    percurso: {
      name: "PercursoRepo",
      path: "../repos/percursoRepo",
    },
    camiao: {
      name: "CamiaoRepo",
      path: "../repos/camiaoRepo",
    },
    viagem: {
      name: "ViagemRepo",
      path: "../repos/viagemRepo",
    },
    armazem: {
      name: "ArmazemRepo",
      path: "../repos/armazemRepo",
    },
  },

  services: {
    role: {
      name: "RoleService",
      path: "../services/roleService",
    },
    percurso: {
      name: "PercursoService",
      path: "../services/percursoService",
    },
    camiao: {
      name: "CamiaoService",
      path: "../services/camiaoService",
    },
    viagem: {
      name: "ViagemService",
      path: "../services/viagemService",
    },
    user: {
      name: "UserService",
      path: "../services/userService",
    },
  },
};
