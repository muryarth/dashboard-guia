import mongoose from "mongoose";
import { GetCurrentTimeObject } from "../services/index.js";

const Schema = mongoose.Schema;

const AuthorizationSchema = new Schema({
  cliente: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "customers",
  },
  especialidade: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "expertises",
  },
  local: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "clinics",
  },
  registerDate: {
    type: Schema.Types.Mixed,
    Default: () => GetCurrentTimeObject(),
    immutable: true,
  },
});

const Authorizations = mongoose.model("authorizations", AuthorizationSchema);

export default Authorizations;
