// BarberOS — WebSocket service (estrutura pronta para backend)
// TODO: Conectar ao servidor WebSocket real quando o backend estiver pronto

import { WS_URL } from '@/config/env';

type EventHandler = (data: unknown) => void;

class SocketService {
  private ws: WebSocket | null = null;
  private listeners: Map<string, Set<EventHandler>> = new Map();
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;

  connect(token: string) {
    // TODO: Descomentar quando o backend WebSocket estiver pronto
    // this.ws = new WebSocket(`${WS_URL}?token=${token}`);
    // this.ws.onmessage = (event) => {
    //   const { type, data } = JSON.parse(event.data);
    //   this.emit(type, data);
    // };
    // this.ws.onclose = () => {
    //   this.reconnectTimer = setTimeout(() => this.connect(token), 5000);
    // };
    console.log('[BarberOS Socket] Estrutura WebSocket pronta. URL:', WS_URL);
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
    }
  }

  on(event: string, handler: EventHandler) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(handler);
  }

  off(event: string, handler: EventHandler) {
    this.listeners.get(event)?.delete(handler);
  }

  private emit(event: string, data: unknown) {
    this.listeners.get(event)?.forEach((handler) => handler(data));
  }

  send(event: string, data: unknown) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type: event, data }));
    }
  }
}

export const socket = new SocketService();

// Eventos disponíveis:
// socket.on('appointment:updated', (data) => { ... })
// socket.on('tracking:location', (data) => { ... })
// socket.on('queue:updated', (data) => { ... })
// socket.on('notification:new', (data) => { ... })
