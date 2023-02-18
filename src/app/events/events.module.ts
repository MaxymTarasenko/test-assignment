import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsComponent } from './events.component';
import { RouterModule } from '@angular/router';
import { FunnelStepComponent } from './components/funnel-step/funnel-step.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [
    EventsComponent,
    FunnelStepComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: EventsComponent
            }
        ]),
        MatCardModule,
        MatIconModule,
        SharedModule,
        ReactiveFormsModule,
        MatInputModule
    ]
})
export class EventsModule { }
