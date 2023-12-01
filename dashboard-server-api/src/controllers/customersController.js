import { Customers } from "../models/index.js";
import { GetCurrentTimeObject } from "../services/index.js";

export default class CustomerController {
  // GET -> ./customers
  static GetAllCustomers = async (req, res) => {
    try {
      const { page = 1, limit = 10 } = req.query;

      const pageNumber = parseInt(page);
      const limitNumber = parseInt(limit);

      // Calcula o número de documentos para pular
      const skip = (pageNumber - 1) * limitNumber;

      const customers = await Customers.find().skip(skip).limit(limitNumber);

      if (customers.length > 0) {
        res.status(200).send({
          message: "Clientes encontradas com sucesso.",
          results: customers,
        });
      } else {
        res.status(204).send(); // A requisição foi bem sucedida mas nenhum registro foi encontrado
      }
    } catch (err) {
      res.send({
        message: `Erro interno no servidor.`,
        err: err,
      });
    }
  };

  // GET -> ./customers/search (Busca com filtro)
  static GetCustomersByQuerySearch = async (req, res) => {
    const urlParams = req.query;
    console.log(urlParams);

    try {
      const customers = await Customers.find({ ...urlParams }, {});

      res.send({
        message: "Clientes encontrados com sucesso.",
        results: customers,
      });
    } catch (err) {
      res.send({
        message: `Erro interno no servidor.`,
        err: err,
      });
    }
  };

  // GET -> ./customers/:id
  static GetCustomerById = async (req, res) => {
    const id = req.params.id;

    try {
      const customers = await Customers.findById(id);

      res.status(200).send({
        message: `Cliente de ID:(${id}) encontrado com sucesso.`,
        results: employees,
      });
    } catch (err) {
      res.send({
        message: `Erro interno no servidor.`,
        err: err,
      });
    }
  };

  // POST -> ./customers
  static AddNewCustomer = async (req, res) => {
    const newCustomer = new Customers(req.body);

    try {
      const customer = await newCustomer.save();
      res.send({
        message: "Cliente adicionado com sucesso.",
        results: customer.toJSON(),
      });
    } catch (err) {
      res.send({
        message: `Erro interno no servidor.`,
        err: err,
      });
    }
  };

  // PUT -> ./customers/:id
  static UpdateCustomer = async (req, res) => {
    const id = req.params.id;
    const lastUpdate = GetCurrentTimeObject();

    try {
      const updateCustomer = await Customers.findOneAndUpdate(
        { _id: id },
        { $set: { ...req.body, lastUpdate } },
        { new: true }
      );

      // Alternativa
      // const updateCustomer = await Customers.findByIdAndUpdate(id, {
      //   $set: { ...req.body, lastUpdate },
      // });

      res.send({
        message: "Cliente cadastrado com successfully.",
        results: updateCustomer.toJSON(),
      });
    } catch (err) {
      res.send({
        message: `Erro interno no servidor.`,
        err: err,
      });
    }
  };

  // DELETE -> ./customers/:id
  static DeleteCustomer = async (req, res) => {
    const id = req.params.id;
    console.log(id);

    try {
      await Customers.findByIdAndDelete(id);

      res.send({
        message: `Cliente de id:(${id}) removido com sucesso.`,
        results: { oldId: id },
      });
    } catch (err) {
      res.send({
        message: `Erro interno no servidor.`,
        err: err,
      });
    }
  };
}
