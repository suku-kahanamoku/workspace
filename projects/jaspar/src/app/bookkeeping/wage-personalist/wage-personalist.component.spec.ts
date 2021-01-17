import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WagePersonalistComponent } from './wage-personalist.component';

describe('WagePersonalistComponent', () => {
  let component: WagePersonalistComponent;
  let fixture: ComponentFixture<WagePersonalistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WagePersonalistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WagePersonalistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
