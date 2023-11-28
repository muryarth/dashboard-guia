const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const connectDB = async () => {
  const dbConnectionString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@dashboard-app-cluster.jac7iaa.mongodb.net/?retryWrites=true&w=majority`;
  try {
    const conn = await mongoose.connect(dbConnectionString);
    console.log(`BANCO DE DADOS CONECTADO: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};
module.exports = connectDB;
