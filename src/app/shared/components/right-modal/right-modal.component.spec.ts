import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightModalComponent } from './right-modal.component';

describe('RightModalComponent', () => {
  let component: RightModalComponent;
  let fixture: ComponentFixture<RightModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RightModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RightModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit close event when onClose is called', () => {
    spyOn(component.close, 'emit');
    component.onClose();
    expect(component.close.emit).toHaveBeenCalled();
  });

  it('should emit primaryAction event when onPrimary is called', () => {
    spyOn(component.primaryAction, 'emit');
    component.onPrimary();
    expect(component.primaryAction.emit).toHaveBeenCalled();
  });

  it('should emit secondaryAction event when onSecondary is called', () => {
    spyOn(component.secondaryAction, 'emit');
    component.onSecondary();
    expect(component.secondaryAction.emit).toHaveBeenCalled();
  });

  it('should call onClose when backdrop is clicked and closeOnBackdrop is true', () => {
    spyOn(component, 'onClose');
    component.closeOnBackdrop = true;
    component.onBackdropClick();
    expect(component.onClose).toHaveBeenCalled();
  });

  it('should not call onClose when backdrop is clicked and closeOnBackdrop is false', () => {
    spyOn(component, 'onClose');
    component.closeOnBackdrop = false;
    component.onBackdropClick();
    expect(component.onClose).not.toHaveBeenCalled();
  });
});
