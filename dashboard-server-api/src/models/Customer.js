import mongoose from "mongoose";
import { GetCurrentTimeObject } from "../services/index.js";

const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
  nome: {
    type: String,
    required: true,
  },
  sobrenome: {
    type: String,
    required: true,
  },
  telefone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  matricula: {
    type: String,
    unique: true,
  },
  rg: {
    type: String,
    unique: true,
  },
  cpf: {
    type: String,
    unique: true,
  },
  conveniosAtivos: {
    type: Schema.Types.ObjectId,
    ref: "agreements",
  },
  endereco: {
    rua: { type: String },
    cep: { type: String },
    uf: { type: String },
  },
  registerDate: {
    type: Schema.Types.Mixed,
    default: () => GetCurrentTimeObject(),
    immutable: true,
  },
  lastUpdate: {
    type: Schema.Types.Mixed,
    default: () => GetCurrentTimeObject(),
  },
});

const Customers = mongoose.model("customers", CustomerSchema);

export default Customers;
