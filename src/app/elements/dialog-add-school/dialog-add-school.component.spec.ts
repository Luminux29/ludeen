import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddSchoolComponent } from './dialog-add-school.component';

describe('DialogAddSchoolComponent', () => {
  let component: DialogAddSchoolComponent;
  let fixture: ComponentFixture<DialogAddSchoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddSchoolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddSchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
