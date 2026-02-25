

# Correções ao Plano do Backend NavalhaPro

Três ajustes técnicos ao plano existente em `.lovable/plan.md`:

---

## 1. Remover prefixo `/api` de todas as rotas

O frontend em `src/services/api.ts` já faz `api.get('/tenants/...')` — o `ApiClient` concatena `baseUrl + path`. O `API_BASE_URL` atual é `http://localhost:3001/api`, ou seja o `/api` já está embutido na base URL, não nas rotas individuais.

**Decisão:** Manter o prefixo `/api` no Fastify (via `fastify.register(routes, { prefix: '/api' })`) e manter o frontend como está. Isso é mais limpo para proxy reverso (Nginx encaminha `/api/*` ao backend). Nenhuma rota individual muda — o prefixo é aplicado uma vez no registro dos módulos.

Alternativa: se preferir sem prefixo, basta mudar `API_BASE_URL` para `http://localhost:3003` e registrar rotas sem prefix. O plano será atualizado para deixar isso configurável, mas o default será **com** `/api` prefix no Fastify, compatível com o frontend atual.

---

## 2. Dashboard `topServices` — usar JOIN em vez de `service_name`

O plano atual cita `GROUP BY service_name`. Correção:

```sql
SELECT s.name, SUM(a.price) as value
FROM appointments a
JOIN services s ON s.id = a.service_id
WHERE a.tenant_id = $1
  AND a.start_at >= $2
  AND a.status::text IN ('FINALIZADO','PAGO')
GROUP BY s.name
ORDER BY value DESC
LIMIT $3
```

Nunca referenciar `service_name` diretamente na tabela `appointments` — esse campo não existe. Sempre via JOIN.

---

## 3. Padronizar comparações com enum `appointment_status`

Todas as queries SQL no backend usarão **cast explícito** para evitar o erro `operator does not exist: appointment_status = text`:

- **Comparações simples:** `a.status::text = 'FINALIZADO'`
- **IN clauses:** `a.status::text IN ('FINALIZADO', 'PAGO')`
- **Parâmetros tipados:** `a.status = $1::appointment_status`
- **ANY arrays:** `a.status = ANY($1::appointment_status[])`

Regra: nunca comparar enum diretamente com string literal sem cast. Aplicar em todos os módulos: `dashboard.service.js`, `appointments.service.js`, `clients.service.js` (para cálculos de loyalty/lastVisit), e `public.service.js`.

---

## Resumo das alterações ao plano

| Item | Antes | Depois |
|------|-------|--------|
| Prefixo API | Ambíguo | `/api` prefix via Fastify register, frontend inalterado |
| topServices query | `GROUP BY service_name` | `JOIN services s ON s.id = a.service_id`, `GROUP BY s.name` |
| Enum comparisons | Cast inconsistente | `a.status::text` em todas as comparações, `$1::appointment_status` para parâmetros |

Estas três correções serão incorporadas na implementação. Nenhum arquivo novo — apenas ajustes ao plano técnico que será seguido na criação do backend.

