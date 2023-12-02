import mongoose from "mongoose";
import { GetCurrentTimeObject } from "../services/index.js";

const Schema = mongoose.Schema;

const ClinicSchema = new Schema({
  nome: {
    type: String,
    required: true,
    unique: true,
  },
  endereco: {
    type: String,
    required: true,
  },
  registerDate: {
    type: Schema.Types.Mixed,
    default: () => GetCurrentTimeObject,
    immutable: true,
  },
});

const Clinics = mongoose.model("clinics", ClinicSchema);

export default Clinics;
