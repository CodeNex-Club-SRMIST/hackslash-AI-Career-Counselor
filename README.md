# hackslash-marketmavericks-aadyothcoding
Hackathon repository for team hackslash-marketmavericks-aadyothcoding
# 🎓 AI Career Counselor

AI-powered web app that analyzes resumes + interests to provide smart career guidance using LLMs and vector databases.

---

## 🚀 Key Features

- 📄 Upload resume (PDF)
- 💬 Enter career interests
- 🤖 Personalized advice using LLaMA3 + Hugging Face
- 🖥️ Simple, responsive React UI
- 📥 Download guidance as PDF

---

## ⚙️ Tech Stack

- **Frontend**: React, jsPDF
- **Backend**: Node.js, Express, Multer
- **AI/Embedding**: LLaMA3 (via Groq), Hugging Face Inference API
- **PDF Parsing**: `pdf-parse`
- **Vector Store**: LangChain (in-memory)

---

# 🎓 AI Career Counselor

An AI-powered career counseling web application that analyzes a student's resume and interests to generate intelligent, personalized guidance using cutting-edge NLP and vector databases.

---

## 🚀 Features

- **Upload Resume**: Users can upload their PDF resume.
- **Interest Input**: Users specify their career interests.
- **Personalized Guidance**: The backend analyzes the resume and interests using LLMs and embeddings to generate tailored career advice.
- **Downloadable Report**: Users can download their guidance as a PDF.
- **Modern UI**: Responsive React frontend with a clean, user-friendly interface.

---

## 🏗️ Project Structure

```
hackslash-marketmavericks-aadyothcoding/
│
├── backend/
│   ├── server.js
│   ├── routes/
│   │   └── counselor.js
│   ├── utils/
│   │   ├── chromaHandler.js
│   │   ├── langchainAgent.js
│   │   └── resumeParser.js
│   ├── uploads/
│   ├── .env
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── App.js
    │   ├── App.css
    │   ├── index.js
    │   └── ...
    ├── public/
    │   └── ...
    └── package.json
```

---

## 🧠 Tech Stack

| Layer      | Tech                                           |
|------------|------------------------------------------------|
| Frontend   | React, jsPDF                                   |
| Backend    | Node.js, Express, Multer                       |
| AI Model   | LLaMA3 via Groq + LangChain                    |
| NLP Embedding | Hugging Face Inference API                  |
| Storage    | In-memory Vector Store (LangChain)             |
| Parsing    | `pdf-parse` for extracting text from PDFs      |

---

## 🔍 Codebase Analysis

### Backend

- **[server.js](backend/server.js)**:  
  Sets up the Express server, loads environment variables, applies CORS and JSON middleware, and mounts the `/api/counselor` route.

- **[routes/counselor.js](backend/routes/counselor.js)**:  
  Handles the `/upload` endpoint.  
  - Uses Multer to handle PDF uploads.
  - Validates input.
  - Calls [`parseResume`](backend/utils/resumeParser.js) to extract text from the PDF.
  - Calls [`askCareerAgent`](backend/utils/langchainAgent.js) to generate career guidance using LLM and embeddings.
  - Returns the result as JSON.

- **[utils/resumeParser.js](backend/utils/resumeParser.js)**:  
  Reads the uploaded PDF, extracts text using `pdf-parse`, logs a preview, deletes the file, and returns the text.

- **[utils/langchainAgent.js](backend/utils/langchainAgent.js)**:  
  - Loads Hugging Face and Groq API keys.
  - Initializes Hugging Face embeddings and Groq LLaMA3 model.
  - Splits resume text into chunks, embeds them, and stores them in an in-memory vector store.
  - Uses LangChain's RunnableSequence to retrieve relevant resume chunks and generate a detailed, personalized response using a prompt template.

- **[utils/chromaHandler.js](backend/utils/chromaHandler.js)**:  
  Provides a utility for embedding text chunks into an in-memory vector store (Chroma DB code is present but not used).

### Frontend

- **[src/App.js](frontend/src/App.js)**:  
  - Main React component.
  - Handles file and interest input, form submission, and displays results.
  - Sends resume and interests to the backend.
  - Parses and displays the AI-generated guidance in an accordion UI.
  - Allows downloading the guidance as a PDF using jsPDF.

- **[src/App.css](frontend/src/App.css)**:  
  Provides modern, responsive styling for the app, including form, buttons, accordion, and result display.

- **[src/index.js](frontend/src/index.js)**:  
  Standard React entry point.

---

## ⚙️ Setup & Usage

### 1. Clone the Repository

```sh
git clone https://github.com/your-username/ai-career-counselor.git
cd ai-career-counselor
```

### 2. Backend Setup

```sh
cd backend
npm install
# Add your API keys to .env (see .env.example)
npm run dev
```

### 3. Frontend Setup

```sh
cd frontend
npm install
npm start
```

### 4. Usage

- Open [http://localhost:3000](http://localhost:3000) in your browser.
- Upload your resume (PDF) and enter your interests.
- Click "Get Career Guidance" to receive personalized advice.
- Download your report as a PDF.

---

## 📝 Environment Variables

Backend requires the following in `.env`:

```
GROQ_API_KEY=your_groq_api_key
HF_API_KEY=your_huggingface_api_key
PORT=3001
```

---

## 🛡️ Security & Privacy

- Uploaded resumes are deleted after parsing.
- API keys are loaded from environment variables and not exposed to the frontend.

---

## 📁 Notable Files

- [`backend/server.js`](backend/server.js): Express server entry point.
- [`backend/routes/counselor.js`](backend/routes/counselor.js): Main API route for resume upload and guidance.
- [`backend/utils/langchainAgent.js`](backend/utils/langchainAgent.js): LLM and embedding logic.
- [`frontend/src/App.js`](frontend/src/App.js): Main React component.

---

## 🧩 Extensibility

- Easily swap out LLMs or embedding models in [`langchainAgent.js`](backend/utils/langchainAgent.js).
- Add more routes or features (e.g., user authentication, history).
- UI can be extended with more analytics or visualizations.

---

## 🤝 Contributing

Pull requests and suggestions are welcome! Please open an issue to discuss changes.

---

## 📜 License

MIT License

---

## 👥 Team

Team hackslash-marketmavericks-aadyothcoding

---
