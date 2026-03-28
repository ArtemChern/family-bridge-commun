/**
 * Call Azure OpenAI Chat Completions API via nginx reverse proxy.
 * The API key is injected server-side by nginx — not exposed to the browser.
 */
export async function callAzureLLM(prompt: string): Promise<string> {
  const response = await fetch('/api/ai', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messages: [
        { role: 'user', content: prompt },
      ],
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text().catch(() => 'unknown error');
    throw new Error(`Azure API request failed (${response.status}): ${errorBody}`);
  }

  const data = await response.json();

  // Chat Completions API returns choices[0].message.content
  const outputText = data.choices?.[0]?.message?.content;

  if (!outputText) {
    throw new Error('No output text in Azure API response');
  }

  return outputText;
}

/**
 * Parse a JSON string from LLM output, stripping markdown fences if present.
 */
export function parseLLMJson<T>(raw: string): T {
  // Strip ```json ... ``` wrappers if the model added them
  const cleaned = raw.replace(/^```(?:json)?\s*\n?/i, '').replace(/\n?```\s*$/i, '').trim();
  return JSON.parse(cleaned) as T;
}

/* ── Game question generation ── */

export interface GameQuestion {
  scenario: string;
  variants: [string, string, string];
  bestIndex: number;
  explanation: string;
}

const GAME_PROMPT = `You are a family communication coach creating a quiz question.

Generate a realistic family scenario (1-2 sentences) where a parent or child needs to respond.
Then provide exactly 3 possible responses. One is clearly the best (empathetic, constructive), one is okay but flawed, and one is poor (aggressive, dismissive, or passive-aggressive).

Return a valid JSON object:
{
  "scenario": "The scenario description",
  "variants": ["Response A", "Response B", "Response C"],
  "bestIndex": 0,
  "explanation": "Brief explanation of why the best answer works and what the others lack"
}

Rules:
- bestIndex is 0, 1, or 2 (the index of the best response)
- Randomize which position the best answer is in
- Keep each response to 1-2 sentences
- Make scenarios diverse: different family members, ages, situations
- Keep it realistic and relatable`;

export async function generateGameQuestion(): Promise<GameQuestion> {
  const raw = await callAzureLLM(GAME_PROMPT);
  return parseLLMJson<GameQuestion>(raw);
}
