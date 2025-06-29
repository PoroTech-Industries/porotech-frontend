import { Component, inject } from '@angular/core';
import { WidgetComponent } from "../../components/widget/widget.component";
import { Widget } from '@/app/models/dashboard';
import { DashboardService } from '@/app/services/dashboard.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { WebsocketService } from './services/websocket.service';

@Component({
  selector: 'app-dashboard',
  imports: [WidgetComponent, MatButtonModule, MatMenuModule],
  providers: [DashboardService],
  template: `
    <div class="header">
      <h2>Dashboard</h2>
      <button mat-raised-button [mat-menu-trigger-for]="widgetMenu">
        <i class="material-icons">addchart</i>   
        <span>  Add Widget </span>
      </button>
      <mat-menu #widgetMenu="matMenu">
        @for (widget of store.widgetsToAdd(); track widget.id) {
          <button mat-menu-item (click)="store.addWidget(widget)">

          </button>
        } @empty {
          <button mat-menu-item>
            <span mat-clear-icon>No widgets available</span>
          </button>
        }

      </mat-menu>
    </div>

    <div class="dashboard-widgets">
      @for (w of store.addedWidgets(); track w.id) {
      <app-widget [data]="w" />
      }
    </div>

  `,
  styles: `
  
  .dashboard-widgets {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-auto-rows: 150px;
    gap: 10px;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  `
})
export class DashboardComponent {
  store = inject(DashboardService);

  constructor(private ws: WebsocketService) {}

  ngOnInit() {
    this.connect();
  }

  connect() {
    this.ws.connect('ws://localhost:3000');
  }
}
