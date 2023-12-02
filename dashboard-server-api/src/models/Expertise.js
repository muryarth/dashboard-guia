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
    type: Schema.Types.Mixed,
    default: () => GetCurrentTimeObject(),
    immutable: true,
  },
});

const Expertises = mongoose.model("expertises", ExpertiseSchema);

export default Expertises;
