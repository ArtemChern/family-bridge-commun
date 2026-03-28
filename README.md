# FamilyBridge

AI-powered family communication tool that helps parents and children write more effective, empathetic messages through real-time refinement and gamified learning.

**Live:** http://48.211.178.1 · **Built by:** Mosaic Team · **Event:** AIForGoodHack South Europe 2026

## Features

**Compose** — Write a message, select your role (parent/child), and get an AI-improved version with explanations of what changed and why (tone, clarity, emotional balance).

**Challenge** — 60-second timed quiz: read a family scenario, pick the best response from 3 AI-generated variants. Score points, build streaks, beat your high score.

**History** — Browse past messages with original/improved pairs.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19, Vite, TypeScript |
| UI | Tailwind CSS v4, Radix UI / shadcn/ui, Framer Motion |
| AI | Azure OpenAI (gpt-4.1-mini) via Chat Completions API |
| Hosting | AKS (nginx container serving the Vite SPA) |
| Registry | Azure Container Registry (`familybridgeacr`) |
| CI/CD | GitHub Actions → ACR build → AKS deploy |

## Architecture

```
Browser (React SPA)
  ├─ /api/ai → nginx reverse proxy → Azure OpenAI (gpt-4.1-mini)
  └─ static assets served by nginx
```

- API key is injected server-side by nginx — never exposed to the browser
- Message history stored in browser `localStorage`
- 2 pod replicas behind a LoadBalancer service

## Project Structure

```
src/
  App.tsx                  # Main app with Compose/Challenge/History tabs
  components/
    GameTab.tsx            # Gamification challenge component
    RoleSelector.tsx       # Parent/child role picker
    MessageComparison.tsx  # Side-by-side original vs improved
    ExplanationCard.tsx    # AI explanation badges
    FloatingBackground.tsx # Animated background
  hooks/
    use-local-storage.ts   # localStorage persistence hook
  lib/
    azure-llm.ts           # Azure OpenAI client + game question generator
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

> Note: The `/api/ai` proxy only works when served through nginx. For local dev, you can temporarily hard-code the Azure OpenAI endpoint in `azure-llm.ts`.

## Deployment

The app runs on AKS in `familybridge-rg` (eastus2).

```bash
# Build and push image
az acr build --registry familybridgeacr --image familybridge:latest .

# Deploy to AKS
az aks get-credentials --resource-group familybridge-rg --name familybridge-aks
kubectl apply -f k8s/
```

CI/CD is configured in `.github/workflows/deploy-aks.yml` — push to `main` triggers an automatic build and deploy. Requires an `AZURE_CREDENTIALS` secret in the GitHub repo.

## License

[MIT](LICENSE) — Copyright (c) 2026 Mosaic Team
