import dotenv from "dotenv/config.js";
import express from "express";
import routes from "./routes/index.js";
import connectDB from "./config/db.js";
import ServerConfig from "./config/server.js";

const app = express();

// Conexão com banco
connectDB();

// Trás todas as configurações básicas do servidor
ServerConfig(app);

// Trás todas as rotas
routes(app);

export default app;