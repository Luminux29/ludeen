import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSchoolComponent } from './card-school.component';

describe('CardSchoolComponent', () => {
  let component: CardSchoolComponent;
  let fixture: ComponentFixture<CardSchoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardSchoolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardSchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
