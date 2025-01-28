import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrenotaClienteComponent } from './prenota-cliente.component';

describe('PrenotaClienteComponent', () => {
  let component: PrenotaClienteComponent;
  let fixture: ComponentFixture<PrenotaClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrenotaClienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrenotaClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
