import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectEvents } from '../../../store/selectors/events.selector';
import { EventProperty } from '../../../shared/interfaces/event-property.interface';
import { PropertyTypeNumberValue } from '../../../shared/enums/property-type.enum';
import { propertyTypeNumbers, propertyTypeStrings } from '../../../shared/constants/constants';

@Component({
  selector: 'app-funnel-step',
  templateUrl: './funnel-step.component.html',
  styleUrls: ['./funnel-step.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FunnelStepComponent implements OnInit {
  @Input() isLast = false;

  eventList$ = this.store.select(selectEvents);
  form: FormGroup;

  eventsList: string[] = [];

  constructor(private fb: FormBuilder, private store: Store) {
    this.form = fb.group({
        event: fb.control(''),
        properties: fb.array([])
    }
    );
  }

  ngOnInit(): void {
    this.store.select(selectEvents).subscribe(value => {
      value.forEach(event => this.eventsList.push(event.type));
    });

    this.form.valueChanges.subscribe(value => {
      console.log('-> form', value);
    });
  }

  get eventControl(): FormControl {
    return <FormControl<any>>this.form.get('event');
  }

  get eventProperties(): EventProperty[] {
    return this.eventControl.value.properties;
  }

  get eventName(): string {
    return this.eventControl.value.type;
  }

  get propertyControlsArray(): FormArray {
    return <FormArray>this.form.get('properties');
  }

  editName(): void {
    console.log('name editing started');
  }

  copyStep(): void {
    console.log('copy step');
  }

  addEventProperty(): void {
    this.propertyControlsArray.push(new FormGroup({
      property: new FormControl(''),
      option: new FormControl(''),
      propertyValue: new FormControl(''),
      propertySecondValue: new FormControl('')
    }));
  }

  clearPropertyList(): void {
   this.propertyControlsArray.clear();
  }

  deleteProperty(index: number): void {
    this.propertyControlsArray.removeAt(index);
  }

  propertySelected(control: AbstractControl): void {
    const currentType = control.get('property').value.type;
    const optionControl = control.get('option');
    optionControl.setValue(
      currentType === 'number' ? propertyTypeNumbers[0] : propertyTypeStrings[0]
    );
  }

  getPropertyValueFieldType(control: AbstractControl): 'string' | 'number' | 'range' {
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
}
