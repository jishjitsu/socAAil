/* eslint-disable no-undef */
import axios from "axios";
import { Chat } from "../models/Chat.js";
const processWithGemini = async (response) => {
  try {
    const geminiResponse = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
      {
        contents: [
          {
            parts: [
              {
                text: `Take this response and:
            1. Make it more conversational and engaging
            2. Add relevant context and examples
            3. Remove any technical formatting or metadata
            4. Structure it in a clear, easy-to-read format
            
            Response to enhance: ${response}`,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          key: "AIzaSyCKf5X_tsPRZhmJla81Vc0dzTCir76rTf8",
        },
      }
    );
    const enhancedText =
      geminiResponse.data.candidates[0].content.parts[0].text;
    return enhancedText;
  } catch (error) {
    console.error("Error processing with Gemini:", error);
    if (error.response) {
      console.error("Gemini API Error Details:", {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
      });
    }
    return response;
  }
};

export const processQuery = async (req, res) => {
  const { query } = req.body;

  try {
    const response = await axios.post(
      `${process.env.NGROK_API_URL}/generate_response`,
      { query }
    );
    let chatResponse = response.data.response;
    const enhancedResponse = await processWithGemini(chatResponse);
    const chatLog = new Chat({
      userId: req.user.userId,
      query,
      response: enhancedResponse,
      timestamp: new Date(),
    });
    await chatLog.save();

    res.json({
      response: enhancedResponse
    });
  } catch (error) {
    console.error("Error in processQuery:", error);
    res.status(500).json({
      message: "Error processing query",
      error: error.message,
    });
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
    res.status(500).json({
      message: "Error fetching chat history",
      error: error.message,
    });
  }
};
