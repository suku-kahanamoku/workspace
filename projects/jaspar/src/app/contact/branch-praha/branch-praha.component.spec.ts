import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchPrahaComponent } from './branch-praha.component';

describe('BranchPrahaComponent', () => {
  let component: BranchPrahaComponent;
  let fixture: ComponentFixture<BranchPrahaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchPrahaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchPrahaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
