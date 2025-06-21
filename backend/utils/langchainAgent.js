import { ChatGroq } from "@langchain/groq";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import dotenv from "dotenv";
dotenv.config();

console.log("HF_API_KEY:", process.env.HF_API_KEY); // Debug check

// ✅ Test Hugging Face API key
(async () => {
  try {
    const testEmbedding = await new HuggingFaceInferenceEmbeddings({
      model: "sentence-transformers/all-MiniLM-L6-v2",
      apiKey: process.env.HF_API_KEY,
    }).embedQuery("This is a test sentence.");
    console.log("✅ Test embedding successful. Length:", testEmbedding.length);
  } catch (error) {
    console.error("❌ Hugging Face embedding failed:", error.message);
  }
})();

// Embeddings
const embeddings = new HuggingFaceInferenceEmbeddings({
  model: "sentence-transformers/all-MiniLM-L6-v2",
  apiKey: process.env.HF_API_KEY,
});

// LLM
const model = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
  model: "llama3-8b-8192",
});

// Prompt (unchanged as per your request)
const prompt = PromptTemplate.fromTemplate(`
You're an expert AI Career Counselor.
Use the student's resume and interests to provide insightful career guidance.
Analyze based on the following principles:

1. Recognize student's **aptitude and interests**. Recommend careers that align with them. Identify possible mismatches due to peer/parental influence.
2. Provide **personalized advice** instead of generic suggestions. Consider life experiences, goals, and constraints.
3. Discuss **in-demand opportunities & trends** (e.g., Data Science, AI, Digital Marketing). Explain salaries, growth, relevance.
4. Explain **career routes**: degrees, specializations, certifications, colleges to aim for.
5. Encourage **skill development**: technical + soft skills (leadership, teamwork, etc). Suggest workshops or online courses.
6. Suggest how to involve parents positively in career decisions, especially if their vision differs.

RESUME:
{context}

USER INTERESTS:
{interests}

What is your detailed guidance?
`);

// 🔁 Main function
export const askCareerAgent = async (resume, interests) => {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 50,
  });

  const docs = await splitter.createDocuments([resume]);

  const vectorStore = await MemoryVectorStore.fromDocuments(docs, embeddings);
  const retriever = vectorStore.asRetriever({ k: 5 });

  const chain = RunnableSequence.from([
    {
      context: async (input) => {
        const docs = await retriever.getRelevantDocuments(input.resume);
        return docs.map((doc) => doc.pageContent).join("\n\n");
      },
      interests: (input) => input.interests,
    },
    prompt,
    model,
  ]);

  const response = await chain.invoke({ resume, interests });
  return response.content;
};
