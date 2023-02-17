import { EventProperty } from './event-property';

export interface SessionEvent {
  type: string,
  properties: EventProperty[]
}
