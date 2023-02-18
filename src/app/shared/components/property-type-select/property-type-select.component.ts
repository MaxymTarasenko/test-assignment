import { ChangeDetectorRef, Component, forwardRef, Inject, Injector, INJECTOR, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { noop } from 'rxjs';
import { MatSelectChange } from '@angular/material/select';
import { propertyTypeNumbers, propertyTypeStrings } from '../../constants/constants';

@Component({
  selector: 'app-property-type-select',
  templateUrl: './property-type-select.component.html',
  styleUrls: ['./property-type-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PropertyTypeSelectComponent),
      multi: true
    }
  ]
})
export class PropertyTypeSelectComponent<T> implements ControlValueAccessor, OnInit {
  private _control: NgControl | null = null;

  stringOptions = propertyTypeStrings;
  numberOptions = propertyTypeNumbers;

  @Input()
  public valueType: 'string' | 'number' = 'string';

  @Input()
  public optionLabel = '';

  @Input()
  public placeholder = '';

  @Input()
  public optionValue = '';

  get control(): FormControl {
    return this._control?.control as FormControl;
  }

  constructor(private cdr: ChangeDetectorRef,
              @Inject(INJECTOR) private injector: Injector) {
  }

  ngOnInit(): void {
    this._control = this.injector.get(NgControl);
  }

  private onChange: (x?: T[] | []) => void = noop;
  private onTouched: () => void = noop;

  public value: T[] | [] = [];

  public registerOnChange(fn: (x?: T[] | []) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public writeValue(value: any): void {
    console.log('-> property type init', value);
    this.value = value ?? this.stringOptions[0];
  }

  onSelectChange(event: MatSelectChange) {
    this.onChange(event.value);
  }

}
