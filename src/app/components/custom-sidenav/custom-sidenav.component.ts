import { Component, computed, Input, input, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

import { RouterModule } from '@angular/router';

export type MenuItem = {
  icon: string
  label: string
  route?: any
}

@Component({
  selector: 'app-custom-sidenav',
  imports: [
    MatListModule,
    MatIconModule,
    RouterModule
],
  template: `
    <div class="sidenav-header">
      <img
        [width]="profilePicSize()"
        [height]="profilePicSize()"
        src="/PoroIconTransparent.png"
        /> 
        <div class="header-text" [class.hide-header-text]="sideNavCallapsed()">
          <h1>Porotech</h1>
          <h2>Cooles Auto</h2>
        </div>
      </div>
      <mat-nav-list>
        @for (item of menuItems(); track item) {
          <a 
            mat-list-item [routerLink]="item.route"
            routerLinkActive="selected-menu-item"
            #rla="routerLinkActive"
            [activated]="rla.isActive"
          >
            <mat-icon matListItemIcon>{{ item.icon }}</mat-icon>
            @if (!sideNavCallapsed()) {
              <span matListItemTitle>
                {{ item.label }}
              </span>
            }
          </a>
        }
      </mat-nav-list>
    
    `,
  styles: `

    :host * {
      transition: all 150ms ease-in-out;
    }

    .sidenav-header {
      padding-top: 24px;
      text-align: center;

      > img {
        text-align: center;
        border-radius: 100%;
        object-fit: cover;
        margin-bottom: 10px;
      }
    }

    .header-text {
      height: 3rem;
      margin-bottom: 1rem;

      > h1 {
        text-align: center;
      }

      > h2 {
        text-align: center;
        margin: 0;
        font-size: 1rem;
        line-height: 1.5rem; 
      }

      > p {
        text-align: center;
        margin: 0;
        font-size: 0.8rem;
      }
    }

    .hide-header-text {
      opacity: 0;
      height: 0px !important;
    }

    .selected-menu-item {
      border-left: 5px solid;
      border-left-color: black;
    }
  
  `
})
export class CustomSidenavComponent {

  sideNavCallapsed = signal(false);
center: any;
  @Input() set collapsed(val: boolean) {
    this.sideNavCallapsed.set(val);
  }

  menuItems = signal<MenuItem[]>([
    {
      icon: 'dashboard',
      label: 'Dashboard',
      route: '/dashboard'
    },
    {
      icon: 'settings',
      label: 'Settings',
      route: '/settings'
    },
    {
      icon: 'logout',
      label: 'Logout'
    }
  ]);

  profilePicSize = computed(() => this.sideNavCallapsed() ? '32' : '100');
}
