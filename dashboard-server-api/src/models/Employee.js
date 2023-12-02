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
    FormatBR: { type: Date },
    FormatUTC: { type: Date },
    default: () => GetCurrentTimeObject(),
    immutable: true,
  },
  lastUpdated: {
    FormatBR: { type: Date },
    FormatUTC: { type: Date },
    default: () => GetCurrentTimeObject(),
  },
});

SaveOrUpdatePasswordHash(EmployeeSchema);

const Employees = mongoose.model("employees", EmployeeSchema);

export default Employees;
