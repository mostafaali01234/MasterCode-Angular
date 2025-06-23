import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneysafesPageComponent } from './moneysafes-page.component';

describe('MoneysafesPageComponent', () => {
  let component: MoneysafesPageComponent;
  let fixture: ComponentFixture<MoneysafesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoneysafesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoneysafesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
