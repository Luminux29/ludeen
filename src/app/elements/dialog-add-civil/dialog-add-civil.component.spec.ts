import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddCivilComponent } from './dialog-add-civil.component';

describe('DialogAddCivilComponent', () => {
  let component: DialogAddCivilComponent;
  let fixture: ComponentFixture<DialogAddCivilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddCivilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddCivilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
