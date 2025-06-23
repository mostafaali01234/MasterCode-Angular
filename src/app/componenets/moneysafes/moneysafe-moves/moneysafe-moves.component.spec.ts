import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneysafeMovesComponent } from './moneysafe-moves.component';

describe('MoneysafeMovesComponent', () => {
  let component: MoneysafeMovesComponent;
  let fixture: ComponentFixture<MoneysafeMovesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoneysafeMovesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoneysafeMovesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
