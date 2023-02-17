import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getEvents } from '../store/actions/events.action';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventsComponent implements OnInit {

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.store.dispatch(getEvents());
  }

}
