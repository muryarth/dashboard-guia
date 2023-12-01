import express from "express";
import customers from "./customersRoutes.js";
import employees from "./employeesRoutes.js";
import expertises from "./expertisesRoutes.js";
import clinics from "./clinicsRoutes.js";

const routes = (app) => {
  // Rota raiz
  app.route("/").get((req, res) => {
    res.status(200).send({ titulo: "Rodando a app" });
  });

  // Todas as rotas
  app.use(express.json(), customers, employees, expertises, clinics);
};

export default routes;
