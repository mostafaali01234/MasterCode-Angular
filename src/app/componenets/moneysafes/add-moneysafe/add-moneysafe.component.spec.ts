import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMoneysafeComponent } from './add-moneysafe.component';

describe('AddMoneysafeComponent', () => {
  let component: AddMoneysafeComponent;
  let fixture: ComponentFixture<AddMoneysafeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddMoneysafeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMoneysafeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
