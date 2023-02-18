import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyTypeSelectComponent } from './property-type-select.component';

describe('PropertyTypeSelectComponent', () => {
  let component: PropertyTypeSelectComponent;
  let fixture: ComponentFixture<PropertyTypeSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyTypeSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertyTypeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
