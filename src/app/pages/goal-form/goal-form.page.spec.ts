import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GoalFormPage } from './goal-form.page';

describe('GoalFormPage', () => {
  let component: GoalFormPage;
  let fixture: ComponentFixture<GoalFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
