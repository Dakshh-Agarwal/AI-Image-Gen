import express from 'express';
import * as dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import fetch from 'node-fetch';

dotenv.config();

const router = express.Router();

const genAI = process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'SET' ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY) : null;

router.route('/').get((req, res) => {
  res.status(200).json({ message: 'Hello from Gemini Image Generation!' });
});

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;

    let enhancedPrompt = prompt;
    try {
      if (genAI) {
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
        const enhanceResult = await model.generateContent(
          `You are an expert image prompt engineer. Enhance the following prompt to be more detailed and vivid for AI image generation. Return ONLY the enhanced prompt, nothing else.\n\nPrompt: ${prompt}`
        );
        enhancedPrompt = enhanceResult.response.text().trim();
      }
    } catch (geminiError) {
      console.warn('Gemini enhancement failed or API key invalid, using original prompt', geminiError.message || geminiError);
    }

    // Step 2: Generate image using Pollinations.ai (free, no API key needed)
    const encodedPrompt = encodeURIComponent(enhancedPrompt);
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&nologo=true&seed=${Date.now()}`;

    // Step 3: Fetch the image and convert to base64
    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) {
      throw new Error('Failed to generate image from Pollinations');
    }
    const arrayBuffer = await imageResponse.arrayBuffer();
    const base64Image = Buffer.from(arrayBuffer).toString('base64');

    res.status(200).json({ photo: base64Image });
  } catch (error) {
    console.error(error);
    res.status(500).send(error?.message || 'Something went wrong');
  }
});

export default router;
