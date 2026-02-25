// BarberOS — Configuração de ambiente
// Altere estas URLs para apontar ao seu backend na VPS

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3003/api';
export const WS_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:3003';

// Quando o backend estiver pronto, defina as variáveis de ambiente:
// VITE_API_BASE_URL=https://api.barberos.com.br/api
// VITE_WS_URL=wss://api.barberos.com.br
