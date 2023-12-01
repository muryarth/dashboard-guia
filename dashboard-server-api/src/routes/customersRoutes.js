import express from "express";
import CustomerController from "../controllers/customersController.js";

const router = express.Router();

router
  .get("/customers/", CustomerController.GetAllCustomers)
  .get("/customers/search", CustomerController.GetCustomersByQuerySearch)
  .get("/customers/:id", CustomerController.GetCustomerById)
  .post("/customers/", CustomerController.AddNewCustomer)
  .put("/customers/:id", CustomerController.UpdateCustomer)
  .delete("/customers/:id", CustomerController.DeleteCustomer);

export default router;
