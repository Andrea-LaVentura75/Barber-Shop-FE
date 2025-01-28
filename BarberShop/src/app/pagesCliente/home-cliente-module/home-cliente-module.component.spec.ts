import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeClienteModuleComponent } from './home-cliente-module.component';

describe('HomeClienteModuleComponent', () => {
  let component: HomeClienteModuleComponent;
  let fixture: ComponentFixture<HomeClienteModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeClienteModuleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeClienteModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
