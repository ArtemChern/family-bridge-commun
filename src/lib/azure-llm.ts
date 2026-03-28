/**
 * Call Azure AI Foundry Responses API via nginx reverse proxy.
 * The API key is injected server-side by nginx — not exposed to the browser.
 */
export async function callAzureLLM(prompt: string): Promise<string> {
  const response = await fetch('/api/ai', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      input: prompt,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text().catch(() => 'unknown error');
    throw new Error(`Azure API request failed (${response.status}): ${errorBody}`);
  }

  const data = await response.json();

  // Responses API returns output[].content[].text
  const outputText = data.output
    ?.find((item: { type: string }) => item.type === 'message')
    ?.content?.find((c: { type: string }) => c.type === 'output_text')
    ?.text;

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
