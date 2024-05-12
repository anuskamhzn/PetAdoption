import express from "express";
import {
    registerController,
    sregisterController,
    loginController,
    testController,
    forgotPasswordController,
    updateProfileController,
    updateSProfileController,
    approveShelter,
    rejectShelter,
    userController,
    getUserByIdController,
    userPhotoController,
    deleteUserController,
  } from "../controllers/authController.js";
  import { isAdminOrShelter,requireSignIn } from "../middlewares/authMiddleware.js";
  import formidable from "express-formidable";

//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);
router.post("/sregister", sregisterController);

// Admin Routes
router.put('/admin/approve-shelter/:shelterId', requireSignIn, isAdminOrShelter, approveShelter);
router.put('/admin/reject-shelter/:shelterId', requireSignIn, isAdminOrShelter, rejectShelter);

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

router.put('/profile', formidable(),requireSignIn, updateProfileController);

router.put('/profiles', formidable(), requireSignIn, updateSProfileController);

//getALl users
router.get("/get-users", userController);

//get user info
router.get("/user-info/:userId",getUserByIdController);

//get photo
router.get("/user-photo/:userId", userPhotoController);

//delete product
router.delete("/delete-user/:userId", deleteUserController);
export default router;