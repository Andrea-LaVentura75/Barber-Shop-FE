import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiziBarbiereComponent } from './servizi-barbiere.component';

describe('ServiziBarbiereComponent', () => {
  let component: ServiziBarbiereComponent;
  let fixture: ComponentFixture<ServiziBarbiereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServiziBarbiereComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiziBarbiereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
