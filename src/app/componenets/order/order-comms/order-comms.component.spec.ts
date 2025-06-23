import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCommsComponent } from './order-comms.component';

describe('OrderCommsComponent', () => {
  let component: OrderCommsComponent;
  let fixture: ComponentFixture<OrderCommsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderCommsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderCommsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
