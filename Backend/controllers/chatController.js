/* eslint-disable no-undef */
import axios from "axios";
import { Chat } from "../models/Chat.js";

export const processQuery = async (req, res) => {
  const { query } = req.body;
  console.log("NGROK_API_URL:", process.env.NGROK_API_URL);

  try {
    const response = await axios.post(
      `${process.env.NGROK_API_URL}/generate_response`,
      { query }
    );

    const chatResponse = response.data.response;

    const chatLog = new Chat({
      userId: req.user.userId,
      query,
      response: chatResponse,
    });
    await chatLog.save();

    res.json({ response: chatResponse });
  } catch (error) {
    console.error("Error processing query:", error);
    res
      .status(500)
      .json({ message: "Error processing query: " + error.message });
  }
};

export const getChatHistory = async (req, res) => {
  try {
    const chatHistory = await Chat.find({ userId: req.user.userId }).sort({
      timestamp: -1,
    });
    res.json(chatHistory);
  } catch (error) {
    console.error("Error fetching chat history:", error);
    res
      .status(500)
      .json({ message: "Error fetching chat history: " + error.message });
  }
};
