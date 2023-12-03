import mongoose from "mongoose";
import { GetCurrentTimeObject } from "../services/index.js";

const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
  // Campos obrigatórios
  nome: {
    type: String,
    required: true,
  },
  sobrenome: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  cpf: {
    type: String,
    required: true,
  },

  // Campos opcionais
  matricula: {
    type: String,
  },
  telefone: {
    type: String,
  },
  rg: {
    type: String,
  },
  detalhesCliente: {
    type: String,
  },
  dataNascimento: {
    type: String,
  },
  genero: {
    type: String,
  },
  endereco: {
    uf: { type: String },
    cidade: { type: String },
    rua: { type: String },
    cep: { type: String },
  },
  conveniosAtivos: [
    {
      type: Schema.Types.ObjectId,
      ref: "agreements",
    },
  ],

  // Registrando data
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
