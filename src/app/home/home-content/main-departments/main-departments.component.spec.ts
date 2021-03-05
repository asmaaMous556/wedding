import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainDepartmentsComponent } from './main-departments.component';

describe('MainDepartmentsComponent', () => {
  let component: MainDepartmentsComponent;
  let fixture: ComponentFixture<MainDepartmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainDepartmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainDepartmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
