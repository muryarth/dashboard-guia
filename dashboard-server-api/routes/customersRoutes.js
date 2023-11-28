import express from "express";
import CustomerController from "../controllers/customersController.js";

/**
 * Rotas Cliente
 */

const router = express.Router();

router.get("/customers/", CustomerController.GetAllCustomers);

export default router;
