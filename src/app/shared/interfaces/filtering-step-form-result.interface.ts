import { PropertyType } from './property-type.interface';
import { EventProperty } from './event-property.interface';

export interface StepPropertyFormResult {
  option: PropertyType,
  property: EventProperty,
  propertyValue: string | number,
  propertySecondValue: string | number
}

export interface FilteringStepFormResult {
  event: {
    type: string
  }
  properties: StepPropertyFormResult[]
}
