import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BachecaTagliClienteComponent } from './bacheca-tagli-cliente.component';

describe('BachecaTagliClienteComponent', () => {
  let component: BachecaTagliClienteComponent;
  let fixture: ComponentFixture<BachecaTagliClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BachecaTagliClienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BachecaTagliClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
