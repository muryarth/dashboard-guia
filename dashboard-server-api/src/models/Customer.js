import mongoose from "mongoose";

const Schema = mongoose.Schema;

const GetCurrentTimeObject = () => {
  const Local = new Date().toLocaleString();
  const UTC = new Date();
  return {
    Local: Local,
    UTC: UTC,
  };
};

const CustomerSchema = new Schema({
  nome: {
    type: String,
    required: true,
  },
  sobrenome: {
    type: String,
    required: true,
  },
  telefone: {
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
  registerDate: {
    type: Schema.Types.Object,
    default: () => GetCurrentTimeObject(),
  },
  lastUpdate: {
    type: Schema.Types.Object,
    default: () => GetCurrentTimeObject(),
  },
});

const Customers = mongoose.model("customers", CustomerSchema);

export default Customers;
