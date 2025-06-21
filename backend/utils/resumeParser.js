// utils/resumeParser.js
import fs from "fs/promises";
import pdf from "pdf-parse";

export async function parseResume(filePath) {
  try {
    const pdfBuffer = await fs.readFile(filePath);
    const data = await pdf(pdfBuffer);
    const resumeText = data.text.trim();

    console.log("📄 Resume Preview:", resumeText.slice(0, 300) + "...");

    // Optional: Delete uploaded file
    await fs.unlink(filePath);

    return resumeText;
  } catch (error) {
    console.error("❌ Error parsing resume:", error);
    throw new Error("Failed to parse resume PDF.");
  }
}
