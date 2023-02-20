import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormControlPipe } from './pipes/form-control.pipe';
import { PropertyNamePipe } from './pipes/property-name.pipe';
import { PropertyTypeSelectComponent } from './components/property-type-select/property-type-select.component';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    AutocompleteComponent,
    FormControlPipe,
    PropertyNamePipe,
    PropertyTypeSelectComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    FormsModule,
    MatSelectModule,
    MatTabsModule,
    MatIconModule
  ],
  exports: [
    AutocompleteComponent,
    FormControlPipe,
    PropertyNamePipe,
    PropertyTypeSelectComponent
  ]
})
export class SharedModule { }
