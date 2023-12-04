import express from "express";
import cors from "cors";

const serverConfiguration = (app) => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors);
  app.use(() => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE");
  });

  next();
};

export default serverConfiguration;
