import mongoose from "mongoose";
import { GetCurrentTimeObject } from "../services/index.js";
import SaveOrUpdatePasswordHash from "../middlewares/savePasswordHash.js";

const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
  nome: {
    type: String,
    required: true,
  },
  login: {
    type: String,
    required: true,
    unique: true,
  },
  senha: {
    type: String,
    required: true,
  },
  administrador: {
    type: Boolean,
    required: true,
  },
  ativo: {
    type: Boolean,
    required: true,
  },
  registerDate: {
    type: Schema.Types.Mixed,
    default: () => GetCurrentTimeObject(),
    immutable: true,
  },
  lastUpdated: {
    type: Schema.Types.Mixed,
    default: () => GetCurrentTimeObject(),
  },
});

SaveOrUpdatePasswordHash(EmployeeSchema);

const Employees = mongoose.model("employees", EmployeeSchema);

export default Employees;
