import { Router } from "express";
import auth from "./routes/userRoute";
import user from "./routes/userRoute";
import role from "./routes/roleRoute";
import percurso from "./routes/percursoRoute";
import camiaoRoute from "./routes/camiaoRoute";
import viagem from "./routes/viagemRoute";

export default () => {
  const app = Router();

  auth(app);
  user(app);
  role(app);
  percurso(app);
  viagem(app);
  camiaoRoute(app);

  return app;
};
