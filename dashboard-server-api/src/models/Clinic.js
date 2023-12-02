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
    FormatBR: { type: Date },
    FormatUTC: { type: Date },
    default: () => GetCurrentTimeObject,
    immutable: true,
  },
  lastUpdated: {
    FormatBR: { type: Date },
    FormatUTC: { type: Date },
    default: () => GetCurrentTimeObject,
  },
});

const Clinics = mongoose.model("clinics", ClinicSchema);

export default Clinics;
