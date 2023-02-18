import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
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
export class AutocompleteComponent<T> implements ControlValueAccessor, OnInit {
  @Input() disabled = false;
  @Input() label = '';
  // TODO add filtering
  @Input() public suggestions: T[] = [];
  @Input() public bindLabel: any;

  @Input() public bindValue: any;

  private onChange: (x?: string | T) => void = noop;
  private onTouched: () => void = noop;

  public value: string | T | undefined;

  ngOnInit(): void {
  }

  public registerOnChange(fn: (x?: string | T) => void): void {
    this.onChange = fn;
  }

  public onCompleteChange(value: MatAutocompleteSelectedEvent): void {
    console.log('-> value', value);
    this.onChange(value.option.value);
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


}
