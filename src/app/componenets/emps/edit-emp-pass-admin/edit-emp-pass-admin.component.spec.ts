import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEmpPassAdminComponent } from './edit-emp-pass-admin.component';

describe('EditEmpPassAdminComponent', () => {
  let component: EditEmpPassAdminComponent;
  let fixture: ComponentFixture<EditEmpPassAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditEmpPassAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditEmpPassAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
