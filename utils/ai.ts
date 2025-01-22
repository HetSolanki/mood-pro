import { Document } from "@langchain/core/documents";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import {
  ChatGoogleGenerativeAI,
  GoogleGenerativeAIEmbeddings,
} from "@langchain/google-genai";
import { loadQARefineChain } from "langchain/chains";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import z from "zod";

const outputSchema = StructuredOutputParser.fromZodSchema(
  z.object({
    subject: z.string().describe("the subject of the journal entry."),
    mood: z
      .string()
      .describe(`the mood of the person who wrote the journal entry.`),

    negative: z.boolean()
      .describe(`Indicates whether the mood or overall sentiment of the journal entry is negative or not. This boolean field aids in quickly identifying entries with potentially concerning emotional states.
  Example: "True" if the mood or sentiment is negative, otherwise "False".`),

    summary: z.string().describe(`quick summary of the entire entry.`),

    color: z
      .string()
      .describe(
        `a hexidecimal color code that represents the mood of the entry. Example #0101fe for blue representing happiness. and yes, remeber that provides the ligher color as my text color is black so provides such color values that i will used it as background color. and generate different colors for different kinda moods`
      ),

    sentimateScore: z
      .number()
      .describe(
        "sentiment of the text and rated on a scale from -10 to 10, where -10 is extremely negative, 0 is neutral, and 10 is extremely positive."
      ),
  })
);

const getPrompt = async (content) => {
  const format_instructions = outputSchema.getFormatInstructions();

  const prompt = new PromptTemplate({
    template:
      "Analyze the following journal entry. Follow the intrusctions and format your response to match the format instructions, no matter what! \n{format_instructions}\n{entry}",
    inputVariables: ["entry"],
    partialVariables: { format_instructions },
  });

  const input = await prompt.format({
    entry: content,
  });

  return input;
};

export const analyse = async (content) => {
  const model = new ChatGoogleGenerativeAI({
    model: "gemini-1.5-flash",
    apiKey: process.env.GOOGLE_API_KEY,
    temperature: 0,
  });

  const input = await getPrompt(content);
  const result = await model.invoke(input);

  try {
    return outputSchema.parse(result.content);
  } catch (e) {
    console.log(e);
  }
};

export const qa = async (question, entries) => {
  const docs = entries.map((entry) => {
    return new Document({
      pageContent: entry.content,
      metadata: { id: entry.id, createdAt: entry.createdAt },
    });
  });

  const model = new ChatGoogleGenerativeAI({
    model: "gemini-1.5-flash",
    apiKey: "AIzaSyD_N5BOR8uGvBtKg_knN8tZVjAVUffUTK0",
    temperature: 0,
  });

  const chain = loadQARefineChain(model);
  const embeddings = new GoogleGenerativeAIEmbeddings({
    apiKey: "AIzaSyD_N5BOR8uGvBtKg_knN8tZVjAVUffUTK0",
  });

  const store = await MemoryVectorStore.fromDocuments(docs, embeddings);

  const relaventDocs = await store.similaritySearch(question);

  const result = await chain.invoke({
    input_documents: relaventDocs,
    question,
  });

  return result.output_text;
};
