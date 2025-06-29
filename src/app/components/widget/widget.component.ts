import { Widget } from '@/app/models/dashboard';
import { NgComponentOutlet } from '@angular/common';
import { Component, input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { WidgetOptionsComponent } from "./widget-options/widget-options.component";

@Component({
  selector: 'app-widget',
  imports: [NgComponentOutlet, MatButtonModule, MatIcon, WidgetOptionsComponent],
  template: `
    <div class="container mat-elevation-z3">
      <button mat-icon-button class="settings-button" (click)="showOptions.set(true)">
        <mat-icon>settings</mat-icon>
      </button>
      <ng-container [ngComponentOutlet]="data().content" />

      @if (showOptions()) {
        <app-widget-options [(showOptions)]="showOptions"/>
      }
    </div>
  `,
  styles: `
  
    :host {
      display: block;
      border-radius: 12px;
    }

    .container {
      position: relative;
      height: 100%;
      width: 100%;
      padding: 20px;
      box-sizing: border-box;
      border-radius: inherit;
      overflow: hidden;
    }

    .settings-button {
      position: absolute;
      top: 20px;
      right: 20px;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.2s ease-in-out;
    }

    .container:hover .settings-button {
      opacity: 1;
      pointer-events: auto;
    }
  `,
  host: {
    '[style.grid-area]':
     '"span " + (data().rows ?? 1) + " / span " + (data().columns ?? 1)',
  },
})
export class WidgetComponent {
  data = input.required<Widget>();
  showOptions = signal(false);
}
