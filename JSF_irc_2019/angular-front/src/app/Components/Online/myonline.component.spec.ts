import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyonlineComponent } from './myonline.component';

describe('MyonlineComponent', () => {
  let component: MyonlineComponent;
  let fixture: ComponentFixture<MyonlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyonlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyonlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
