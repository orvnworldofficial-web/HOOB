import express from "express";
import { createAdmin } from "../controllers/adminController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// Only logged-in admins can create other admins
router.post("/create", protect, authorizeRoles("admin"), createAdmin);

export default router;
