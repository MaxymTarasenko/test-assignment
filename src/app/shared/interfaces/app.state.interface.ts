import { SessionEvent } from './session-event.interface';

export interface AppState {
  events: EventsState
}

export interface EventsState {
  events: SessionEvent[]
}
