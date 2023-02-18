import { Pipe, PipeTransform } from '@angular/core';
import { EventProperty } from '../interfaces/event-property.interface';

@Pipe({
  name: 'propertyName'
})
export class PropertyNamePipe implements PipeTransform {

  transform(list: EventProperty[]): string[] {
    return list.map((property) => property.property);
  }
}
