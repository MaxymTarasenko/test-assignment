import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { getEvents, getEventsSuccess } from '../actions/events.action';
import { map, switchMap } from 'rxjs';
import { EventsService } from '../../services/events.service';

@Injectable()
export class EventsEffect {

  getEvents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getEvents),
      switchMap(() => this.eventsService.getEvents()
        .pipe(map((events) => {
          return getEventsSuccess({events})
        })))
    )
  )

  constructor(private actions$: Actions, private eventsService: EventsService) {
  }

}
