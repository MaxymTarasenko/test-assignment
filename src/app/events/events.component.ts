import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getEvents } from '../store/actions/events.action';
import { FilteringStep } from '../shared/interfaces/filtering-step.interface';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventsComponent implements OnInit {
  steps: FilteringStep[] = [];
  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.store.dispatch(getEvents());
    this.addStep();
  }

  addStep(step?: FilteringStep): void {
    this.steps.push({
      event: step?.event ?? '',
      properties: step ? step.properties : [],
      stepNumber: this.steps.length + 1
    });
  }

  updateStep(step: FilteringStep, index): void {
    this.steps[index].event = step.event;
    this.steps[index].properties = step.properties;
  }

  copyStep(step: FilteringStep): void {
    this.addStep(step);
  }

  deleteStep(index: number): void {
    this.steps.splice(index,1);
  }

  discardFilters(): void {
    this.steps = [];
    this.addStep();
  }

  applyFilters(): void {
    console.log(this.steps);
  }
}
