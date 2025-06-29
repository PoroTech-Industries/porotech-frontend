import { Component, HostListener } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { WebsocketService } from '../../../dashboard/services/websocket.service';
import { LogService } from '../../../dashboard/services/log.service';

@Component({
  selector: 'app-controls',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  template: `
    <div class="content">
      <div class="row center">
        <button mat-icon-button color="primary" (click)="control('forward')">
          <mat-icon>arrow_upward</mat-icon>
        </button>
      </div>

      <div class="row space-between">
        <button mat-icon-button color="primary" (click)="control('left')">
          <mat-icon>arrow_back</mat-icon>
        </button>
        <button mat-icon-button color="warn" (click)="control('stop')">
          <mat-icon>stop</mat-icon>
        </button>
        <button mat-icon-button color="primary" (click)="control('right')">
          <mat-icon>arrow_forward</mat-icon>
        </button>
      </div>

      <div class="row center">
        <button mat-icon-button color="primary" (click)="control('backward')">
          <mat-icon>arrow_downward</mat-icon>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .content {
      background: #f5f5f5;
      border-radius: 10px;
      padding: 10px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      font-family: 'Roboto', sans-serif;
      height: 100%;
      box-sizing: border-box;
      justify-content: center;
    }

    .row {
      display: flex;
      gap: 12px;
    }

    .center {
      justify-content: center;
    }

    .space-between {
      justify-content: space-between;
    }

    mat-icon {
      font-size: 24px;
    }
  `]
})
export class ControlsComponent {
  pressedKeys: Set<string> = new Set();

  constructor(
    private ws: WebsocketService,
    private logService: LogService
  ) {}

  control(direction: string) {
    const payload = {
      action: 'move',
      direction: direction,
      timestamp: new Date().toISOString()
    };

    this.ws.send(payload);
    this.logService.add(`Sent command: ${direction}`);
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    this.pressedKeys.add(event.key.toLowerCase());
    this.evaluateKeys();
  }

  @HostListener('window:keyup', ['$event'])
  handleKeyUp(event: KeyboardEvent) {
    this.pressedKeys.delete(event.key.toLowerCase());
  }

  evaluateKeys() {
    const keys = Array.from(this.pressedKeys);

    if (keys.includes(' ') || keys.includes('space')) {
      this.control('stop');
      return;
    }

    if (keys.includes('w') && keys.includes('a')) {
      this.control('forward-left');
    } else if (keys.includes('w') && keys.includes('d')) {
      this.control('forward-right');
    } else if (keys.includes('s') && keys.includes('a')) {
      this.control('backward-left');
    } else if (keys.includes('s') && keys.includes('d')) {
      this.control('backward-right');
    } else if (keys.includes('w')) {
      this.control('forward');
    } else if (keys.includes('s')) {
      this.control('backward');
    } else if (keys.includes('a')) {
      this.control('left');
    } else if (keys.includes('d')) {
      this.control('right');
    }
  }
}
