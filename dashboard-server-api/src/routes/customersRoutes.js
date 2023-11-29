import express from "express";
import CustomerController from "../controllers/customersController.js";

// Rotas cliente

const router = express.Router();

// http://localhost:5000/customers/
router
  .get("/customers/", CustomerController.GetAllCustomers)
  .get("/customers/:id", CustomerController.GetCustomerById)
  .post("/customers/", CustomerController.AddNewCustomer)
  .put("/customers/:id", CustomerController.UpdateCustomer)
  .delete("/customers/:id", CustomerController.DeleteCustomer);

export default router;
