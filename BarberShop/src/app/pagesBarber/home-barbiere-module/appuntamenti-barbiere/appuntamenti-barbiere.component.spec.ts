import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppuntamentiBarbiereComponent } from './appuntamenti-barbiere.component';

describe('AppuntamentiBarbiereComponent', () => {
  let component: AppuntamentiBarbiereComponent;
  let fixture: ComponentFixture<AppuntamentiBarbiereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppuntamentiBarbiereComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppuntamentiBarbiereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
