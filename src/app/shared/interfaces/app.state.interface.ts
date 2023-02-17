import { SessionEvent } from './session-event';

export interface AppState {
  events: EventsState
}

export interface EventsState {
  events: SessionEvent[]
}
