import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MychatboxComponent } from './mychatbox.component';

describe('MychatboxComponent', () => {
  let component: MychatboxComponent;
  let fixture: ComponentFixture<MychatboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MychatboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MychatboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
