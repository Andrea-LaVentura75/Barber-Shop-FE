import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeBarbiereModuleComponent } from './home-barbiere-module.component';

describe('HomeBarbiereModuleComponent', () => {
  let component: HomeBarbiereModuleComponent;
  let fixture: ComponentFixture<HomeBarbiereModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeBarbiereModuleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeBarbiereModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
