import dotenv from "dotenv/config.js";
import chalk from "chalk";
import express from "express";
import routes from "./routes/index.js";
import connectDB from "./config/db.js";
import serverConfiguration from "./config/server.js";

const app = express();
const port = 5000 || process.env.PORT;

// Conexão com banco
connectDB();

// Trás todas as configurações básicas do servidor
serverConfiguration(app);

// Trás todas as rotas
routes(app);

// Escuta a app na porta 5000
app.listen(port, () => {
  console.log(chalk.blue(`App rodando em: http://localhost:${port}`));
});
