// Protected Routes token base
import JWT from "jsonwebtoken";

export const requireSignIn = (req, res, next) => {
  try {
    const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      message: "Unauthorized Access",
    });
  }
};

// Middleware to check if the user is an admin or shelter
import userModel from "../models/userModel.js";

export const isAdminOrShelter = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1 && user.role !== 2) { // Check if user is neither admin nor shelter
      return res.status(401).send({
        success: false,
        message: "Unauthorized Access",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin or shelter middleware",
    });
  }
};
