-- NavalhaPro — Migration 002: Demo seed data
-- Tenant "barbearia-do-joao" with sample data

BEGIN;

-- Tenant
INSERT INTO tenants (id, slug, name, address, phone) VALUES
  ('a0000000-0000-0000-0000-000000000001', 'barbearia-do-joao', 'Barbearia do João', 'Rua das Flores, 123 - Recife/PE', '(81) 99999-0001')
ON CONFLICT (slug) DO NOTHING;

-- Owner user (password: admin123)
INSERT INTO users (id, tenant_id, name, email, password_hash, role) VALUES
  ('b0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'João Silva', 'joao@barbeiros.com',
   '$2a$12$LJ3t6GQV5C5q8YZz5Kz5aeX5v5v5v5v5v5v5v5v5v5v5v5v5v5v5', 'OWNER')
ON CONFLICT (email) DO NOTHING;

-- Barbers
INSERT INTO barbers (id, tenant_id, name, email, phone, role, commission_rate, active, working_hours) VALUES
  ('c0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'João Silva', 'joao@barbeiros.com', '(81) 99999-0001', 'OWNER', 100, true,
   '[{"dayOfWeek":1,"start":"08:00","end":"18:00"},{"dayOfWeek":2,"start":"08:00","end":"18:00"},{"dayOfWeek":3,"start":"08:00","end":"18:00"},{"dayOfWeek":4,"start":"08:00","end":"18:00"},{"dayOfWeek":5,"start":"08:00","end":"18:00"},{"dayOfWeek":6,"start":"08:00","end":"14:00"}]'),
  ('c0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000001', 'Pedro Alves', 'pedro@barbeiros.com', '(81) 99999-0002', 'BARBER', 50, true,
   '[{"dayOfWeek":1,"start":"09:00","end":"19:00"},{"dayOfWeek":2,"start":"09:00","end":"19:00"},{"dayOfWeek":3,"start":"09:00","end":"19:00"},{"dayOfWeek":4,"start":"09:00","end":"19:00"},{"dayOfWeek":5,"start":"09:00","end":"19:00"}]'),
  ('c0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000001', 'Lucas Santos', 'lucas@barbeiros.com', '(81) 99999-0003', 'BARBER', 50, true,
   '[{"dayOfWeek":1,"start":"10:00","end":"20:00"},{"dayOfWeek":2,"start":"10:00","end":"20:00"},{"dayOfWeek":3,"start":"10:00","end":"20:00"},{"dayOfWeek":4,"start":"10:00","end":"20:00"},{"dayOfWeek":5,"start":"10:00","end":"20:00"},{"dayOfWeek":6,"start":"10:00","end":"16:00"}]')
ON CONFLICT DO NOTHING;

