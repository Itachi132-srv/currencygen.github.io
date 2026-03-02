// server.js
const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 3000;
const API_KEY = process.env.OPENAI_API_KEY; // tumhara $500 API key

app.post("/chat", async (req, res) => {
  const { message } = req.body;
  if(!message) return res.json({ error: "No message sent" });

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are Detox AI, a friendly assistant." },
          { role: "user", content: message }
        ]
      })
    });

    const data = await response.json();
    res.json(data);

  } catch (err) {
    console.log(err);
    res.json({ error: "Server error" });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
