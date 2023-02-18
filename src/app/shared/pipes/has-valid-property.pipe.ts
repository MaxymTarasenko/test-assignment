import { Pipe, PipeTransform } from '@angular/core';
import { FormArray } from '@angular/forms';
import { map, Observable, of } from 'rxjs';

@Pipe({
  name: 'hasValidProperty'
})
export class HasValidPropertyPipe implements PipeTransform {

  transform(controlsArray: FormArray, controlName: string, index: number): Observable<boolean> {
    const targetControl = controlsArray.controls[index].get(controlName);
    return targetControl ? targetControl.valueChanges
      .pipe(map(() => targetControl.valid))
      : of(false);
  }
}