-- Services
INSERT INTO services (id, tenant_id, name, price, duration, description, active) VALUES
  ('d0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'Corte Tradicional', 45.00, 30, 'Corte masculino clássico com máquina e tesoura', true),
  ('d0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000001', 'Barba Completa', 35.00, 25, 'Barba com navalha, toalha quente e finalização', true),
  ('d0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000001', 'Corte + Barba', 70.00, 50, 'Combo corte e barba completa', true),
  ('d0000000-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000001', 'Degradê Premium', 55.00, 40, 'Corte degradê com acabamento premium', true),
  ('d0000000-0000-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000001', 'Pigmentação', 80.00, 45, 'Pigmentação capilar para falhas', true),
  ('d0000000-0000-0000-0000-000000000006', 'a0000000-0000-0000-0000-000000000001', 'Sobrancelha', 15.00, 10, 'Design de sobrancelha masculina', true)
ON CONFLICT DO NOTHING;

-- Clients
INSERT INTO clients (id, tenant_id, name, phone, email) VALUES
  ('e0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'Carlos Mendes', '(81) 98888-0001', 'carlos@email.com'),
  ('e0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000001', 'André Gomes', '(81) 98888-0002', 'andre@email.com'),
  ('e0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000001', 'Marcos Lima', '(81) 98888-0003', 'marcos@email.com'),
  ('e0000000-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000001', 'Rafael Costa', '(81) 98888-0004', 'rafael@email.com'),
  ('e0000000-0000-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000001', 'Thiago Ferreira', '(81) 98888-0005', 'thiago@email.com'),
  ('e0000000-0000-0000-0000-000000000006', 'a0000000-0000-0000-0000-000000000001', 'Bruno Souza', '(81) 98888-0006', 'bruno@email.com')
ON CONFLICT DO NOTHING;

-- Appointments (today and recent)
INSERT INTO appointments (tenant_id, client_id, barber_id, service_id, start_at, duration, price, status) VALUES
  ('a0000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000001', 'd0000000-0000-0000-0000-000000000001',
   (CURRENT_DATE AT TIME ZONE 'America/Recife' + INTERVAL '9 hours') AT TIME ZONE 'America/Recife', 30, 45.00, 'CONFIRMADO'),
  ('a0000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000002', 'c0000000-0000-0000-0000-000000000002', 'd0000000-0000-0000-0000-000000000003',
   (CURRENT_DATE AT TIME ZONE 'America/Recife' + INTERVAL '10 hours') AT TIME ZONE 'America/Recife', 50, 70.00, 'CONFIRMADO'),
  ('a0000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000003', 'c0000000-0000-0000-0000-000000000001', 'd0000000-0000-0000-0000-000000000004',
   (CURRENT_DATE AT TIME ZONE 'America/Recife' + INTERVAL '11 hours') AT TIME ZONE 'America/Recife', 40, 55.00, 'PENDENTE'),
  ('a0000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000004', 'c0000000-0000-0000-0000-000000000003', 'd0000000-0000-0000-0000-000000000002',
   (CURRENT_DATE AT TIME ZONE 'America/Recife' + INTERVAL '14 hours') AT TIME ZONE 'America/Recife', 25, 35.00, 'PENDENTE'),
  -- Past appointments for metrics
  ('a0000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000001', 'd0000000-0000-0000-0000-000000000001',
   (CURRENT_DATE AT TIME ZONE 'America/Recife' - INTERVAL '1 day' + INTERVAL '10 hours') AT TIME ZONE 'America/Recife', 30, 45.00, 'FINALIZADO'),
  ('a0000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000002', 'c0000000-0000-0000-0000-000000000002', 'd0000000-0000-0000-0000-000000000003',
   (CURRENT_DATE AT TIME ZONE 'America/Recife' - INTERVAL '1 day' + INTERVAL '11 hours') AT TIME ZONE 'America/Recife', 50, 70.00, 'FINALIZADO'),
  ('a0000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000005', 'c0000000-0000-0000-0000-000000000003', 'd0000000-0000-0000-0000-000000000004',
   (CURRENT_DATE AT TIME ZONE 'America/Recife' - INTERVAL '2 days' + INTERVAL '15 hours') AT TIME ZONE 'America/Recife', 40, 55.00, 'PAGO'),
  ('a0000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000006', 'c0000000-0000-0000-0000-000000000001', 'd0000000-0000-0000-0000-000000000002',
   (CURRENT_DATE AT TIME ZONE 'America/Recife' - INTERVAL '3 days' + INTERVAL '9 hours') AT TIME ZONE 'America/Recife', 25, 35.00, 'CANCELADO'),
  ('a0000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000003', 'c0000000-0000-0000-0000-000000000002', 'd0000000-0000-0000-0000-000000000005',
   (CURRENT_DATE AT TIME ZONE 'America/Recife' - INTERVAL '4 days' + INTERVAL '16 hours') AT TIME ZONE 'America/Recife', 45, 80.00, 'FINALIZADO'),
  ('a0000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000004', 'c0000000-0000-0000-0000-000000000003', 'd0000000-0000-0000-0000-000000000006',
   (CURRENT_DATE AT TIME ZONE 'America/Recife' - INTERVAL '5 days' + INTERVAL '12 hours') AT TIME ZONE 'America/Recife', 10, 15.00, 'NO_SHOW')
ON CONFLICT DO NOTHING;

COMMIT;
