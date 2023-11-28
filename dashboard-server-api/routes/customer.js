const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");
/**
 * Rotas Cliente
 */

router
  .get("/", customerController.homepage)
  .get("/view/:id", customerController.viewCustomer)
  .get("/edit/:id", customerController.editCustomer)
  .put("/edit/:id", customerController.editCustomerPost)
  .get("/add", customerController.addCustomer)
  .post("/add", customerController.postCustomer)
  .delete("/edit/:id", customerController.deleteCustomer)
  .post("/search", customerController.searchCustomers);

module.exports = router;
