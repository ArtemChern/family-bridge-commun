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
| AI | Azure OpenAI Service (gpt-4.1-mini) |
| Maps | Google Maps links for directions and location search |
| Hosting | Azure Kubernetes Service (AKS) |
| Registry | Azure Container Registry (ACR) |
| CI/CD | GitHub Actions → ACR build → AKS deploy |

## Architecture

```
                          ┌──────────────────────────────────┐
                          │     Azure Resource Group          │
                          │     familybridge-rg (eastus2)     │
                          │                                   │
  User Browser            │  ┌─────────────────────────┐     │
  ┌──────────┐   HTTP     │  │  Azure Kubernetes Service│     │
  │ React SPA├───────────►│  │  (familybridge-aks)      │     │
  └──────────┘            │  │                          │     │
                          │  │  nginx container (x2)    │     │
                          │  │  ┌────────────────────┐  │     │
                          │  │  │ static assets (SPA)│  │     │
                          │  │  │ /api/ai → proxy ───┼──┼──┐  │
                          │  │  └────────────────────┘  │  │  │
                          │  └──────────────────────────┘  │  │
                          │                                │  │
                          │  ┌─────────────────────────┐   │  │
                          │  │ Azure OpenAI Service     │◄──┘  │
                          │  │ (familybridge-openai)    │      │
                          │  │ Model: gpt-4.1-mini      │      │
                          │  └─────────────────────────┘      │
                          │                                    │
                          │  ┌─────────────────────────┐      │
                          │  │ Azure Container Registry │      │
                          │  │ (familybridgeacr)        │      │
                          │  │ Docker images storage     │      │
                          │  └─────────────────────────┘      │
                          └───────────────────────────────────┘
```

## Microsoft Azure Services

PathSense runs entirely on Microsoft Azure. Below is a detailed description of each service used, why it was chosen, and how it fits into the architecture.

### Azure Kubernetes Service (AKS)

**Resource:** `familybridge-aks` in `familybridge-rg` (East US 2)

AKS provides a managed Kubernetes cluster for hosting the application. We chose AKS for production-grade container orchestration with automatic health monitoring, rolling deployments, and built-in load balancing.

| Setting | Value |
|---------|-------|
| Node pool | 1 node, Standard_B2s (2 vCPU, 4 GB RAM) |
| Kubernetes version | 1.33 |
| Replicas | 2 pods (for high availability) |
| Service type | LoadBalancer (public IP: 48.211.178.1) |
| Health checks | Liveness + readiness probes on port 80 |
| Resource limits | 50m–200m CPU, 64–128 Mi memory per pod |

**How it works:** Each pod runs an nginx container that serves the React SPA as static files and reverse-proxies `/api/ai` requests to Azure OpenAI. The LoadBalancer service distributes traffic across both pods. Rolling updates ensure zero-downtime deployments — when a new image is pushed, AKS gradually replaces old pods with new ones.

**Kubernetes manifests:** `k8s/deployment.yaml` and `k8s/service.yaml`.

### Azure OpenAI Service

**Resource:** `familybridge-openai` in `familybridge-rg` (East US 2)

Azure OpenAI provides the AI backbone of the application. We use the **Chat Completions API** to generate context-aware place suggestions and situational quiz questions.

| Setting | Value |
|---------|-------|
| Model | gpt-4.1-mini (2025-04-14) |
| Deployment name | `gpt-4.1-mini` |
| SKU | GlobalStandard, 10K TPM |
| API version | 2024-10-21 |
| Endpoint | `eastus2.api.cognitive.microsoft.com` |

**How it works:** The browser never calls Azure OpenAI directly. Instead, nginx acts as a reverse proxy: requests to `/api/ai` are forwarded to the Azure OpenAI Chat Completions endpoint with the API key injected server-side via the `api-key` header in `nginx.conf`. This keeps the key out of client-side code entirely.

**Two AI use cases:**
1. **Ask tab** — user describes a situation; the AI returns a JSON array of 3-5 place suggestions with name, type, address, distance, rating, explanation, and a Google Maps query.
2. **Challenge tab** — the AI generates situational quiz scenarios with 3 answer choices and an explanation of the best option.

### Azure Container Registry (ACR)

**Resource:** `familybridgeacr` in `familybridge-rg` (East US 2)

ACR stores Docker images for the application. It is directly attached to the AKS cluster, so Kubernetes can pull images without separate credentials.

| Setting | Value |
|---------|-------|
| SKU | Basic |
| Login server | `familybridgeacr.azurecr.io` |
| Image | `familybridge:<version>` |
| Build method | ACR Tasks (cloud-based Docker builds) |

**How it works:** We use **ACR Tasks** to build Docker images in the cloud — no local Docker installation needed. The source code is uploaded as a tar.gz, ACR builds the multi-stage Dockerfile (Node.js build → nginx serve), and pushes the resulting image. AKS pulls the image directly from ACR via the attached registry integration.

**Build command:**
```bash
az acr build --registry familybridgeacr --image familybridge:latest .
```

### Azure Resource Group

**Resource:** `familybridge-rg` (East US 2)

All PathSense resources live in a single dedicated resource group, isolated from other projects in the subscription. This provides clear cost tracking, access control, and lifecycle management.

**Resources in the group:**
- `familybridge-aks` — AKS cluster
- `familybridge-openai` — Azure OpenAI Service
- `familybridgeacr` — Container Registry

### CI/CD Pipeline (GitHub Actions + Azure)

The deployment pipeline uses GitHub Actions to automate builds and deployments:

```
git push to main
  → GitHub Actions workflow triggers
  → Azure Login (service principal)
  → az acr login + Docker build + push to ACR
  → az aks get-credentials + kubectl apply -f k8s/
  → Rolling update on AKS (zero downtime)
```

**Workflow file:** `.github/workflows/deploy-aks.yml`

**Required GitHub secret:** `AZURE_CREDENTIALS` — a service principal JSON with ACR push and AKS deploy permissions.

### Security Model

| Concern | Approach |
|---------|----------|
| API key protection | Key is in `nginx.conf` on the server only; never sent to the browser |
| Network access | AKS LoadBalancer with public IP; Azure OpenAI accessed via internal proxy |
| Container images | Stored in private ACR; AKS pulls via managed identity (ACR attachment) |
| Data storage | No server-side data; search history in browser localStorage only |
| Authentication | No user auth required (public tool) |

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

> Note: The `/api/ai` proxy only works when served through nginx. For local dev, temporarily hardcode the Azure OpenAI endpoint in `azure-llm.ts`.

## Deployment

```bash
# Build and push image via ACR Tasks
az acr build --registry familybridgeacr --image familybridge:latest .

# Deploy to AKS
az aks get-credentials --resource-group familybridge-rg --name familybridge-aks
kubectl apply -f k8s/
```

## License

[MIT](LICENSE) — Copyright (c) 2026 Mosaic Team
