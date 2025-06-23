import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseTypesPageComponent } from './expense-types-page.component';

describe('ExpenseTypesPageComponent', () => {
  let component: ExpenseTypesPageComponent;
  let fixture: ComponentFixture<ExpenseTypesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpenseTypesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpenseTypesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
