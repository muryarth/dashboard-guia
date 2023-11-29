import app from "./src/app.js";
import chalk from "chalk";

const port = 5000 || process.env.PORT;

// Escuta a app na porta 5000
app.listen(port, () => {
  console.log(chalk.blue(`App rodando em: http://localhost:${port}`));
});
