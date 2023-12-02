import mongoose from "mongoose";
import { GetCurrentTimeObject } from "../services/index.js";

const Schema = mongoose.Schema;

const ExpertiseSchema = new Schema({
  especialidade: {
    type: String,
    required: true,
    unique: true,
  },
  registerDate: {
    FormatBR: { type: Date },
    FormatUTC: { type: Date },
    default: () => GetCurrentTimeObject(),
    immutable: true,
  },
});

const Expertises = mongoose.model("expertises", ExpertiseSchema);

export default Expertises;
