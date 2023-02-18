import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectEvents } from '../../../store/selectors/events.selector';
import { map, switchMap } from 'rxjs';
import { EventProperty } from '../../../shared/interfaces/event-property.interface';
import { PropertyTypeStringValue } from '../../../shared/enums/property-type.enum';

@Component({
  selector: 'app-funnel-step',
  templateUrl: './funnel-step.component.html',
  styleUrls: ['./funnel-step.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FunnelStepComponent implements OnInit {
  @Input() isLast = false;

  form: FormGroup;
  stepName = 'Unnamed step'
  eventsList: string[] = [];
  propertiesList: EventProperty[] = [];

  constructor(private fb: FormBuilder, private store: Store) {
    this.form = fb.group({
        event: fb.control('', Validators.required),
        properties: fb.array([])
    }
    );
  }

  ngOnInit(): void {
    this.store.select(selectEvents).subscribe(value => {
      value.forEach(event => this.eventsList.push(event.type));
    });

    this.form.controls['event'].valueChanges
      .pipe(switchMap(event => this.store.select(selectEvents)
        .pipe(map(events => events.find(item => item.type === event)))))
      .subscribe((list) => {
        this.clearPropertyList();
        if (list) {
          this.stepName = list.type;
          this.propertiesList = list.properties;
        }
      })

    this.form.valueChanges.subscribe(value => {
      console.log('-> form', value);
    });
  }

  get eventControl(): FormControl {
    return <FormControl<any>>this.form.get('event');
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
      property: new FormControl('', Validators.required),
      option: new FormControl(PropertyTypeStringValue.EQUAL),
      propertyValue: new FormControl('')
    }));
    console.log(this.propertyControlsArray.controls['0']);
  }

  clearPropertyList(): void {
   this.propertyControlsArray.clear();
  }

  deleteProperty(index: number): void {
    this.propertyControlsArray.removeAt(index);
  }
}
