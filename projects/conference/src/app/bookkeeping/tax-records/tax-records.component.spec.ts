import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxRecordsComponent } from './tax-records.component';

describe('TaxRecordsComponent', () => {
  let component: TaxRecordsComponent;
  let fixture: ComponentFixture<TaxRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaxRecordsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
