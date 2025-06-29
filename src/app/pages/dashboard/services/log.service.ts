import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  logs = signal<{ time: string, message: string }[]>([]);

  add(message: string) {
    const now = new Date();
    const time = now.toLocaleTimeString();

    this.logs.update((prev) => [
      { time, message },
      ...prev.slice(0, 50)
    ]);
  }
}
