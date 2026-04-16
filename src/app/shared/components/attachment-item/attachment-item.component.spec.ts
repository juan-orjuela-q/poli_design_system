import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AttachmentItemComponent } from './attachment-item.component';

describe('AttachmentItemComponent', () => {
  let component: AttachmentItemComponent;
  let fixture: ComponentFixture<AttachmentItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttachmentItemComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AttachmentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit download event on button click', () => {
    const downloadSpy = jest.spyOn(component.download, 'emit');
    component.fileName = 'test.pdf';
    component.blobUrl = 'blob:test-url';

    component.onDownloadClick();

    expect(downloadSpy).toHaveBeenCalledWith({
      blobUrl: 'blob:test-url',
      fileName: 'test.pdf'
    });
  });
});
