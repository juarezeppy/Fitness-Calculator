import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TdeeComponent } from './tdee.component';

describe('TdeeComponent', () => {
  let component: TdeeComponent;
  let fixture: ComponentFixture<TdeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TdeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TdeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
