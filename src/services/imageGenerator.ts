import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function generateSpecialistImages() {
  const prompts = [
    "Professional female gynecologist, mid-30s, warm smile, wearing a white coat and stethoscope, high-end modern medical office background, soft lighting, 4k, cinematic, professional photography.",
    "Professional male orthopedic surgeon, athletic build, mid-40s, confident look, wearing a white coat, modern sports medicine clinic background, high-tech equipment visible, 4k, cinematic, professional photography.",
    "Professional male psychologist, mid-40s, calm and empathetic expression, wearing business casual attire, cozy and modern therapy office background with books and plants, soft warm lighting, 4k, cinematic, professional photography.",
    "Elite medical specialist, high-tech futuristic hospital background, holographic displays, professional and advanced look, 4k, cinematic, professional photography."
  ];

  const results = [];

  for (const prompt of prompts) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-image-preview',
        contents: {
          parts: [{ text: prompt }],
        },
        config: {
          imageConfig: {
            aspectRatio: "1:1",
            imageSize: "1K"
          }
        },
      });

      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          results.push(`data:image/png;base64,${part.inlineData.data}`);
        }
      }
    } catch (error) {
      console.error("Error generating image:", error);
    }
  }

  return results;
}

// This is a helper to get the images. In a real app, we'd save these or use them in the UI.
// For this task, I'll generate them and then update the service.
