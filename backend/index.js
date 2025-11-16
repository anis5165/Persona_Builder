const express = require("express");
const multer = require("multer");
const pdf = require("pdf-parse");
const fs = require("fs");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const app = express();
app.use(cors({ origin: "http://localhost:3000", methods: ["GET", "POST"] }));
const upload = multer({ dest: "uploads/" });

const genAI = new GoogleGenerativeAI(process.env.Gemini_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

app.post("/upload-pdf", upload.single("pdf"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded." });
  }

  try {
    const dataBuffer = fs.readFileSync(req.file.path);
    const data = await pdf(dataBuffer);
    const extractedText = data.text;

    const prompt = `Extract and structure the following resume/CV text into JSON format with the following keys: name, email, phone, summary, skills (array), experience (array of objects with keys: position, company, start_date, end_date, description), education (array of objects with keys: degree, institution, end_year, Location, percentage/CGPA/GPA; note that some people write location after the institute separated with a comma, so please accommodate this possibility in the institution field), and projects (array of objects with keys: title, description, technologies). Use only valid JSON format.\n\n${extractedText}`;

    const result = await model.generateContent(prompt);
    const response = result.response ? result.response : result; // Ensure correct handling
    const jsonOutput = response.text ? response.text() : response.text; // Check if text method exists

    console.log("Raw response:", JSON.stringify(response, null, 2));

    const cleanedJson = jsonOutput.replace(/```json|```/g, "").trim();

    try {
      const parsedJSON = JSON.parse(cleanedJson);
      res.json(parsedJSON);
    } catch (parseError) {
      console.error("JSON Parsing Error:", parseError);
      res.status(500).json({ error: "Invalid JSON response from AI model." });
    }
  } catch (error) {
    console.error("Error processing PDF:", error);
    res.status(500).json({ error: "Failed to process PDF." });
  } finally {
    fs.unlink(req.file.path, (err) => {
      if (err) console.error("Error deleting file:", err);
    });
  }
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
