import express from "express";
import { processQuery, getChatHistory } from "../controllers/chatController.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/query", authenticateToken, processQuery);
router.get("/chat-history", authenticateToken, getChatHistory);

export default router;
