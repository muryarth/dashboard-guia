import mongoose from "mongoose";
import Customer from "../models/Customer.js";

export default class CustomerController {
  /**
   * get /
   * homepage
   */

  // Home
  static GetAllCustomers = async (req, res) => {
    let perPage = 10;
    let page = req.query.page || 1;

    try {
      const customers = await Customer.aggregate([{ $sort: { updatedAt: -1 } }])
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec();

      res.send(customers);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * get /
   * Novo cliente
   */

  // static addCustomer = async (req, res) => {
  //   const locals = {
  //     title: "Adicionar novo cliente",
  //     description: "Adiciona novo cliente no sistema",
  //   };

  //   res.render("customer/add", locals);
  // };

  // /**
  //  * post /
  //  * Novo cliente
  //  */

  // static postCustomer = async (req, res) => {
  //   console.log(req.body);

  //   const newCustomer = new Customer({
  //     nomePrimeiro: req.body.nomePrimeiro,
  //     sobreNome: req.body.sobreNome,
  //     tel: req.body.tel,
  //     email: req.body.email,
  //     detail: req.body.detail,
  //   });

  //   try {
  //     await Customer.create(newCustomer);
  //     await req.flash("info", "Novo cliente cadastrado.");

  //     res.redirect("/");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // /**
  //  * view /
  //  * Ver ficha do Cliente
  //  */

  // static viewCustomer = async (req, res) => {
  //   try {
  //     const customer = await Customer.findOne({ _id: req.params.id });
  //     const locals = {
  //       title: "Ficha do Cliente",
  //       description: "Free NodeJs User Management System",
  //     };

  //     res.render("customer/view", {
  //       locals,
  //       customer,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // /**
  //  * edit/
  //  * Editar ficha do Cliente
  //  */

  // static editCustomer = async (req, res) => {
  //   try {
  //     const customer = await Customer.findOne({ _id: req.params.id });
  //     const locals = {
  //       title: "Editar Cliente",
  //       description: "Free NodeJs User Management System",
  //     };

  //     res.render("customer/edit", {
  //       locals,
  //       customer,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // /**
  //  * edit/
  //  * Atualizar ficha do Cliente
  //  */

  // static editCustomerPost = async (req, res) => {
  //   try {
  //     await Customer.findByIdAndUpdate(req.params.id, {
  //       nomePrimeiro: req.body.nomePrimeiro,
  //       sobreNome: req.body.sobreNome,
  //       tel: req.body.tel,
  //       email: req.body.email,
  //       details: req.body.details,
  //       updatedAt: Date.now(),
  //     });
  //     await res.redirect(`/edit/${req.params.id}`);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // /**
  //  * delete/
  //  * Deletar ficha do Cliente
  //  */

  // static deleteCustomer = async (req, res) => {
  //   try {
  //     await Customer.deleteOne({ _id: req.params.id });
  //     res.redirect("/");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // /**
  //  * get/
  //  * Buscar clientes
  //  */

  // static searchCustomers = async (req, res) => {
  //   const locals = {
  //     title: "Buscar Cliente",
  //     description: "Free NodeJs User Management System",
  //   };

  //   try {
  //     let searchTerm = req.body.searchTerm;
  //     const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9]/g, "");
  //     const customers = await Customer.find({
  //       $or: [
  //         { nomePrimeiro: { $regex: new RegExp(searchNoSpecialChar, "i") } },
  //         { sobreNome: { $regex: new RegExp(searchNoSpecialChar, "i") } },
  //       ],
  //     });

  //     res.render("search", {
  //       customers,
  //       locals,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
}
