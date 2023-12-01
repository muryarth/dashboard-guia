import express from "express";
import cors from "cors";
// import session from "express-session";
// import methodOverride from "method-override";

const serverConfiguration = (app) => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors());
  
  app.use((req, res, next) => {
    // Configura o cabeçalho CORS para permitir qualquer origem na rede local
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Credentials", "true");

    // Continua para o próximo middleware
    next();
  });
  // app.use(methodOverride("_method"));

  // Express Session
  // app.use(
  //   session({
  //     secret: "secret",
  //     resave: false,
  //     saveUninitialized: true,
  //     cookie: {
  //       maxAge: 1000 * 60 * 60 * 24 * 7, // uma semana
  //     },
  //   })
  // );
};

export default serverConfiguration;
