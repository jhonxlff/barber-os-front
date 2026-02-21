

# BarberOS — Fase 1: Core do Painel Admin

## Visão Geral
Frontend completo do painel administrativo para barbeiros brasileiros. Tema escuro premium com toggle para modo claro, mobile-first, dados mockados e estrutura pronta para conectar ao backend na VPS.

---

## 1. Fundação e Infraestrutura

### Tema e Design System
- **Tema escuro como padrão** com tons de cinza escuro, dourado/âmbar como accent, toggle claro/escuro no topbar
- Tipografia limpa e moderna, espaçamento generoso
- Componentes reutilizáveis: `StatusBadge`, `MoneyCard`, `PageHeader`, `DataTable`, `ModalForm`, `EmptyState`, skeletons de loading

### Estrutura de API e Mocks
- Arquivo `src/config/env.ts` com `API_BASE_URL` e `WS_URL`
- Serviço central `src/services/api.ts` com cliente HTTP, interceptors de token, módulos organizados (auth, appointments, clients, finance, etc.)
- `src/services/socket.ts` com estrutura WebSocket pronta (listeners para `appointment:updated`, `tracking:location`, `queue:updated`, `notification:new`)
- Dados mockados em `src/mocks/` — prontos para trocar por chamadas reais
- Todas as páginas com estados de **loading skeleton**, **empty state**, **error state** e **retry**

### Autenticação (Mock)
- Páginas: `/login`, `/register`, `/forgot-password`
- `AuthProvider` com localStorage simulando sessão
- Guarda de rota `ProtectedRoute` para `/app/*`
- Papéis: OWNER, MANAGER, BARBER — UI adapta menus e permissões por role

### Multi-tenant
- Rotas com `[tenant]` na URL (ex: `/app/barbearia-do-joao/dashboard`)
- Tenant simulado por mock, preparado para vir do backend

---

## 2. Layout do Painel Admin

### Sidebar (Desktop)
Menu lateral com ícones e labels:
- Dashboard, Agenda, Clientes (CRM), Financeiro, Automações, Fila, Estoque, Avaliações, Equipe/Unidades, Configurações
- Colapsável com mini-mode (apenas ícones)

### Topbar
- Seletor de unidade (Unidade 1 / Unidade 2 / Todas)
- Botão "Novo Agendamento" em destaque
- Sino de notificações
- Menu do usuário (perfil, sair)

### Mobile
- Sidebar vira **bottom navigation** com 5 ícones principais + menu "Mais"
- Botões grandes, leitura rápida

---

## 3. Páginas do Painel (Core)

### 3.1 Dashboard (`/app/[tenant]/dashboard`)
- Cards de métricas: faturamento hoje/mês, clientes hoje, próximos atendimentos, taxa de faltas, ticket médio
- Gráficos com Recharts: faturamento 30 dias, serviços mais vendidos
- Lista "Próximos agendamentos" com badges de status (Pendente, Confirmado, Pago, Atrasado, Finalizado)

### 3.2 Agenda (`/app/[tenant]/agenda`)
- Visualizações: Dia / Semana / Mês / Lista
- Modal para criar/editar agendamento (cliente, serviço, barbeiro, horário)
- Ações: bloquear horário, encaixe, reagendar, cancelar, marcar compareceu
- Badges de status coloridos
- No detalhe: botões "Enviar lembrete", "Cobrar sinal Pix", "Abrir mapa" (todos UI only)

### 3.3 Clientes CRM (`/app/[tenant]/clientes`)
- Tabela com busca e filtros: nome, telefone, último corte, frequência, gasto total, nível fidelidade
- Página de detalhe (`/clientes/[clientId]`): perfil, timeline de atendimentos, fotos de cortes, observações, fidelidade (progresso "10 cortes = 1 grátis"), alerta "X dias sem cortar", botão "Enviar mensagem"

### 3.4 Financeiro (`/app/[tenant]/financeiro`)
- Resumo: receita bruta, líquida, comissões, lucro estimado
- Tabela de lançamentos com filtro por período
- Comissão por barbeiro
- Botão "Exportar CSV" (simulado)
- Visível apenas para OWNER e MANAGER

### 3.5 Equipe e Unidades (`/app/[tenant]/equipe`)
- Lista de barbeiros com permissões e comissões
- Gerenciamento de unidades (multi-unidade)
- Horários de trabalho por barbeiro

### 3.6 Configurações (`/app/[tenant]/configuracoes`)
- Dados da barbearia (nome, endereço, logo)
- Horários de funcionamento
- Serviços e preços
- Seção "Integrações" (pagamento, WhatsApp, email, push) — apenas UI/placeholder

---

## 4. Páginas Secundárias (Estrutura)

As seguintes páginas serão criadas com layout e UI básica, prontas para expansão na Fase 2:

- **Automações** (`/app/[tenant]/automacoes`) — UI de regras SE/ENTÃO com exemplos
- **Fila** (`/app/[tenant]/fila`) — lista da fila, botão "Chamar próximo", tempo estimado
- **Estoque** (`/app/[tenant]/estoque`) — produtos, entradas/saídas, alertas de baixo estoque
- **Avaliações** (`/app/[tenant]/avaliacoes`) — nota média, comentários, ranking barbeiros
- **Tracking** (`/app/[tenant]/tracking/[appointmentId]`) — card simulando mapa com status de deslocamento

---

## 5. Qualidade

- Tudo em **português (PT-BR)**
- Acessibilidade básica: labels, foco, contraste adequado
- Componentes reutilizáveis para consistência visual
- Comentários no código indicando onde conectar endpoints reais
- React Query para gerenciamento de estado servidor (com mocks)

---

## Fora desta fase (Fase 2+)
- Landing Page do SaaS (/, /pricing, /features)
- App do Cliente (/c/[tenant]/*)
- Agendamento público e fluxo de pagamento
- Fila pública do cliente
- PWA / manifest / push notifications

