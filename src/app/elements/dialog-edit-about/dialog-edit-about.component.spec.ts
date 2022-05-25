import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditAboutComponent } from './dialog-edit-about.component';

describe('DialogEditAboutComponent', () => {
  let component: DialogEditAboutComponent;
  let fixture: ComponentFixture<DialogEditAboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEditAboutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
