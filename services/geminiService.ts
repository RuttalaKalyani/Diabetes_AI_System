
import { GoogleGenAI, Type } from "@google/genai";
import { DiabetesFeatures } from "../types";

export const getAIExplanation = async (
  features: DiabetesFeatures,
  hybridScore: number
): Promise<{ analysis: string; recommendations: string[]; topFactors: string[] }> => {
  // Use pre-configured process.env.API_KEY as per @google/genai guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `
    Analyze these diabetes risk features and provide a clinical XAI report.
    
    Metrics:
    - Glucose: ${features.glucose} mg/dL
    - BMI: ${features.bmi}
    - Age: ${features.age}
    - DPF: ${features.dpf}
    - Insulin: ${features.insulin}
    
    Hybrid ML Consensus Score: ${(hybridScore * 100).toFixed(1)}%
    
    Requirements:
    1. Identify the 3 most critical features influencing this specific patient's risk.
    2. Provide a 2-sentence professional clinical summary of the risk profile.
    3. Suggest 4 specific, actionable lifestyle or medical steps.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            analysis: { type: Type.STRING },
            recommendations: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            topFactors: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["analysis", "recommendations", "topFactors"]
        }
      }
    });

    // Access text property directly as per @google/genai documentation
    const text = response.text;
    if (!text) throw new Error("Empty response from AI");
    
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini Diagnostic Error:", error);
    return {
      analysis: "The system is currently unable to generate deep clinical insights. Please review the raw hybrid scores below.",
      recommendations: [
        "Consult a specialist for a fasting plasma glucose test",
        "Monitor carbohydrate intake",
        "Maintain regular physical activity (150 mins/week)",
        "Schedule a follow-up screening in 3 months"
      ],
      topFactors: ["Blood Glucose", "BMI", "Age"]
    };
  }
};
