import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Gemini setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Create model
const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash"
});

// Create chat with personality
const chat = model.startChat({
    history: [
        {
            role: "user",
            parts: [{ text: "You are a friendly AI chatbot talking to a user named ChilledGuy. Always reply in a helpful, clear, and friendly way." }]
        },
        {
            role: "model",
            parts: [{ text: "Got it! I will respond in a friendly and helpful way to ChilledGuy in Hinglish." }]
        }
    ]
});

// API route
app.post("/chat", async (req, res) => {
    try {
        const userMessage = req.body.message;

        if (!userMessage) {
            return res.status(400).json({
                reply: "Please send a message."
            });
        }

        const result = await chat.sendMessage(userMessage);
        const response = await result.response;
        const text = response.text();

        res.json({
            reply: text
        });

    } catch (error) {
        console.error("SERVER ERROR:", error);

        res.status(500).json({
            reply: "Server error occurred. Check backend."
        });
    }
});

// Start server
const ports = [3001];

function startServer(portIndex = 0) {
    if (portIndex >= ports.length) {
        console.error("❌ No available ports!");
        return;
    }

    const port = ports[portIndex];

    const server = app.listen(port, () => {
        console.log(`✅ Server running at http://localhost:${port}`);
    });

    server.on("error", (err) => {
        if (err.code === "EADDRINUSE") {
            console.log(`⚠️ Port ${port} busy, trying next...`);
            startServer(portIndex + 1);
        } else {
            console.error("❌ Server error:", err);
        }
    });
}

startServer();