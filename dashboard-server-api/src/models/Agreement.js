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
  locais: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "clinics",
  },
  especialidades: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "expertises",
  },
  registerDate: {
    type: Schema.Types.Mixed,
    Default: () => GetCurrentTimeObject(),
    immutable: true,
  },
  lastUpdate: {
    type: Schema.Types.Mixed,
    Default: () => GetCurrentTimeObject(),
  },
});

const Agreements = mongoose.model("agreements", AgreementSchema);

export default Agreements;
