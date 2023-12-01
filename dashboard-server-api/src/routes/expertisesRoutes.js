import express from "express";
import ExpertiseController from "../controllers/expertisesController.js";

const router = express.Router();

router
  .get("/expertises/", ExpertiseController.GetAllExpertises)
  .get("/expertises/search", ExpertiseController.GetExpertisesByQuerySearch)
  .get("/expertises/:id", ExpertiseController.GetExpertiseById)
  .post("/expertises/", ExpertiseController.AddNewExpertise)
  .delete("/expertises/:id", ExpertiseController.DeleteExpertise);

export default router;
