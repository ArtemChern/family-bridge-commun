# PathSense

AI-powered local guide — describe your situation, get smart suggestions with directions.

**Live:** http://48.211.178.1 · **Built by:** Mosaic Team · **Event:** AIForGoodHack South Europe 2026

## Features

**Ask** — Describe your location, conditions, and needs. AI returns 3-5 relevant suggestions with names, explanations, addresses, and one-tap Google Maps directions.

**Challenge** — 60-second situational awareness quiz: read a real-world city scenario, pick the smartest action. Score points, build streaks, beat your high score.

**History** — Browse past searches with expandable suggestion results.

## Examples

- "I'm in central Prague, it's raining, I need a quiet café with Wi-Fi to work"
- "Looking for a wheelchair-accessible museum near Times Square"
- "Late night in Berlin, need a safe 24h pharmacy nearby"
- "Family with small kids near Barcelona beach, need shade and food"

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19, Vite, TypeScript |
| UI | Tailwind CSS v4, Radix UI / shadcn/ui, Framer Motion |
| AI | Azure OpenAI (gpt-4.1-mini) via Chat Completions API |
| Maps | Google Maps links for directions and location search |
| Hosting | AKS (nginx container serving the Vite SPA) |
| Registry | Azure Container Registry (`familybridgeacr`) |
| CI/CD | GitHub Actions → ACR build → AKS deploy |

## Architecture

```
Browser (React SPA)
  ├─ /api/ai → nginx reverse proxy → Azure OpenAI (gpt-4.1-mini)
  ├─ Google Maps links for directions (external)
  └─ static assets served by nginx
```

- API key is injected server-side by nginx — never exposed to the browser
- Search history stored in browser `localStorage`
- 2 pod replicas behind a LoadBalancer service

## Project Structure

```
src/
  App.tsx                  # Main app with Ask/Challenge/History tabs
  components/
    AskTab.tsx             # Situation input + suggestion results
    SuggestionCard.tsx     # Individual suggestion with map/directions
    GameTab.tsx            # Situational awareness quiz
    FloatingBackground.tsx # Animated background
  hooks/
    use-local-storage.ts   # localStorage persistence hook
  lib/
    azure-llm.ts           # Azure OpenAI client + suggestion/game prompts
k8s/
  deployment.yaml          # 2 replicas, health probes, resource limits
  service.yaml             # LoadBalancer on port 80
Dockerfile                 # Multi-stage: Node build → nginx serve
nginx.conf                 # SPA routing + /api/ai reverse proxy
```

## Local Development

```bash
npm install
npm run dev
```

## Deployment

```bash
az acr build --registry familybridgeacr --image familybridge:latest .
az aks get-credentials --resource-group familybridge-rg --name familybridge-aks
kubectl apply -f k8s/
```

## License

[MIT](LICENSE) — Copyright (c) 2026 Mosaic Team
