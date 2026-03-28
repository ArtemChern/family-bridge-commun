const AZURE_ENDPOINT =
  'https://aifh-t4-aifg2026-artem.services.ai.azure.com/api/projects/proj-t4-artem/openai/v1/responses';
const AZURE_API_KEY =
  'REDACTED';

/**
 * Call Azure AI Foundry Responses API and return the assistant's text output.
 */
export async function callAzureLLM(prompt: string): Promise<string> {
  const response = await fetch(AZURE_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': AZURE_API_KEY,
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
