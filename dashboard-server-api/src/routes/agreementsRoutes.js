import express from "express";
import AgreementController from "../controllers/agreementsController.js";

const router = express.Router();

router
  .get("/agreements", AgreementController.GetAllAgreements)
  .get("/agreements/search", AgreementController.GetAgreementByQuerySearch)
  .get("/agreements/:id", AgreementController.GetAgreementById)
  .post("/agreements", AgreementController.AddNewAgreement)
  .put("/agreements/:id", AgreementController.UpdateAgreement)
  .delete("/agreements/:id", AgreementController.DeleteAgreement);

export default router;
