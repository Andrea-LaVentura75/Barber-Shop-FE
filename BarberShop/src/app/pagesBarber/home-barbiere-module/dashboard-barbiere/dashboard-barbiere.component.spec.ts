import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardBarbiereComponent } from './dashboard-barbiere.component';

describe('DashboardBarbiereComponent', () => {
  let component: DashboardBarbiereComponent;
  let fixture: ComponentFixture<DashboardBarbiereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardBarbiereComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardBarbiereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
