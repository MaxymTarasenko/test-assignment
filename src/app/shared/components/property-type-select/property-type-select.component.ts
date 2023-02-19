import {
  ChangeDetectorRef,
  Component, EventEmitter,
  forwardRef,
  Inject,
  Injector,
  INJECTOR,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { noop } from 'rxjs';
import { MatSelectChange } from '@angular/material/select';
import { propertyTypeNumbers, propertyTypeStrings } from '../../constants/constants';
import { PropertyType } from '../../interfaces/property-type.interface';

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
  numberOptions = propertyTypeNumbers
  valueType: 'string' | 'number' = 'string';

  @Input() public optionLabel = '';

  @Input()
  public placeholder = '';

  @Input()
  public optionValue = '';

  @Output() selectionChange = new EventEmitter<any>();

  get control(): FormControl {
    return this._control?.control as FormControl;
  }

  constructor(private cdr: ChangeDetectorRef,
              @Inject(INJECTOR) private injector: Injector) {
  }

  ngOnInit(): void {
    this._control = this.injector.get(NgControl);
  }

  get activeTab(): number {
    return this.valueType === 'number' ? 1 : 0;
  }

  private onChange: (x?: T[] | []) => void = noop;
  private onTouched: () => void = noop;

  public value: PropertyType ;

  public registerOnChange(fn: (x?: T[] | []) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public writeValue(value: PropertyType): void {
    this.value = value ?? this.stringOptions[0];
    this.valueType = value.type;
  }

  onSelectChange(event: MatSelectChange) {
    this.onChange(event.value);
    this.selectionChange.emit(event.value);
  }

  compareItems(i1, i2) {
    return i1 && i2 && i1.id===i2.id;
  }
}
