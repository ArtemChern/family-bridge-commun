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

/* ── Situation-based suggestions ── */

export interface Suggestion {
  name: string;
  type: string;
  why: string;
  address: string;
  distance: string;
  rating: string;
  mapsQuery: string;
}

export async function getSuggestions(
  location: string,
  situation: string,
): Promise<Suggestion[]> {
  const prompt = `You are a smart local guide AI. The user needs help finding the right place or service.

Location: ${location || 'Not specified — suggest generally well-known options'}
Situation: ${situation}

Return a JSON array of 3-5 relevant suggestions. Each object must have:
{
  "name": "Place name",
  "type": "Category (e.g. Café, Restaurant, Park, Museum, Hospital, Store)",
  "why": "1-2 sentences explaining why this fits the user's needs",
  "address": "Full street address",
  "distance": "Approximate distance like '0.5 km' or '10 min walk'",
  "rating": "Estimated rating like '4.5' or leave empty if unknown",
  "mapsQuery": "Best Google Maps search query to find this exact place"
}

Rules:
- Suggest REAL, well-known places when possible
- If the location is vague, suggest popular/famous options that match
- Prioritize relevance to the described situation (accessibility, weather, budget, etc.)
- Include diverse options (not all the same type)
- Be practical and specific`;

  const raw = await callAzureLLM(prompt);
  return parseLLMJson<Suggestion[]>(raw);
}

/* ── Game question generation ── */

export interface GameQuestion {
  scenario: string;
  variants: [string, string, string];
  bestIndex: number;
  explanation: string;
}

const GAME_PROMPT = `You are creating a situational awareness quiz question about navigating real-world situations in a city.

Generate a realistic scenario (1-2 sentences) where someone needs to make a smart choice about where to go, what to do, or how to handle a situation in a city.
Then provide exactly 3 possible actions. One is clearly the best (practical, safe, effective), one is okay but flawed, and one is poor (risky, inefficient, or impractical).

Return a valid JSON object:
{
  "scenario": "The scenario description",
  "variants": ["Option A", "Option B", "Option C"],
  "bestIndex": 0,
  "explanation": "Brief explanation of why the best answer works and what the others lack"
}

Rules:
- bestIndex is 0, 1, or 2 (the index of the best option)
- Randomize which position the best answer is in
- Keep each option to 1-2 sentences
- Diverse scenarios: navigation, safety, finding services, weather, accessibility, emergencies, travel tips
- Practical and realistic`;

export async function generateGameQuestion(): Promise<GameQuestion> {
  const raw = await callAzureLLM(GAME_PROMPT);
  return parseLLMJson<GameQuestion>(raw);
}
