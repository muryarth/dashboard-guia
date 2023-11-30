import app from "./src/app.js";
import chalk from "chalk";

const port = process.env.PORT || 5000;

// Escuta a app na porta 5000
app.listen(port, () => {
  console.log(chalk.blue(`App rodando em: http://localhost:${port}`));
});
