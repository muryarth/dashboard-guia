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
  // matricula: {
  //   type: String,
  //   // required: true,
  //   unique: true,
  // },
  rg: {
    type: String,
    // required: true,
    unique: true,
  },
  cpf: {
    type: String,
    // required: true,
    unique: true,
  },
  telefone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
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
    FormatBR: { type: Date },
    FormatUTC: { type: Date },
    default: () => GetCurrentTimeObject(),
    immutable: true,
  },
  lastUpdate: {
    FormatBR: { type: Date },
    FormatUTC: { type: Date },
    default: () => GetCurrentTimeObject(),
  },
});

const Customers = mongoose.model("customers", CustomerSchema);

export default Customers;
