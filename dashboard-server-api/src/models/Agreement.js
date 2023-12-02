import mongoose from "mongoose";
import { GetCurrentTimeObject } from "../services/index.js";

const Schema = mongoose.Schema;

const AgreementSchema = new Schema({
  nome: {
    type: String,
    required: true,
  },
  preco: {
    type: Number,
    required: true,
  },
  locais: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "clinics",
    },
  ],
  especialidades: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "expertises",
    },
  ],
  criadoPor: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "employees",
    immutable: true,
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

const Agreements = mongoose.model("agreements", AgreementSchema);

export default Agreements;
