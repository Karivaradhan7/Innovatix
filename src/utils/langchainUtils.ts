
import { PromptTemplate } from "@langchain/core/prompts";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { RunnableSequence } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";

// Initialize the Google Generative AI model with optimized settings
const getGoogleAI = () => {
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  
  console.log("API Key status:", API_KEY ? "Present" : "Missing");
  console.log("API Key length:", API_KEY?.length || 0);
  
  if (!API_KEY) {
    throw new Error("VITE_GEMINI_API_KEY is not defined in environment variables");
  }
  
  return new ChatGoogleGenerativeAI({
    apiKey: API_KEY,
    modelName: "gemini-1.5-flash", // Using flash model for faster responses
    maxOutputTokens: 1024, // Reduced for faster generation
    temperature: 0.5, // Reduced for more consistent, faster responses
    topK: 20, // Reduced for faster processing
    topP: 0.8, // Slightly reduced
  });
};

// Define prompt templates for each feature with formatting guidelines
const promptTemplates = {
  content: PromptTemplate.fromTemplate(
    `Generate structured educational content based on the following prompt. 
    Include headings, explanations, examples, and key points.
    
    IMPORTANT FORMATTING GUIDELINES:
    - DO NOT use markdown syntax (no **, *, _, or backticks)
    - Use plain text with clear section headings
    - Use simple bullet points or numbered lists where needed
    - Add spacing between sections for readability
    - If code examples are needed, present them as plain text (without syntax highlighting markers)
    
    PROMPT: {userPrompt}`
  ),
  
  quiz: PromptTemplate.fromTemplate(
    `Generate a quiz based on the following prompt. 
    Include a mix of multiple choice, true/false, and short answer questions.
    
    IMPORTANT FORMATTING GUIDELINES:
    - DO NOT use markdown syntax (no **, *, _, or backticks)
    - Use plain text with clear section headings
    - Use simple bullet points or numbered lists for questions
    - Add spacing between questions and sections
    - If code examples are needed, present them as plain text (without syntax highlighting markers)
    
    PROMPT: {userPrompt}`
  ),
  
  materials: PromptTemplate.fromTemplate(
    `Generate a comprehensive learning roadmap or materials list based on the following prompt. 
    Include resources, steps, and recommendations.
    
    IMPORTANT FORMATTING GUIDELINES:
    - DO NOT use markdown syntax (no **, *, _, or backticks)
    - Use plain text with clear section headings
    - Use simple bullet points or numbered lists where needed
    - Add spacing between sections for readability
    - If code examples are needed, present them as plain text (without syntax highlighting markers)
    
    PROMPT: {userPrompt}`
  ),
  
  notes: PromptTemplate.fromTemplate(
    `Generate concise, organized notes based on the following prompt. 
    Include key concepts, definitions, and important information.
    
    IMPORTANT FORMATTING GUIDELINES:
    - DO NOT use markdown syntax (no **, *, _, or backticks)
    - Use plain text with clear section headings
    - Use simple bullet points or numbered lists for key points
    - Add spacing between sections for readability
    - If code examples are needed, present them as plain text (without syntax highlighting markers)
    
    PROMPT: {userPrompt}`
  ),
  
  flashcards: PromptTemplate.fromTemplate(
    `Generate flashcards based on the following prompt. 
    Format as Question: [question] and Answer: [answer] pairs. 
    Make them concise and focused on key information.
    
    IMPORTANT FORMATTING GUIDELINES:
    - DO NOT use markdown syntax (no **, *, _, or backticks)
    - Use plain text with clear labeling for questions and answers
    - Add spacing between each flashcard for readability
    - If code examples are needed, present them as plain text (without syntax highlighting markers)
    
    PROMPT: {userPrompt}`
  ),
  
  assistant: PromptTemplate.fromTemplate(
    `You are an educational assistant. Provide a helpful, accurate response to the following question or request.
    
    IMPORTANT FORMATTING GUIDELINES:
    - DO NOT use markdown syntax (no **, *, _, or backticks)
    - Use plain text with clear section headings where needed
    - Use simple bullet points or numbered lists if appropriate
    - Add spacing between sections for readability
    - If code examples are needed, present them as plain text (without syntax highlighting markers)
    
    QUESTION: {userPrompt}
    
    If this question relates to previous questions you've answered in this conversation, try to maintain context.`
  ),
};

// Create a chain for generating content with Gemini
export const createGenerationChain = (feature: keyof typeof promptTemplates) => {
  const model = getGoogleAI();
  
  // Create the chain
  const chain = RunnableSequence.from([
    // Format the prompt using the appropriate template
    promptTemplates[feature],
    // Generate content using the model
    model,
    // Parse the output to a string
    new StringOutputParser(),
  ]);
  
  return chain;
};

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const generateWithLangChain = async (
  feature: keyof typeof promptTemplates,
  userPrompt: string,
  retryCount = 0,
  maxRetries = 3
): Promise<string> => {
  try {
    console.log("Starting generation with feature:", feature);
    console.log("User prompt length:", userPrompt.length);
    console.log("Retry attempt:", retryCount);

    const startTime = Date.now();
    const chain = createGenerationChain(feature);
    const result = await chain.invoke({ userPrompt });
    const endTime = Date.now();

    console.log("Generation completed in:", endTime - startTime, "ms");
    console.log("Result length:", result.length);

    return result;
  } catch (error: any) {
    console.error("Error in LangChain generation:", error);
    console.error("Error details:", error instanceof Error ? error.message : error);

    const isRateLimitError = error?.message?.includes("quota") ||
                            error?.message?.includes("rate limit") ||
                            error?.message?.includes("429") ||
                            error?.status === 429;

    if (isRateLimitError && retryCount < maxRetries) {
      const delay = Math.min(1000 * Math.pow(2, retryCount), 10000);
      console.log(`Rate limit hit. Retrying in ${delay}ms... (Attempt ${retryCount + 1}/${maxRetries})`);
      await sleep(delay);
      return generateWithLangChain(feature, userPrompt, retryCount + 1, maxRetries);
    }

    if (isRateLimitError) {
      throw new Error("API rate limit exceeded. Please wait a moment and try again. The Gemini API has limits on requests per minute.");
    }

    throw error;
  }
};
