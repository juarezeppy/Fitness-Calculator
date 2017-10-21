import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { V3BUComponent } from './v3-bu.component';

describe('V3BUComponent', () => {
  let component: V3BUComponent;
  let fixture: ComponentFixture<V3BUComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ V3BUComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(V3BUComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
