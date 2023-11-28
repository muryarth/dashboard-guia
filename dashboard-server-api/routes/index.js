import express from "express";
import customers from "./customersRoutes.js";

const routes = (app) => {
  // Rota raiz
  app.route("/").get((req, res) => {
    res.status(200).send({ titulo: "Rodando a app" });
  });

  // Todas as rotas
  app.use(express.json(), customers);
};

export default routes;