# 🎓 AI Career Counselor

An AI-powered career counseling web application that analyzes a student's resume and interests to generate intelligent, personalized guidance using cutting-edge NLP and vector databases.

## 🚀 Features

- Upload a PDF resume and get personalized career advice
- Uses Hugging Face embeddings + Chroma DB for semantic search
- LangChain-powered LLM pipeline (Groq + LLaMA3)
- Tailwind CSS frontend for clean UI (in progress)
- Resume chunking + intelligent embedding with recursive splitting

---

## 🧠 Tech Stack

| Layer      | Tech                                           |
|------------|------------------------------------------------|
| Frontend   | React + Tailwind CSS                           |
| Backend    | Node.js + Express                              |
| AI Model   | LLaMA3 via Groq + LangChain                    |
| NLP Embedding | Hugging Face Inference API + Chroma DB      |
| Storage    | Chroma Vector DB (in-memory/local)             |
| Parsing    | `pdf-parse` for extracting text from PDFs      |

---

## 🛠️ Backend Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/ai-career-counselor.git
cd ai-career-counselor/backend
