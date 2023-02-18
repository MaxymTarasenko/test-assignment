import { EventProperty } from './event-property.interface';

export interface SessionEvent {
  type: string,
  properties: EventProperty[]
}
