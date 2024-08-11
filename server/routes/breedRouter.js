import express from "express";
import { isAdminOrShelter, requireSignIn } from "./../middlewares/authMiddleware.js";
import {
    breedControlller,
    createBreedController,
  deleteBreedCOntroller,
  singleBreedController,
  updateBreedController,
} from "./../controllers/breedController.js";

const router = express.Router();

//routes
// create category
router.post(
  "/create-breed",
  requireSignIn,
  isAdminOrShelter,
  createBreedController
);

//update category
router.put(
  "/update-breed/:id",
  requireSignIn,
  isAdminOrShelter,
  updateBreedController
);

//getALl category
router.get("/get-breed", breedControlller);

//single category
router.get("/single-breed/:slug", singleBreedController);

//delete category
router.delete(
  "/delete-breed/:id",
  requireSignIn,
  isAdminOrShelter,
  deleteBreedCOntroller
);

export default router;