import express from 'express';
import mongoose from 'mongoose';
import Adoption from '../models/adoptionModel.js';
import Product from '../models/productModel.js';
import Notification from '../models/Notification.js';
import { requireSignIn, isAdminOrShelter } from '../middlewares/authMiddleware.js';
import productModel from '../models/productModel.js';

const router = express.Router();

// POST /api/v1/adoption - Create a new adoption request
router.post("/", requireSignIn, async (req, res) => {
  try {
    const { productId, userId } = req.body;

    if (!productId || !userId) {
      return res.status(400).json({ message: "Product ID and User ID are required." });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    const shelterId = product.postedBy; // Ensure the shelterId is obtained

    const newAdoption = new Adoption({
      productId,
      userId,
      shelterId,
      status: 'pending',
    });

    await newAdoption.save();

    res.status(201).json({
      message: "Adoption request created successfully.",
      adoption: newAdoption,
    });
  } catch (error) {
    console.error("Error creating adoption request:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// GET /api/v1/adoption - Retrieve all adoption requests
router.get("/", requireSignIn, isAdminOrShelter, async (req, res) => {
  try {
    const { status, userId } = req.query;

    // Ensure the user has a shelter ID
    const shelterId = req.user._id;
    if (!shelterId) {
      return res.status(403).json({ message: "Unauthorized: No shelter ID found." });
    }

    // Build query object with the shelter ID
    const query = { shelterId };

    if (status) {
      query.status = status;
    }

    if (userId) {
      query.userId = userId;
    }

    const adoptionRequests = await Adoption.find(query)
      .populate({
        path: "productId",
        populate: { path: "category", select: "name" },
      })
      .populate("userId", "name");

    res.status(200).json(adoptionRequests);
  } catch (error) {
    console.error("Error fetching adoption requests:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// PATCH /api/v1/adoption/:id/approve - Approve an adoption request
router.patch("/:id/approve", requireSignIn, isAdminOrShelter, async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid adoption request ID." });
    }

    // Find the adoption request by ID
    const adoptionRequest = await Adoption.findByIdAndUpdate(
      id,
      { status: "approved" },
      { new: true }
    ).populate("userId", "name"); // Populate to get user details

    if (!adoptionRequest) {
      return res.status(404).json({ message: "Adoption request not found." });
    }

    // Create a new notification for the user
    const notificationMessage = `Your adoption request for ${adoptionRequest.productId} has been approved.`;
    const newNotification = new Notification({
      userId: adoptionRequest.userId._id,
      productId: adoptionRequest.productId,
      message: notificationMessage,
    });

    console.log("Product ID:", adoptionRequest.productId);

    await newNotification.save(); // Save the notification

    res.status(200).json({
      message: "Adoption request approved.",
      adoption: adoptionRequest,
      notification: newNotification,
    });
  } catch (error) {
    console.error("Error approving adoption request:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// PATCH /api/v1/adoption/:id/reject - Reject an adoption request
router.patch("/:id/reject", requireSignIn, isAdminOrShelter, async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid adoption request ID." });
    }

    // Find the adoption request by ID
    const adoptionRequest = await Adoption.findByIdAndUpdate(
      id,
      { status: "rejected" },
      { new: true }
    ).populate("userId", "name"); // Populate to get user details

    if (!adoptionRequest) {
      return res.status(404).json({ message: "Adoption request not found." });
    }

    // Create a new notification for the user
    const notificationMessage = `Your adoption request for ${adoptionRequest.productId} has been rejected.`;
    const newNotification = new Notification({
      userId: adoptionRequest.userId._id,
      productId: adoptionRequest.productId,
      message: notificationMessage,
    });

    await newNotification.save(); // Save the notification

    res.status(200).json({
      message: "Adoption request rejected.",
      adoption: adoptionRequest,
      notification: newNotification,
    });
  } catch (error) {
    console.error("Error rejecting adoption request:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Add a new route to fetch notifications
router.get("/notifications", requireSignIn, async (req, res) => {
  try {
    // Fetch notifications for the authenticated user and populate product details
    const notifications = await Notification.find({ userId: req.user._id })
      .populate("productId");  // This will fetch related product data

    // Construct human-readable messages
    const updatedNotifications = notifications.map((notification) => {
      let productName = notification.productId?.name || "Unknown"; // Safely get the name
      return {
        ...notification.toObject(), // Convert Mongoose document to plain object
        message: `Your adoption request for ${productName} has been ${notification.message.includes("approved") ? "approved" : "rejected"}.`,
      };
    });

    res.status(200).json(updatedNotifications); // Return the updated notifications
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// New endpoint to check if an adoption request exists for a specific user and product
router.get("/check/:productId", requireSignIn, async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user._id; // Current logged-in user

    // Ensure the IDs are valid
    if (!mongoose.Types.ObjectId.isValid(productId) || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid Product ID or User ID." });
    }

    // Check if an adoption request exists
    const adoptionRequest = await Adoption.findOne({
      productId,
      userId,
      status: 'pending', // Check for 'pending' status (you can adjust this as needed)
    });

    const requestExists = !!adoptionRequest; // Convert to boolean (true if request found)

    res.status(200).json({ requestSent: requestExists });
  } catch (error) {
    console.error("Error checking adoption request:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// GET adoption status by product ID
router.get('/status/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    
    // Find all adoption requests for the given product ID
    const adoptionRequests = await Adoption.find({ productId });

    if (adoptionRequests.length === 0) {
      // If no adoption requests found, return status as "pending"
      return res.json({ status: "pending" });
    }

    // Check if any adoption request is approved
    const hasApprovedRequest = adoptionRequests.some(request => request.status === "approved");
    if (hasApprovedRequest) {
      // If there's an approved request, return status as "approved"
      return res.json({ status: "approved" });
    }

    // If there's no approved request but there are pending requests, return status as "pending"
    return res.json({ status: "pending" });
  } catch (error) {
    console.error("Error fetching adoption status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});



export default router;
