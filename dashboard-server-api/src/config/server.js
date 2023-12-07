import express from "express";
import CORSConfig from "./CORSConfig.js";

const ServerConfiguration = (app) => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  CORSConfig(app);
};

export default ServerConfiguration;
