import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Pipe({
  name: 'propertyValueInputType'
})
export class PropertyValueInputTypePipe implements PipeTransform {

  transform(control: AbstractControl): 'string' | 'number' {
    control.valueChanges.subscribe(value => {
      console.log('-> value', value);
    })
    console.log(control.get('option').value.type);
    return control.get('option').value.type;
  }

}
