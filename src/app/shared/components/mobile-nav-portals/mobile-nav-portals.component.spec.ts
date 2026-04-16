import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileNavPortalsComponent } from './mobile-nav-portals.component';

describe('MobileNavPortalsComponent', () => {
  let component: MobileNavPortalsComponent;
  let fixture: ComponentFixture<MobileNavPortalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileNavPortalsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileNavPortalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
