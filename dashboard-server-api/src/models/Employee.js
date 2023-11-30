import mongoose from "mongoose";
import { GetCurrentTimeObject } from "../services/index.js";
import savePasswordHash from "../middlewares/savePasswordHash.js";

const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
  nome: {
    type: String,
    required: true,
  },
  login: {
    type: String,
    required: true,
  },
  senha: {
    type: String,
    required: true,
  },
  administrador: {
    type: Boolean,
    required: true,
  },
  registerDate: {
    type: Schema.Types.Mixed,
    Default: () => GetCurrentTimeObject(),
    immutable: true,
  },
});

next(savePasswordHash(EmployeeSchema));

const Employees = mongoose.model("employees", EmployeeSchema);

export default Employees;
