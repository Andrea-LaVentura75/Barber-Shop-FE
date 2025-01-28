import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BachecaTagliBarbiereComponent } from './bacheca-tagli-barbiere.component';

describe('BachecaTagliBarbiereComponent', () => {
  let component: BachecaTagliBarbiereComponent;
  let fixture: ComponentFixture<BachecaTagliBarbiereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BachecaTagliBarbiereComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BachecaTagliBarbiereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
