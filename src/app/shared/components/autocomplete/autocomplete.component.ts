import {
  Component,
  EventEmitter,
  forwardRef,
  Inject,
  Injector,
  INJECTOR,
  Input, OnChanges,
  OnInit,
  Output
} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { noop } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutocompleteComponent),
      multi: true
    }
  ]
})
export class AutocompleteComponent<T> implements ControlValueAccessor, OnInit, OnChanges {
  private _control: NgControl | null = null;
  @Input() disabled = false;
  @Input() label = '';
  @Input() public suggestions: T[] = [];
  filteredSuggestions: T[] = [];
  @Input() public bindLabel: string;

  @Input() public bindValue: any;

  @Output() valueSelect = new EventEmitter<string>();

  private onChange: (x?: string | T) => void = noop;
  private onTouched: () => void = noop;

  public value: string | T | undefined;

  get control(): FormControl {
    return this._control?.control as FormControl;
  }

  constructor(@Inject(INJECTOR) private injector: Injector) {
  }

  ngOnInit(): void {
    this._control = this.injector.get(NgControl);
  }

  ngOnChanges(): void {
    this.filteredSuggestions = this.suggestions;
  }

  public registerOnChange(fn: (x?: string | T) => void): void {
    this.onChange = fn;
  }

  public onCompleteChange(value: MatAutocompleteSelectedEvent): void {
    this.onChange(value.option.value);
    this.valueSelect.emit(value.option.value);
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public writeValue(value: string | T): void {
    this.value = value;
  }

  displayFn(option: any): string {
    return option[this.bindLabel];
  }

  public getViewValueFromObject(value: T): string {
    return value[this.bindLabel];
  }

  valueChange(event: any) {
    this.filteredSuggestions = this.suggestions.filter(option => option[this.bindLabel]
      .toLowerCase()
      .includes(event));
  }
}
