import express from "express";
import EmployeeController from "../controllers/employeesController.js";

const router = express.Router();

router
  .get("/employees/", EmployeeController.GetAllEmployees)
  .get("/employees/auth", EmployeeController.AuthenticateEmployee)
  .get("/employees/search", EmployeeController.GetEmployeesByQuerySearch)
  .get("/employees/:id", EmployeeController.GetEmployeeById)
  .post("/employees/", EmployeeController.AddNewEmployee)
  .put("/employees/:id", EmployeeController.UpdateEmployee)
  .delete("/employees/:id", EmployeeController.DeleteEmployee);

export default router;
