import { Router } from "express";
import HelloControllers from "./controllers/helloControllers";
import usersControllers from "./controllers/usersControllers";
import repositoriosControllers from "./controllers/repositoriosControllers";
import sessionsControllers from "./controllers/sessionsControllers";
import auth from "./middlewares/auth";

const routes = new Router();
routes.post('/sessions', sessionsControllers.create)
routes.get('/hello', HelloControllers.index);

routes.use(auth);


//Controllers Privados
routes.get('/users', usersControllers.index);
routes.get('/users/:id', usersControllers.show);
routes.post('/users', usersControllers.create);
routes.put('/users/:id', usersControllers.update);
routes.delete('/users/:id', usersControllers.destroy);

routes.get('/users/:user_id/repositories', repositoriosControllers.index);
routes.post('/users/:user_id/repositories', repositoriosControllers.create);
routes.delete('/users/:user_id/repositories/:id', repositoriosControllers.destroy);

export default routes;