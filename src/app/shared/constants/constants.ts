import { PropertyType } from '../interfaces/property-type.interface';
import { PropertyTypeNumberValue, PropertyTypeStringValue } from '../enums/property-type.enum';

export const propertyTypeStrings: PropertyType[] = [
  {value: PropertyTypeStringValue.EQUAL, viewValue: 'equal', type: 'string'},
  {value: PropertyTypeStringValue.NOT_EQUAL, viewValue: 'does not equal', type: 'string'},
  {value: PropertyTypeStringValue.CONTAINS, viewValue: 'contains', type: 'string'},
  {value: PropertyTypeStringValue.NOT_CONTAINS, viewValue: 'does not contains', type: 'string'},
];

export const propertyTypeNumbers: PropertyType[] = [
  {value: PropertyTypeNumberValue.EQUAL, viewValue: 'equal to', type: 'number'},
  {value: PropertyTypeNumberValue.BETWEEN, viewValue: 'in between', type: 'number'},
  {value: PropertyTypeNumberValue.LESS_THAN, viewValue: 'less than', type: 'number'},
  {value: PropertyTypeNumberValue.GRATER_THAN, viewValue: 'grater than', type: 'number'},
];
