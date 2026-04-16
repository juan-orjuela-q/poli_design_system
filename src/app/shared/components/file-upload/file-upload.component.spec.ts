import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FileUploadComponent } from './file-upload.component';

describe('FileUploadComponent', () => {
  let component: FileUploadComponent;
  let fixture: ComponentFixture<FileUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileUploadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate file size', () => {
    component.maxFileSizeMB = 5;
    const largeFile = new File([''], 'large.pdf', { type: 'application/pdf' });
    Object.defineProperty(largeFile, 'size', { value: 10 * 1024 * 1024 }); // 10MB

    let errorMessage = '';
    component.fileValidationError.subscribe((msg: string) => {
      errorMessage = msg;
    });

    const event = { target: { files: [largeFile], value: '' } } as any;
    component.onFileSelected(event);

    expect(errorMessage).toContain('excede el tamaño máximo');
    expect(component.uploadedFiles.length).toBe(0);
  });

  it('should validate file type', () => {
    component.allowedFileTypes = ['pdf', 'docx'];
    const invalidFile = new File([''], 'test.txt', { type: 'text/plain' });

    let errorMessage = '';
    component.fileValidationError.subscribe((msg: string) => {
      errorMessage = msg;
    });

    const event = { target: { files: [invalidFile], value: '' } } as any;
    component.onFileSelected(event);

    expect(errorMessage).toContain('Solo se permiten archivos de tipo');
    expect(component.uploadedFiles.length).toBe(0);
  });

  it('should add valid file', () => {
    const validFile = new File([''], 'test.pdf', { type: 'application/pdf' });
    Object.defineProperty(validFile, 'size', { value: 1024 }); // 1KB

    const event = { target: { files: [validFile], value: '' } } as any;
    component.onFileSelected(event);

    expect(component.uploadedFiles.length).toBe(1);
    expect(component.uploadedFiles[0].name).toBe('test.pdf');
  });

  it('should remove file by index', () => {
    const file1 = new File([''], 'file1.pdf', { type: 'application/pdf' });
    const file2 = new File([''], 'file2.pdf', { type: 'application/pdf' });
    
    component.uploadedFiles = [file1, file2];
    component.removeFile(0);

    expect(component.uploadedFiles.length).toBe(1);
    expect(component.uploadedFiles[0].name).toBe('file2.pdf');
  });

  it('should format file size correctly', () => {
    expect(component.formatFileSize(0)).toBe('0 Bytes');
    expect(component.formatFileSize(1024)).toBe('1 KB');
    expect(component.formatFileSize(1048576)).toBe('1 MB');
  });

  it('should validate max attachments', () => {
    component.maxAttachments = 2;
    expect(component.canAddMoreFiles).toBe(true);

    component.uploadedFiles = [
      new File([''], 'file1.pdf'),
      new File([''], 'file2.pdf')
    ];
    expect(component.canAddMoreFiles).toBe(false);
  });

  it('should validate min and max attachments range', () => {
    component.minAttachments = 1;
    component.maxAttachments = 3;

    expect(component.isAttachmentValid).toBe(false);

    component.uploadedFiles = [new File([''], 'file1.pdf')];
    expect(component.isAttachmentValid).toBe(true);

    component.uploadedFiles = [
      new File([''], 'file1.pdf'),
      new File([''], 'file2.pdf')
    ];
    expect(component.isAttachmentValid).toBe(true);
  });
});
