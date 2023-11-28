import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
  nomePrimeiro: {
    type: String,
    required: true,
  },
  sobreNome: {
    type: String,
    required: true,
  },
  tel: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  details: {
    type: String,
  },
});

export default mongoose.model("Customer", CustomerSchema);
