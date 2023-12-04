import express from "express";
// import session from "express-session";
// import methodOverride from "method-override";

const serverConfiguration = (app) => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
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
