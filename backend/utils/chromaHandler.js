// utils/chromaHandler.js
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import dotenv from "dotenv";
dotenv.config();


// ✅ Initialize Hugging Face Embeddings
const embeddings = new HuggingFaceInferenceEmbeddings({
  model: "sentence-transformers/all-MiniLM-L6-v2",
  apiKey: process.env.HF_API_KEY,
});

// ❌ Removed Chroma usage
// ✅ Replaced with in-memory vector store
export const addToChroma = async (text, metadata = {}) => {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 50,
  });

  let chunks = await splitter.createDocuments([text], metadata);
  chunks = chunks.filter(chunk => chunk.pageContent.trim().length > 0);

  console.log(`🧩 Created ${chunks.length} valid text chunks for embedding`);
  chunks.forEach((chunk, idx) => {
    console.log(`🔹 Chunk ${idx + 1} length: ${chunk.pageContent.length}`);
  });

  try {
    const vectorStore = await MemoryVectorStore.fromDocuments(chunks, embeddings);
    console.log("✅ Embedding successful (in-memory vector store)");
    return vectorStore;
  } catch (error) {
    console.error("❌ Error embedding chunks:", error.message);
    throw error;
  }
};

// ❌ Disable loading Chroma collection since it's not used
export const loadChromaCollection = async () => {
  console.warn("⚠️ loadChromaCollection is not used with MemoryVectorStore.");
  return null;
};
