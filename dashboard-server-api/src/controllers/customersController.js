import { Customers } from "../models/index.js";
import { GetCurrentTimeObject } from "../services/index.js";

export default class CustomerController {
  // GET -> ./customers
  static GetAllCustomers = async (req, res) => {
    // let perPage = 10;
    // let page = req.query.page || 1;

    try {
      const customers = await Customers.find();
      // const customers = await Customer.aggregate([{ $sort: { updatedAt: -1 } }])
      //   .skip(perPage * page - perPage)
      //   .limit(perPage)
      //   .exec();

      res.send(customers);
    } catch (err) {
      console.log(err);
    }
  };

  // GET -> ./customers/search (Busca com filtro)
  static GetCustomersByQuerySearch = async (req, res) => {
    const urlParams = req.query;
    console.log(urlParams);

    try {
      const customers = await Customers.find({ ...urlParams }, {});

      res.send({
        message: "Customers found successfully.",
        results: customers,
      });
    } catch (err) {
      res.send([]);
    }
  };

  // GET -> ./customers/:id
  static GetCustomerById = async (req, res) => {
    const id = req.params.id;

    try {
      const customers = await Customers.findById(id);

      res.send(customers);
    } catch (err) {
      console.log(err);
    }
  };

  // POST -> ./customers
  static AddNewCustomer = async (req, res) => {
    const newCustomer = new Customers(req.body);

    try {
      const customer = await newCustomer.save();
      res.send({
        message: "Customer added successfully.",
        results: customer.toJSON(),
      });
    } catch (err) {
      console.log(err);
    }
  };

  // PUT -> ./customers/:id
  static UpdateCustomer = async (req, res) => {
    const id = req.params.id;
    const lastUpdate = GetCurrentTimeObject();

    try {
      const updateCustomer = await Customers.findByIdAndUpdate(id, {
        $set: { ...req.body, lastUpdate },
      });

      res.send({
        message: "Customer added successfully.",
        results: updateCustomer.toJSON(),
      });
    } catch (err) {
      console.log(err);
    }
  };

  // DELETE -> ./customers/:id
  static DeleteCustomer = async (req, res) => {
    const id = req.params.id;
    console.log(id);

    try {
      await Customers.findByIdAndDelete(id);

      res.send({
        message: `Customer of id:(${id}) removed successfully.`,
        results: { oldId: id },
      });
    } catch (err) {
      console.log(err);
    }
  };
}
