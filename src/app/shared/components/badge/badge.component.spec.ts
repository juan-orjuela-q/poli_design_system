import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgeComponent } from './badge.component';

describe('BadgeComponent', () => {
  let component: BadgeComponent;
  let fixture: ComponentFixture<BadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BadgeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose custom colors when status is a hex value', () => {
    component.status = '#ff5733';
    fixture.detectChanges();

    expect(component.statusClass).toBeNull();
    expect(component.customBackgroundColor).toBe('#FF5733');
    expect(component.customTextColor).toBe('#000000');
  });
});
