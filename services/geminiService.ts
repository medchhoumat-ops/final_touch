
import { GoogleGenAI, Type } from "@google/genai";
import { LeadSearchParams, Lead } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateLeads = async (params: LeadSearchParams): Promise<Lead[]> => {
  const prompt = `Generate a list of realistic B2B leads for the following criteria:
    Business Category: ${params.category}
    Location: ${params.location}
    Quantity: ${params.quantity}
    Precision Level: ${params.precision}

    The data should be realistic and formatted for business outreach.
    Include a mix of startup and established businesses.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            businessName: { type: Type.STRING },
            website: { type: Type.STRING },
            email: { type: Type.STRING },
            description: { type: Type.STRING },
            contactPerson: { type: Type.STRING },
            score: { type: Type.NUMBER, description: "Lead quality score from 1-100" }
          },
          required: ["id", "businessName", "website", "email", "description", "score"],
        },
      },
    },
  });

  try {
    const jsonStr = response.text.trim();
    return JSON.parse(jsonStr) as Lead[];
  } catch (error) {
    console.error("Failed to parse Gemini response", error);
    throw new Error("Could not generate leads correctly. Please try again.");
  }
};
