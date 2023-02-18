import { PropertyTypeNumberValue, PropertyTypeStringValue } from '../enums/property-type.enum';

export interface PropertyType {
  value: PropertyTypeStringValue | PropertyTypeNumberValue,
  viewValue: string
}
