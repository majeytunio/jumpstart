import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { messages, systemPrompt, userCompany, userWebsite } = await req.json();

    if (!messages || !systemPrompt) {
      return NextResponse.json({ error: 'Messages and systemPrompt are required' }, { status: 400 });
    }

    // Construct the full messages array with system prompt
    const openAIMessages = [
      { role: 'system', content: systemPrompt },
      ...messages
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: openAIMessages,
        temperature: 0.7,
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      throw new Error(errorData.error?.message || 'OpenAI API request failed');
    }

    const result = await response.json();
    const botReply = result.choices[0]?.message?.content?.trim();

    if (!botReply) {
      throw new Error('No response from OpenAI');
    }

    return NextResponse.json({ 
      success: true, 
      message: botReply 
    });

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to generate response' 
      }, 
      { status: 500 }
    );
  }
}