import express from 'express';
import Adoption from '../models/adoptionModel.js';
import { requireSignIn, isAdminOrShelter } from '../middlewares/authMiddleware.js';

const router = express.Router();

// POST /api/v1/adoption - Create a new adoption request
router.post("/", requireSignIn, async (req, res) => {
  try {
    const { productId, userId } = req.body;

    // Validate required fields
    if (!productId || !userId) {
      return res.status(400).json({ message: "Product ID and User ID are required." });
    }

    // Create a new adoption request with 'pending' status
    const newAdoption = new Adoption({
      productId,
      userId,
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

    // Build query object for filtering
    const query = {};

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

    const updatedAdoption = await Adoption.findByIdAndUpdate(
      id,
      { status: "approved" },
      { new: true }
    );

    if (!updatedAdoption) {
      return res.status(404).json({ message: "Adoption request not found." });
    }

    res.status(200).json({
      message: "Adoption request approved.",
      adoption: updatedAdoption,
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

    const updatedAdoption = await Adoption.findByIdAndUpdate(
      id,
      { status: "rejected" },
      { new: true }
    );

    if (!updatedAdoption) {
      return res.status(404).json({ message: "Adoption request not found." });
    }

    res.status(200).json({
      message: "Adoption request rejected.",
      adoption: updatedAdoption,
    });
  } catch (error) {
    console.error("Error rejecting adoption request:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

export default router;
