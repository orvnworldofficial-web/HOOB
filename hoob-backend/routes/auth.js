import express from "express";
import {
  verifyCode,
  login,
  forgotPassword,
  resetPassword,
  sendCode,
  verifyResetCode,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/verify-code", verifyCode);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/send-code", sendCode); 
router.post("/verify-reset-code", verifyResetCode);// <--- new


export default router;
