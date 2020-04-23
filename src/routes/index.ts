import { Router } from "express";

const routes = Router();

routes.get("/", (resquest, response) =>
  response.json({ message: "ok server" })
);

export default routes;
