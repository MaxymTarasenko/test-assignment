import { FilteringStep } from '../interfaces/filtering-step.interface';
import { FilteringStepFormResult } from '../interfaces/filtering-step-form-result.interface';
import { propertyTypeNumbers, propertyTypeStrings } from '../constants/constants';
import { PropertyType } from '../interfaces/property-type.interface';
import { AbstractControl } from '@angular/forms';
import { PropertyTypeNumberValue } from '../enums/property-type.enum';

export function transformFormValueIntoStep(value: FilteringStepFormResult, stepNumber: number): FilteringStep {
  return {
    event: value.event.type,
    stepNumber,
    properties: value.properties.map(prop => {
      return {
        option: prop.option.value,
        property: prop.property.property,
        propertyValue: prop.propertyValue,
        propertySecondValue: prop.propertySecondValue
      }
    })
  }
}

export function findPropertyTypeOption(option: string): PropertyType {
  return propertyTypeStrings.find(value => value.value === option)
    ?? propertyTypeNumbers.find(value => value.value === option);
}

export function getPropertyValueFieldType(control: AbstractControl): 'string' | 'number' | 'range' {
  const option = control.get('option').value.value;
  switch (option) {
    case PropertyTypeNumberValue.EQUAL:
    case PropertyTypeNumberValue.LESS_THAN:
    case PropertyTypeNumberValue.GRATER_THAN: {
      return 'number';
    }
    case PropertyTypeNumberValue.BETWEEN: {
      return 'range';
    }
    default: {
      return 'string';
    }
  }
}
