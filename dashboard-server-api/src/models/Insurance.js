import mongoose from "mongoose";
import { GetCurrentTimeObject } from "../services";

const Schema = mongoose.Schema;

const InsuranceSchema = new Schema({
  nome: {
    type: String,
    required: true,
  },
  preco: {
    type: Float32Array,
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

const Insurances = mongoose.model("insurances", InsuranceSchema);

export default Insurances;
