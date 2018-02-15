import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OvertimeErrorComponent } from './overtime-error.component';

describe('OvertimeErrorComponent', () => {
  let component: OvertimeErrorComponent;
  let fixture: ComponentFixture<OvertimeErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OvertimeErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OvertimeErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
