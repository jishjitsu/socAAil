import express from "express";
import ProgressTracker from "../models/progresstracker.js"; // Ensure the path and extension are correct
import { body, validationResult } from "express-validator";
import { authenticateToken } from "../middleware/auth.js"; // Import the authentication middleware

const router = express.Router();

// Middleware for validation error handling
const validate = (validations) => async (req, res, next) => {
  await Promise.all(validations.map((validation) => validation.run(req)));
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Get progress for the authenticated user
router.get(
  "/",
  authenticateToken,
  async (req, res) => {
    try {
      const progress = await ProgressTracker.findOne({ userId: req.user.id });
      if (!progress) {
        return res.status(404).json({ message: "Progress not found" });
      }
      res.status(200).json({
        userId: progress.userId,
        currentStreak: progress.currentStreak,
        highestStreak: progress.highestStreak,
        lastUpdated: progress.lastUpdated,
      });
    } catch (error) {
      console.error("Error fetching progress:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// Update streak for the authenticated user
router.patch(
  "/update",
  authenticateToken,
  validate([
    body("success").isBoolean().withMessage("Success must be a boolean"),
  ]),
  async (req, res) => {
    const { success } = req.body;

    try {
      const progress = await ProgressTracker.findOne({ userId: req.user.id });
      if (!progress) {
        return res.status(404).json({ message: "Progress not found" });
      }

      const now = new Date();
      const lastUpdatedDate = new Date(progress.lastUpdated.toISOString().split("T")[0]);
      const todayDate = new Date(now.toISOString().split("T")[0]);

      const isSameDay = lastUpdatedDate.getTime() === todayDate.getTime();

      if (!isSameDay && success) {
        progress.currentStreak += 1;
        if (progress.currentStreak > progress.highestStreak) {
          progress.highestStreak = progress.currentStreak;
        }
      } else if (!success) {
        progress.currentStreak = 0;
      }

      progress.lastUpdated = now;
      await progress.save();

      res.status(200).json({
        userId: progress.userId,
        currentStreak: progress.currentStreak,
        highestStreak: progress.highestStreak,
        lastUpdated: progress.lastUpdated,
      });
    } catch (error) {
      console.error("Error updating streak:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

export default router;
