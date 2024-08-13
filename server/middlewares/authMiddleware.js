// Protected Routes token base
import JWT from "jsonwebtoken";

export const requireSignIn = (req, res, next) => {
  try {
    // Check for authorization header
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized Access: No token provided",
      });
    }

    // Verify token
    const decode = JWT.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (error) {
    console.error("JWT verification error:", error);
    res.status(401).send({
      success: false,
      message: "Unauthorized Access: Invalid token",
    });
  }
};

// Middleware to check if the user is an admin or shelter
import userModel from "../models/userModel.js";

export const isAdminOrShelter = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (!user) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized Access: User not found",
      });
    }
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
