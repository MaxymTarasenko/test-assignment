import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EventsState } from '../../shared/interfaces/app.state.interface';

export const selectFeature = createFeatureSelector<any, EventsState>('events');

export const selectEvents = createSelector(
  selectFeature,
  eventsState => eventsState.events
);
