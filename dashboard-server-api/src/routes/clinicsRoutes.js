import express from "express";
import ClinicController from "../controllers/clinicsController.js";

const router = express.Router();

router
  .get("/clinics/", ClinicController.GetAllClinics)
  .get("/clinics/search", ClinicController.GetClinicsByQuerySearch)
  .get("/clinics/:id", ClinicController.GetClinicById)
  .post("/clinics/", ClinicController.AddNewClinic)
  .put("/clinics/:id", ClinicController.UpdateClinic)
  .delete("/clinics/:id", ClinicController.DeleteClinic);

export default router;
