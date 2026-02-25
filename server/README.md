# NavalhaPro Backend — Deploy Guide

## Requisitos
- Docker + Docker Compose
- VPS com Node 20+ (se rodar sem Docker)

## Deploy rápido (Docker)

```bash
cd server

# Copie e edite as variáveis de ambiente
cp .env.example .env
nano .env  # Ajuste JWT_SECRET, APP_BASE_URL, etc.

# Suba tudo
docker compose up -d

# Aguarde Postgres ficar healthy, então rode migrations
docker compose exec api npm run migrate

# Verifique
docker compose logs -f api
```

## Endpoints

A API roda em `http://localhost:3003`. Todas as rotas são prefixadas com `/api`.

### Health Check
```bash
curl http://localhost:3003/health
```

### Auth
```bash
# Registrar
curl -X POST http://localhost:3003/api/auth/register \
  -H 'Content-Type: application/json' \
  -d '{"name":"João","email":"joao@test.com","password":"123456"}'

# Login
curl -X POST http://localhost:3003/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"joao@test.com","password":"123456"}'

# Me (usar token do login)
curl http://localhost:3003/api/auth/me \
  -H 'Authorization: Bearer SEU_TOKEN'
```

### Tenant (autenticado)
```bash
TOKEN=seu_jwt_aqui

# Info do tenant
curl http://localhost:3003/api/tenants/barbearia-do-joao \
  -H "Authorization: Bearer $TOKEN"

# Serviços
curl http://localhost:3003/api/tenants/barbearia-do-joao/services \
  -H "Authorization: Bearer $TOKEN"

# Equipe
curl http://localhost:3003/api/tenants/barbearia-do-joao/team \
  -H "Authorization: Bearer $TOKEN"

# Clientes
curl http://localhost:3003/api/tenants/barbearia-do-joao/clients \
  -H "Authorization: Bearer $TOKEN"

# Agendamentos de hoje
curl "http://localhost:3003/api/tenants/barbearia-do-joao/appointments?date=2026-02-25" \
  -H "Authorization: Bearer $TOKEN"
```

### Dashboard (autenticado)
```bash
# Métricas
curl http://localhost:3003/api/tenants/barbearia-do-joao/dashboard/metrics \
  -H "Authorization: Bearer $TOKEN"

# Gráficos
curl "http://localhost:3003/api/tenants/barbearia-do-joao/dashboard/charts?days=60&top=5" \
  -H "Authorization: Bearer $TOKEN"
```

### Rotas Públicas (sem auth)
```bash
# Info do tenant
curl http://localhost:3003/api/public/tenants/barbearia-do-joao

# Serviços
curl http://localhost:3003/api/public/tenants/barbearia-do-joao/services

# Equipe
curl http://localhost:3003/api/public/tenants/barbearia-do-joao/team

# Cadastrar/atualizar cliente
curl -X POST http://localhost:3003/api/public/tenants/barbearia-do-joao/clients/upsert \
  -H 'Content-Type: application/json' \
  -d '{"name":"Cliente Teste","phone":"81999990000"}'
```

## Sem Docker (dev local)

```bash
cd server
npm install

# Postgres e Redis precisam estar rodando
export DATABASE_URL=postgres://navalhapro:navalhapro@localhost:5432/navalhapro
export REDIS_URL=redis://localhost:6379
export JWT_SECRET=dev-secret-change-me-in-production-32ch

npm run migrate
npm run dev
```

## Nginx (proxy reverso)

```nginx
server {
    server_name api.seudominio.com.br;

    location / {
        proxy_pass http://127.0.0.1:3003;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```
