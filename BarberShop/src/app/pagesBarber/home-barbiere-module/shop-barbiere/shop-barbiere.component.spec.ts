import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopBarbiereComponent } from './shop-barbiere.component';

describe('ShopBarbiereComponent', () => {
  let component: ShopBarbiereComponent;
  let fixture: ComponentFixture<ShopBarbiereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShopBarbiereComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopBarbiereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
