import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogService } from '../../../dashboard/services/log.service';

@Component({
  selector: 'app-log-widget',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="content">
      <div class="log-entry" *ngFor="let entry of logs()">
        <span class="time">{{ entry.time }}</span>
        <span class="message">{{ entry.message }}</span>
      </div>
    </div>
  `,
  styles: [`
    .content {
      background: #f5f5f5;
      border-radius: 10px;
      padding: 10px;
      font-family: 'Roboto', sans-serif;
      height: 100%;
      box-sizing: border-box;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .log-entry {
      font-size: 13px;
      color: #333;
      display: flex;
      gap: 8px;
    }

    .time {
      color: #999;
      min-width: 65px;
      font-family: monospace;
    }

    .message {
      font-weight: 500;
    }
  `]
})
export class LogWidgetComponent {
  logs = computed(() => this.logService.logs());

  constructor(private logService: LogService) {}
}
