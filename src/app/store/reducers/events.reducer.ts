import { AppState, EventsState } from '../../shared/interfaces/app.state.interface';
import { Action, ActionReducerMap, createReducer, on } from '@ngrx/store';
import { getEvents, getEventsSuccess } from '../actions/events.action';

export const initialState: EventsState = {
  events: []
};

export const reducers = createReducer(
  initialState,
  on(getEvents, (state) => ({...state})),
  on(getEventsSuccess, (state, action) => ({...state, events: action.events}))
);

export const appReducerFactory = (state: EventsState, action: Action) => reducers(state, action);

export const appReducers: ActionReducerMap<AppState, any> = {
  // @ts-ignore
  events: appReducerFactory
}
