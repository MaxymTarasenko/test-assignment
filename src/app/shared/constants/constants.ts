import { PropertyType } from '../interfaces/property-type.interface';
import { PropertyTypeNumberValue, PropertyTypeStringValue } from '../enums/property-type.enum';

export const propertyTypeStrings: PropertyType[] = [
  {value: PropertyTypeStringValue.EQUAL, viewValue: 'equal'},
  {value: PropertyTypeStringValue.NOT_EQUAL, viewValue: 'does not equal'},
  {value: PropertyTypeStringValue.CONTAINS, viewValue: 'contains'},
  {value: PropertyTypeStringValue.NOT_CONTAINS, viewValue: 'does not contains'},
];

export const propertyTypeNumbers: PropertyType[] = [
  {value: PropertyTypeNumberValue.EQUAL, viewValue: 'equal to'},
  {value: PropertyTypeNumberValue.BETWEEN, viewValue: 'in between'},
  {value: PropertyTypeNumberValue.LESS_THAN, viewValue: 'less than'},
  {value: PropertyTypeNumberValue.GRATER_THAN, viewValue: 'grater than'},
];
