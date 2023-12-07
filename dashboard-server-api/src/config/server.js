import express from "express";
import CORSConfig from "./CORSConfig.js";

const ServerConfig = (app) => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  CORSConfig(app);
};

export default ServerConfig;
