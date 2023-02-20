import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectEvents } from '../../../store/selectors/events.selector';
import { EventProperty } from '../../../shared/interfaces/event-property.interface';
import { propertyTypeNumbers, propertyTypeStrings } from '../../../shared/constants/constants';
import { debounceTime, tap } from 'rxjs';
import {
  findPropertyTypeOption,
  getPropertyValueFieldType,
  transformFormValueIntoStep
} from '../../../shared/utils/helpers';
import { FilteringStep } from '../../../shared/interfaces/filtering-step.interface';
import { SessionEvent } from '../../../shared/interfaces/session-event.interface';

@Component({
  selector: 'app-funnel-step',
  templateUrl: './funnel-step.component.html',
  styleUrls: ['./funnel-step.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FunnelStepComponent implements OnInit {
  @Input() step: FilteringStep;
  @Input() stepNumber: number;
  @Input() canBeDeleted: boolean = false;

  @Output() saveStep = new EventEmitter<FilteringStep>();
  @Output() copyStepEvent = new EventEmitter<any>();
  @Output() deleteStep = new EventEmitter<any>();

  eventList$ = this.store.select(selectEvents)
    .pipe(tap((events) => {
      if (this.step.event) {
        this.patchFormWithFilteringStepData(events)
      }
    }));
  form: FormGroup;

  constructor(private fb: FormBuilder, private store: Store) {
    this.form = fb.group({
        event: fb.control(''),
        properties: fb.array([])
    });
  }

  ngOnInit(): void {
    this.form.valueChanges.pipe(debounceTime(300)).subscribe(value => {
      this.saveStep.emit(transformFormValueIntoStep(structuredClone(value), this.stepNumber));
    });
  }

  patchFormWithFilteringStepData(events: SessionEvent[]): void {
    this.eventControl.setValue(events.find(event => event.type === this.step.event));
    this.step.properties.forEach((prop, index) => {
      this.addEventProperty();
      this.propertyControlsArray.controls[index].get('option').setValue(findPropertyTypeOption(prop.option));
      // TODO find way to set property type
      this.propertyControlsArray.controls[index].get('property').setValue({property: prop.property, type: 'string'});
      this.propertyControlsArray.controls[index].get('propertyValue').setValue(prop.propertyValue);
      this.propertyControlsArray.controls[index].get('propertySecondValue').setValue(prop.propertySecondValue);
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
    this.copyStepEvent.emit();
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

  propertyHasValue(control: AbstractControl): boolean {
    return !!control.get('property')?.value.property;
  }

  getPropertyValueFieldType(control: AbstractControl): 'string' | 'number' | 'range' {
    const type = getPropertyValueFieldType(control);
    if (type === 'number' && control.get('propertyValue').value !== 0) {
      control.get('propertyValue').setValue(0);
      control.get('propertySecondValue').setValue('');
    } else if (type === 'string' && control.get('propertyValue').value !== '') {
      control.get('propertyValue').setValue('');
      control.get('propertySecondValue').setValue('');
    } else if (type === 'range' && (control.get('propertyValue').value !== 0 || control.get('propertySecondValue').value !== 0)) {
      control.get('propertyValue').setValue(0);
      control.get('propertySecondValue').setValue(0);
    }
    return type;
  }
}
