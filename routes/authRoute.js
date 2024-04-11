import express from "express";
import {
    registerController,
    loginController,
    testController,
    forgotPasswordController,
    updateProfileController,
    updateSProfileController,
  } from "../controllers/authController.js";
  import { isAdminOrShelter,requireSignIn } from "../middlewares/authMiddleware.js";

//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);

//LOGIN || POST
router.post('/login',loginController);

//forgot password
router.post('/forgot-password', forgotPasswordController);


//test routes
router.get('/test',requireSignIn,isAdminOrShelter,testController);

//protected user route auth
router.get("/user-auth", requireSignIn, (req,res) => {
  res.status(200).send({ok:true});
});
//protected admin route auth
router.get("/admin-auth", requireSignIn,isAdminOrShelter, (req,res) => {
  res.status(200).send({ok:true});
});
//protected admin route auth
router.get("/shelter-auth", requireSignIn,isAdminOrShelter, (req,res) => {
  res.status(200).send({ok:true});
});

router.put('/profile',requireSignIn, updateProfileController);

router.put('/profiles',requireSignIn, updateSProfileController);


export default router;