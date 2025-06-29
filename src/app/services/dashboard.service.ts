import { computed, Injectable, signal } from '@angular/core';
import { TempratureComponent } from '../pages/dashboard/widgets/temprature/temprature.component';
import { Widget } from '../models/dashboard';
import { AngleComponent } from '../pages/dashboard/widgets/angle/angle.component';
import { CamComponent } from '../pages/dashboard/widgets/cam/cam.component';
import { BatteryComponent } from '../pages/dashboard/widgets/battery/battery.component';
import { InfraredComponent } from '../pages/dashboard/widgets/infrared/infrared.component';
import { DirectionComponent } from '../pages/dashboard/widgets/direction/direction.component';
import { SpeedComponent } from '../pages/dashboard/widgets/speed/speed.component';
import { MapComponent } from '../pages/dashboard/widgets/map/map.component';
import { StatusComponent } from '../pages/dashboard/widgets/status/status.component';
import { ControlsComponent } from '../pages/dashboard/widgets/controlpanel/controlpanel.component';
import { MotorpowerComponent } from '../pages/dashboard/widgets/motorpower/motorpower.component';
import { LogWidgetComponent } from '../pages/dashboard/widgets/log/log.component';



@Injectable()
export class DashboardService {
  widgets = signal<Widget[]>([
    {
      id: 1,
      content: CamComponent,
      rows: 3,
      columns: 3
    },
    {
      id: 2,
      content: TempratureComponent,
      rows: 1,
      columns: 1,
    },
    {
      id: 3,
      content: AngleComponent,
      rows: 1,
      columns: 1
    },
    {
      id: 4,
      content: InfraredComponent,
      rows: 1,
      columns: 1
    },
    {
      id: 5,
      content: DirectionComponent,
      rows: 1,
      columns: 1
    },
    {
      id: 6,
      content: StatusComponent,
      rows: 1,
      columns: 1
    },
    {
      id: 7,
      content: MotorpowerComponent,
      rows: 1,
      columns: 1
    },
    {
      id: 8,
      content: SpeedComponent,
      rows: 1,
      columns: 1
    },
    {
      id: 9,
      content: BatteryComponent,
      rows: 1,
      columns: 1
    },
    {
      id: 10,
      content: MapComponent,
      rows: 2,
      columns: 2
    },
    { 
      id: 11,
      content: ControlsComponent,
      rows: 2,
      columns: 2
    },
    {
      id: 12,
      content: LogWidgetComponent,
      rows: 2,
      columns: 2
    }
    
  ]);

  addedWidgets = signal<Widget[]>([
    {
      id: 1,
      content: CamComponent,
      rows: 3,
      columns: 3
    },
    {
      id: 2,
      content: TempratureComponent,
      rows: 1,
      columns: 1,
    },
    {
      id: 3,
      content: AngleComponent,
      rows: 1,
      columns: 1
    },
    {
      id: 4,
      content: InfraredComponent,
      rows: 1,
      columns: 1
    },
    {
      id: 5,
      content: DirectionComponent,
      rows: 1,
      columns: 1
    },
    {
      id: 6,
      content: StatusComponent,
      rows: 1,
      columns: 1
    },
    {
      id: 7,
      content: MotorpowerComponent,
      rows: 1,
      columns: 1
    },
    {
      id: 8,
      content: SpeedComponent,
      rows: 1,
      columns: 1
    },
    {
      id: 9,
      content: BatteryComponent,
      rows: 1,
      columns: 1
    },
    {
      id: 10,
      content: MapComponent,
      rows: 3,
      columns: 4    },
    { 
      id: 11,
      content: ControlsComponent,
      rows: 2,
      columns: 1
    },
    {
      id: 12,
      content: LogWidgetComponent,
      rows: 2,
      columns: 2
    }
    
  ]);

  widgetsToAdd = computed(() => {
    const addedIds = this.addedWidgets().map(w => w.id);
    return this.widgets().filter(w => !addedIds.includes(w.id));
  })

  addWidget(w: Widget) {
    this.addedWidgets.set([...this.addedWidgets(), { ...w }]);
  }

  constructor() { }
}
