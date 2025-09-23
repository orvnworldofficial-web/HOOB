import express from "express";
import { sendBroadcast } from "../controllers/broadcastController.js";

const router = express.Router();

// 🔐 Add JWT middleware later for admin-only access
router.post("/", sendBroadcast);

export default router;
