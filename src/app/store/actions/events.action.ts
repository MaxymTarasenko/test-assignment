import { createAction, props } from '@ngrx/store';
import { EventsState } from '../../shared/interfaces/app.state.interface';

export const getEvents = createAction('[App] Get Events');
export const getEventsSuccess = createAction('[App] Get Events Success', props<EventsState>());
