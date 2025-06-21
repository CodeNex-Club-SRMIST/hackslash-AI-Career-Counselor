import express from 'express';
import multer from 'multer';
import { parseResume } from '../utils/resumeParser.js'; // ✅ fixed import
import { askCareerAgent as runCareerCounselorAgent } from '../utils/langchainAgent.js';

const router = express.Router();

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const safeName = file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, '_');
    cb(null, `${Date.now()}-${safeName}`);
  }
});
const upload = multer({ storage });

router.post('/upload', upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Resume file is required." });
    }

    const interests = (req.body.interests || "").trim();
    if (!interests) {
      return res.status(400).json({ error: "Interests field is required." });
    }

    const resumePath = req.file.path;

    // ✅ Updated function name
    const resumeText = await parseResume(resumePath);

    const result = await runCareerCounselorAgent(resumeText, interests);

    res.json({ message: "Career guidance generated", result });
  } catch (err) {
    console.error("❌ Error in /upload route:", err);
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
});

export default router;
