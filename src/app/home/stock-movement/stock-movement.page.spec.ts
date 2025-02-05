import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StockMovementPage } from './stock-movement.page';

describe('StockMovementPage', () => {
  let component: StockMovementPage;
  let fixture: ComponentFixture<StockMovementPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StockMovementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
