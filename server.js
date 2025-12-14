const express = require("express");
const multer = require("multer");
const cors = require("cors");

const app = express();

// Allow requests from GitHub Pages
app.use(cors({
  origin: "https://npc-beach-711.github.io"
}));

// File uploads
const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});

// Health check
app.get("/health", (req, res) => {
  res.json({ ok: true });
});

// Form submission
app.post(
  "/submit",
  upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "coverLetter", maxCount: 1 },
  ]),
  (req, res) => {
    console.log("FORM DATA:", req.body);
    console.log("FILES:", req.files);

    res.json({ ok: true, message: "Application received" });
  }
);

// IMPORTANT for deployment
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
