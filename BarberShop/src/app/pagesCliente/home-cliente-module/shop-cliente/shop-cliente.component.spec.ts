import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopClienteComponent } from './shop-cliente.component';

describe('ShopClienteComponent', () => {
  let component: ShopClienteComponent;
  let fixture: ComponentFixture<ShopClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShopClienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
