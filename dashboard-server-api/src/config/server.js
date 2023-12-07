import express from "express";
import CORSConfiguration from "./CORSConfiguration";

const ServerConfiguration = (app) => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  CORSConfiguration(app);
};

export default ServerConfiguration;
