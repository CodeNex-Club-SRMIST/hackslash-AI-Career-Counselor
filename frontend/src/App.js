import React, { useState } from "react";
import jsPDF from "jspdf";
import "./App.css";

function AccordionSection({ title, content }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="accordion">
      <button className="accordion-header" onClick={() => setIsOpen(!isOpen)}>
        {title}
        <span className="accordion-icon">{isOpen ? "−" : "+"}</span>
      </button>
      {isOpen && <div className="accordion-body">{content}</div>}
    </div>
  );
}

function App() {
  const [resume, setResume] = useState(null);
  const [interests, setInterests] = useState("");
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => setResume(e.target.files[0]);
  const handleInterestsChange = (e) => setInterests(e.target.value);

  const parseSections = (text) => {
    const regex = /\*\*(.*?)\*\*:\s*((?:.|\n)*?)(?=\n\*\*|$)/g;
    const result = [];
    let match;
    while ((match = regex.exec(text)) !== null) {
      result.push({
        title: match[1].trim(),
        content: match[2].trim(),
      });
    }
    return result;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSections([]);
    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("interests", interests);

    try {
      const res = await fetch("http://localhost:3001/api/counselor/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setSections(parseSections(data.result));
      } else {
        setError(data.error || "Something went wrong.");
      }
    } catch (err) {
      setError("Failed to connect to backend.");
    }
    setLoading(false);
  };

  // PDF Download Handler
  const handleDownloadPDF = () => {
    if (!sections.length) return;
    const doc = new jsPDF();
    let y = 15;

    doc.setFontSize(18);
    doc.text("AI Career Counselor Report", 10, y);
    y += 10;

    doc.setFontSize(12);
    sections.forEach((section) => {
      doc.setFont(undefined, "bold");
      doc.text(section.title, 10, y);
      y += 7;
      doc.setFont(undefined, "normal");
      const lines = doc.splitTextToSize(section.content, 180);
      doc.text(lines, 10, y);
      y += lines.length * 7 + 5;
      if (y > 270) {
        doc.addPage();
        y = 10;
      }
    });

    doc.save("career-guidance.pdf");
  };

  return (
    <div className="app-root">
      <div className="app-container">
        <h1 className="app-title">Meet Your AI Career Counselor</h1>
        <p className="app-desc">
          Upload your resume & enter your interests to receive <br />
          smart, personalized career guidance — powered by AI.
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label className="form-label">Resume (PDF)</label>
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              required
              className="form-input"
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label className="form-label">Your Interests</label>
            <textarea
              value={interests}
              onChange={handleInterestsChange}
              rows={3}
              placeholder="e.g. Data Science, AI, Marketing..."
              required
              className="form-textarea"
            />
          </div>
          <button type="submit" disabled={loading} className="form-button">
            {loading ? "Analyzing..." : "Get Career Guidance"}
          </button>
        </form>

        {error && <div className="error-message">{error}</div>}

        {sections.length > 0 && (
          <div className="result-box">
            <h2 className="result-title">Your Personalized Guidance:</h2>
            <button
              className="form-button"
              style={{ marginBottom: 16 }}
              onClick={handleDownloadPDF}
            >
              Download PDF Report
            </button>
            {sections.map((section, index) => (
              <AccordionSection
                key={index}
                title={section.title}
                content={
                  <div style={{ whiteSpace: "pre-line" }}>{section.content}</div>
                }
              />
            ))}
          </div>
        )}
      </div>
      <footer className="footer">
        Powered by LLaMA3, Hugging Face &amp; LangChain
      </footer>
    </div>
  );
}

export default App;
