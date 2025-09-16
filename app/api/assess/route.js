import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';
import { supabase } from '../../../lib/supabase';

// Helper function to calculate scores
const calculateScores = (responses) => {
  const categories = {
    Financial: [],
    'Physical Fitness': [],
    Social: [],
    Intellectual: [],
    Identity: [],
  };

  const questionMap = {
    'q1': 'Financial', 'q2': 'Financial', 'q3': 'Financial', 'q4': 'Financial', 'q5': 'Financial',
    'q6': 'Physical Fitness', 'q7': 'Physical Fitness', 'q8': 'Physical Fitness', 'q9': 'Physical Fitness', 'q10': 'Physical Fitness',
    'q11': 'Social', 'q12': 'Social', 'q13': 'Social', 'q14': 'Social', 'q15': 'Social',
    'q16': 'Intellectual', 'q17': 'Intellectual', 'q18': 'Intellectual', 'q19': 'Intellectual', 'q20': 'Intellectual',
    'q21': 'Identity', 'q22': 'Identity', 'q23': 'Identity', 'q24': 'Identity', 'q25': 'Identity',
  };

  for (const key in responses) {
    if (responses.hasOwnProperty(key) && questionMap[key]) {
      const category = questionMap[key];
      categories[category].push(responses[key]);
    }
  }

  const scores = {};
  for (const category in categories) {
    const sum = categories[category].reduce((acc, curr) => acc + curr, 0);
    const avg = sum / categories[category].length;
    // Convert to 0-100% scale from 1-5 scale
    scores[category] = Math.round(((avg - 1) / 4) * 100);
  }

  return scores;
};

// Helper function to call the AI Agent
const callAIAgent = async (scores) => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY,
  });

  const prompt = `
    Based on the following founder life balance assessment scores (0-100%), please generate a personalized report.
    Scores: ${JSON.stringify(scores)}
    The report should be a single JSON object with the following fields:
    - "summary": a one-paragraph summary of the results.
    - "strengths": an array of two top strengths based on the highest scores.
    - "growthAreas": an array of two growth opportunities based on the lowest scores.
    - "actionSteps": an array of three actionable steps tailored to improve the lowest scoring areas.
    Ensure the response is a valid JSON object.
  `;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Or another model like gpt-3.5-turbo
      messages: [{ role: "user", content: prompt }],
      response_format: { "type": "json_object" },
    });

    return JSON.parse(completion.choices[0].message.content);
  } catch (error) {
    console.error('Error calling OpenAI:', error);
    return {
      summary: "An error occurred while generating the report.",
      strengths: [],
      growthAreas: [],
      actionSteps: [],
    };
  }
};

export async function POST(req) {
  try {
    const { responses, userId } = await req.json();

    if (!userId || !responses) {
      return NextResponse.json({ error: 'Missing user ID or responses.' }, { status: 400 });
    }

    // Check if user has already submitted an assessment this month
    const { data: existingAssessment, error: fetchError } = await supabase
      .from('assessments')
      .select('id')
      .eq('user_id', userId)
      .gte('created_at', new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString())
      .limit(1);

    if (fetchError) throw fetchError;
    if (existingAssessment.length > 0) {
      return NextResponse.json({ error: 'Assessment already submitted this month.' }, { status: 403 });
    }

    // 3. Calculate scores
    const calculatedScores = calculateScores(responses);

    // 4. Call AI Agent
    const aiReport = await callAIAgent(calculatedScores);

    // 5. Store assessment results in the database (optional but recommended)
    const { data, error: insertError } = await supabase
      .from('assessments')
      .insert([
        {
          user_id: userId,
          scores: calculatedScores,
          report: aiReport,
        }
      ])
      .select();

    if (insertError) throw insertError;

    // Return the scores and the AI report to the client
    return NextResponse.json({
      scores: calculatedScores,
      report: aiReport,
      message: 'Assessment submitted successfully.',
    }, { status: 200 });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'An internal server error occurred.' }, { status: 500 });
  }
}