import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExpenseTypesComponent } from './add-expense-types.component';

describe('AddExpenseTypesComponent', () => {
  let component: AddExpenseTypesComponent;
  let fixture: ComponentFixture<AddExpenseTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddExpenseTypesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddExpenseTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
