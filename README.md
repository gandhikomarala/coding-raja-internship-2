# TaskMatrix 360 - Enterprise Task Orchestration & Workflow Platform

TaskMatrix 360 is an enterprise project management system, Kanban task orchestrator, agile sprint velocity tracker, and Eisenhower AI prioritization engine.

## Architecture
- **Task Orchestrator**: Dynamic task lifecycle state machine (Backlog, In Progress, Code Review, Completed).
- **Agile Sprint Velocity**: Real-time story point burn-down computation and SLA breach risk alerting.
- **FastAPI Core**: Low-latency REST endpoints for high-throughput enterprise team task coordination.

## Installation Instructions
```bash
# Clone repository
git clone git@github.com:gandhikomarala/coding-raja-internship-2.git
cd coding-raja-internship-2

# Backend dependencies
pip install -r backend/requirements.txt

# Frontend dependencies
cd frontend
npm install
```

## Build Instructions
```bash
# Build frontend web app
cd frontend
npm run build

# Build with Docker Compose
cd ..
docker-compose build
```

## Run Instructions
```bash
# Run FastAPI backend
uvicorn backend.app.main:app --host 0.0.0.0 --port 8000

# Run Frontend Dev Server
cd frontend
npm run dev -- --port 3000

# Run all via Docker Compose
docker-compose up -d
```

## Test Instructions
```bash
# Run backend Pytest suite
pytest backend/tests

# Run frontend Vitest suite
cd frontend && npm test
```
