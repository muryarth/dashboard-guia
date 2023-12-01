import express from "express";
import AuthorizationController from "../controllers/authorizationsController.js";

const router = express.Router();

router
  .get("/authorizations/", AuthorizationController.GetAllAuthorizations)
  .get("/authorizations/search", AuthorizationController.GetAuthorizationsByQuerySearch)
  .get("/authorizations/:id", AuthorizationController.GetAuthorizationById)
  .post("/authorizations/", AuthorizationController.AddNewAuthorization)
  // .put("/authorizations/:id", AuthorizationController.UpdateAuthorization)
  .delete("/authorizations/:id", AuthorizationController.DeleteAuthorization);

export default router;
