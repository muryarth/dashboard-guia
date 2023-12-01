import { Customers } from "../models/index.js";

const HandleQuerySearch = async (req) => {
  const { nome, cliente, especialidade, administrador } = req.query;

  let search = {};

  if (nome) search.nome = { $regex: nome, $options: "i" };
  if (especialidade)
    search.especialidade = { $regex: especialidade, $options: "i" };
  if (
    administrador &&
    (administrador === "true" || administrador === "false")
  ) {
    search.administrador = Boolean(administrador);
  }
  if (cliente) {
    const clienteBusca = await Customers.findOne({
      nome: { $regex: cliente, $options: "i" },
    });
    console.log(clienteBusca._id);

    if (cliente !== null) {
      search.cliente = clienteBusca._id;
    } else {
      search.cliente = null;
    }
  }

  return search;
};

export default HandleQuerySearch;
