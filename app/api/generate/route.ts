import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY, // Make sure this is set in .env
});

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-4', // or 'gpt-3.5-turbo' if you're on the free plan
      // messages: [
      //   {
      //     role: 'system',
      //     content: 'You are a helpful startup advisor AI. Provide concise and strategic suggestions.',
      //   },
      //   {
      //     role: 'user',
      //     content: prompt,
      //   },
      // ],


      messages : [
        {
          role: "system",
          content: "You are a helpful startup assistant that returns structured JSON output for business ideas."
        },
        {
          role: "user",
          content: `
      The user will input a business idea. Respond ONLY in valid JSON format with the following fields:
      {
        "summary": "Brief 2-3 sentence overview of the idea",
        "target_audience": "Describe who the main users are",
        "core_features": ["List", "of", "key", "features"],
        "technical_stack": {
          "frontend": "...",
          "backend": "...",
          "database": "...",
          "ai_tools": "..."
        },
        "potential_challenges": ["List", "of", "possible", "issues"],
        "monetization": "Short explanation of how to generate revenue"
      }

      Business Idea: ${prompt}
      `
        }
      ],

      temperature: 0.7,
      max_tokens: 1200,
    });

    const aiReply = response.choices[0]?.message?.content?.trim();

    return NextResponse.json({ result: aiReply });
  } catch (error) {
    console.error('OpenAI error:', error);
    return NextResponse.json({ error: 'Failed to generate response' }, { status: 500 });
  }
}
