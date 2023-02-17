import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsComponent } from './events.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    EventsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: EventsComponent
      }
    ])
  ]
})
export class EventsModule { }
