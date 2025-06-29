import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket: WebSocket | null = null;

  messages = signal<any[]>([]);

  connect(url: string) {
    if (this.socket) {
      console.warn('WebSocket already connected.');
      return;
    }

    this.socket = new WebSocket(url);

    this.socket.onopen = () => {
      console.log('[WS] Connected');
    };

    this.socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('[WS] Message:', data);
        this.messages.update(prev => [data, ...prev.slice(0, 50)]);
      } catch (e) {
        console.error('Invalid JSON:', event.data);
      }
    };

    this.socket.onerror = (error) => {
      console.error('[WS] Error:', error);
    };

    this.socket.onclose = (event) => {
      console.warn('[WS] Closed', event);
      this.socket = null;
    };
  }

  send(message: any) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
    } else {
      console.warn('[WS] Cannot send, socket not open.');
    }
  }

  close() {
    this.socket?.close();
    this.socket = null;
  }
}
