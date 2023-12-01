import mongoose from "mongoose";

mongoose.set("strictQuery", false);

const connectDB = async () => {
  const dbConnectionString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/?retryWrites=true&w=majority`;
  try {
    const conn = await mongoose.connect(dbConnectionString);
    console.log(`Banco conectado: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
