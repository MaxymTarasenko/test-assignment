import { StepProperty } from './step-property.interface';

export interface FilteringStep {
  event: string,
  stepNumber: number,
  properties: StepProperty[]
}
